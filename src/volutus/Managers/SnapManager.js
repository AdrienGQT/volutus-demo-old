import { Volutus } from "../Volutus";

export class SnapManager {
  constructor() {
    this.volutus = new Volutus();

    console.log("SnapManager initialized");
  }

  snap = () => {
    this.computeSnap();
    this.applySnap();
  };

  computeSnap = () => {
    this.currentIndex = this.volutus.currentIndex;

    this.currentItemPosition =
      this.currentIndex * this.volutus.blockHeight - this.volutus.blockHeight;

    this.currentScrollY = this.volutus.scrollY;

    this.deltaToCurrentItemPosition =
      this.currentScrollY - this.currentItemPosition;

    this.currentSnap =
      this.deltaToCurrentItemPosition * this.volutus.snapStrength;
  };

  applySnap = () => {
    this.volutus.targetScrollY -= this.currentSnap;
  };
}
