**ts-chipfox-client**

> [README](../README.md) / [Globals](../globals.md) / ["client"](../modules/_client_.md) / ChipFoxClient

# Class: ChipFoxClient

This class operates with ChipFox's API an allows to log in, list devices and list device positions.

Usage example:

 ```typescript
 const api = new ChipFoxApi('myusername', 'mypassword', 'my-unique-and-provided-uuid');

 const loginData = await api.login();
 console.log(`Hi ${loginData.name} ${loginData.surname}! (${loginData.email})\n`);

 const devices = await api.getDevices();
 console.log(`Devices:`);
 devices.map( (device:Device) => { console.log(`\t - ${device.name} (${device.id}): ${device.lat}, ${device.lng} @ ${device.lastSeen}`) } );

 const positions = await api.getDevicePositions(devices[0].id, {limit: 5});
 console.log(`\nLast ${positions.length} positions:`);
 positions.map( (position:Position) => { console.log(`\t- ${position.computedLocation.lat}, ${position.computedLocation.lng} \t\t@ ${position.time}`) } );
 ```

## Hierarchy

* **ChipFoxClient**

## Index

### Constructors

* [constructor](_client_.chipfoxclient.md#constructor)

### Properties

* [language](_client_.chipfoxclient.md#language)
* [password](_client_.chipfoxclient.md#password)
* [username](_client_.chipfoxclient.md#username)
* [uuid](_client_.chipfoxclient.md#uuid)

### Methods

* [getDevicePositions](_client_.chipfoxclient.md#getdevicepositions)
* [getDevices](_client_.chipfoxclient.md#getdevices)
* [login](_client_.chipfoxclient.md#login)

## Constructors

### constructor

\+ **new ChipFoxClient**(`username`: string, `password`: string, `uuid`: string, `language`: string): [ChipFoxClient](_client_.chipfoxclient.md)

*Defined in client.ts:51*

Creates a new {@link ChipFoxApi} instance.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`username` | string | - | Username used to access ChipFox API. |
`password` | string | - | Password for given username. |
`uuid` | string | - | Random UUID used for session handling. |
`language` | string | "en" | Language used to query API.  |

**Returns:** [ChipFoxClient](_client_.chipfoxclient.md)

An instance of {@link ChipFoxApi}.

## Properties

### language

•  **language**: string

*Defined in client.ts:48*

___

### password

•  **password**: string

*Defined in client.ts:47*

___

### username

•  **username**: string

*Defined in client.ts:46*

___

### uuid

•  **uuid**: string

*Defined in client.ts:49*

## Methods

### getDevicePositions

▸ **getDevicePositions**(`deviceId`: string, `options`: { after?: Date ; before?: Date ; limit?: undefined \| number  }): Promise\<[[Position](_entities_position_.position.md)]>

*Defined in client.ts:156*

Gets device's positions according to params.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`deviceId` | string | - | Device's ID. |
`options` | { after?: Date ; before?: Date ; limit?: undefined \| number  } | {} | An object containing options for querying positions. |

**Returns:** Promise\<[[Position](_entities_position_.position.md)]>

A promise to be resolved as an array of [Position](_entities_position_.position.md) objects.

___

### getDevices

▸ **getDevices**(): Promise\<[[Device](_entities_device_.device.md)]>

*Defined in client.ts:129*

Gets user's devices.

**Returns:** Promise\<[[Device](_entities_device_.device.md)]>

A promise to be resolved as an array of [Device](_entities_device_.device.md) objects.

___

### login

▸ **login**(): Promise\<any>

*Defined in client.ts:100*

Logs in ChipFox's API.

**Returns:** Promise\<any>

An promise to be resolved as an object with user data, like this:

```
{
  name: 'Luis Alberto',
  surname: 'Pérez García',
  company: 'Clece S.A',
  email: 'laperez@grupoclece.com',
  mobile: '',
  num_devices: 1,
  usertag: '126',
  unreaded_messages: '0',
  unreaded_notifications: '0',
  show_switch: false,
  page_after_login: 0
}
```
