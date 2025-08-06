import { Volutus } from "../Volutus";

export class SnapManager {
  constructor() {
    this.volutus = new Volutus();

    this.snapStrength = 0.02;
    this.volutus.debug.ui
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
    this.currentIndex = this.volutus.currentIndex;
    this.currentItemPosition =
      this.currentIndex * this.volutus.blockHeight -
      this.volutus.blockHeight;
    this.currentScrollY = this.volutus.scrollY;
    this.deltaToCurrentItemPosition =
      this.currentScrollY - this.currentItemPosition;
    this.currentSnap = this.deltaToCurrentItemPosition * this.snapStrength;
  };

  applySnap = () => {
    this.volutus.targetScrollY -= this.currentSnap;
  };
}
