import Raven from "raven-js";
import config from "./config";

export const handleError = (error, errorInfo) => {
  console.error(error);
  Raven.captureException(error, {
    extra: errorInfo
  });
};

export const incrementPlayCount = (rom) => {
  let romName = formatRomName(rom);
  let tag = [config.ASSET_NAME, 'NES', romName, 'PLAY_COUNT'].join(':');
  let playCount = 0;
  getLatestDatapoint(tag, function handleData(error, latestData) {
    if (error) {
      console.log(error);
    } else {
      if (latestData.length > 0) {
        playCount = latestData[0][1]; // Latest Data Value
      }
      playCount += 1;

      uploadTimeseries(JSON.stringify({
        'datapoints': [{
          'name': tag,
          'value': playCount
        }]
      }));
    }
  });

};

export const recordUptime = (startTime) => {
  let tag = config.ASSET_NAME + ':UPTIME';
  let timeRunning = Date.now() - startTime;

  uploadTimeseries(JSON.stringify({
    'datapoints': [{
      'name': tag,
      'value': timeRunning
    }]
  }));
};

export const recordGametime = (rom, startTime) => {
  let timePlayed = Date.now() - startTime;
  let romName = formatRomName(rom);
  let tag = [config.ASSET_NAME, 'NES', romName, 'GAMETIME'].join(':');
  let totalTimePlayed = 0;
  getLatestDatapoint(tag, function handleData(error, latestData) {
    if (error) {
      console.log(error);
    } else {
      if (latestData.length > 0) {
        totalTimePlayed = latestData[0][1]; // Latest Data Value
      }
      totalTimePlayed += timePlayed;

      uploadTimeseries(JSON.stringify({
        'datapoints': [{
          'name': tag,
          'value': totalTimePlayed
        }]
      }));
    }
  });
};

export const getLatestDatapoint = (tag, callback) => {
  var xhr = new XMLHttpRequest();

  xhr.open("POST", config.TIMESERIES_API_URL + 'latest/');
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onload = function () {
    if (this.status === 200) {
      callback(null, JSON.parse(this.responseText).tags[0].results[0].values);
    } else {
      callback(new Error(xhr.statusText));
    }
  };

  xhr.onerror = function () {
    callback(new Error(xhr.statusText));
  };

  let data = JSON.stringify({
    'tags': [tag]
  });

  xhr.send(data);
};

export const uploadTimeseries = (data) => {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", config.TIMESERIES_API_URL + 'ingest/');
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onerror = function () {
    console.log(new Error(xhr.statusText));
  };

  xhr.send(data);
};

export const formatRomName = (rom) => {
  return rom.replace('.nes', '').replace(/\s/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toUpperCase();
};