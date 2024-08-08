/**
 * ## SimRail Core API
 *
 * This file contains the functionality for interacting with the SimRail API
 *   and exports type definitions from submodules for ease-of-use.
 *
 * @file
 * @module
 *
 * @author  Niek van Bennekom
 * @since   0.1.0
 * @version 0.1.1
 *
 * @requires https
 */

// Import project modules
import * as Types from "./types";

/**
 * Specifies an API class instance for interacting with SimRail's remote API.
 *
 * @template ConvertData - Specifies if responses are converted or if the raw API response is returned. (default: `true`)
 *
 * @param config - The API configuration.
 */
export class Api<ConvertData extends Api.ConvertData = true> {

    /** Specifies the configuration of the API. */
    public readonly config: Api.Config<ConvertData>;

    constructor(config: Api.Config<ConvertData>);

    /**
     * Method to retrieve servers from the live data endpoint.
     *
     * @returns A list of multiplayer servers.
     */
    public getActiveServers(): Promise<ConvertData extends false ? Api.LiveData.Server.Raw.List : Api.LiveData.Server.List>;

    /**
     * Method to retrieve active dispatch stations from the live data endpoint.
     *
     * @param serverCode - The unique code of the multiplayer server.
     * @returns A list of active dispatch stations.
     */
    public getActiveStations(serverCode: Api.LiveData.Server.ServerCode): Promise<ConvertData extends false ? Api.LiveData.Station.Raw.List : Api.LiveData.Station.List>;

    /**
     * Method to retrieve active trains from the live data endpoint.
     *
     * @param serverCode - The unique code of the multiplayer server.
     * @returns A list of active trains.
     */
    public getActiveTrains(serverCode: Api.LiveData.Server.ServerCode): Promise<ConvertData extends false ? Api.LiveData.Train.Raw.List : Api.LiveData.Train.List>;

    /**
     * Method to retrieve timetable data from the timetable endpoint.
     *
     * @param serverCode   - The unique code of the multiplayer server.
     * @param trainNoLocal - The national train number of a train. If left `undefined`, this function will return data for all trains in the timetable.
     */
    public getTimetable(serverCode: Api.Timetable.ServerCode): Promise<ConvertData extends false ? Api.Timetable.Raw.List : Api.Timetable.Data.List>;
    /**
     * Method to retrieve timetable data from the timetable endpoint.
     *
     * @param serverCode   - The unique code of the multiplayer server.
     * @param trainNoLocal - The national train number of a train. If left `undefined`, this function will return data for all trains in the timetable.
     */
    public getTimetable(serverCode: Api.Timetable.ServerCode, trainNoLocal: Api.Timetable.TrainNoLocal): Promise<ConvertData extends false ? Api.Timetable.Raw : Api.Timetable.Data>;
    /**
     * Method to retrieve timetable data from the timetable endpoint.
     *
     * @param serverCode   - The unique code of the multiplayer server.
     * @param trainNoLocal - The national train number of a train. If left `undefined`, this function will return data for all trains in the timetable.
     */
    public getTimetable(serverCode: Api.Timetable.ServerCode, trainNoLocal?: Api.Timetable.TrainNoLocal): Promise<ConvertData extends false ? Api.Timetable.Raw.List | Api.Timetable.Raw : Api.Timetable.Data.List | Api.Timetable.Data>;

}

export namespace Api {

    /** Specifies the version of the API. */
    export const VERSION: Version;

    /** Specifies data from the live data endpoint. */
    export import LiveData  = Types.LiveData;
    /** Specifies data from the timetable endpoint. */
    export import Timetable = Types.Timetable;

    /**
     * Specifies the configuration of the API.
     *
     * @template ApiConvertData - Specifies if responses are converted or if the raw API response is returned.
     */
    export interface Config<ApiConvertData extends ConvertData> {
        /**
         * Specifies if responses are converted or if the raw API response is returned.
         *
         * @default true
         */
        readonly convertData?: ApiConvertData;
        /** Specifies the configuration for API endpoints. */
        readonly endpoints: Endpoints;
    }

    /** Specifies if responses are converted or if the raw API response is returned. */
    export type ConvertData = boolean;

    export interface Endpoints {
        /** Specifies the URL for the live data API endpoint. */
        readonly liveData: Url;
        /** Specifies the URL for the timetable API endpoint. */
        readonly timetable: Url;
    }

    /** Specifies an API endpoint URL. */
    export type Url = string;

    /** Specifies the version of the API. */
    export type Version = `${number}.${number}.${number}` | `${number}.${number}.${number}-${string}`;

}

export default Api;
