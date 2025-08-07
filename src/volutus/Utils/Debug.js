import * as gui from "lil-gui";
import { Volutus } from "../Volutus";

export default class Debug {
  constructor() {
    this.ui = new gui.GUI();

    this.volutus = new Volutus();

    this.addTweaks();
  }

  addTweaks = () => {
    this.ui
      .add(this.volutus, "snapStrength")
      .min(0.001)
      .max(0.15)
      .step(0.002)
      .name("Snap strength");
    this.ui
      .add(this.volutus, "lerpFactor")
      .min(0.01)
      .max(0.3)
      .step(0.01)
      .name("Lerp factor");
    if (this.volutus.supportScroll) {
      this.ui
        .add(this.volutus, "scrollStrength")
        .min(0.01)
        .max(1)
        .step(0.01)
        .name("Scroll strength");
    }
    if (this.volutus.supportDrag) {
      this.ui
        .add(this.volutus, "dragStrength")
        .min(0.1)
        .max(1.5)
        .step(0.1)
        .name("Drag strength");
    }
    if (this.volutus.supportButtons) {
      this.ui
        .add(this.volutus.buttonsManager, "previousItem")
        .name("Go to previous");
      this.ui.add(this.volutus.buttonsManager, "nextItem").name("Go to next");
    }
  };
}
