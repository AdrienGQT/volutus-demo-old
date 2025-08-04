import { InfiniteSlider } from "../InfiniteSlider";

export class SnapManager {
  constructor() {
    this.infiniteSlider = new InfiniteSlider();

    this.snapStrength = 0.02;
    this.infiniteSlider.debug.ui
      .add(this, "snapStrength")
      .min(0.001)
      .max(0.15)
      .step(0.002)
      .name("Snap strength");

    console.log("SnapManager initialized");
  }

  snap = () => {
    this.computeSnap();
    this.applySnap();
  };

  computeSnap = () => {
    this.currentIndex = this.infiniteSlider.currentIndex;
    this.currentItemPosition =
      this.currentIndex * this.infiniteSlider.blockHeight -
      this.infiniteSlider.blockHeight;
    this.currentScrollY = this.infiniteSlider.scrollY;
    this.deltaToCurrentItemPosition =
      this.currentScrollY - this.currentItemPosition;
    this.currentSnap = this.deltaToCurrentItemPosition * this.snapStrength;
  };

  applySnap = () => {
    this.infiniteSlider.targetScrollY -= this.currentSnap;
  };
}
