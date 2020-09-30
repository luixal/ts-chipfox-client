/**
 * @internal
 * ChipFox's API response format for ComputedLocation
 */
interface IComputedLocation {
    lat: number;
    lng: number;
    radius: number;
    distance: number;
}

/**
 * @internal
 * ChipFox's API response format for PayLoad
 */
interface IPayload extends IComputedLocation {
    last: number;
    geoloc: number;
    temperature: number;
    acquisition: number;
    short: number;
}

/**
 * @internal
 * ChipFox's API response format for Position
 */
export interface IPosition {
    device: string;
    time: number;
    event: any;
    data: string;
    seqNumber: number;
    computedLocation: IComputedLocation;
    service: number;
    lqi: number;
    countryCode: number;
    payload: IPayload;
}

/**
 * This class represent a device's position in time. Includes some extra info in addition to location.
 */
export class Position {

    deviceId: string;
    time: Date;
    event: any;
    data: string;
    seqNumber: number;
    computedLocation: IComputedLocation;
    service: number;
    lqi: number;
    countryCode: number;
    payload: IPayload;

    /**
     * Creates a new {@link Position} instance.
     * @param position ChipFox's API response format for Position.
     */
    constructor(position:IPosition) {
        this.deviceId = position.device;
        this.time = new Date(position.time * 1000);
        this.event= position.event;
        this.data = position.data;
        this.seqNumber = position.seqNumber;
        this.computedLocation = position.computedLocation;
        this.service = position.service;
        this.lqi = position.lqi;
        this.countryCode = position.countryCode;
        this.payload = position.payload;
    }

}