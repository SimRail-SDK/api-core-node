# SimRail Core API for Node.JS

This is a *Core API module* (community edition) for interacting with the SimRail APIs.

This *Core API module* just provides an interface with SimRail's remote APIs. If you are
looking for a more usable SDK module, check out:
- [`@simrail-sdk/api`](https://github.com/simrail-sdk/api "View on GitHub") if you need an SDK just for retrieving live data.
- [`@simrail-sdk/core`](https://github.com/simrail-sdk/core "View on GitHub") for a more developer-friendly SDK consuming only live data.
- [`@simrail-sdk/sdk`](https://github.com/simrail-sdk/sdk "View on GitHub") for a developer-friendly SDK providing extended data about the game. ***(upcoming)***

<br/>
<br/>


## Content index

- [Usage details][usage-details]

    - [Installation][installation]

    - [Examples][examples]

        - [Simple API usage][simple-api-usage]

        - [Disable data conversion][disable-data-conversion]

- [API reference][api-reference]

- [About this module][about-this-module]

    - [Module dependencies][module-dependencies]

        - [Module package dependencies][module-package-dependencies]

        - [Internal module dependencies][internal-module-dependencies]

    - [Module code statistics][module-code-statistics]
<br/>
<br/>


## [Usage details][usage-details]

[usage-details]: #usage-details "View Usage details"

### [Installation][installation]

[installation]: #installation "View Installation"

Using NPM:

`$ npm i @simrail-sdk/api-core-node`

or

`$ npm i github:simrail-sdk/api-core-node#VERSION`

Where `VERSION` specifies the version to install.
<br/>
<br/>


### [Examples][examples]

[examples]: #examples "View Examples"

#### [Simple API usage][simple-api-usage]

[simple-api-usage]: #simple-api-usage "View Simple API usage"

For regular usage you only need to construct the API class and provide
  it with the endpoint URLs for live data and the timetable.

**NOTE**: API SDK will do some simple conversion on data received from
  endpoints to fix typos and enable continuity with other SDK projects.
  To disable this functionality, please refer to the second example below.


```TypeScript
import Api from "@simrail-sdk/api-core-node";

const api = new Api({
    endpoints: {
        liveData: "https://panel.simrail.eu:8084",
        timetable: "https://api1.aws.simrail.eu:8082/api",
    },
});

api.getActiveServers().then(...);
// [
//     {
//         id: "638fec40d089346098624eb5",
//         isActive: true,
//         serverCode: "en1",
//         serverName: "EN1 (English)",
//         serverRegion: "Europe",
//     },
//     ...
// ]

api.getActiveStations("en1").then(...);
// [
//     {
//         additionalImage1URL: "https://api.simrail.eu:8083/Thumbnails/Stations/ko2.jpg",
//         additionalImage2URL: "https://api.simrail.eu:8083/Thumbnails/Stations/ko3.jpg",
//         difficultyLevel: 5,
//         dispatchedBy: [],
//         id: "644133f3858f72cc3d476e42",
//         latitude: 50.25686264038086,
//         longitude: 19.01921844482422,
//         mainImageURL: "https://api.simrail.eu:8083/Thumbnails/Stations/ko1m.jpg",
//         name: "Katowice",
//         prefix: "KO"
//     },
//     ...
// ]

api.getActiveTrains("en1").then(...);
// [
//     {
//         endStation: "Częstochowa",
//         id: "662f96b3766d379b4f3f525f",
//         runId: "73c0f0ea-20d9-4317-8339-8bc7d098bd35",
//         serverCode: "en1",
//         startStation: "Jaworzno Szczakowa",
//         trainData: {
//         inBorderStationArea: true,
//         latitude: 50.262142181396484,
//         longitude: 19.269641876220703,
//         vdDelayedTimetableIndex: 1,
//         velocity: 40,
//         distanceToSignalInFront: 386.6281433105469,
//         signalInFront: "SMA_G@7129,82510,8",
//         signalInFrontSpeed: 40
//         },
//         trainName: "PWJ",
//         trainNoLocal: "446004",
//         type: "bot",
//         vehicles: [ "EN57/EN57-1003", "EN57/EN57-614", "EN57/EN57-1755" ]
//     },
//     ...
// ]

api.getTimetable("en1").then(...);
api.getTimetable("en1", "446004").then(...);
// {
//     endStation: "Częstochowa",
//     endsAt: "03:53:00",
//     locoType: "EN57 (5B+6B+5B)",
//     runId: "73c0f0ea-20d9-4317-8339-8bc7d098bd35",
//     startStation: "Jaworzno Szczakowa",
//     startsAt: "02:15:00",
//     timetable: [
//       {
//         departureTime: "2024-08-05 02:15:00",
//         displayedTrainNumber: "446004",
//         line: 133,
//         maxSpeed: 100,
//         kilometrage: 15.81,
//         nameForPerson: "Jaworzno Szczakowa",
//         nameOfPoint: "Jaworzno Szczakowa",
//         pointId: "1472",
//         stopType: "NoStopOver",
//         trainType: "PWJ",
//         supervisedBy: "Jaworzno Szczakowa"
//       },
//       ...
//     ],
//     trainLength: 60,
//     trainName: "PWJ",
//     trainNoLocal: "446004",
//     trainWeight: 60
// }
```

<br/>
<br/>

#### [Disable data conversion][disable-data-conversion]

[disable-data-conversion]: #disable-data-conversion "View Disable data conversion"

Use option `convertData` to enable or disable result conversion. (default: `true`)


```TypeScript
import Api from "@simrail-sdk/api-core-node";

const endpoints: Api.Endpoints = {
    liveData: "https://panel.simrail.eu:8084",
    timetable: "https://api1.aws.simrail.eu:8082/api",
};

new Api({ convertData: false, endpoints }).getActiveStations("en1").then(...);
// [
//     {
//         AdditionalImage1URL: 'https://api.simrail.eu:8083/Thumbnails/Stations/ko2.jpg',
//         AdditionalImage2URL: 'https://api.simrail.eu:8083/Thumbnails/Stations/ko3.jpg',
//         DifficultyLevel: 5,
//         DispatchedBy: [],
//         id: '644133f3858f72cc3d476e42'
//         Latititude: 50.25686264038086,
//         Longitude: 19.01921844482422,
//         MainImageURL: 'https://api.simrail.eu:8083/Thumbnails/Stations/ko1m.jpg',
//         Name: 'Katowice',
//         Prefix: 'KO',
//     },
//     ...
// ]

new Api({ convertData: true, endpoints }).getActiveStations("en1").then(...);
// [
//     {
//         additionalImage1URL: "https://api.simrail.eu:8083/Thumbnails/Stations/ko2.jpg",
//         additionalImage2URL: "https://api.simrail.eu:8083/Thumbnails/Stations/ko3.jpg",
//         difficultyLevel: 5,
//         dispatchedBy: [],
//         id: "644133f3858f72cc3d476e42",
//         latitude: 50.25686264038086,
//         longitude: 19.01921844482422,
//         mainImageURL: "https://api.simrail.eu:8083/Thumbnails/Stations/ko1m.jpg",
//         name: "Katowice",
//         prefix: "KO"
//     },
//     ...
// ]
```

<br/>
<br/>
<br/>


## [API reference][api-reference]

[api-reference]: #api-reference "View API reference"

<span style="color: #ff3300;">**NOTE**</span>: The API reference section doesn't account for `namespace`s, this unfortunately means the documentation below is not entirely complete. Please investigate the TypeScript definition files for the full API.


- [`class Api`][api-reference-index.ts~Api]

    - [`new Api(config)`][api-reference-index.ts~Api.constructor0]

    - [`property Api.config`][api-reference-index.ts~Api.config]

    - [`method Api.getActiveServers()`][api-reference-index.ts~Api.getActiveServers0]

    - [`method Api.getActiveStations(serverCode)`][api-reference-index.ts~Api.getActiveStations0]

    - [`method Api.getActiveTrains(serverCode)`][api-reference-index.ts~Api.getActiveTrains0]

    - [`method Api.getTimetable(serverCode)`][api-reference-index.ts~Api.getTimetable0]

    - [`method Api.getTimetable(serverCode, trainNoLocal)`][api-reference-index.ts~Api.getTimetable1]

    - [`method Api.getTimetable(serverCode, trainNoLocal)`][api-reference-index.ts~Api.getTimetable2]

- [`const VERSION`][api-reference-index.ts~VERSION]

- [`const VMAX`][api-reference-types/liveData/index.ts~VMAX]

- [`const VMAX_VALUE`][api-reference-types/liveData/index.ts~VMAX_VALUE]

- [`interface Base`][api-reference-types/liveData/index.ts~Base]

    - [`property Base.result`][api-reference-types/liveData/index.ts~Base.result]

- [`interface Config`][api-reference-index.ts~Config]

    - [`property Config.convertData`][api-reference-index.ts~Config.convertData]

    - [`property Config.endpoints`][api-reference-index.ts~Config.endpoints]

- [`interface Data`][api-reference-types/timetable/index.ts~Data]

    - [`property Data.continuesAs`][api-reference-types/timetable/index.ts~Data.continuesAs]

    - [`property Data.endStation`][api-reference-types/timetable/index.ts~Data.endStation]

    - [`property Data.endsAt`][api-reference-types/timetable/index.ts~Data.endsAt]

    - [`property Data.locoType`][api-reference-types/timetable/index.ts~Data.locoType]

    - [`property Data.runId`][api-reference-types/timetable/index.ts~Data.runId]

    - [`property Data.startStation`][api-reference-types/timetable/index.ts~Data.startStation]

    - [`property Data.startsAt`][api-reference-types/timetable/index.ts~Data.startsAt]

    - [`property Data.timetable`][api-reference-types/timetable/index.ts~Data.timetable]

    - [`property Data.trainLength`][api-reference-types/timetable/index.ts~Data.trainLength]

    - [`property Data.trainName`][api-reference-types/timetable/index.ts~Data.trainName]

    - [`property Data.trainNoInternational`][api-reference-types/timetable/index.ts~Data.trainNoInternational]

    - [`property Data.trainNoLocal`][api-reference-types/timetable/index.ts~Data.trainNoLocal]

    - [`property Data.trainWeight`][api-reference-types/timetable/index.ts~Data.trainWeight]

- [`interface DispatchedBy`][api-reference-types/liveData/index.ts~DispatchedBy]

    - [`property DispatchedBy.ServerCode`][api-reference-types/liveData/index.ts~DispatchedBy.ServerCode]

    - [`property DispatchedBy.SteamId`][api-reference-types/liveData/index.ts~DispatchedBy.SteamId]

- [`interface Endpoints`][api-reference-index.ts~Endpoints]

    - [`property Endpoints.liveData`][api-reference-index.ts~Endpoints.liveData]

    - [`property Endpoints.timetable`][api-reference-index.ts~Endpoints.timetable]

- [`interface Error`][api-reference-types/liveData/index.ts~Error]

- [`interface Raw`][api-reference-types/timetable/index.ts~Raw]

    - [`property Raw.arrivalTime`][api-reference-types/timetable/index.ts~Raw.arrivalTime]

    - [`property Raw.mileage`][api-reference-types/timetable/index.ts~Raw.mileage]

    - [`property Raw.platform`][api-reference-types/timetable/index.ts~Raw.platform]

    - [`property Raw.radioChanels`][api-reference-types/timetable/index.ts~Raw.radioChanels]

    - [`property Raw.stationCategory`][api-reference-types/timetable/index.ts~Raw.stationCategory]

    - [`property Raw.stopType`][api-reference-types/timetable/index.ts~Raw.stopType]

    - [`property Raw.supervisedBy`][api-reference-types/timetable/index.ts~Raw.supervisedBy]

    - [`property Raw.track`][api-reference-types/timetable/index.ts~Raw.track]

- [`interface Server`][api-reference-types/liveData/index.ts~Server]

    - [`property Server.id`][api-reference-types/liveData/index.ts~Server.id]

    - [`property Server.isActive`][api-reference-types/liveData/index.ts~Server.isActive]

    - [`property Server.serverCode`][api-reference-types/liveData/index.ts~Server.serverCode]

    - [`property Server.serverName`][api-reference-types/liveData/index.ts~Server.serverName]

    - [`property Server.serverRegion`][api-reference-types/liveData/index.ts~Server.serverRegion]

- [`interface Station`][api-reference-types/liveData/index.ts~Station]

    - [`property Station.additionalImage1URL`][api-reference-types/liveData/index.ts~Station.additionalImage1URL]

    - [`property Station.additionalImage2URL`][api-reference-types/liveData/index.ts~Station.additionalImage2URL]

    - [`property Station.difficultyLevel`][api-reference-types/liveData/index.ts~Station.difficultyLevel]

    - [`property Station.dispatchedBy`][api-reference-types/liveData/index.ts~Station.dispatchedBy]

    - [`property Station.id`][api-reference-types/liveData/index.ts~Station.id]

    - [`property Station.latitude`][api-reference-types/liveData/index.ts~Station.latitude]

    - [`property Station.longitude`][api-reference-types/liveData/index.ts~Station.longitude]

    - [`property Station.mainImageURL`][api-reference-types/liveData/index.ts~Station.mainImageURL]

    - [`property Station.name`][api-reference-types/liveData/index.ts~Station.name]

    - [`property Station.prefix`][api-reference-types/liveData/index.ts~Station.prefix]

- [`interface Successful`][api-reference-types/liveData/index.ts~Successful]

    - [`property Successful.count`][api-reference-types/liveData/index.ts~Successful.count]

    - [`property Successful.data`][api-reference-types/liveData/index.ts~Successful.data]

    - [`property Successful.description`][api-reference-types/liveData/index.ts~Successful.description]

- [`interface Timetable`][api-reference-types/timetable/index.ts~Timetable]

    - [`property Timetable.arrivalTime`][api-reference-types/timetable/index.ts~Timetable.arrivalTime]

    - [`property Timetable.departureTime`][api-reference-types/timetable/index.ts~Timetable.departureTime]

    - [`property Timetable.displayedTrainNumber`][api-reference-types/timetable/index.ts~Timetable.displayedTrainNumber]

    - [`property Timetable.kilometrage`][api-reference-types/timetable/index.ts~Timetable.kilometrage]

    - [`property Timetable.line`][api-reference-types/timetable/index.ts~Timetable.line]

    - [`property Timetable.maxSpeed`][api-reference-types/timetable/index.ts~Timetable.maxSpeed]

    - [`property Timetable.nameForPerson`][api-reference-types/timetable/index.ts~Timetable.nameForPerson]

    - [`property Timetable.nameOfPoint`][api-reference-types/timetable/index.ts~Timetable.nameOfPoint]

    - [`property Timetable.platform`][api-reference-types/timetable/index.ts~Timetable.platform]

    - [`property Timetable.pointId`][api-reference-types/timetable/index.ts~Timetable.pointId]

    - [`property Timetable.radioChannels`][api-reference-types/timetable/index.ts~Timetable.radioChannels]

    - [`property Timetable.stationCategory`][api-reference-types/timetable/index.ts~Timetable.stationCategory]

    - [`property Timetable.stopType`][api-reference-types/timetable/index.ts~Timetable.stopType]

    - [`property Timetable.supervisedBy`][api-reference-types/timetable/index.ts~Timetable.supervisedBy]

    - [`property Timetable.track`][api-reference-types/timetable/index.ts~Timetable.track]

    - [`property Timetable.trainType`][api-reference-types/timetable/index.ts~Timetable.trainType]

- [`interface Train`][api-reference-types/liveData/index.ts~Train]

    - [`property Train.endStation`][api-reference-types/liveData/index.ts~Train.endStation]

    - [`property Train.id`][api-reference-types/liveData/index.ts~Train.id]

    - [`property Train.runId`][api-reference-types/liveData/index.ts~Train.runId]

    - [`property Train.serverCode`][api-reference-types/liveData/index.ts~Train.serverCode]

    - [`property Train.startStation`][api-reference-types/liveData/index.ts~Train.startStation]

    - [`property Train.trainData`][api-reference-types/liveData/index.ts~Train.trainData]

    - [`property Train.trainName`][api-reference-types/liveData/index.ts~Train.trainName]

    - [`property Train.trainNoLocal`][api-reference-types/liveData/index.ts~Train.trainNoLocal]

    - [`property Train.type`][api-reference-types/liveData/index.ts~Train.type]

    - [`property Train.vehicles`][api-reference-types/liveData/index.ts~Train.vehicles]

- [`interface TrainData`][api-reference-types/liveData/index.ts~TrainData]

    - [`property TrainData.controlledBySteamId`][api-reference-types/liveData/index.ts~TrainData.controlledBySteamId]

    - [`property TrainData.distanceToSignalInFront`][api-reference-types/liveData/index.ts~TrainData.distanceToSignalInFront]

    - [`property TrainData.inBorderStationArea`][api-reference-types/liveData/index.ts~TrainData.inBorderStationArea]

    - [`property TrainData.latitude`][api-reference-types/liveData/index.ts~TrainData.latitude]

    - [`property TrainData.longitude`][api-reference-types/liveData/index.ts~TrainData.longitude]

    - [`property TrainData.signalInFront`][api-reference-types/liveData/index.ts~TrainData.signalInFront]

    - [`property TrainData.signalInFrontSpeed`][api-reference-types/liveData/index.ts~TrainData.signalInFrontSpeed]

    - [`property TrainData.vdDelayedTimetableIndex`][api-reference-types/liveData/index.ts~TrainData.vdDelayedTimetableIndex]

    - [`property TrainData.velocity`][api-reference-types/liveData/index.ts~TrainData.velocity]

- [`type ApiResponse`][api-reference-types/liveData/index.ts~ApiResponse]

- [`type ArrivalTime`][api-reference-types/timetable/index.ts~ArrivalTime]

- [`type ContinuesAs`][api-reference-types/timetable/index.ts~ContinuesAs]

- [`type ControlledBySteamId`][api-reference-types/liveData/index.ts~ControlledBySteamId]

- [`type ConvertData`][api-reference-index.ts~ConvertData]

- [`type Count`][api-reference-types/liveData/index.ts~Count]

- [`type DepartureTime`][api-reference-types/timetable/index.ts~DepartureTime]

- [`type Description`][api-reference-types/liveData/index.ts~Description]

- [`type DifficultyLevel`][api-reference-types/liveData/index.ts~DifficultyLevel]

- [`type DisplayedTrainNumber`][api-reference-types/timetable/index.ts~DisplayedTrainNumber]

- [`type DistanceToSignalInFront`][api-reference-types/liveData/index.ts~DistanceToSignalInFront]

- [`type EndsAt`][api-reference-types/timetable/index.ts~EndsAt]

- [`type EndStation`][api-reference-types/timetable/index.ts~EndStation]

- [`type Id`][api-reference-types/liveData/index.ts~Id]

- [`type ImageUrl`][api-reference-types/liveData/index.ts~ImageUrl]

- [`type InBorderStationArea`][api-reference-types/liveData/index.ts~InBorderStationArea]

- [`type IsActive`][api-reference-types/liveData/index.ts~IsActive]

- [`type Kilometrage`][api-reference-types/timetable/index.ts~Kilometrage]

- [`type Latititude`][api-reference-types/liveData/index.ts~Latititude]

- [`type Latititute`][api-reference-types/liveData/index.ts~Latititute]

- [`type Latitude`][api-reference-types/liveData/index.ts~Latitude]

- [`type Line`][api-reference-types/timetable/index.ts~Line]

- [`type List`][api-reference-types/timetable/index.ts~List]

- [`type LocoType`][api-reference-types/timetable/index.ts~LocoType]

- [`type Longitude`][api-reference-types/liveData/index.ts~Longitude]

- [`type Longitute`][api-reference-types/liveData/index.ts~Longitute]

- [`type MaxSpeed`][api-reference-types/timetable/index.ts~MaxSpeed]

- [`type Mileage`][api-reference-types/timetable/index.ts~Mileage]

- [`type Name`][api-reference-types/liveData/index.ts~Name]

- [`type NameForPerson`][api-reference-types/timetable/index.ts~NameForPerson]

- [`type NameOfPoint`][api-reference-types/timetable/index.ts~NameOfPoint]

- [`type Platform`][api-reference-types/timetable/index.ts~Platform]

- [`type PointId`][api-reference-types/timetable/index.ts~PointId]

- [`type Prefix`][api-reference-types/liveData/index.ts~Prefix]

- [`type RadioChannel`][api-reference-types/timetable/index.ts~RadioChannel]

- [`type RadioChannels`][api-reference-types/timetable/index.ts~RadioChannels]

- [`type Result`][api-reference-types/liveData/index.ts~Result]

- [`type RunId`][api-reference-types/timetable/index.ts~RunId]

- [`type ServerCode`][api-reference-types/timetable/index.ts~ServerCode]

- [`type ServerName`][api-reference-types/liveData/index.ts~ServerName]

- [`type ServerRegion`][api-reference-types/liveData/index.ts~ServerRegion]

- [`type SignalInFront`][api-reference-types/liveData/index.ts~SignalInFront]

- [`type SignalInFrontSpeed`][api-reference-types/liveData/index.ts~SignalInFrontSpeed]

- [`type StartsAt`][api-reference-types/timetable/index.ts~StartsAt]

- [`type StartStation`][api-reference-types/timetable/index.ts~StartStation]

- [`type StationCategory`][api-reference-types/timetable/index.ts~StationCategory]

- [`type SteamId`][api-reference-types/liveData/index.ts~SteamId]

- [`type StopType`][api-reference-types/timetable/index.ts~StopType]

- [`type SupervisedBy`][api-reference-types/timetable/index.ts~SupervisedBy]

- [`type Track`][api-reference-types/timetable/index.ts~Track]

- [`type TrainLength`][api-reference-types/timetable/index.ts~TrainLength]

- [`type TrainName`][api-reference-types/timetable/index.ts~TrainName]

- [`type TrainNoInternational`][api-reference-types/timetable/index.ts~TrainNoInternational]

- [`type TrainNoLocal`][api-reference-types/timetable/index.ts~TrainNoLocal]

- [`type TrainType`][api-reference-types/timetable/index.ts~TrainType]

- [`type TrainWeight`][api-reference-types/timetable/index.ts~TrainWeight]

- [`type Type`][api-reference-types/liveData/index.ts~Type]

- [`type Url`][api-reference-index.ts~Url]

- [`type VdDelayedTimetableIndex`][api-reference-types/liveData/index.ts~VdDelayedTimetableIndex]

- [`type Vehicle`][api-reference-types/liveData/index.ts~Vehicle]

- [`type Vehicles`][api-reference-types/liveData/index.ts~Vehicles]

- [`type Velocity`][api-reference-types/liveData/index.ts~Velocity]

- [`type Version`][api-reference-index.ts~Version]

<br/>
<br/>
<br/>

[api-reference-@simrail-sdk/api-core-node]: @simrail-sdk/api-core-node "View module \"@simrail-sdk/api-core-node\""
[api-reference-index]: index "View module \"index\""
[api-reference-index.d.ts]: index.d.ts "View module \"index.d.ts\""
[api-reference-types/liveData/index.ts]: types/liveData/index.ts "View module \"types/liveData/index.ts\""
[api-reference-types/timetable/index.ts]: types/timetable/index.ts "View module \"types/timetable/index.ts\""
[api-reference-index.ts]: index.ts "View module \"index.ts\""
[api-reference-types]: types "View module \"types\""
[api-reference-types/liveData]: types/liveData "View module \"types/liveData\""
[api-reference-types/liveData/index.d.ts]: types/liveData/index.d.ts "View module \"types/liveData/index.d.ts\""
[api-reference-types/timetable]: types/timetable "View module \"types/timetable\""
[api-reference-types/timetable/index.d.ts]: types/timetable/index.d.ts "View module \"types/timetable/index.d.ts\""

### [`class Api`][api-reference-index.ts~Api]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Api]: #class-api&nbsp;&nbsp;&nbsp;&uarr; "View class Api"

Specifies an API class instance for interacting with SimRail's remote API.

| Type params: | *Extends* | *Optional* | *Default* | *Description* |
| ------------ | --------- | ---------- | --------- | ------------- |
| `ConvertData` | <code><u>[`Api.ConvertData`][api-reference-index.ts~ConvertData]</u></code> | Yes | <code>`true`</code> | Specifies if responses are converted or if the raw API response is returned. (default: `true`) |

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:30][api-reference-index.ts]

<br/>
<br/>

#### [`new Api(config)`][api-reference-index.ts~Api.constructor0]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Api.constructor0]: #new-apiconfig&nbsp;&nbsp;&nbsp;&uarr; "View new Api()"

| Type params: | *Extends* | *Optional* | *Default* |
| ------------ | --------- | ---------- | --------- |
| `ConvertData` | <code>`boolean`</code> | Yes | <code>`true`</code> |

| Arguments: | *Type* |
| ---------- | ------ |
| `config` | <code><u>[`Config`][api-reference-index.ts~Config]</u>&#60;`ConvertData`&#62;</code> |

**Returns**:&nbsp;&nbsp;<code><u>[`Api`][api-reference-index.ts~Api]</u>&#60;`ConvertData`&#62;</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:35][api-reference-index.ts]

<br/>

<br/>

#### [`property Api.config`][api-reference-index.ts~Api.config]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Api.config]: #property-apiconfig&nbsp;&nbsp;&nbsp;&uarr; "View property Api.config"

<kbd>read-only</kbd>

Specifies the configuration of the API.

**Type**:&nbsp;&nbsp;<code><u>[`Config`][api-reference-index.ts~Config]</u>&#60;`ConvertData`&#62;</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:33][api-reference-index.ts]

<br/>

<br/>

#### [`method Api.getActiveServers()`][api-reference-index.ts~Api.getActiveServers0]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Api.getActiveServers0]: #method-apigetactiveservers&nbsp;&nbsp;&nbsp;&uarr; "View method Api.getActiveServers()"

Method to retrieve servers from the live data endpoint.

**Returns**:&nbsp;&nbsp;<code><abbr title='Declared in package "typescript"'>`Promise`</abbr>&#60;`ConvertData` extends `true` ? <u>Array<[`Server`][api-reference-types/liveData/index.ts~Server]></u> : <u>Array<Server.Raw></u>&#62;</code>&nbsp;&nbsp;- A list of multiplayer servers.

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:44][api-reference-index.ts]

<br/>

<br/>

#### [`method Api.getActiveStations(serverCode)`][api-reference-index.ts~Api.getActiveStations0]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Api.getActiveStations0]: #method-apigetactivestationsservercode&nbsp;&nbsp;&nbsp;&uarr; "View method Api.getActiveStations()"

Method to retrieve active dispatch stations from the live data endpoint.

| Arguments: | *Type* | *Description* |
| ---------- | ------ | ------------- |
| `serverCode` | <code>`string`</code> | The unique code of the multiplayer server. |

**Returns**:&nbsp;&nbsp;<code><abbr title='Declared in package "typescript"'>`Promise`</abbr>&#60;`ConvertData` extends `true` ? <u>Array<[`Station`][api-reference-types/liveData/index.ts~Station]></u> : <u>Array<Station.Raw></u>&#62;</code>&nbsp;&nbsp;- A list of active dispatch stations.

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:57][api-reference-index.ts]

