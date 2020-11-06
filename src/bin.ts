#!/usr/bin/env node
const start = Date.now().valueOf();
import { spawnSync } from "child_process";
import { join, normalize } from "path";
import { existsSync, readFileSync } from "fs";
import resolve from "@raydeck/dependency-tree-resolver";
import commander, { command } from "commander";
import { getServerlessConfig } from "@raydeck/serverless-base";
const { version, description } = JSON.parse(
  readFileSync(join(__dirname, "..", "package.json"), { encoding: "utf8" })
);
commander
  .version(version)
  .description(description)
  .option("-p --package", "Package to deploy if specified")
  .option(
    "-w --working-directory",
    "Working directory for the top of the monorepo",
    "."
  );
commander.parse(process.argv);

if (!commander.isDocumenting) {
  const cwd = process.cwd();
  const serverlessInfo = getServerlessConfig(cwd);
  const [targetservice] = commander.args;
  const { deploy, remove } = <{ deploy: string[]; remove: string[] }>(
    serverlessInfo
  );
  if (targetservice) {
    Deploy(
      normalize(
        targetservice.includes("/")
          ? targetservice
          : join(cwd, "serverless", targetservice)
      )
    );
  } else {
    let dependencies = <{ fp: string; deps: string[] }[]>deploy
      .map((p) => join(cwd, p))
      .filter((name) => doesPackageJSONExist(name))
      .map((fp) => {
        const { dependencies } = <
          { dependencies: { [key: string]: string } | undefined }
        >getServerlessConfig(fp);
        if (!dependencies) return undefined;
        const deps = Object.values(dependencies).map((v) => join(fp, v));
        return { fp, deps };
      })
      .filter(Boolean);
    let count, newCount;
    do {
      count = Object.keys(dependencies).length;
      dependencies = dependencies.reduce(
        (acc, { deps }) =>
          deps.reduce((acc, fp) => {
            if (acc.find(({ fp: a }) => a == fp)) return acc;
            else {
              const { dependencies } = <
                { dependencies: { [key: string]: string } | undefined }
              >getServerlessConfig(fp);
              if (dependencies) {
                const deps = Object.values(dependencies).map((v) =>
                  join(fp, v)
                );
                return [...acc, { fp, deps }];
              } else return [...acc, { fp, deps: [] }];
            }
          }, acc),
        dependencies
      );
      newCount = Object.keys(dependencies).length;
    } while (count != newCount);
    const depObj = dependencies.reduce((acc, { fp, deps }) => {
      acc[fp] = deps;
      return acc;
    }, <{ [key: string]: any }>{});
    resolve(depObj)
      .filter((fp) => ![cwd, cwd + "/"].includes(fp))
      .forEach(Deploy);
  }
  if (remove) Object.values(remove).map((fp) => Remove(join(cwd, fp)));
  const end = Date.now().valueOf();
  const secs = (end - start) / 1000;
  console.log(`Done with all in ${secs}\n`);
}
export { commander };
function doesPackageJSONExist(fp: string) {
  const jsonPath = join(fp, "package.json");
  return existsSync(jsonPath);
}
function Deploy(dir: string) {
  try {
    if (!existsSync(dir)) return;
    process.chdir(dir);
    console.log("directory is now ", process.cwd());
    console.log(`Deploying ${dir}`);
    spawnSync("yarn", [], { stdio: "inherit" });
    spawnSync("npx", ["fix-local-dependencies"], { stdio: "inherit" });
    //check local package.json for deployment
    const p = <{ scripts: { deploy: string | undefined } | undefined }>(
      JSON.parse(join(dir, "package.json"))
    );
    if (p?.scripts?.deploy) {
      spawnSync("yarn", ["deploy"], { stdio: "inherit" });
      console.log(`Finished deploying ${dir}`);
    } else {
      console.log(`no deploy step for package at ${dir}`);
    }
  } catch (e) {
    throw new Error(`Could not deploy ${dir}: ${e.message}`);
  }
}
function Remove(dir: string) {
  if (!existsSync(dir)) return;
  process.chdir(dir);
  console.log("cwd is now", process.cwd());
  console.log(`Removing ${dir}`);
  spawnSync("yarn", ["run", "serverless-stage", "remove"], {
    stdio: "inherit",
  });
  console.log(`Finished removing ${dir}`);
}
