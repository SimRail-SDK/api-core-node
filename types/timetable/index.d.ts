/**
 * ## SimRail SDK - API Core
 *
 * This file contains type definitions for timetable data of the SimRail API.
 *
 * @file
 * @module
 *
 * @author  Niek van Bennekom
 * @since   0.1.0
 * @version 0.1.0
 */

/** Specifies information about a train in a timetable. */
export interface Data {
    /** Specifies under which train number the train will continue. */
    continuesAs?: ContinuesAs;
    /** Specifies the name of the destination station. */
    endStation: EndStation;
    /** Specifies when the train arrives at it's destination. Format: `hh:mm:ss` */
    endsAt: EndsAt;
    /** Specifies the name of the train's locomotive. */
    locoType: LocoType;
    /** Specifies the unique ID of the train. (independent from the train number) */
    runId: RunId;
    /** Specifies the name of the origin station. */
    startStation: StartStation;
    /** Specifies when the train departs from it's origin. Format: `hh:mm:ss` */
    startsAt: StartsAt;
    /** Specifies a list of timetable entries for this train. */
    timetable: Timetable.List;
    /** Specifies the length of the train in meters. */
    trainLength: TrainLength;
    /** Specifies the name of the train or train series. */
    trainName: TrainName;
    /** Specifies the international train number of this train. */
    trainNoInternational?: TrainNoInternational;
    /** Specifies the national train number of this train. */
    trainNoLocal: TrainNoLocal;
    /** Specifies the weight of this train in metric tonnes. */
    trainWeight: TrainWeight;
}
export namespace Data {
    /** Specifies a timetable. */
    export type List = Data[];
}

/** Specifies under which train number a train will continue. */
export type ContinuesAs = string;
/** Specifies the name of a destination station. */
export type EndStation = string;
/** Specifies when a train arrives at it's destination. Format: `hh:mm:ss` */
export type EndsAt = string;
/** Specifies the name of a train's locomotive. */
export type LocoType = string;
/** Specifies the unique ID of a train. (independent from the train number) */
export type RunId = string;
/** Specifies the unique code of a timetable server. */
export type ServerCode = string;
/** Specifies the name of an origin station. */
export type StartStation = string;
/** Specifies when a train departs from it's origin. Format: `hh:mm:ss` */
export type StartsAt = string;
/** Specifies the length of a train in meters. */
export type TrainLength = number;
/** Specifies the name of a train or train series. */
export type TrainName = string;
/** Specifies the international train number of a train. */
export type TrainNoInternational = string;
/** Specifies the national train number of a train. */
export type TrainNoLocal = string;
/** Specifies the weight of a train in metric tonnes. */
export type TrainWeight = number;

/** Specifies information about a train in a timetable in the raw API format. */
export interface Raw extends Omit<Data, "timetable"> {
    continuesAs:          ContinuesAs;
    /** Specifies a list of timetable entries for this train in the raw API format. */
    timetable:            Timetable.Raw.List;
    trainNoInternational: TrainNoInternational;
}
export namespace Raw {
    /** Specifies a timetable in the raw API format. */
    export type List = Raw[];
}

