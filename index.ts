/**
 * ## SimRail SDK - API Core
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

// Import node modules
import * as HTTPS from "https";

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

    constructor(config: Api.Config<ConvertData>) {
        this.config = config;
    }

    /**
     * Method to retrieve servers from the live data endpoint.
     *
     * @returns A list of multiplayer servers.
     */
    public async getActiveServers(): Promise<ConvertData extends false ? Api.LiveData.Server.Raw.List : Api.LiveData.Server.List> {
        type ResponseData = Api.LiveData.ApiResponse<Api.LiveData.Server.Raw.List>;
        const response = await this.jsonGetRequest<ResponseData>(`${this.config.endpoints.liveData}/servers-open`);
        if (response.result !== true) { this.throwNoResultsError(); }
        return (this.config.convertData === false ? response.data : this.convertServerData(response.data)) as any; // #INDEX#TODO: Remove cast to any
    }

    /**
     * Method to retrieve active dispatch stations from the live data endpoint.
     *
     * @param serverCode - The unique code of the multiplayer server.
     * @returns A list of active dispatch stations.
     */
    public async getActiveStations(serverCode: Api.LiveData.Server.ServerCode): Promise<ConvertData extends false ? Api.LiveData.Station.Raw.List : Api.LiveData.Station.List> {
        type ResponseData = Api.LiveData.ApiResponse<Api.LiveData.Station.Raw.List>;
        const response = await this.jsonGetRequest<ResponseData>(`${this.config.endpoints.liveData}/stations-open?serverCode=${serverCode}`);
        if (response.result !== true) { this.throwNoResultsError(); }
        return (this.config.convertData === false ? response.data : this.convertStationData(response.data)) as any; // #INDEX#TODO: Remove cast to any
    }

    /**
     * Method to retrieve active trains from the live data endpoint.
     *
     * @param serverCode - The unique code of the multiplayer server.
     * @returns A list of active trains.
     */
    public async getActiveTrains(serverCode: Api.LiveData.Server.ServerCode): Promise<ConvertData extends false ? Api.LiveData.Train.Raw.List : Api.LiveData.Train.List> {
        type ResponseData = Api.LiveData.ApiResponse<Api.LiveData.Train.Raw.List>;
        const response = await this.jsonGetRequest<ResponseData>(`${this.config.endpoints.liveData}/trains-open?serverCode=${serverCode}`);
        if (response.result !== true) { this.throwNoResultsError(); }
        return (this.config.convertData === false ? response.data : this.convertTrainData(response.data)) as any; // #INDEX#TODO: Remove cast to any
    }

    /**
     * Method to retrieve timetable data from the timetable endpoint.
     *
     * @param serverCode   - The unique code of the multiplayer server.
     * @param trainNoLocal - The national train number of a train. If left `undefined`, this function will return data for all trains in the timetable.
     */
    public async getTimetable(serverCode: Api.Timetable.ServerCode                                           ): Promise<ConvertData extends false ? Api.Timetable.Raw.List                     : Api.Timetable.Data.List                     >;
    /**
     * Method to retrieve timetable data from the timetable endpoint.
     *
     * @param serverCode   - The unique code of the multiplayer server.
     * @param trainNoLocal - The national train number of a train. If left `undefined`, this function will return data for all trains in the timetable.
     */
    public async getTimetable(serverCode: Api.Timetable.ServerCode, trainNoLocal:  Api.Timetable.TrainNoLocal): Promise<ConvertData extends false ?                          Api.Timetable.Raw :                           Api.Timetable.Data>;
    /**
     * Method to retrieve timetable data from the timetable endpoint.
     *
     * @param serverCode   - The unique code of the multiplayer server.
     * @param trainNoLocal - The national train number of a train. If left `undefined`, this function will return data for all trains in the timetable.
     */
    public async getTimetable(serverCode: Api.Timetable.ServerCode, trainNoLocal?: Api.Timetable.TrainNoLocal): Promise<ConvertData extends false ? Api.Timetable.Raw.List | Api.Timetable.Raw : Api.Timetable.Data.List | Api.Timetable.Data>;
    public async getTimetable(serverCode: Api.Timetable.ServerCode, trainNoLocal?: Api.Timetable.TrainNoLocal): Promise<ConvertData extends false ? Api.Timetable.Raw.List | Api.Timetable.Raw : Api.Timetable.Data.List | Api.Timetable.Data> {
        let url: string = `${this.config.endpoints.timetable}/getAllTimetables?serverCode=${serverCode}`;
        if (trainNoLocal !== undefined) { url += `&train=${trainNoLocal}`; }
        const results = await this.jsonGetRequest<Api.Timetable.Raw.List>(url);
        const timetable = (this.config.convertData === false ? results : this.convertTimetableData(results)) as any; // #INDEX#TODO: Remove cast to any
        if (trainNoLocal !== undefined) {
            const trainTimetable = timetable[0];
            if (trainTimetable === undefined) { this.throwNoResultsError(); }
            return trainTimetable;
        } else { return timetable; }
    }

    private decodeBody<OutputType>(json: string): OutputType {
        try { return JSON.parse(json); }
        catch (_) { throw exception("ResponseBodyDecodeError", "Couldn't decode response body!"); }
    }

    private convertDispatchedBy(raw: Api.LiveData.Station.Raw.DispatchedBy.List): Api.LiveData.Station.DispatchedBy.List {
        const dispatchedBy: Api.LiveData.Station.DispatchedBy.List = [];
        raw.forEach((row) => dispatchedBy.push({ serverCode: row.ServerCode, steamId: row.SteamId }));
        return dispatchedBy;
    }

    private convertServerData(raw: Api.LiveData.Server.Raw.List): Api.LiveData.Server.List {
        const servers: Api.LiveData.Server.List = [];
        raw.forEach((server) => servers.push({
            id:           server.id,
            isActive:     server.IsActive,
            serverCode:   server.ServerCode,
            serverName:   server.ServerName,
            serverRegion: server.ServerRegion,
        }));
        return servers;
    }

    private convertStationData(raw: Api.LiveData.Station.Raw.List): Api.LiveData.Station.List {
        const stations: Api.LiveData.Station.List = [];
        raw.forEach((station) => {
            let difficultyLevel: Api.LiveData.Station.DifficultyLevel = station.DifficultyLevel as any;
            if ([1, 2, 3, 4, 5].includes(difficultyLevel) !== true) {
                console.warn("UnknownDifficultiLevelWarning", `Difficulty level "${station.DifficultyLevel}" is unknown! Reverting to level "5".`);
                difficultyLevel = 5;
            }
            stations.push({
                additionalImage1URL: station.AdditionalImage1URL,
                additionalImage2URL: station.AdditionalImage2URL,
                difficultyLevel,
                dispatchedBy:        this.convertDispatchedBy(station.DispatchedBy),
                id:                  station.id,
                latitude:            station.Latititude,
                longitude:           station.Longitude,
                mainImageURL:        station.MainImageURL,
                name:                station.Name,
                prefix:              station.Prefix,
            });
        });
        return stations;
    }

    private convertTimetableData(raw: Api.Timetable.Raw.List): Api.Timetable.Data.List {
        const timetable: Api.Timetable.Data.List = [];
        raw.forEach((row) => {
            const data: Api.Timetable.Data = {
                endStation:   row.endStation,
                endsAt:       row.endsAt,
                locoType:     row.locoType,
                runId:        row.runId,
                startStation: row.startStation,
                startsAt:     row.startsAt,
                timetable:    this.convertTimetableTimetableData(row.timetable),
                trainLength:  row.trainLength,
                trainName:    row.trainName,
                trainNoLocal: row.trainNoLocal,
                trainWeight:  row.trainWeight,
            };
            if (row.continuesAs          !== "") { data.continuesAs          = row.continuesAs;          }
            if (row.trainNoInternational !== "") { data.trainNoInternational = row.trainNoInternational; }
            timetable.push(data);
        });
        return timetable;
    }

    private convertTimetableTimetableData(raw: Api.Timetable.Timetable.Raw.List): Api.Timetable.Timetable.List {
        const timetable: Api.Timetable.Timetable.List = [];
        raw.forEach((row) => {
            let stopType: Api.Timetable.Timetable.StopType = row.stopType as any;
            if (["CommercialStop", "NoncommercialStop", "NoStopOver"].includes(stopType) !== true) {
                console.warn("UnknownStopTypeWarning", `Stop type "${stopType}" is unknown! Reverting to "NoStopOver".`);
                stopType = "NoStopOver";
            }
            const rawRadioChannels = row.radioChanels.replace(/ /g, "");
            let radioChannels: Api.Timetable.Timetable.RadioChannels = [];
            if (rawRadioChannels !== "") { radioChannels = rawRadioChannels.split(","); }
            const data: Api.Timetable.Timetable = {
                departureTime:        row.departureTime,
                displayedTrainNumber: row.displayedTrainNumber,
                line:                 row.line,
                maxSpeed:             row.maxSpeed,
                kilometrage:          row.mileage,
                nameForPerson:        row.nameForPerson,
                nameOfPoint:          row.nameOfPoint,
                pointId:              row.pointId,
                stopType,
                trainType:            row.trainType,
            };
            if (row.arrivalTime     !== null) { data.arrivalTime     = row.arrivalTime;     }
            if (row.platform        !== null) { data.platform        = row.platform;        }
            if (row.stationCategory !== null) { data.stationCategory = row.stationCategory; }
            if (row.supervisedBy    !== null) { data.supervisedBy    = row.supervisedBy;    }
            if (row.track           !== null) { data.track           = row.track;           }
            if (radioChannels.length > 0)     { data.radioChannels   = radioChannels;       }
            timetable.push(data);
        });
        return timetable;
    }

    private convertTrainData(raw: Api.LiveData.Train.Raw.List): Api.LiveData.Train.List {
        const trains: Api.LiveData.Train.List = [];
        raw.forEach((train) => {
            let type: Api.LiveData.Train.Type = train.Type as any;
            if (["bot", "user"].includes(type) !== true) {
                console.warn("UnknownTrainTypeWarning", `Train type "${train.Type}" is unknown! Reverting to "bot".`);
                type = "bot";
            }
            trains.push({
                endStation: train.EndStation,
                id: train.id,
                runId: train.RunId,
                serverCode: train.ServerCode,
                startStation: train.StartStation,
                trainData: this.convertTrainTrainData(train.TrainData),
                trainName: train.TrainName,
                trainNoLocal: train.TrainNoLocal,
                type,
                vehicles: train.Vehicles,
            });
        });
        return trains;
    }

    private convertTrainTrainData(raw: Api.LiveData.Train.TrainData.Raw): Api.LiveData.Train.TrainData {
        const data: Api.LiveData.Train.TrainData = {
            inBorderStationArea: raw.InBorderStationArea,
            latitude: raw.Latititute,
            longitude: raw.Longitute,
            vdDelayedTimetableIndex: raw.VDDelayedTimetableIndex,
            velocity: raw.Velocity,
        };
        if (raw.ControlledBySteamID !== null) { data.controlledBySteamId = raw.ControlledBySteamID; }
        if (raw.DistanceToSignalInFront !== null) { data.distanceToSignalInFront = raw.DistanceToSignalInFront; }
        if (raw.SignalInFront !== null) {
            data.signalInFront = raw.SignalInFront;
            data.signalInFrontSpeed = raw.SignalInFrontSpeed === Types.LiveData.VMAX_VALUE ? Types.LiveData.VMAX : raw.SignalInFrontSpeed;
        }
        return data;
    }

    private async jsonGetRequest<JsonResponseData>(url: string): Promise<JsonResponseData> {
        return new Promise((resolve, reject) => {
            HTTPS.get(url, (response) => {
                let rawData: string = "";
                response.on("data", (buffer: Buffer) => rawData += buffer.toString());
                response.on("end", () => {
                    try { resolve(this.decodeBody(rawData)); }
                    catch (error) { reject(error); }
                });
            }).on("error", reject);
        });
    }

    private throwNoResultsError(): never {
        throw exception("NoResultError", "The server didn't return any results!");
    }

}

export namespace Api {

    /** Specifies the version of the API. */
    export const VERSION: Version = "0.1.2";

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

function exception(code: string, message: string): Error {
    const error = Error(message); error.name = code; return error;
}
