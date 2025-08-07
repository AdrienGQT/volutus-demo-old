import { Volutus } from "../Volutus";

export class ButtonsManager {
  constructor() {
    this.volutus = new Volutus();

    this.init();

    console.log("ButtonsManager initialized");
  }

  init = () => {
    this.setButtons();
  };

  setButtons = () => {
    if (this.volutus.previousButton)
      this.volutus.previousButton.addEventListener("click", () => {
        this.previousItem();
      });
    if (this.volutus.nextButton)
      this.volutus.nextButton.addEventListener("click", () => {
        this.nextItem();
      });
  };

  previousItem = () => {
    this.volutus.targetScrollY -= this.volutus.blockHeight;
  };

  nextItem = () => {
    this.volutus.targetScrollY += this.volutus.blockHeight;
  };
}
