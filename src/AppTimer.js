// AppTimer tracks the runtime of the app once it's loaded in the browser
import config from "./config";
import { recordUptime } from "./utils";

export default class FrameTimer {
  constructor() {
    this.running = false;
    this.startTime = null;
  }

  start() {
    this.running = true;
    this.startTime = Date.now();
    this.uptimeInterval = setInterval(() => {
      recordUptime(config.ASSET_NAME + ':UPTIME', this.getCurrentUptime());
    }, 1000 * 60);
  }

  stop() {
    this.running = false;
    this.startTime = null;
  }

  getCurrentUptime() {
    if (this.running) {
      let timeRunning = Date.now() - this.startTime;
      let upMinutes = Math.floor(timeRunning / 1000 / 60) % 60;
      let upHours = Math.floor(timeRunning / 1000 / 60 / 60) % 24;
      let upDays = Math.floor(timeRunning / 1000 / 60 / 60 / 24);

      return upDays.toString().padStart(2, "0") + ":" + upHours.toString().padStart(2, "0") + ":" + upMinutes.toString().padStart(2, "0");
    }

    return "00:00:00";
  }
}