<br/>

<br/>

#### [`method Api.getActiveTrains(serverCode)`][api-reference-index.ts~Api.getActiveTrains0]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Api.getActiveTrains0]: #method-apigetactivetrainsservercode&nbsp;&nbsp;&nbsp;&uarr; "View method Api.getActiveTrains()"

Method to retrieve active trains from the live data endpoint.

| Arguments: | *Type* | *Description* |
| ---------- | ------ | ------------- |
| `serverCode` | <code>`string`</code> | The unique code of the multiplayer server. |

**Returns**:&nbsp;&nbsp;<code><abbr title='Declared in package "typescript"'>`Promise`</abbr>&#60;`ConvertData` extends `true` ? <u>Array<[`Train`][api-reference-types/liveData/index.ts~Train]></u> : <u>Array<Train.Raw></u>&#62;</code>&nbsp;&nbsp;- A list of active trains.

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:70][api-reference-index.ts]

<br/>

<br/>

#### [`method Api.getTimetable(serverCode)`][api-reference-index.ts~Api.getTimetable0]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Api.getTimetable0]: #method-apigettimetableservercode&nbsp;&nbsp;&nbsp;&uarr; "View method Api.getTimetable()"

Method to retrieve timetable data from the timetable endpoint.

| Arguments: | *Type* | *Description* |
| ---------- | ------ | ------------- |
| `serverCode` | <code>`string`</code> | The unique code of the multiplayer server. |

