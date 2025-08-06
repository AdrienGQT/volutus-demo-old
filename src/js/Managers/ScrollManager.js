import { Volutus } from "../Volutus";

export class ScrollManager {
  constructor() {
    this.volutus = new Volutus();
    this.scrollStrength = 0.2;
    this.volutus.debug.ui
      .add(this, "scrollStrength")
      .min(0.01)
      .max(1)
      .step(0.01)
      .name("Scroll strength");
    this.init();

    console.log("ScrollManager initialized");
  }

  init = () => {
    this.setEventListener();
  };

  setEventListener = () => {
    window.addEventListener("wheel", (e) => {
      this.volutus.targetScrollY = Math.round(
        this.volutus.targetScrollY - e.wheelDeltaY * this.scrollStrength
      );
    });
  };
}
