
<a name="__climd"></a>

# Usage
```bash
@raydeck/serverless-deploy [options]
```
# Options
* -V, --version output the version number 
* -f --force Force deploy (slower but guarantees full deployment 

<a name="librarymd"></a>


# @raydeck/serverless-deploy - v2.1.0

## Index

### Variables

* [description](#description)
* [force](#const-force)
* [start](#const-start)
* [version](#version)

### Functions

* [Deploy](#deploy)
* [Remove](#remove)
* [doesPackageJSONExist](#doespackagejsonexist)

## Variables

###  description

• **description**: *any*

*Defined in [bin.ts:9](https://github.com/rhdeck/serverless-deploy/blob/2fdcc8e/src/bin.ts#L9)*

___

### `Const` force

• **force**: *any* = commander.opts().force || false

*Defined in [bin.ts:27](https://github.com/rhdeck/serverless-deploy/blob/2fdcc8e/src/bin.ts#L27)*

___

### `Const` start

• **start**: *number* = Date.now().valueOf()

*Defined in [bin.ts:2](https://github.com/rhdeck/serverless-deploy/blob/2fdcc8e/src/bin.ts#L2)*

___

###  version

• **version**: *any*

*Defined in [bin.ts:9](https://github.com/rhdeck/serverless-deploy/blob/2fdcc8e/src/bin.ts#L9)*

## Functions

###  Deploy

▸ **Deploy**(`dir`: string, `force`: boolean): *void*

*Defined in [bin.ts:98](https://github.com/rhdeck/serverless-deploy/blob/2fdcc8e/src/bin.ts#L98)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`dir` | string | - |
`force` | boolean | false |

**Returns:** *void*

___

###  Remove

▸ **Remove**(`dir`: string): *void*

*Defined in [bin.ts:138](https://github.com/rhdeck/serverless-deploy/blob/2fdcc8e/src/bin.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`dir` | string |

**Returns:** *void*

___

###  doesPackageJSONExist

▸ **doesPackageJSONExist**(`fp`: string): *boolean*

*Defined in [bin.ts:94](https://github.com/rhdeck/serverless-deploy/blob/2fdcc8e/src/bin.ts#L94)*

**Parameters:**

Name | Type |
------ | ------ |
`fp` | string |

**Returns:** *boolean*
