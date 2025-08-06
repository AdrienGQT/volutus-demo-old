import { Volutus } from "../Volutus";

export class ButtonsManager {
  constructor() {
    this.volutus = new Volutus();

    this.init();

    console.log("ButtonsManager initialized");
  }

  init = () => {
    this.volutus.debug.ui
      .add(this, "previousItem")
      .name("Go to previous");
    this.volutus.debug.ui.add(this, "nextItem").name("Go to next");
  };

  previousItem = () => {
    this.volutus.targetScrollY -= this.volutus.blockHeight;
  };

  nextItem = () => {
    this.volutus.targetScrollY += this.volutus.blockHeight;
  };
}