**Returns**:&nbsp;&nbsp;<code><abbr title='Declared in package "typescript"'>`Promise`</abbr>&#60;`ConvertData` extends `true` ? <u>Array<[`Timetable`][api-reference-types/liveData/index.ts~Timetable]></u> : <u>Array<Timetable.Raw></u>&#62;</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:83][api-reference-index.ts]

<br/>

<br/>

#### [`method Api.getTimetable(serverCode, trainNoLocal)`][api-reference-index.ts~Api.getTimetable1]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Api.getTimetable1]: #method-apigettimetableservercode-trainnolocal&nbsp;&nbsp;&nbsp;&uarr; "View method Api.getTimetable()"

Method to retrieve timetable data from the timetable endpoint.

| Arguments: | *Type* | *Description* |
| ---------- | ------ | ------------- |
| `serverCode` | <code>`string`</code> | The unique code of the multiplayer server. |
| `trainNoLocal` | <code>`string`</code> | The national train number of a train. If left `undefined`, this function will return data for all trains in the timetable. |

**Returns**:&nbsp;&nbsp;<code><abbr title='Declared in package "typescript"'>`Promise`</abbr>&#60;`ConvertData` extends `true` ? <u>[`Data`][api-reference-types/timetable/index.ts~Data]</u> : <u>[`Raw`][api-reference-types/timetable/index.ts~Raw]</u>&#62;</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:83][api-reference-index.ts]

<br/>

<br/>

#### [`method Api.getTimetable(serverCode, trainNoLocal)`][api-reference-index.ts~Api.getTimetable2]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Api.getTimetable2]: #method-apigettimetableservercode-trainnolocal&nbsp;&nbsp;&nbsp;&uarr; "View method Api.getTimetable()"

Method to retrieve timetable data from the timetable endpoint.

| Arguments: | *Type* | *Optional* | *Description* |
| ---------- | ------ | ---------- | ------------- |
| `serverCode` | <code>`string`</code> | No | The unique code of the multiplayer server. |
| `trainNoLocal` | <code>`string`</code> | Yes | The national train number of a train. If left `undefined`, this function will return data for all trains in the timetable. |

**Returns**:&nbsp;&nbsp;<code><abbr title='Declared in package "typescript"'>`Promise`</abbr>&#60;`ConvertData` extends `false` ? (<u>[`Raw`][api-reference-types/timetable/index.ts~Raw]</u> &#124; <u>[`List`][api-reference-types/timetable/index.ts~List]</u>) : (<u>[`Data`][api-reference-types/timetable/index.ts~Data]</u> &#124; <u>[`List`][api-reference-types/timetable/index.ts~List]</u>)&#62;</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:83][api-reference-index.ts]

<br/>

<br/>

<br/>

### [`const VERSION`][api-reference-index.ts~VERSION]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~VERSION]: #const-version&nbsp;&nbsp;&nbsp;&uarr; "View const VERSION"

