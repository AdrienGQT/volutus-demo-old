import { InfiniteSlider } from "../InfiniteSlider";

export class ButtonsManager {
  constructor() {
    this.infiniteSlider = new InfiniteSlider();

    this.init();

    console.log("ButtonsManager initialized");
  }

  init = () => {
    this.infiniteSlider.debug.ui
      .add(this, "previousItem")
      .name("Go to previous");
    this.infiniteSlider.debug.ui.add(this, "nextItem").name("Go to next");
  };

  previousItem = () => {
    this.infiniteSlider.targetScrollY -= this.infiniteSlider.blockHeight;
  };

  nextItem = () => {
    this.infiniteSlider.targetScrollY += this.infiniteSlider.blockHeight;
  };
}
