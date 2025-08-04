import { InfiniteSlider } from "../InfiniteSlider";

export class ScrollManager {
  constructor() {
    this.infiniteSlider = new InfiniteSlider();
    this.scrollStrength = 0.2;
    this.infiniteSlider.debug.ui
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
      this.infiniteSlider.targetScrollY = Math.round(
        this.infiniteSlider.targetScrollY - e.wheelDeltaY * this.scrollStrength
      );
    });
  };
}
