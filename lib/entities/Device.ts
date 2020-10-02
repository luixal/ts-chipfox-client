/**
 * @internal
 * ChipFox's API response respresenting a Device.
 */
export interface IDeviceResponse {
    id: string;
    status: number;
    color: string;
    name: string;
    gps: string;
    lat: string;
    lng: string;
    geotype: string;
    lastseen: string;
    battery: string;
    temperature: string;
    ignore_timeout: number;
    reg_done: string;
    token_validity: string;
    suspend: number;
    motion_lock_show: boolean;
    motion_lock: boolean;
    motion_description: string;
    product_certificate: string;
    fw: string;
}

/**
 * This class represents a device.
 */
export class Device {

    id: string;
    name: string;
    lat: number;
    lng: number;
    lastSeen: Date;
    battery: number;
    temperature: number;
    productCertificate: string;
    firmwareVersion: string;
    status: number;
    color: string;
    gps: string;
    geotype: string;
    ignoreTimeout: number;
    regDone: string;
    tokenValidity: string;
    suspend: number;
    motionLockShow: boolean;
    motionLock: boolean;
    motionDescription: string;

    /**
     * Creates a new {@link Device} instance.
     * @param response Response from ChipFox's API
     */
    constructor(response: IDeviceResponse) {
        this.id = response.id;
        this.name = response.name;
        this.lat = parseFloat(response.lat);
        this.lng = parseFloat(response.lng);
        this.lastSeen = new Date( parseInt(response.lastseen) * 1000 );
        this.battery = parseInt(response.battery.slice(0, -1));
        this.temperature = parseInt(response.temperature.replace(/\D/g, ''));
        this.productCertificate = response.product_certificate;
        this.firmwareVersion = response.fw;
        this.status = response.status;
        this.color = response.color;
        this.gps = response.gps;
        this.geotype = response.geotype;
        this.ignoreTimeout = response.ignore_timeout;
        this.regDone = response.reg_done;
        this.tokenValidity = response.token_validity;
        this.suspend = response.suspend;
        this.motionLockShow = response.motion_lock_show;
        this.motionLock = response.motion_lock;
        this.motionDescription = response.motion_description;
    }


}