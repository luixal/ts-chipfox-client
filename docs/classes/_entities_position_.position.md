**ts-chipfox-client**

> [README](../README.md) / [Globals](../globals.md) / ["entities/Position"](../modules/_entities_position_.md) / Position

# Class: Position

This class represent a device's position in time. Includes some extra info in addition to location.

## Hierarchy

* **Position**

## Index

### Constructors

* [constructor](_entities_position_.position.md#constructor)

### Properties

* [computedLocation](_entities_position_.position.md#computedlocation)
* [countryCode](_entities_position_.position.md#countrycode)
* [data](_entities_position_.position.md#data)
* [deviceId](_entities_position_.position.md#deviceid)
* [event](_entities_position_.position.md#event)
* [lqi](_entities_position_.position.md#lqi)
* [payload](_entities_position_.position.md#payload)
* [seqNumber](_entities_position_.position.md#seqnumber)
* [service](_entities_position_.position.md#service)
* [time](_entities_position_.position.md#time)

## Constructors

### constructor

\+ **new Position**(`position`: IPosition): [Position](_entities_position_.position.md)

*Defined in entities/Position.ts:55*

Creates a new [Position](_entities_position_.position.md) instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`position` | IPosition | ChipFox's API response format for Position.  |

**Returns:** [Position](_entities_position_.position.md)

## Properties

### computedLocation

•  **computedLocation**: IComputedLocation

*Defined in entities/Position.ts:51*

___

### countryCode

•  **countryCode**: number

*Defined in entities/Position.ts:54*

___

### data

•  **data**: string

*Defined in entities/Position.ts:49*

___

### deviceId

•  **deviceId**: string

*Defined in entities/Position.ts:46*

___

### event

•  **event**: any

*Defined in entities/Position.ts:48*

___

### lqi

•  **lqi**: number

*Defined in entities/Position.ts:53*

___

### payload

•  **payload**: IPayload

*Defined in entities/Position.ts:55*

___

### seqNumber

•  **seqNumber**: number

*Defined in entities/Position.ts:50*

___

### service

•  **service**: number

*Defined in entities/Position.ts:52*

___

### time

•  **time**: Date

*Defined in entities/Position.ts:47*