Specifies the version of the API.

**Type**:&nbsp;&nbsp;<code><u>[`Version`][api-reference-index.ts~Version]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:277][api-reference-index.ts]

<br/>
<br/>

<br/>

### [`const VMAX`][api-reference-types/liveData/index.ts~VMAX]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~VMAX]: #const-vmax&nbsp;&nbsp;&nbsp;&uarr; "View const VMAX"

Specifies the maximum allowable operating speed. (**Vmax**)

**Type**:&nbsp;&nbsp;<code>`"vmax"`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:15][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`const VMAX_VALUE`][api-reference-types/liveData/index.ts~VMAX_VALUE]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~VMAX_VALUE]: #const-vmax_value&nbsp;&nbsp;&nbsp;&uarr; "View const VMAX_VALUE"

Specifies the "speed" value that will indicate `"vmax"`.

**Type**:&nbsp;&nbsp;<code>`32767`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:18][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`interface Base`][api-reference-types/liveData/index.ts~Base]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Base]: #interface-base&nbsp;&nbsp;&nbsp;&uarr; "View interface Base"

| Type params: | *Extends* |
| ------------ | --------- |
| `ResponseResult` | <code><u>[`Result`][api-reference-types/liveData/index.ts~Result]</u></code> |

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:30][api-reference-types/liveData/index.ts]

<br/>
<br/>

#### [`property Base.result`][api-reference-types/liveData/index.ts~Base.result]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Base.result]: #property-baseresult&nbsp;&nbsp;&nbsp;&uarr; "View property Base.result"

Specifies if the request succeeded.

**Type**:&nbsp;&nbsp;<code>`ResponseResult`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:32][api-reference-types/liveData/index.ts]

<br/>

<br/>

<br/>

### [`interface Config`][api-reference-index.ts~Config]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Config]: #interface-config&nbsp;&nbsp;&nbsp;&uarr; "View interface Config"

Specifies the configuration of the API.

| Type params: | *Extends* | *Description* |
| ------------ | --------- | ------------- |
| `ApiConvertData` | <code><u>[`ConvertData`][api-reference-index.ts~ConvertData]</u></code> | Specifies if responses are converted or if the raw API response is returned. |

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:289][api-reference-index.ts]

<br/>
<br/>

#### [`property Config.convertData`][api-reference-index.ts~Config.convertData]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Config.convertData]: #property-configconvertdata&nbsp;&nbsp;&nbsp;&uarr; "View property Config.convertData"

<kbd>read-only</kbd> <kbd>optional</kbd>

Specifies if responses are converted or if the raw API response is returned.

**Type**:&nbsp;&nbsp;<code>`ApiConvertData`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:295][api-reference-index.ts]

<br/>

<br/>

#### [`property Config.endpoints`][api-reference-index.ts~Config.endpoints]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Config.endpoints]: #property-configendpoints&nbsp;&nbsp;&nbsp;&uarr; "View property Config.endpoints"

<kbd>read-only</kbd>

Specifies the configuration for API endpoints.

**Type**:&nbsp;&nbsp;<code><u>[`Endpoints`][api-reference-index.ts~Endpoints]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:297][api-reference-index.ts]

<br/>

<br/>

<br/>

### [`interface Data`][api-reference-types/timetable/index.ts~Data]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data]: #interface-data&nbsp;&nbsp;&nbsp;&uarr; "View interface Data"

Specifies information about a train in a timetable.

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:15][api-reference-types/timetable/index.ts]

<br/>
<br/>

#### [`property Data.continuesAs`][api-reference-types/timetable/index.ts~Data.continuesAs]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data.continuesAs]: #property-datacontinuesas&nbsp;&nbsp;&nbsp;&uarr; "View property Data.continuesAs"

<kbd>optional</kbd>

Specifies under which train number the train will continue.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:17][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Data.endStation`][api-reference-types/timetable/index.ts~Data.endStation]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data.endStation]: #property-dataendstation&nbsp;&nbsp;&nbsp;&uarr; "View property Data.endStation"

Specifies the name of the destination station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:19][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Data.endsAt`][api-reference-types/timetable/index.ts~Data.endsAt]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data.endsAt]: #property-dataendsat&nbsp;&nbsp;&nbsp;&uarr; "View property Data.endsAt"

Specifies when the train arrives at it's destination. Format: `hh:mm:ss`

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:21][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Data.locoType`][api-reference-types/timetable/index.ts~Data.locoType]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data.locoType]: #property-datalocotype&nbsp;&nbsp;&nbsp;&uarr; "View property Data.locoType"

Specifies the name of the train's locomotive.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:23][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Data.runId`][api-reference-types/timetable/index.ts~Data.runId]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data.runId]: #property-datarunid&nbsp;&nbsp;&nbsp;&uarr; "View property Data.runId"

Specifies the unique ID of the train. (independent from the train number)

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:25][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Data.startStation`][api-reference-types/timetable/index.ts~Data.startStation]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data.startStation]: #property-datastartstation&nbsp;&nbsp;&nbsp;&uarr; "View property Data.startStation"

Specifies the name of the origin station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:27][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Data.startsAt`][api-reference-types/timetable/index.ts~Data.startsAt]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data.startsAt]: #property-datastartsat&nbsp;&nbsp;&nbsp;&uarr; "View property Data.startsAt"

Specifies when the train departs from it's origin. Format: `hh:mm:ss`

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:29][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Data.timetable`][api-reference-types/timetable/index.ts~Data.timetable]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data.timetable]: #property-datatimetable&nbsp;&nbsp;&nbsp;&uarr; "View property Data.timetable"

Specifies a list of timetable entries for this train.

**Type**:&nbsp;&nbsp;<code><u>[`List`][api-reference-types/timetable/index.ts~List]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:31][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Data.trainLength`][api-reference-types/timetable/index.ts~Data.trainLength]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data.trainLength]: #property-datatrainlength&nbsp;&nbsp;&nbsp;&uarr; "View property Data.trainLength"

Specifies the length of the train in meters.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:33][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Data.trainName`][api-reference-types/timetable/index.ts~Data.trainName]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data.trainName]: #property-datatrainname&nbsp;&nbsp;&nbsp;&uarr; "View property Data.trainName"

Specifies the name of the train or train series.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:35][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Data.trainNoInternational`][api-reference-types/timetable/index.ts~Data.trainNoInternational]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data.trainNoInternational]: #property-datatrainnointernational&nbsp;&nbsp;&nbsp;&uarr; "View property Data.trainNoInternational"

<kbd>optional</kbd>

Specifies the international train number of this train.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:37][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Data.trainNoLocal`][api-reference-types/timetable/index.ts~Data.trainNoLocal]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data.trainNoLocal]: #property-datatrainnolocal&nbsp;&nbsp;&nbsp;&uarr; "View property Data.trainNoLocal"

Specifies the national train number of this train.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:39][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Data.trainWeight`][api-reference-types/timetable/index.ts~Data.trainWeight]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Data.trainWeight]: #property-datatrainweight&nbsp;&nbsp;&nbsp;&uarr; "View property Data.trainWeight"

Specifies the weight of this train in metric tonnes.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:41][api-reference-types/timetable/index.ts]

<br/>

<br/>

<br/>

### [`interface DispatchedBy`][api-reference-types/liveData/index.ts~DispatchedBy]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~DispatchedBy]: #interface-dispatchedby&nbsp;&nbsp;&nbsp;&uarr; "View interface DispatchedBy"

Specifies a player dispatching at a station in the raw API format.

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:196][api-reference-types/liveData/index.ts]

<br/>
<br/>

#### [`property DispatchedBy.ServerCode`][api-reference-types/liveData/index.ts~DispatchedBy.ServerCode]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~DispatchedBy.ServerCode]: #property-dispatchedbyservercode&nbsp;&nbsp;&nbsp;&uarr; "View property DispatchedBy.ServerCode"

Specifies the unique code of the server the player is using in the raw API format.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:198][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property DispatchedBy.SteamId`][api-reference-types/liveData/index.ts~DispatchedBy.SteamId]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~DispatchedBy.SteamId]: #property-dispatchedbysteamid&nbsp;&nbsp;&nbsp;&uarr; "View property DispatchedBy.SteamId"

Specifies the Steam ID of the player in the raw API format.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:200][api-reference-types/liveData/index.ts]

<br/>

<br/>

<br/>

### [`interface Endpoints`][api-reference-index.ts~Endpoints]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Endpoints]: #interface-endpoints&nbsp;&nbsp;&nbsp;&uarr; "View interface Endpoints"

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:303][api-reference-index.ts]

<br/>
<br/>

#### [`property Endpoints.liveData`][api-reference-index.ts~Endpoints.liveData]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Endpoints.liveData]: #property-endpointslivedata&nbsp;&nbsp;&nbsp;&uarr; "View property Endpoints.liveData"

<kbd>read-only</kbd>

Specifies the URL for the live data API endpoint.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:305][api-reference-index.ts]

<br/>

<br/>

#### [`property Endpoints.timetable`][api-reference-index.ts~Endpoints.timetable]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Endpoints.timetable]: #property-endpointstimetable&nbsp;&nbsp;&nbsp;&uarr; "View property Endpoints.timetable"

<kbd>read-only</kbd>

Specifies the URL for the timetable API endpoint.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:307][api-reference-index.ts]

<br/>

<br/>

<br/>

### [`interface Error`][api-reference-types/liveData/index.ts~Error]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Error]: #interface-error&nbsp;&nbsp;&nbsp;&uarr; "View interface Error"

Specifies a response for a failed request.

**Extends**:&nbsp;&nbsp;<u>[`Base`][api-reference-types/liveData/index.ts~Base]</u>&#60;`false`&#62;

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:39][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`interface Raw`][api-reference-types/timetable/index.ts~Raw]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Raw]: #interface-raw&nbsp;&nbsp;&nbsp;&uarr; "View interface Raw"

Specifies a timetable entry for a train in the raw API format.

**Extends**:&nbsp;&nbsp;<abbr title='Declared in package "typescript"'>`Omit`</abbr>&#60;<u>[`Timetable`][api-reference-types/timetable/index.ts~Timetable]</u> &#124; `"arrivalTime"` &#124; `"platform"` &#124; `"radioChannels"` &#124; `"stationCategory"` &#124; `"stopType"` &#124; `"supervisedBy"` &#124; `"track"`&#62;

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:180][api-reference-types/timetable/index.ts]

<br/>
<br/>

#### [`property Raw.arrivalTime`][api-reference-types/timetable/index.ts~Raw.arrivalTime]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Raw.arrivalTime]: #property-rawarrivaltime&nbsp;&nbsp;&nbsp;&uarr; "View property Raw.arrivalTime"

Specifies when the train arrives at this point in the raw API format.

**Type**:&nbsp;&nbsp;<code><u>[`ArrivalTime`][api-reference-types/timetable/index.ts~ArrivalTime]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:182][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Raw.mileage`][api-reference-types/timetable/index.ts~Raw.mileage]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Raw.mileage]: #property-rawmileage&nbsp;&nbsp;&nbsp;&uarr; "View property Raw.mileage"

