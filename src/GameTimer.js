// GameTimer tracks how long a game is being played
import { recordGametime } from "./utils";

export default class GameTimer {
  constructor(props) {
    this.romName = props.romName;

    this.running = false;
    this.startTime = null;
  }

  start() {
    this.running = true;
    this.startTime = Date.now();
  }

  stop() {
    // Record GameTime before stopping timer
    recordGametime(this.romName, this.startTime);
    this.running = false;
    this.startTime = null;
  }
}