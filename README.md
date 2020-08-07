
<a name="__climd"></a>

# Usage
```bash
@raydeck/serverless-deploy [options]
```
# Options
* -V, --version output the version number 
* -p --package Package to deploy if specified 
* -w --working-directory Working directory for the top of the monorepo 

<a name="librarymd"></a>


# @raydeck/serverless-deploy - v2.0.1

## Index

### Variables

* [description](#description)
* [start](#const-start)
* [version](#version)

### Functions

* [Deploy](#deploy)
* [Remove](#remove)
* [doesPackageJSONExist](#doespackagejsonexist)

## Variables

###  description

• **description**: *any*

*Defined in [bin.ts:9](https://github.com/rhdeck/serverless-deploy/blob/3df2512/src/bin.ts#L9)*

___

### `Const` start

• **start**: *number* = Date.now().valueOf()

*Defined in [bin.ts:2](https://github.com/rhdeck/serverless-deploy/blob/3df2512/src/bin.ts#L2)*

___

###  version

• **version**: *any*

*Defined in [bin.ts:9](https://github.com/rhdeck/serverless-deploy/blob/3df2512/src/bin.ts#L9)*

## Functions

###  Deploy

▸ **Deploy**(`dir`: string): *void*

*Defined in [bin.ts:92](https://github.com/rhdeck/serverless-deploy/blob/3df2512/src/bin.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`dir` | string |

**Returns:** *void*

___

###  Remove

▸ **Remove**(`dir`: string): *void*

*Defined in [bin.ts:104](https://github.com/rhdeck/serverless-deploy/blob/3df2512/src/bin.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`dir` | string |

**Returns:** *void*

___

###  doesPackageJSONExist

▸ **doesPackageJSONExist**(`fp`: string): *boolean*

*Defined in [bin.ts:88](https://github.com/rhdeck/serverless-deploy/blob/3df2512/src/bin.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`fp` | string |

**Returns:** *boolean*
