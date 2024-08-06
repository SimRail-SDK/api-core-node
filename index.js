"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const HTTPS = require("https");
const Types = require("./types");
class Api {
    constructor(config) {
        this.config = config;
    }
    async getActiveServers() {
        const response = await this.jsonGetRequest(`${this.config.endpoints.liveData}/servers-open`);
        if (response.result !== true) {
            this.throwNoResultsError();
        }
        return (this.config.convertData === false ? response.data : this.convertServerData(response.data));
    }
    async getActiveStations(serverCode) {
        const response = await this.jsonGetRequest(`${this.config.endpoints.liveData}/stations-open?serverCode=${serverCode}`);
        if (response.result !== true) {
            this.throwNoResultsError();
        }
        return (this.config.convertData === false ? response.data : this.convertStationData(response.data));
    }
    async getActiveTrains(serverCode) {
        const response = await this.jsonGetRequest(`${this.config.endpoints.liveData}/trains-open?serverCode=${serverCode}`);
        if (response.result !== true) {
            this.throwNoResultsError();
        }
        return (this.config.convertData === false ? response.data : this.convertTrainData(response.data));
    }
    async getTimetable(serverCode, trainNoLocal) {
        let url = `${this.config.endpoints.timetable}/getAllTimetables?serverCode=${serverCode}`;
        if (trainNoLocal !== undefined) {
            url += `&train=${trainNoLocal}`;
        }
        const results = await this.jsonGetRequest(url);
        const timetable = (this.config.convertData === false ? results : this.convertTimetableData(results));
        if (trainNoLocal !== undefined) {
            const trainTimetable = timetable[0];
            if (trainTimetable === undefined) {
                this.throwNoResultsError();
            }
            return trainTimetable;
        }
        else {
            return timetable;
        }
    }
    decodeBody(json) {
        try {
            return JSON.parse(json);
        }
        catch (_) {
            throw exception("ResponseBodyDecodeError", "Couldn't decode response body!");
        }
    }
    convertDispatchedBy(raw) {
        const dispatchedBy = [];
        raw.forEach((row) => dispatchedBy.push({ serverCode: row.ServerCode, steamId: row.SteamId }));
        return dispatchedBy;
    }
    convertServerData(raw) {
        const servers = [];
        raw.forEach((server) => servers.push({
            id: server.id,
            isActive: server.IsActive,
            serverCode: server.ServerCode,
            serverName: server.ServerName,
            serverRegion: server.ServerRegion,
        }));
        return servers;
    }
    convertStationData(raw) {
        const stations = [];
        raw.forEach((station) => {
            let difficultyLevel = station.DifficultyLevel;
            if ([1, 2, 3, 4, 5].includes(difficultyLevel) !== true) {
                console.warn("UnknownDifficultiLevelWarning", `Difficulty level "${station.DifficultyLevel}" is unknown! Reverting to level "5".`);
                difficultyLevel = 5;
            }
            stations.push({
                additionalImage1URL: station.AdditionalImage1URL,
                additionalImage2URL: station.AdditionalImage2URL,
                difficultyLevel,
                dispatchedBy: this.convertDispatchedBy(station.DispatchedBy),
                id: station.id,
                latitude: station.Latititude,
                longitude: station.Longitude,
                mainImageURL: station.MainImageURL,
                name: station.Name,
                prefix: station.Prefix,
            });
        });
        return stations;
    }
    convertTimetableData(raw) {
        const timetable = [];
        raw.forEach((row) => {
            const data = {
                endStation: row.endStation,
                endsAt: row.endsAt,
                locoType: row.locoType,
                runId: row.runId,
                startStation: row.startStation,
                startsAt: row.startsAt,
                timetable: this.convertTimetableTimetableData(row.timetable),
                trainLength: row.trainLength,
                trainName: row.trainName,
                trainNoLocal: row.trainNoLocal,
                trainWeight: row.trainWeight,
            };
            if (row.continuesAs !== "") {
                data.continuesAs = row.continuesAs;
            }
            if (row.trainNoInternational !== "") {
                data.trainNoInternational = row.trainNoInternational;
            }
            timetable.push(data);
        });
        return timetable;
    }
    convertTimetableTimetableData(raw) {
        const timetable = [];
        raw.forEach((row) => {
            let stopType = row.stopType;
            if (["CommercialStop", "NoncommercialStop", "NoStopOver"].includes(stopType) !== true) {
                console.warn("UnknownStopTypeWarning", `Stop type "${stopType}" is unknown! Reverting to "NoStopOver".`);
                stopType = "NoStopOver";
            }
            const rawRadioChannels = row.radioChanels.replace(/ /g, "");
            let radioChannels = [];
            if (rawRadioChannels !== "") {
                radioChannels = rawRadioChannels.split(",");
            }
            const data = {
                departureTime: row.departureTime,
                displayedTrainNumber: row.displayedTrainNumber,
                line: row.line,
                maxSpeed: row.maxSpeed,
                kilometrage: row.mileage,
                nameForPerson: row.nameForPerson,
                nameOfPoint: row.nameOfPoint,
                pointId: row.pointId,
                stopType,
                trainType: row.trainType,
            };
            if (row.arrivalTime !== null) {
                data.arrivalTime = row.arrivalTime;
            }
            if (row.platform !== null) {
                data.platform = row.platform;
            }
            if (row.stationCategory !== null) {
                data.stationCategory = row.stationCategory;
            }
            if (row.supervisedBy !== null) {
                data.supervisedBy = row.supervisedBy;
            }
            if (row.track !== null) {
                data.track = row.track;
            }
            if (radioChannels.length > 0) {
                data.radioChannels = radioChannels;
            }
            timetable.push(data);
        });
        return timetable;
    }
    convertTrainData(raw) {
        const trains = [];
        raw.forEach((train) => {
            let type = train.Type;
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
    convertTrainTrainData(raw) {
        const data = {
            inBorderStationArea: raw.InBorderStationArea,
            latitude: raw.Latititute,
            longitude: raw.Longitute,
            vdDelayedTimetableIndex: raw.VDDelayedTimetableIndex,
            velocity: raw.Velocity,
        };
        if (raw.ControlledBySteamID !== null) {
            data.controlledBySteamId = raw.ControlledBySteamID;
        }
        if (raw.DistanceToSignalInFront !== null) {
            data.distanceToSignalInFront = raw.DistanceToSignalInFront;
        }
        if (raw.SignalInFront !== null) {
            data.signalInFront = raw.SignalInFront;
            data.signalInFrontSpeed = raw.SignalInFrontSpeed === Types.LiveData.VMAX_VALUE ? Types.LiveData.VMAX : raw.SignalInFrontSpeed;
        }
        return data;
    }
    async jsonGetRequest(url) {
        return new Promise((resolve, reject) => {
            HTTPS.get(url, (response) => {
                let rawData = "";
                response.on("data", (buffer) => rawData += buffer.toString());
                response.on("end", () => {
                    try {
                        resolve(this.decodeBody(rawData));
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            }).on("error", reject);
        });
    }
    throwNoResultsError() {
        throw exception("NoResultError", "The server didn't return any results!");
    }
}
exports.Api = Api;
(function (Api) {
    Api.VERSION = "0.1.2";
    Api.LiveData = Types.LiveData;
    Api.Timetable = Types.Timetable;
})(Api || (exports.Api = Api = {}));
exports.default = Api;
function exception(code, message) {
    const error = Error(message);
    error.name = code;
    return error;
}
//# sourceMappingURL=index.js.map