Specifies at what distance this point will be passed **in kilometers** and in the raw API format.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:184][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Raw.platform`][api-reference-types/timetable/index.ts~Raw.platform]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Raw.platform]: #property-rawplatform&nbsp;&nbsp;&nbsp;&uarr; "View property Raw.platform"

Specifies at which platform the train will stop in Roman numerals in the raw API format.

**Type**:&nbsp;&nbsp;<code><u>[`Platform`][api-reference-types/timetable/index.ts~Platform]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:190][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Raw.radioChanels`][api-reference-types/timetable/index.ts~Raw.radioChanels]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Raw.radioChanels]: #property-rawradiochanels&nbsp;&nbsp;&nbsp;&uarr; "View property Raw.radioChanels"

Specifies the radio channels required after this point as a comma-separated string in the raw API format.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:196][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Raw.stationCategory`][api-reference-types/timetable/index.ts~Raw.stationCategory]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Raw.stationCategory]: #property-rawstationcategory&nbsp;&nbsp;&nbsp;&uarr; "View property Raw.stationCategory"

Specifies the category of the station in the raw API format.

**Type**:&nbsp;&nbsp;<code><u>[`StationCategory`][api-reference-types/timetable/index.ts~StationCategory]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:198][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Raw.stopType`][api-reference-types/timetable/index.ts~Raw.stopType]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Raw.stopType]: #property-rawstoptype&nbsp;&nbsp;&nbsp;&uarr; "View property Raw.stopType"

Specifies the type of stop the train will make in the raw API format.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:200][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Raw.supervisedBy`][api-reference-types/timetable/index.ts~Raw.supervisedBy]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Raw.supervisedBy]: #property-rawsupervisedby&nbsp;&nbsp;&nbsp;&uarr; "View property Raw.supervisedBy"

Specifies the name of the dispatch station this point belongs to in the raw API format.

**Type**:&nbsp;&nbsp;<code><u>[`SupervisedBy`][api-reference-types/timetable/index.ts~SupervisedBy]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:202][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Raw.track`][api-reference-types/timetable/index.ts~Raw.track]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Raw.track]: #property-rawtrack&nbsp;&nbsp;&nbsp;&uarr; "View property Raw.track"

Specifies the number of the track this train will stop at in the raw API format.

**Type**:&nbsp;&nbsp;<code><u>[`Track`][api-reference-types/timetable/index.ts~Track]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:204][api-reference-types/timetable/index.ts]

<br/>

<br/>

<br/>

### [`interface Server`][api-reference-types/liveData/index.ts~Server]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Server]: #interface-server&nbsp;&nbsp;&nbsp;&uarr; "View interface Server"

Specifies a multiplayer server.

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:64][api-reference-types/liveData/index.ts]

<br/>
<br/>

#### [`property Server.id`][api-reference-types/liveData/index.ts~Server.id]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Server.id]: #property-serverid&nbsp;&nbsp;&nbsp;&uarr; "View property Server.id"

Specifies the unique ID of the server. (independent of `code`)

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:66][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Server.isActive`][api-reference-types/liveData/index.ts~Server.isActive]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Server.isActive]: #property-serverisactive&nbsp;&nbsp;&nbsp;&uarr; "View property Server.isActive"

Specifies if the server is active.

**Type**:&nbsp;&nbsp;<code>`boolean`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:68][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Server.serverCode`][api-reference-types/liveData/index.ts~Server.serverCode]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Server.serverCode]: #property-serverservercode&nbsp;&nbsp;&nbsp;&uarr; "View property Server.serverCode"

Specifies the unique code of the server.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:70][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Server.serverName`][api-reference-types/liveData/index.ts~Server.serverName]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Server.serverName]: #property-serverservername&nbsp;&nbsp;&nbsp;&uarr; "View property Server.serverName"

Specifies the name of the server.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:72][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Server.serverRegion`][api-reference-types/liveData/index.ts~Server.serverRegion]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Server.serverRegion]: #property-serverserverregion&nbsp;&nbsp;&nbsp;&uarr; "View property Server.serverRegion"

Specifies in which region the server is located.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:74][api-reference-types/liveData/index.ts]

<br/>

<br/>

<br/>

### [`interface Station`][api-reference-types/liveData/index.ts~Station]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Station]: #interface-station&nbsp;&nbsp;&nbsp;&uarr; "View interface Station"

Specifies an active dispatch station.

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:115][api-reference-types/liveData/index.ts]

<br/>
<br/>

#### [`property Station.additionalImage1URL`][api-reference-types/liveData/index.ts~Station.additionalImage1URL]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Station.additionalImage1URL]: #property-stationadditionalimage1url&nbsp;&nbsp;&nbsp;&uarr; "View property Station.additionalImage1URL"

Specifies the URL of the first secondary image for this station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:117][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Station.additionalImage2URL`][api-reference-types/liveData/index.ts~Station.additionalImage2URL]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Station.additionalImage2URL]: #property-stationadditionalimage2url&nbsp;&nbsp;&nbsp;&uarr; "View property Station.additionalImage2URL"

Specifies the URL of the second secondary image for this station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:119][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Station.difficultyLevel`][api-reference-types/liveData/index.ts~Station.difficultyLevel]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Station.difficultyLevel]: #property-stationdifficultylevel&nbsp;&nbsp;&nbsp;&uarr; "View property Station.difficultyLevel"

Specifies the difficulty level for this station. (from `1` to `5`)

**Type**:&nbsp;&nbsp;<code><u>[`DifficultyLevel`][api-reference-types/liveData/index.ts~DifficultyLevel]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:121][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Station.dispatchedBy`][api-reference-types/liveData/index.ts~Station.dispatchedBy]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Station.dispatchedBy]: #property-stationdispatchedby&nbsp;&nbsp;&nbsp;&uarr; "View property Station.dispatchedBy"

<kbd>optional</kbd>

Specifies a list of players dispatching at this station.

**Type**:&nbsp;&nbsp;<code><u>Array<[`DispatchedBy`][api-reference-types/liveData/index.ts~DispatchedBy]></u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:123][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Station.id`][api-reference-types/liveData/index.ts~Station.id]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Station.id]: #property-stationid&nbsp;&nbsp;&nbsp;&uarr; "View property Station.id"

Specifies the unique ID of this station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:125][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Station.latitude`][api-reference-types/liveData/index.ts~Station.latitude]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Station.latitude]: #property-stationlatitude&nbsp;&nbsp;&nbsp;&uarr; "View property Station.latitude"

Specifies the global latitude of this station.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:127][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Station.longitude`][api-reference-types/liveData/index.ts~Station.longitude]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Station.longitude]: #property-stationlongitude&nbsp;&nbsp;&nbsp;&uarr; "View property Station.longitude"

Specifies the global longitude of this station.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:129][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Station.mainImageURL`][api-reference-types/liveData/index.ts~Station.mainImageURL]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Station.mainImageURL]: #property-stationmainimageurl&nbsp;&nbsp;&nbsp;&uarr; "View property Station.mainImageURL"

Specifies the URL of the main image of this station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:131][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Station.name`][api-reference-types/liveData/index.ts~Station.name]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Station.name]: #property-stationname&nbsp;&nbsp;&nbsp;&uarr; "View property Station.name"

Specifies the name of the station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:133][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Station.prefix`][api-reference-types/liveData/index.ts~Station.prefix]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Station.prefix]: #property-stationprefix&nbsp;&nbsp;&nbsp;&uarr; "View property Station.prefix"

Specifies the prefix of this station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:135][api-reference-types/liveData/index.ts]

<br/>

<br/>

<br/>

### [`interface Successful`][api-reference-types/liveData/index.ts~Successful]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Successful]: #interface-successful&nbsp;&nbsp;&nbsp;&uarr; "View interface Successful"

Specfies a response for a successful request.

**Extends**:&nbsp;&nbsp;<u>[`Base`][api-reference-types/liveData/index.ts~Base]</u>&#60;`true`&#62;

| Type params: | *Description* |
| ------------ | ------------- |
| `ResponseData` | The requested data. |

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:47][api-reference-types/liveData/index.ts]

<br/>
<br/>

#### [`property Successful.count`][api-reference-types/liveData/index.ts~Successful.count]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Successful.count]: #property-successfulcount&nbsp;&nbsp;&nbsp;&uarr; "View property Successful.count"

Specifies the number of results.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:49][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Successful.data`][api-reference-types/liveData/index.ts~Successful.data]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Successful.data]: #property-successfuldata&nbsp;&nbsp;&nbsp;&uarr; "View property Successful.data"

Specifies the requested data.

**Type**:&nbsp;&nbsp;<code>`ResponseData`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:51][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Successful.description`][api-reference-types/liveData/index.ts~Successful.description]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Successful.description]: #property-successfuldescription&nbsp;&nbsp;&nbsp;&uarr; "View property Successful.description"

Specifies a description for the response.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:53][api-reference-types/liveData/index.ts]

<br/>

<br/>

<br/>

### [`interface Timetable`][api-reference-types/timetable/index.ts~Timetable]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable]: #interface-timetable&nbsp;&nbsp;&nbsp;&uarr; "View interface Timetable"

Specifies a timetable entry for a train.

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:88][api-reference-types/timetable/index.ts]

<br/>
<br/>

#### [`property Timetable.arrivalTime`][api-reference-types/timetable/index.ts~Timetable.arrivalTime]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.arrivalTime]: #property-timetablearrivaltime&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.arrivalTime"

<kbd>optional</kbd>

Specifies when the train arrives at this point.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:90][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.departureTime`][api-reference-types/timetable/index.ts~Timetable.departureTime]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.departureTime]: #property-timetabledeparturetime&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.departureTime"

Specifies when the train departs at this point.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:92][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.displayedTrainNumber`][api-reference-types/timetable/index.ts~Timetable.displayedTrainNumber]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.displayedTrainNumber]: #property-timetabledisplayedtrainnumber&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.displayedTrainNumber"

Specifies which train number is displayed for this train.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:94][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.kilometrage`][api-reference-types/timetable/index.ts~Timetable.kilometrage]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.kilometrage]: #property-timetablekilometrage&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.kilometrage"

