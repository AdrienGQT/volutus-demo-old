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
    const blockSize = this.volutus.isColumn
      ? this.volutus.blockSizes.height
      : this.volutus.blockSizes.width;

    this.currentIndex = this.volutus.currentIndex;

    this.currentItemPosition = this.currentIndex * blockSize - blockSize;

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
