/**
 * ## SimRail Core API
 *
 * This file contains type definitions for live data of the SimRail API.
 *
 * @file
 * @module
 *
 * @author  Niek van Bennekom
 * @since   0.1.0
 * @version 0.1.0
 */

/** Specifies the maximum allowable operating speed. (**Vmax**) */
export declare const VMAX: "vmax";

/** Specifies the "speed" value that will indicate `"vmax"`. */
export declare const VMAX_VALUE: 32767;

/** Specifies the unique code of a live data server. */
export type ServerCode = string;

/**
 * Specifies a response returned by the remote API.
 *
 * @template ResponseData - The requested data.
 */
export type ApiResponse<ResponseData> = ApiResponse.Error | ApiResponse.Successful<ResponseData>;
export namespace ApiResponse {
    export interface Base<ResponseResult extends Result> {
        /** Specifies if the request succeeded. */
        result: ResponseResult;
    }
    /** Specifies the number of results. */
    export type Count = number;
    /** Specifies a description of a response. */
    export type Description = string;
    /** Specifies a response for a failed request. */
    export interface Error extends Base<false> {}
    /** Specifies if a request succeeded. */
    export type Result = boolean;
    /**
     * Specfies a response for a successful request.
     *
     * @template ResponseData - The requested data.
     */
    export interface Successful<ResponseData> extends Base<true> {
        /** Specifies the number of results. */
        count: Count;
        /** Specifies the requested data. */
        data: ResponseData;
        /** Specifies a description for the response. */
        description: Description;
    }
}



//
//  Servers
//

/** Specifies a multiplayer server. */
export interface Server {
    /** Specifies the unique ID of the server. (independent of `code`) */
    id: Server.Id;
    /** Specifies if the server is active. */
    isActive: Server.IsActive;
    /** Specifies the unique code of the server. */
    serverCode: Server.ServerCode;
    /** Specifies the name of the server. */
    serverName: Server.ServerName;
    /** Specifies in which region the server is located. */
    serverRegion: Server.ServerRegion;
}
export namespace Server {
    /** Specifies the unique ID of a server. (independent of `code`) */
    export type Id = string;
    /** Specifies if a server is active. */
    export type IsActive = boolean;
    /** Specifies a list of multiplayer servers. */
    export type List = Server[];
    /** Specifies the unique code of a server. */
    export type ServerCode = string;
    /** Specifies the name of a server. */
    export type ServerName = string;
    /** Specifies in which region a server is located. */
    export type ServerRegion = string;
    /** Specifies a multiplayer server in the raw API format. */
    export interface Raw {
        /** Specifies the unique ID of the server in the raw API format. (independent of `code`) */
        id: Id;
        /** Specifies if the server is active in the raw API format. */
        IsActive: IsActive;
        /** Specifies the unique code of the server in the raw API format. */
        ServerCode: ServerCode;
        /** Specifies the name of the server in the raw API format. */
        ServerName: ServerName;
        /** Specifies in which region the server is located in the raw API format. */
        ServerRegion: ServerRegion;
    }
    export namespace Raw {
        /** Specifies a list of multiplayer servers in the raw API format. */
        export type List = Raw[];
    }
}



//
//  Stations
//

