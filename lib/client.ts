import { Device, IDeviceResponse } from "./entities/Device";
import { Position, IPosition } from "./entities/Position";

import axios, { AxiosInstance } from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import qs from "qs";

export { Device, Position };

/**
 * @internal
 * Defines constant strings used in queries for query and request types
 */
enum QueryTypes {
    Signin = 'signin',
    Trackers = 'trackers',
    TrackerData = 'trackerdata',
    List = 'list'
}


/**
 * This class operates with ChipFox's API an allows to log in, list devices and list device positions.
 * 
 * Usage example:
 * 
 *  ```typescript
 *  const api = new ChipFoxApi('myusername', 'mypassword', 'my-unique-and-provided-uuid');
 *
 *  const loginData = await api.login();
 *  console.log(`Hi ${loginData.name} ${loginData.surname}! (${loginData.email})\n`);
 *
 *  const devices = await api.getDevices();
 *  console.log(`Devices:`);
 *  devices.map( (device:Device) => { console.log(`\t - ${device.name} (${device.id}): ${device.lat}, ${device.lng} @ ${device.lastSeen}`) } );
 *
 *  const positions = await api.getDevicePositions(devices[0].id, {limit: 5});
 *  console.log(`\nLast ${positions.length} positions:`);
 *  positions.map( (position:Position) => { console.log(`\t- ${position.computedLocation.lat}, ${position.computedLocation.lng} \t\t@ ${position.time}`) } );
 *  ```
 * 
 */
export class ChipFoxClient {

    username: string;
    password: string;
    language: string;
    uuid: string;
    /** @internal */
    axios: AxiosInstance;

    /**
     * Creates a new {@link ChipFoxApi} instance.
     * 
     * @param username     Username used to access ChipFox API.
     * @param password     Password for given username.
     * @param uuid         Random UUID used for session handling.
     * @param language     Language used to query API.
     * 
     * @returns An instance of {@link ChipFoxApi}.
     */
    constructor(username: string, password: string, uuid: string, language: string = 'en') {
        this.username = username;
        this.password = password;
        this.uuid = uuid;
        this.language = language;

        // init axios:
        this.axios = axios.create({
            baseURL: 'https://app.chipfox.io/app/',
            withCredentials: true,
            timeout: 30000
        });
        axiosCookieJarSupport(this.axios);
        this.axios.defaults.jar = new CookieJar();
    }

    /**
     * Logs in ChipFox's API.
     * 
     * @returns An promise to be resolved as an object with user data, like this:
     * 
     * ```
     * {
     *   name: 'Luis Alberto',
     *   surname: 'Pérez García',
     *   company: 'Clece S.A',
     *   email: 'laperez@grupoclece.com',
     *   mobile: '',
     *   num_devices: 1,
     *   usertag: '126',
     *   unreaded_messages: '0',
     *   unreaded_notifications: '0',
     *   show_switch: false,
     *   page_after_login: 0
     * }
     * ```
     */
    async login() {
        try {
            let response = await this.axios.post(
                '/',
                qs.stringify({
                    language: this.language,
                    type: QueryTypes.Signin,
                    username: this.username,
                    password: this.password,
                }),
                {
                    headers: {
                        UUID: this.uuid,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cookie': `UUID=${this.uuid};`
                    }
                }
            );
            return response.data.response;
        } catch(error) {
            return error;
        }
    }

    /**
     * Gets user's devices.
     * 
     * @returns A promise to be resolved as an array of {@link Device} objects.
     */
    async getDevices(): Promise<[Device]> {
        try {
            let response = await this.axios.post(
                '/',
                qs.stringify({
                    language: this.language,
                    type: QueryTypes.Trackers,
                    request: QueryTypes.List
                })
            );
            return response.data.response.map((r: IDeviceResponse) => new Device(r));
        } catch(error) {
            return error;
        }
    }

    /**
     * Gets device's positions according to params.
     * 
     * @param deviceId          Device's ID.
     * @param options           An object containing options for querying positions.
     * @param options.after     Date to get positions from (~min date).
     * @param options.before    Date to get positions to (~max date).
     * @param options.limit     Máximum number of positions to get.
     * 
     * @returns A promise to be resolved as an array of {@link Position} objects.
     */
    async getDevicePositions(deviceId: string, options: {after?: Date, before?: Date, limit?: number} = {}): Promise<[Position]> {
        // create data object:
        let data:any = {
            language: this.language,
            type: QueryTypes.TrackerData,
            device_id: deviceId
        }
        if (options.after) data.after = Math.floor(options.after.getTime() / 1000);
        if (options.before) data.before = Math.floor(options.before.getTime() / 1000);
        if (options.limit) data.limit = options.limit;
        // perform the query:
        try {
            let response = await this.axios.post(
                '/',
                qs.stringify(data)
            );
            return response.data.response.response.data.map( (position:IPosition) => new Position(position) );
        } catch(error) {
            return error;
        }
    }
}