/** Specifies a timetable entry for a train. */
export interface Timetable {
    /** Specifies when the train arrives at this point. */
    arrivalTime?: Timetable.ArrivalTime;
    /** Specifies when the train departs at this point. */
    departureTime: Timetable.DepartureTime;
    /** Specifies which train number is displayed for this train. */
    displayedTrainNumber: Timetable.DisplayedTrainNumber;
    /** Specifies the number of the line that the train will follow. */
    line: Timetable.Line;
    /** Specifies the maximum speed at this point. */
    maxSpeed: Timetable.MaxSpeed;
    /** Specifies at what distance this point will be passed. */
    kilometrage: Timetable.Kilometrage;
    /** Specifies the name of the dispatcher for this point. */
    nameForPerson: Timetable.NameForPerson;
    /** Specifies the name of this point. */
    nameOfPoint: Timetable.NameOfPoint;
    /**
     * Specifies at which platform the train will stop in Roman numerals.
     *
     * @example "VI"
     */
    platform?: Timetable.Platform;
    /** Specifies the unique ID of this point. */
    pointId: Timetable.PointId;
    /**
     * Specifies the radio channels required after this point.
     *
     * @example ["R1", "R4"]
     */
    radioChannels?: Timetable.RadioChannels;
    /** Specifies the category of the station. */
    stationCategory?: Timetable.StationCategory;
    /** Specifies the type of stop the train will make. */
    stopType: Timetable.StopType;
    /** Specifies the name of the dispatch station this point belongs to. */
    supervisedBy?: Timetable.SupervisedBy;
    /** Specifies the number of the track this train will stop at. */
    track?: Timetable.Track;
    /** Specifies the name of the train series. */
    trainType: Timetable.TrainType;
}
export namespace Timetable {
    /** Specifies when a train arrives at this point. */
    export type ArrivalTime = string;
    /** Specifies when a train departs at this point. */
    export type DepartureTime = string;
    /** Specifies which train number is displayed for a train. */
    export type DisplayedTrainNumber = string;
    /** Specifies the number of the line that a train will follow. */
    export type Line = number;
    /** Specifies a list of timetable entries for a train. */
    export type List = Timetable[];
    /** Specifies the maximum speed at a point. */
    export type MaxSpeed = number;
    /** Specifies at what distance a point will be passed. */
    export type Kilometrage = number;
    /** Specifies the name of the dispatcher for a point. */
    export type NameForPerson = string;
    /** Specifies the name of a point. */
    export type NameOfPoint = string;
    /**
     * Specifies at which platform a train will stop in Roman numerals.
     *
     * @example "VI"
     */
    export type Platform = string;
    /** Specifies the unique ID of a point. */
    export type PointId = string;
    /**
     * Specifies a radio channel.
     *
     * @example "R1"
     */
    export type RadioChannel = string;
    /**
     * Specifies the radio channels required after a point.
     *
     * @example ["R1", "R4"]
     */
    export type RadioChannels = RadioChannel[];
    /** Specifies the category of a station. */
    export type StationCategory = string;
    /** Specifies the type of stop a train will make. */
    export type StopType = "CommercialStop" | "NoncommercialStop" | "NoStopOver";
    /** Specifies the name of the dispatch station a point belongs to. */
    export type SupervisedBy = string;
    /** Specifies the number of the track a train will stop at. */
    export type Track = number;
    /** Specifies the name of a train series. */
    export type TrainType = string;
    /** Specifies a timetable entry for a train in the raw API format. */
    export interface Raw extends Omit<Timetable, "arrivalTime" | "platform" | "radioChannels" | "stationCategory" | "stopType" | "supervisedBy" | "track"> {
        /** Specifies when the train arrives at this point in the raw API format. */
        arrivalTime: Raw.ArrivalTime;
        /** Specifies at what distance this point will be passed **in kilometers** and in the raw API format. */
        mileage: Raw.Mileage;
        /**
         * Specifies at which platform the train will stop in Roman numerals in the raw API format.
         *
         * @example "VI"
         */
        platform: Raw.Platform;
        /**
         * Specifies the radio channels required after this point as a comma-separated string in the raw API format.
         *
         * @example "R1, R4"
         */
        radioChanels: Raw.RadioChannels;
        /** Specifies the category of the station in the raw API format. */
        stationCategory: Raw.StationCategory;
        /** Specifies the type of stop the train will make in the raw API format. */
        stopType: Raw.StopType;
        /** Specifies the name of the dispatch station this point belongs to in the raw API format. */
        supervisedBy: Raw.SupervisedBy;
        /** Specifies the number of the track this train will stop at in the raw API format. */
        track: Raw.Track;
    }
    export namespace Raw {
        /** Specifies when the train arrives at a point. */
        export type ArrivalTime = Timetable.ArrivalTime | null;
        /** Specifies a list of timetable entries for a train. */
        export type List = Raw[];
        /** Specifies at what distance a point will be passed **in kilometers**. */
        export type Mileage = number;
        /**
         * Specifies at which platform a train will stop in Roman numerals.
         *
         * @example "VI"
         */
        export type Platform = Timetable.Platform | null;
        /**
         * Specifies the radio channels required after a point as a comma-separated string.
         *
         * @example "R1, R4"
         */
        export type RadioChannels = string;
        /** Specifies the category of a station. */
        export type StationCategory = Timetable.StationCategory | null;
        /** Specifies the type of stop a train will make. */
        export type StopType = string;
        /** Specifies the name of the dispatch station a point belongs to. */
        export type SupervisedBy = Timetable.SupervisedBy | null;
        /** Specifies the number of the track a train will stop at. */
        export type Track = Timetable.Track | null;
    }
}