/** Specifies an active dispatch station. */
export interface Station {
    /** Specifies the URL of the first secondary image for this station. */
    additionalImage1URL: Station.ImageUrl;
    /** Specifies the URL of the second secondary image for this station. */
    additionalImage2URL: Station.ImageUrl;
    /** Specifies the difficulty level for this station. (from `1` to `5`) */
    difficultyLevel: Station.DifficultyLevel;
    /** Specifies a list of players dispatching at this station. */
    dispatchedBy?: Station.DispatchedBy.List;
    /** Specifies the unique ID of this station. */
    id: Station.Id;
    /** Specifies the global latitude of this station. */
    latitude: Station.Latitude;
    /** Specifies the global longitude of this station. */
    longitude: Station.Longitude;
    /** Specifies the URL of the main image of this station. */
    mainImageURL: Station.ImageUrl;
    /** Specifies the name of the station. */
    name: Station.Name;
    /** Specifies the prefix of this station. */
    prefix: Station.Prefix;
}
export namespace Station {
    /** Specifies the difficulty level for a station. (from `1` to `5`) */
    export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
    /** Specifies a player dispatching at a station. */
    export interface DispatchedBy {
        /** Specifies the unique code of the server the player is using. */
        serverCode: DispatchedBy.ServerCode;
        /** Specifies the Steam ID of the player. */
        steamId: DispatchedBy.SteamId;
    }
    export namespace DispatchedBy {
        /** Specifies a list of players dispatching at a station. */
        export type List = DispatchedBy[];
        /** Specifies the unique code of a server a player is using. */
        export type ServerCode = string;
        /** Specifies the Steam ID of a player. */
        export type SteamId = string;
    }
    /** Specifies the unique ID of a station. */
    export type Id = string;
    /** Specifies the URL of an image. */
    export type ImageUrl = string;
    /** Specifies the global latitude of a station. */
    export type Latitude = number;
    /** Specifies a list of active dispatch stations. */
    export type List = Station[];
    /** Specifies the global longitude of a station. */
    export type Longitude = number;
    /** Specifies the name of a station. */
    export type Name = string;
    /** Specifies the prefix of a station. */
    export type Prefix = string;
    /** Specifies an active dispatch station in the raw API format. */
    export interface Raw {
        /** Specifies the URL of the first secondary image for this station in the raw API format. */
        AdditionalImage1URL: ImageUrl;
        /** Specifies the URL of the second secondary image for this station in the raw API format. */
        AdditionalImage2URL: ImageUrl;
        /** Specifies the difficulty level for this station in the raw API format. (from `1` to `5`) */
        DifficultyLevel: Raw.DifficultyLevel;
        /** Specifies a list of players dispatching at this station in the raw API format. */
        DispatchedBy: Raw.DispatchedBy.List;
        /** Specifies the unique ID of this station in the raw API format. */
        id: Id;
        /** Specifies the global latitude of this station in the raw API format. */
        Latititude: Raw.Latititude;
        /** Specifies the global longitude of this station in the raw API format. */
        Longitude: Longitude;
        /** Specifies the URL of the main image of this station in the raw API format. */
        MainImageURL: ImageUrl;
        /** Specifies the name of the station in the raw API format. */
        Name: Name;
        /** Specifies the prefix of this station in the raw API format. */
        Prefix: Prefix;
    }
    export namespace Raw {
        /** Specifies the difficulty level for a station in the raw API format. (from `1` to `5`) */
        export type DifficultyLevel = number;
        /** Specifies a player dispatching at a station in the raw API format. */
        export interface DispatchedBy {
            /** Specifies the unique code of the server the player is using in the raw API format. */
            ServerCode: Station.DispatchedBy.ServerCode;
            /** Specifies the Steam ID of the player in the raw API format. */
            SteamId: Station.DispatchedBy.SteamId;
        }
        export namespace DispatchedBy {
            /** Specifies a list of players dispatching at a station in the raw API format. */
            export type List = DispatchedBy[];
        }
        /** Specifies the global latitude of a station in the raw API format. */
        export type Latititude  = number;
        /** Specifies a list of active dispatch stations in the raw API format. */
        export type List = Raw[];
    }
}



//
//  Trains
//