Specifies at what distance this point will be passed.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:100][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.line`][api-reference-types/timetable/index.ts~Timetable.line]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.line]: #property-timetableline&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.line"

Specifies the number of the line that the train will follow.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:96][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.maxSpeed`][api-reference-types/timetable/index.ts~Timetable.maxSpeed]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.maxSpeed]: #property-timetablemaxspeed&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.maxSpeed"

Specifies the maximum speed at this point.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:98][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.nameForPerson`][api-reference-types/timetable/index.ts~Timetable.nameForPerson]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.nameForPerson]: #property-timetablenameforperson&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.nameForPerson"

Specifies the name of the dispatcher for this point.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:102][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.nameOfPoint`][api-reference-types/timetable/index.ts~Timetable.nameOfPoint]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.nameOfPoint]: #property-timetablenameofpoint&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.nameOfPoint"

Specifies the name of this point.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:104][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.platform`][api-reference-types/timetable/index.ts~Timetable.platform]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.platform]: #property-timetableplatform&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.platform"

<kbd>optional</kbd>

Specifies at which platform the train will stop in Roman numerals.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:110][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.pointId`][api-reference-types/timetable/index.ts~Timetable.pointId]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.pointId]: #property-timetablepointid&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.pointId"

Specifies the unique ID of this point.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:112][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.radioChannels`][api-reference-types/timetable/index.ts~Timetable.radioChannels]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.radioChannels]: #property-timetableradiochannels&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.radioChannels"

<kbd>optional</kbd>

Specifies the radio channels required after this point.

**Type**:&nbsp;&nbsp;<code><u>[`RadioChannels`][api-reference-types/timetable/index.ts~RadioChannels]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:118][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.stationCategory`][api-reference-types/timetable/index.ts~Timetable.stationCategory]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.stationCategory]: #property-timetablestationcategory&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.stationCategory"

<kbd>optional</kbd>

Specifies the category of the station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:120][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.stopType`][api-reference-types/timetable/index.ts~Timetable.stopType]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.stopType]: #property-timetablestoptype&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.stopType"

Specifies the type of stop the train will make.

**Type**:&nbsp;&nbsp;<code><u>[`StopType`][api-reference-types/timetable/index.ts~StopType]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:122][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.supervisedBy`][api-reference-types/timetable/index.ts~Timetable.supervisedBy]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.supervisedBy]: #property-timetablesupervisedby&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.supervisedBy"

<kbd>optional</kbd>

Specifies the name of the dispatch station this point belongs to.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:124][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.track`][api-reference-types/timetable/index.ts~Timetable.track]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.track]: #property-timetabletrack&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.track"

<kbd>optional</kbd>

Specifies the number of the track this train will stop at.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:126][api-reference-types/timetable/index.ts]

<br/>

<br/>

#### [`property Timetable.trainType`][api-reference-types/timetable/index.ts~Timetable.trainType]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Timetable.trainType]: #property-timetabletraintype&nbsp;&nbsp;&nbsp;&uarr; "View property Timetable.trainType"

Specifies the name of the train series.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:128][api-reference-types/timetable/index.ts]

<br/>

<br/>

<br/>

### [`interface Train`][api-reference-types/liveData/index.ts~Train]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Train]: #interface-train&nbsp;&nbsp;&nbsp;&uarr; "View interface Train"

Specifies an active train.

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:220][api-reference-types/liveData/index.ts]

<br/>
<br/>

#### [`property Train.endStation`][api-reference-types/liveData/index.ts~Train.endStation]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Train.endStation]: #property-trainendstation&nbsp;&nbsp;&nbsp;&uarr; "View property Train.endStation"

Specifies the name of the destination station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:222][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Train.id`][api-reference-types/liveData/index.ts~Train.id]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Train.id]: #property-trainid&nbsp;&nbsp;&nbsp;&uarr; "View property Train.id"

Specifies the unique ID of the train. (independent from `runId`)

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:224][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Train.runId`][api-reference-types/liveData/index.ts~Train.runId]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Train.runId]: #property-trainrunid&nbsp;&nbsp;&nbsp;&uarr; "View property Train.runId"

Specifies the unique ID of this train on the timetable server. (independent from `id`)

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:226][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Train.serverCode`][api-reference-types/liveData/index.ts~Train.serverCode]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Train.serverCode]: #property-trainservercode&nbsp;&nbsp;&nbsp;&uarr; "View property Train.serverCode"

Specifies the unique code of the server the train is running on.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:228][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Train.startStation`][api-reference-types/liveData/index.ts~Train.startStation]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Train.startStation]: #property-trainstartstation&nbsp;&nbsp;&nbsp;&uarr; "View property Train.startStation"

Specifies the name of the origin station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:230][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Train.trainData`][api-reference-types/liveData/index.ts~Train.trainData]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Train.trainData]: #property-traintraindata&nbsp;&nbsp;&nbsp;&uarr; "View property Train.trainData"

Specifies live data about the train.

**Type**:&nbsp;&nbsp;<code><u>[`TrainData`][api-reference-types/liveData/index.ts~TrainData]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:232][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Train.trainName`][api-reference-types/liveData/index.ts~Train.trainName]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Train.trainName]: #property-traintrainname&nbsp;&nbsp;&nbsp;&uarr; "View property Train.trainName"

Specifies the name of the train.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:234][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Train.trainNoLocal`][api-reference-types/liveData/index.ts~Train.trainNoLocal]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Train.trainNoLocal]: #property-traintrainnolocal&nbsp;&nbsp;&nbsp;&uarr; "View property Train.trainNoLocal"

Specifies the national train number of this train.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:236][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Train.type`][api-reference-types/liveData/index.ts~Train.type]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Train.type]: #property-traintype&nbsp;&nbsp;&nbsp;&uarr; "View property Train.type"

Specifies if this train is operated by a `"bot"` or a `"user"`.

**Type**:&nbsp;&nbsp;<code><u>[`Type`][api-reference-types/liveData/index.ts~Type]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:238][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property Train.vehicles`][api-reference-types/liveData/index.ts~Train.vehicles]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Train.vehicles]: #property-trainvehicles&nbsp;&nbsp;&nbsp;&uarr; "View property Train.vehicles"

Specifies a list of vehicles of this train.

**NOTE**: This data hasn't be deciphered yet, if you know what this data
  describes please **open a new issue** in the project repository.

**Type**:&nbsp;&nbsp;<code><u>[`Vehicles`][api-reference-types/liveData/index.ts~Vehicles]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:245][api-reference-types/liveData/index.ts]

<br/>

<br/>

<br/>

### [`interface TrainData`][api-reference-types/liveData/index.ts~TrainData]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~TrainData]: #interface-traindata&nbsp;&nbsp;&nbsp;&uarr; "View interface TrainData"

Specifies live data about a train.

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:281][api-reference-types/liveData/index.ts]

<br/>
<br/>

#### [`property TrainData.controlledBySteamId`][api-reference-types/liveData/index.ts~TrainData.controlledBySteamId]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~TrainData.controlledBySteamId]: #property-traindatacontrolledbysteamid&nbsp;&nbsp;&nbsp;&uarr; "View property TrainData.controlledBySteamId"

<kbd>optional</kbd>

Specifies the Steam ID of the player controlling this train.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:283][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property TrainData.distanceToSignalInFront`][api-reference-types/liveData/index.ts~TrainData.distanceToSignalInFront]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~TrainData.distanceToSignalInFront]: #property-traindatadistancetosignalinfront&nbsp;&nbsp;&nbsp;&uarr; "View property TrainData.distanceToSignalInFront"

<kbd>optional</kbd>

Specifies the distance to the next signal in meters.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:285][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property TrainData.inBorderStationArea`][api-reference-types/liveData/index.ts~TrainData.inBorderStationArea]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~TrainData.inBorderStationArea]: #property-traindatainborderstationarea&nbsp;&nbsp;&nbsp;&uarr; "View property TrainData.inBorderStationArea"

Specifies if the train is in the border area of the map. (unplayable area)

**Type**:&nbsp;&nbsp;<code>`boolean`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:287][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property TrainData.latitude`][api-reference-types/liveData/index.ts~TrainData.latitude]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~TrainData.latitude]: #property-traindatalatitude&nbsp;&nbsp;&nbsp;&uarr; "View property TrainData.latitude"

Specifies the current global latitude of the train.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:289][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property TrainData.longitude`][api-reference-types/liveData/index.ts~TrainData.longitude]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~TrainData.longitude]: #property-traindatalongitude&nbsp;&nbsp;&nbsp;&uarr; "View property TrainData.longitude"

Specifies the current global longitude of the train.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:291][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property TrainData.signalInFront`][api-reference-types/liveData/index.ts~TrainData.signalInFront]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~TrainData.signalInFront]: #property-traindatasignalinfront&nbsp;&nbsp;&nbsp;&uarr; "View property TrainData.signalInFront"

<kbd>optional</kbd>

Specifies data about the next signal.

**NOTE**: This data (except for the ID prefixing the `@` symbol) hasn't be deciphered yet,
  if you know what this data describes please **open a new issue** in the project repository.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:298][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property TrainData.signalInFrontSpeed`][api-reference-types/liveData/index.ts~TrainData.signalInFrontSpeed]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~TrainData.signalInFrontSpeed]: #property-traindatasignalinfrontspeed&nbsp;&nbsp;&nbsp;&uarr; "View property TrainData.signalInFrontSpeed"

<kbd>optional</kbd>

Specifies the track limit effective at the next signal in km/h.

**Type**:&nbsp;&nbsp;<code><u>[`SignalInFrontSpeed`][api-reference-types/liveData/index.ts~SignalInFrontSpeed]</u></code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:300][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property TrainData.vdDelayedTimetableIndex`][api-reference-types/liveData/index.ts~TrainData.vdDelayedTimetableIndex]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~TrainData.vdDelayedTimetableIndex]: #property-traindatavddelayedtimetableindex&nbsp;&nbsp;&nbsp;&uarr; "View property TrainData.vdDelayedTimetableIndex"

Specifies the index of the current entry in this train's timetable.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:302][api-reference-types/liveData/index.ts]

<br/>

<br/>

#### [`property TrainData.velocity`][api-reference-types/liveData/index.ts~TrainData.velocity]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~TrainData.velocity]: #property-traindatavelocity&nbsp;&nbsp;&nbsp;&uarr; "View property TrainData.velocity"

Specifies the current speed of the train.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:304][api-reference-types/liveData/index.ts]

<br/>

<br/>

<br/>

### [`type ApiResponse`][api-reference-types/liveData/index.ts~ApiResponse]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~ApiResponse]: #type-apiresponse&nbsp;&nbsp;&nbsp;&uarr; "View type ApiResponse"

Specifies a response returned by the remote API.

| Type params: | *Description* |
| ------------ | ------------- |
| `ResponseData` | The requested data. |

**Type**:&nbsp;&nbsp;<code><u>[`ApiResponse.Error`][api-reference-types/liveData/index.ts~Error]</u> &#124; <u>[`ApiResponse.Successful`][api-reference-types/liveData/index.ts~Successful]</u>&#60;`ResponseData`&#62;</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:28][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type ArrivalTime`][api-reference-types/timetable/index.ts~ArrivalTime]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~ArrivalTime]: #type-arrivaltime&nbsp;&nbsp;&nbsp;&uarr; "View type ArrivalTime"

