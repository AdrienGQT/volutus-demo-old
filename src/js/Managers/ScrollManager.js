import { Volutus } from "../Volutus";

export class ScrollManager {
  constructor() {
    this.volutus = new Volutus();

    this.init();

    console.log("ScrollManager initialized");
  }

  init = () => {
    this.setEventListener();
  };

  setEventListener = () => {
    window.addEventListener("wheel", (e) => {
      this.volutus.targetScrollY = Math.round(
        this.volutus.targetScrollY - e.wheelDeltaY * this.volutus.scrollStrength
      );
    });
  };
}