/** Specifies an active train. */
export interface Train {
    /** Specifies the name of the destination station. */
    endStation: Train.EndStation;
    /** Specifies the unique ID of the train. (independent from `runId`) */
    id: Train.Id;
    /** Specifies the unique ID of this train on the timetable server. (independent from `id`) */
    runId: Train.RunId;
    /** Specifies the unique code of the server the train is running on. */
    serverCode: Train.ServerCode;
    /** Specifies the name of the origin station. */
    startStation: Train.StartStation;
    /** Specifies live data about the train. */
    trainData: Train.TrainData;
    /** Specifies the name of the train. */
    trainName: Train.TrainName;
    /** Specifies the national train number of this train. */
    trainNoLocal: Train.TrainNoLocal;
    /** Specifies if this train is operated by a `"bot"` or a `"user"`. */
    type: Train.Type;
    /**
     * Specifies a list of vehicles of this train.
     *
     * **NOTE**: This data hasn't be deciphered yet, if you know what this data
     *   describes please **open a new issue** in the project repository.
     */
    vehicles: Train.Vehicles;
}
export namespace Train {
    /** Specifies the name of a destination station. */
    export type EndStation = string;
    /** Specifies the unique ID of a train. (independent from `Train.RunId`) */
    export type Id = string;
    /** Specifies a list of active trains. */
    export type List = Train[];
    /** Specifies the name of a train. */
    export type TrainName = string;
    /** Specifies the national train number of a train. */
    export type TrainNoLocal = string;
    /** Specifies the unique ID of a train on the timetable server. (independent from `Train.Id`) */
    export type RunId = string;
    /** Specifies the unique code of the server a train is running on. */
    export type ServerCode = string;
    /** Specifies the name of an origin station. */
    export type StartStation = string;
    /** Specifies if a train is operated by a `"bot"` or a `"user"`. */
    export type Type = "bot" | "user";
    /**
     * Specifies data about a vehicle of a train.
     *
     * **NOTE**: This data hasn't be deciphered yet, if you know what this data
     *   describes please **open a new issue** in the project repository.
     */
    export type Vehicle = string;
    /**
     * Specifies a list of vehicles of a train.
     *
     * **NOTE**: This data hasn't be deciphered yet, if you know what this data
     *   describes please **open a new issue** in the project repository.
     */
    export type Vehicles = Vehicles[];
    /** Specifies live data about a train. */
    export interface TrainData {
        /** Specifies the Steam ID of the player controlling this train. */
        controlledBySteamId?: TrainData.ControlledBySteamId;
        /** Specifies the distance to the next signal in meters. */
        distanceToSignalInFront?: TrainData.DistanceToSignalInFront;
        /** Specifies if the train is in the border area of the map. (unplayable area) */
        inBorderStationArea: TrainData.InBorderStationArea;
        /** Specifies the current global latitude of the train. */
        latitude: TrainData.Latitude;
        /** Specifies the current global longitude of the train. */
        longitude: TrainData.Longitude;
        /**
         * Specifies data about the next signal.
         *
         * **NOTE**: This data (except for the ID prefixing the `@` symbol) hasn't be deciphered yet,
         *   if you know what this data describes please **open a new issue** in the project repository.
         */
        signalInFront?: TrainData.SignalInFront;
        /** Specifies the track limit effective at the next signal in km/h. */
        signalInFrontSpeed?: TrainData.SignalInFrontSpeed;
        /** Specifies the index of the current entry in this train's timetable. */
        vdDelayedTimetableIndex: TrainData.VdDelayedTimetableIndex;
        /** Specifies the current speed of the train. */
        velocity: TrainData.Velocity;
    }
    export namespace TrainData {
        /** Specifies the Steam ID of the player controlling a train. */
        export type ControlledBySteamId = string;
        /** Specifies the distance to the next signal in meters. */
        export type DistanceToSignalInFront = number;
        /** Specifies if a train is in the border area of the map. (unplayable area) */
        export type InBorderStationArea = boolean;
        /** Specifies the current global latitude of a train. */
        export type Latitude = number;
        /** Specifies the current global longitude of a train. */
        export type Longitude = number;
        /**
         * Specifies data about the next signal.
         *
         * **NOTE**: This data (except for the ID prefixing the `@` symbol) hasn't be deciphered yet,
         *   if you know what this data describes please **open a new issue** in the project repository.
         */
        export type SignalInFront = string;
        /** Specifies the track limit effective at the next signal in km/h. */
        export type SignalInFrontSpeed = number | typeof VMAX;
        /** Specifies the index of the current entry in a train's timetable. */
        export type VdDelayedTimetableIndex = number;
        /** Specifies the current speed of a train. */
        export type Velocity = number;
        /** Specifies live data about a train in the raw API format. */
        export interface Raw {
            /** Specifies the Steam ID of the player controlling this train in the raw API format. */
            ControlledBySteamID: Raw.ControlledBySteamId;
            /** Specifies the distance to the next signal in meters and in the raw API format. */
            DistanceToSignalInFront: Raw.DistanceToSignalInFront;
            /** Specifies if the train is in the border area of the map in the raw API format. (unplayable area) */
            InBorderStationArea: InBorderStationArea;
            /** Specifies the current global latitude of the train in the raw API format. */
            Latititute: Raw.Latititute;
            /** Specifies the current global longitude of the train in the raw API format. */
            Longitute: Raw.Longitute;
            /**
             * Specifies data about the next signal in the raw API format.
             *
             * **NOTE**: This data (except for the ID prefixing the `@` symbol) hasn't be deciphered yet,
             *   if you know what this data describes please **open a new issue** in the project repository.
             */
            SignalInFront: Raw.SignalInFront;
            /** Specifies the track limit effective at the next signal in km/h and in the raw API format. */
            SignalInFrontSpeed: SignalInFrontSpeed;
            /** Specifies the index of the current entry in this train's timetable in the raw API format. */
            VDDelayedTimetableIndex: VdDelayedTimetableIndex;
            /** Specifies the current speed of the train in the raw API format. */
            Velocity: Velocity;
        }
        export namespace Raw {
            /** Specifies the Steam ID of the player controlling a train in the raw API format. */
            export type ControlledBySteamId = string | null;
            /** Specifies the current global latitude of a train in the raw API format. */
            export type Latititute = number;
            /** Specifies the current global longitude of a train in the raw API format. */
            export type Longitute = number;
            /**
             * Specifies data about the next signal in the raw API format.
             *
             * **NOTE**: This data (except for the ID prefixing the `@` symbol) hasn't be deciphered yet,
             *   if you know what this data describes please **open a new issue** in the project repository.
             */
            export type SignalInFront = string | null;
            /** Specifies the distance to the next signal in meters and in the raw API format. */
            export type DistanceToSignalInFront = number | null;
            /** Specifies the track limit effective at the next signal in km/h and in the raw API format. */
            export type SignalInFrontSpeed = number;
        }
    }
    /** Specifies an active train in the raw API format. */
    export interface Raw {
        /** Specifies the name of the destination station in the raw API format. */
        EndStation: EndStation;
        /** Specifies the unique ID of the train in the raw API format. (independent from `runId`) */
        id: Id;
        /** Specifies the unique ID of this train on the timetable server in the raw API format. (independent from `id`) */
        RunId: RunId;
        /** Specifies the unique code of the server the train is running on in the raw API format. */
        ServerCode: ServerCode;
        /** Specifies the name of the origin station in the raw API format. */
        StartStation: StartStation;
        /** Specifies live data about the train in the raw API format. */
        TrainData: TrainData.Raw;
        /** Specifies the name of the train in the raw API format. */
        TrainName: TrainName;
        /** Specifies the national train number of this train in the raw API format. */
        TrainNoLocal: TrainNoLocal;
        /** Specifies if this train is operated by a `"bot"` or a `"user"` in the raw API format. */
        Type: Raw.Type;
        /**
         * Specifies a list of vehicles of this train in the raw API format.
         *
         * **NOTE**: This data hasn't be deciphered yet, if you know what this data
         *   describes please **open a new issue** in the project repository.
         */
        Vehicles: Vehicles;
    }
    export namespace Raw {
        /** Specifies a list of active trains in the raw API format. */
        export type List = Raw[];
        /** Specifies the type of train operator in the raw API format. (`"bot"` or `"user"`) */
        export type Type = string;
    }
}
