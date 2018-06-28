import Raven from "raven-js";
import config from "./config";

export const handleError = (error, errorInfo) => {
  console.error(error);
  Raven.captureException(error, {
    extra: errorInfo
  });
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

export const incrementPlayCount = (tag) => {
  var xhr = new XMLHttpRequest();

  xhr.open("POST", config.TIMESERIES_API_URL + 'latest/');
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onload = function () {
    if (this.status === 200) {
      let playCount = 0;
      const latestData = JSON.parse(this.responseText).tags[0].results[0].values;
      if (latestData.length > 0) {
        playCount = latestData[0][1]; // Latest Data Value
      }
      playCount += 1;

      uploadTimeseries(JSON.stringify({'datapoints': [{'name': tag, 'value': playCount}]}));

    } else {
      console.log(new Error(xhr.statusText));
    }
  };

  xhr.onerror = function () {
    console.log(new Error(xhr.statusText));
  };

  let data = JSON.stringify({
    'tags': [tag]
  });

  xhr.send(data);
};

export const recordUptime = (tag, upTime) => {
  uploadTimeseries(JSON.stringify({'datapoints': [{'name': tag, 'value': upTime}]}));
};