Specifies when the train arrives at a point.

**Type**:&nbsp;&nbsp;<code><u>[`Timetable.ArrivalTime`][api-reference-types/timetable/index.ts~ArrivalTime]</u> &#124; `null`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:208][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type ContinuesAs`][api-reference-types/timetable/index.ts~ContinuesAs]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~ContinuesAs]: #type-continuesas&nbsp;&nbsp;&nbsp;&uarr; "View type ContinuesAs"

Specifies under which train number a train will continue.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:49][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type ControlledBySteamId`][api-reference-types/liveData/index.ts~ControlledBySteamId]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~ControlledBySteamId]: #type-controlledbysteamid&nbsp;&nbsp;&nbsp;&uarr; "View type ControlledBySteamId"

Specifies the Steam ID of the player controlling a train in the raw API format.

**Type**:&nbsp;&nbsp;<code>`string` &#124; `null`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:358][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type ConvertData`][api-reference-index.ts~ConvertData]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~ConvertData]: #type-convertdata&nbsp;&nbsp;&nbsp;&uarr; "View type ConvertData"

Specifies if responses are converted or if the raw API response is returned.

**Type**:&nbsp;&nbsp;<code>`boolean`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:294][api-reference-index.ts]

<br/>
<br/>

<br/>

### [`type Count`][api-reference-types/liveData/index.ts~Count]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Count]: #type-count&nbsp;&nbsp;&nbsp;&uarr; "View type Count"

Specifies the number of results.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:35][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type DepartureTime`][api-reference-types/timetable/index.ts~DepartureTime]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~DepartureTime]: #type-departuretime&nbsp;&nbsp;&nbsp;&uarr; "View type DepartureTime"

Specifies when a train departs at this point.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:134][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type Description`][api-reference-types/liveData/index.ts~Description]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Description]: #type-description&nbsp;&nbsp;&nbsp;&uarr; "View type Description"

Specifies a description of a response.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:37][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type DifficultyLevel`][api-reference-types/liveData/index.ts~DifficultyLevel]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~DifficultyLevel]: #type-difficultylevel&nbsp;&nbsp;&nbsp;&uarr; "View type DifficultyLevel"

Specifies the difficulty level for a station in the raw API format. (from `1` to `5`)

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:194][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type DisplayedTrainNumber`][api-reference-types/timetable/index.ts~DisplayedTrainNumber]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~DisplayedTrainNumber]: #type-displayedtrainnumber&nbsp;&nbsp;&nbsp;&uarr; "View type DisplayedTrainNumber"

Specifies which train number is displayed for a train.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:136][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type DistanceToSignalInFront`][api-reference-types/liveData/index.ts~DistanceToSignalInFront]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~DistanceToSignalInFront]: #type-distancetosignalinfront&nbsp;&nbsp;&nbsp;&uarr; "View type DistanceToSignalInFront"

Specifies the distance to the next signal in meters and in the raw API format.

**Type**:&nbsp;&nbsp;<code>`number` &#124; `null`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:371][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type EndsAt`][api-reference-types/timetable/index.ts~EndsAt]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~EndsAt]: #type-endsat&nbsp;&nbsp;&nbsp;&uarr; "View type EndsAt"

Specifies when a train arrives at it's destination. Format: `hh:mm:ss`

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:53][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type EndStation`][api-reference-types/timetable/index.ts~EndStation]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~EndStation]: #type-endstation&nbsp;&nbsp;&nbsp;&uarr; "View type EndStation"

Specifies the name of a destination station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:51][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type Id`][api-reference-types/liveData/index.ts~Id]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Id]: #type-id&nbsp;&nbsp;&nbsp;&uarr; "View type Id"

Specifies the unique ID of a train. (independent from `Train.RunId`)

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:251][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type ImageUrl`][api-reference-types/liveData/index.ts~ImageUrl]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~ImageUrl]: #type-imageurl&nbsp;&nbsp;&nbsp;&uarr; "View type ImageUrl"

Specifies the URL of an image.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:158][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type InBorderStationArea`][api-reference-types/liveData/index.ts~InBorderStationArea]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~InBorderStationArea]: #type-inborderstationarea&nbsp;&nbsp;&nbsp;&uarr; "View type InBorderStationArea"

Specifies if a train is in the border area of the map. (unplayable area)

**Type**:&nbsp;&nbsp;<code>`boolean`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:312][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type IsActive`][api-reference-types/liveData/index.ts~IsActive]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~IsActive]: #type-isactive&nbsp;&nbsp;&nbsp;&uarr; "View type IsActive"

Specifies if a server is active.

**Type**:&nbsp;&nbsp;<code>`boolean`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:80][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type Kilometrage`][api-reference-types/timetable/index.ts~Kilometrage]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Kilometrage]: #type-kilometrage&nbsp;&nbsp;&nbsp;&uarr; "View type Kilometrage"

Specifies at what distance a point will be passed.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:144][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type Latititude`][api-reference-types/liveData/index.ts~Latititude]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Latititude]: #type-latititude&nbsp;&nbsp;&nbsp;&uarr; "View type Latititude"

Specifies the global latitude of a station in the raw API format.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:207][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type Latititute`][api-reference-types/liveData/index.ts~Latititute]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Latititute]: #type-latititute&nbsp;&nbsp;&nbsp;&uarr; "View type Latititute"

Specifies the current global latitude of a train in the raw API format.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:360][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type Latitude`][api-reference-types/liveData/index.ts~Latitude]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Latitude]: #type-latitude&nbsp;&nbsp;&nbsp;&uarr; "View type Latitude"

Specifies the current global latitude of a train.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:314][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type Line`][api-reference-types/timetable/index.ts~Line]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Line]: #type-line&nbsp;&nbsp;&nbsp;&uarr; "View type Line"

Specifies the number of the line that a train will follow.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:138][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type List`][api-reference-types/timetable/index.ts~List]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~List]: #type-list&nbsp;&nbsp;&nbsp;&uarr; "View type List"

Specifies a list of timetable entries for a train.

**Type**:&nbsp;&nbsp;<code><u>[`Raw`][api-reference-types/timetable/index.ts~Raw]</u>[]</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:210][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type LocoType`][api-reference-types/timetable/index.ts~LocoType]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~LocoType]: #type-locotype&nbsp;&nbsp;&nbsp;&uarr; "View type LocoType"

Specifies the name of a train's locomotive.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:55][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type Longitude`][api-reference-types/liveData/index.ts~Longitude]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Longitude]: #type-longitude&nbsp;&nbsp;&nbsp;&uarr; "View type Longitude"

Specifies the current global longitude of a train.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:316][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type Longitute`][api-reference-types/liveData/index.ts~Longitute]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Longitute]: #type-longitute&nbsp;&nbsp;&nbsp;&uarr; "View type Longitute"

Specifies the current global longitude of a train in the raw API format.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:362][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type MaxSpeed`][api-reference-types/timetable/index.ts~MaxSpeed]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~MaxSpeed]: #type-maxspeed&nbsp;&nbsp;&nbsp;&uarr; "View type MaxSpeed"

Specifies the maximum speed at a point.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:142][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type Mileage`][api-reference-types/timetable/index.ts~Mileage]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Mileage]: #type-mileage&nbsp;&nbsp;&nbsp;&uarr; "View type Mileage"

Specifies at what distance a point will be passed **in kilometers**.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:212][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type Name`][api-reference-types/liveData/index.ts~Name]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Name]: #type-name&nbsp;&nbsp;&nbsp;&uarr; "View type Name"

Specifies the name of a station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:166][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type NameForPerson`][api-reference-types/timetable/index.ts~NameForPerson]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~NameForPerson]: #type-nameforperson&nbsp;&nbsp;&nbsp;&uarr; "View type NameForPerson"

Specifies the name of the dispatcher for a point.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:146][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type NameOfPoint`][api-reference-types/timetable/index.ts~NameOfPoint]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~NameOfPoint]: #type-nameofpoint&nbsp;&nbsp;&nbsp;&uarr; "View type NameOfPoint"

Specifies the name of a point.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:148][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type Platform`][api-reference-types/timetable/index.ts~Platform]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Platform]: #type-platform&nbsp;&nbsp;&nbsp;&uarr; "View type Platform"

Specifies at which platform a train will stop in Roman numerals.

**Type**:&nbsp;&nbsp;<code><u>[`Timetable.Platform`][api-reference-types/timetable/index.ts~Platform]</u> &#124; `null`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:218][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type PointId`][api-reference-types/timetable/index.ts~PointId]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~PointId]: #type-pointid&nbsp;&nbsp;&nbsp;&uarr; "View type PointId"

Specifies the unique ID of a point.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:156][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type Prefix`][api-reference-types/liveData/index.ts~Prefix]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Prefix]: #type-prefix&nbsp;&nbsp;&nbsp;&uarr; "View type Prefix"

Specifies the prefix of a station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:168][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type RadioChannel`][api-reference-types/timetable/index.ts~RadioChannel]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~RadioChannel]: #type-radiochannel&nbsp;&nbsp;&nbsp;&uarr; "View type RadioChannel"

Specifies a radio channel.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:162][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type RadioChannels`][api-reference-types/timetable/index.ts~RadioChannels]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~RadioChannels]: #type-radiochannels&nbsp;&nbsp;&nbsp;&uarr; "View type RadioChannels"

Specifies the radio channels required after a point as a comma-separated string.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:224][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type Result`][api-reference-types/liveData/index.ts~Result]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Result]: #type-result&nbsp;&nbsp;&nbsp;&uarr; "View type Result"

Specifies if a request succeeded.

