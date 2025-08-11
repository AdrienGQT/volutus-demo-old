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
    const config = this.volutus.isColumn
      ? {
          blockSize: this.volutus.blockSizes.height,
        }
      : {
          blockSize: this.volutus.blockSizes.width,
        };

    this.currentIndex = this.volutus.currentIndex;

    this.currentItemPosition =
      this.currentIndex * config.blockSize - config.blockSize;

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
