// AppTimer tracks the runtime of the app once it's loaded in the browser
import { recordUptime } from "./utils";

export default class AppTimer {
  constructor() {
    this.running = false;
    this.startTime = null;
  }

  start() {
    this.running = true;
    this.startTime = Date.now();
    this.uptimeInterval = setInterval(() => {
      recordUptime(this.startTime);
    }, 1000 * 60);
  }

  stop() {
    this.running = false;
    this.startTime = null;
  }
}