**Type**:&nbsp;&nbsp;<code>`boolean`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:41][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type RunId`][api-reference-types/timetable/index.ts~RunId]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~RunId]: #type-runid&nbsp;&nbsp;&nbsp;&uarr; "View type RunId"

Specifies the unique ID of a train. (independent from the train number)

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:57][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type ServerCode`][api-reference-types/timetable/index.ts~ServerCode]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~ServerCode]: #type-servercode&nbsp;&nbsp;&nbsp;&uarr; "View type ServerCode"

Specifies the unique code of a timetable server.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:59][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type ServerName`][api-reference-types/liveData/index.ts~ServerName]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~ServerName]: #type-servername&nbsp;&nbsp;&nbsp;&uarr; "View type ServerName"

Specifies the name of a server.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:86][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type ServerRegion`][api-reference-types/liveData/index.ts~ServerRegion]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~ServerRegion]: #type-serverregion&nbsp;&nbsp;&nbsp;&uarr; "View type ServerRegion"

Specifies in which region a server is located.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:88][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type SignalInFront`][api-reference-types/liveData/index.ts~SignalInFront]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~SignalInFront]: #type-signalinfront&nbsp;&nbsp;&nbsp;&uarr; "View type SignalInFront"

Specifies data about the next signal in the raw API format.

**NOTE**: This data (except for the ID prefixing the `@` symbol) hasn't be deciphered yet,
  if you know what this data describes please **open a new issue** in the project repository.

**Type**:&nbsp;&nbsp;<code>`string` &#124; `null`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:369][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type SignalInFrontSpeed`][api-reference-types/liveData/index.ts~SignalInFrontSpeed]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~SignalInFrontSpeed]: #type-signalinfrontspeed&nbsp;&nbsp;&nbsp;&uarr; "View type SignalInFrontSpeed"

Specifies the track limit effective at the next signal in km/h and in the raw API format.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:373][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type StartsAt`][api-reference-types/timetable/index.ts~StartsAt]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~StartsAt]: #type-startsat&nbsp;&nbsp;&nbsp;&uarr; "View type StartsAt"

Specifies when a train departs from it's origin. Format: `hh:mm:ss`

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:63][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type StartStation`][api-reference-types/timetable/index.ts~StartStation]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~StartStation]: #type-startstation&nbsp;&nbsp;&nbsp;&uarr; "View type StartStation"

Specifies the name of an origin station.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:61][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type StationCategory`][api-reference-types/timetable/index.ts~StationCategory]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~StationCategory]: #type-stationcategory&nbsp;&nbsp;&nbsp;&uarr; "View type StationCategory"

Specifies the category of a station.

**Type**:&nbsp;&nbsp;<code><u>[`Timetable.StationCategory`][api-reference-types/timetable/index.ts~StationCategory]</u> &#124; `null`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:226][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type SteamId`][api-reference-types/liveData/index.ts~SteamId]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~SteamId]: #type-steamid&nbsp;&nbsp;&nbsp;&uarr; "View type SteamId"

Specifies the Steam ID of a player.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:153][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type StopType`][api-reference-types/timetable/index.ts~StopType]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~StopType]: #type-stoptype&nbsp;&nbsp;&nbsp;&uarr; "View type StopType"

Specifies the type of stop a train will make.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:228][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type SupervisedBy`][api-reference-types/timetable/index.ts~SupervisedBy]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~SupervisedBy]: #type-supervisedby&nbsp;&nbsp;&nbsp;&uarr; "View type SupervisedBy"

Specifies the name of the dispatch station a point belongs to.

**Type**:&nbsp;&nbsp;<code><u>[`Timetable.SupervisedBy`][api-reference-types/timetable/index.ts~SupervisedBy]</u> &#124; `null`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:230][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type Track`][api-reference-types/timetable/index.ts~Track]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~Track]: #type-track&nbsp;&nbsp;&nbsp;&uarr; "View type Track"

Specifies the number of the track a train will stop at.

**Type**:&nbsp;&nbsp;<code><u>[`Timetable.Track`][api-reference-types/timetable/index.ts~Track]</u> &#124; `null`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:232][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type TrainLength`][api-reference-types/timetable/index.ts~TrainLength]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~TrainLength]: #type-trainlength&nbsp;&nbsp;&nbsp;&uarr; "View type TrainLength"

Specifies the length of a train in meters.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:65][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type TrainName`][api-reference-types/timetable/index.ts~TrainName]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~TrainName]: #type-trainname&nbsp;&nbsp;&nbsp;&uarr; "View type TrainName"

Specifies the name of a train or train series.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:67][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type TrainNoInternational`][api-reference-types/timetable/index.ts~TrainNoInternational]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~TrainNoInternational]: #type-trainnointernational&nbsp;&nbsp;&nbsp;&uarr; "View type TrainNoInternational"

Specifies the international train number of a train.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:69][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type TrainNoLocal`][api-reference-types/timetable/index.ts~TrainNoLocal]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~TrainNoLocal]: #type-trainnolocal&nbsp;&nbsp;&nbsp;&uarr; "View type TrainNoLocal"

Specifies the national train number of a train.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:71][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type TrainType`][api-reference-types/timetable/index.ts~TrainType]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~TrainType]: #type-traintype&nbsp;&nbsp;&nbsp;&uarr; "View type TrainType"

Specifies the name of a train series.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:178][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type TrainWeight`][api-reference-types/timetable/index.ts~TrainWeight]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/timetable/index.ts~TrainWeight]: #type-trainweight&nbsp;&nbsp;&nbsp;&uarr; "View type TrainWeight"

Specifies the weight of a train in metric tonnes.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/timetable/index.ts:73][api-reference-types/timetable/index.ts]

<br/>
<br/>

<br/>

### [`type Type`][api-reference-types/liveData/index.ts~Type]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Type]: #type-type&nbsp;&nbsp;&nbsp;&uarr; "View type Type"

Specifies the type of train operator in the raw API format. (`"bot"` or `"user"`)

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:408][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type Url`][api-reference-index.ts~Url]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Url]: #type-url&nbsp;&nbsp;&nbsp;&uarr; "View type Url"

Specifies an API endpoint URL.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:311][api-reference-index.ts]

<br/>
<br/>

<br/>

### [`type VdDelayedTimetableIndex`][api-reference-types/liveData/index.ts~VdDelayedTimetableIndex]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~VdDelayedTimetableIndex]: #type-vddelayedtimetableindex&nbsp;&nbsp;&nbsp;&uarr; "View type VdDelayedTimetableIndex"

Specifies the index of the current entry in a train's timetable.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:327][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type Vehicle`][api-reference-types/liveData/index.ts~Vehicle]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Vehicle]: #type-vehicle&nbsp;&nbsp;&nbsp;&uarr; "View type Vehicle"

Specifies data about a vehicle of a train.

**NOTE**: This data hasn't be deciphered yet, if you know what this data
  describes please **open a new issue** in the project repository.

**Type**:&nbsp;&nbsp;<code>`string`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:272][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type Vehicles`][api-reference-types/liveData/index.ts~Vehicles]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Vehicles]: #type-vehicles&nbsp;&nbsp;&nbsp;&uarr; "View type Vehicles"

Specifies a list of vehicles of a train.

**NOTE**: This data hasn't be deciphered yet, if you know what this data
  describes please **open a new issue** in the project repository.

**Type**:&nbsp;&nbsp;<code><u>[`Vehicles`][api-reference-types/liveData/index.ts~Vehicles]</u>[]</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:279][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type Velocity`][api-reference-types/liveData/index.ts~Velocity]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-types/liveData/index.ts~Velocity]: #type-velocity&nbsp;&nbsp;&nbsp;&uarr; "View type Velocity"

Specifies the current speed of a train.

**Type**:&nbsp;&nbsp;<code>`number`</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[types/liveData/index.ts:329][api-reference-types/liveData/index.ts]

<br/>
<br/>

<br/>

### [`type Version`][api-reference-index.ts~Version]&nbsp;&nbsp;&nbsp;[&uarr;][api-reference]

[api-reference-index.ts~Version]: #type-version&nbsp;&nbsp;&nbsp;&uarr; "View type Version"

Specifies the version of the API.

**Type**:&nbsp;&nbsp;<code>&#96;&#36;{`number`}`.`&#36;{`number`}`.`&#36;{`number`}&#96; &#124; &#96;&#36;{`number`}`.`&#36;{`number`}`.`&#36;{`number`}`-`&#36;{`string`}&#96;</code>

**Since**: `0.1.0`

**Definition**:&nbsp;&nbsp;[index.ts:314][api-reference-index.ts]

<br/>
<br/>

<br/>

## [About this module][about-this-module]

[about-this-module]: #about-this-module "View About this module"

Package name: `@simrail-sdk/api-core-node`

Author: [Niek van Bennekom](https://github.com/niekvb "View GitHub profile")

Version: `0.1.2`

Repository: [`github:simrail-sdk/api-core-node` (origin)](https://github.com/simrail-sdk/api-core-node.git "View on github")

Keywords: `simrail`, `sdk`, `core`, `api`, `rest`.

[View license][view-license]&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;[view open source licenses][view-open-source-licenses]

[view-license]: ./LICENSE.md "View license"
[view-open-source-licenses]: ./OSL.md "View open source licenses"

*SCTL version: `0.1.11-dev`*
<br/>
<br/>


### [Module dependencies][module-dependencies]

[module-dependencies]: #module-dependencies "View Module dependencies"

#### [Module package dependencies][module-package-dependencies]

[module-package-dependencies]: #module-package-dependencies "View Module package dependencies"


**Development packages**: (2)

- `@types/node`: TypeScript definitions for node.

- `typescript`: TypeScript is a language for application scale JavaScript development.
<br/>
<br/>


#### [Internal module dependencies][internal-module-dependencies]

[internal-module-dependencies]: #internal-module-dependencies "View Internal module dependencies"

This module contains and uses the following internal modules:


- `index.js`

- `types/index.js`

- `types/liveData/index.js`

- `types/timetable/index.js`
<br/>
<br/>


Dependency tree:

[![Dependency tree graph][dependency-tree-image]][dependency-tree-image]

[dependency-tree-image]: ./stats/dependencyTree.png "Dependency tree"
<br/>
<br/>


### [Module code statistics][module-code-statistics]

[module-code-statistics]: #module-code-statistics "View Module code statistics"

| File type | Number of files | Lines with code | Lines with comments | Blank lines |
| --------- | --------------- | --------------- | ------------------- | ----------- |
| Markdown | 3 | 2377 | 0 | 1675 |
| TypeScript | 8 | 719 | 836 | 95 |
| JavaScript | 6 | 278 | 6 | 0 |
| JSON | 3 | 91 | 0 | 1 |
| YAML | 1 | 44 | 0 | 2 |
| **All (total)** | **21** | **3509** | **842** | **1773** |
