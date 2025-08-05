import { ScrollManager } from "./Managers/ScrollManager";
import { DragManager } from "./Managers/DragManager";
import { SnapManager } from "./Managers/SnapManager";
import { ButtonsManager } from "./Managers/ButtonsManager";
import Debug from "./Utils/Debug";

let instance = null;

export class InfiniteSlider {

  constructor(container, items) {
    if (instance) {
      return instance;
    }

    instance = this;

    this.debug = new Debug();

    this.container = container
    this.items = items

    this.itemQuantity = this.items.length;
    this.gap = 20;
    this.lerpFactor = 0.05;
    this.debug.ui
      .add(this, "lerpFactor")
      .min(0.01)
      .max(0.3)
      .step(0.01)
      .name("Lerp factor");

    this.currentIndex = 0;
    this.currentItemIndex =
      ((this.currentIndex % this.itemQuantity) + this.itemQuantity) %
      this.itemQuantity;
    this.previousItemIndex =
      (((this.currentIndex - 1) % this.itemQuantity) + this.itemQuantity) %
      this.itemQuantity;
    this.nextItemIndex =
      (((this.currentIndex + 1) % this.itemQuantity) + this.itemQuantity) %
      this.itemQuantity;
    this.targetScrollY = 0;
    this.scrollY = 0;

    this.animate = this.animate.bind(this);

    this.init();

    console.log("InfiniteSlider initialized");
  }

  init = () => {
    this.instantiateManagers();
    this.getSizes();
    this.calculateCenterOffset();
    this.getInitialValue();
    this.updateItems();
    this.animate();
  };

  instantiateManagers = () => {
    this.ScrollManager = new ScrollManager();
    this.DragManager = new DragManager();
    this.snapManager = new SnapManager();
    this.ButtonsManager = new ButtonsManager();
  };

  getSizes = () => {
    this.itemHeight = this.items[0].getBoundingClientRect().height;
    this.blockHeight = this.itemHeight + this.gap;
    this.containerHeight = (this.itemHeight + this.gap) * this.itemQuantity;
  };

  calculateCenterOffset = () => {
    this.viewportHeight = window.innerHeight;
    this.centerOffset = (this.viewportHeight - this.itemHeight) / 2;
  };

  getInitialValue = () => {
    this.initialValue = this.itemHeight + this.gap;
  };

  updateItems = () => {
    this.items.forEach((cover, index) => {
      let basePosition =
        index * (this.itemHeight + this.gap) + this.centerOffset;
      let adjustedPosition =
        -this.initialValue +
        ((basePosition - this.scrollY) % this.containerHeight);

      if (adjustedPosition < -this.initialValue) {
        adjustedPosition += this.containerHeight;
      }

      cover.style.top = `${adjustedPosition}px`;
    });
  };

  animate = () => {
    this.scrollY += (this.targetScrollY - this.scrollY) * this.lerpFactor;
    this.updateItems();
    this.computeIndexes();
    this.snapManager.snap();
    this.refreshStyle();
    requestAnimationFrame(this.animate);
  };

  computeIndexes = () => {
    this.currentIndex =
      Math.round(this.scrollY / (this.itemHeight + this.gap)) + 1;
    this.currentItemIndex =
      ((this.currentIndex % this.itemQuantity) + this.itemQuantity) %
      this.itemQuantity;
    this.previousItemIndex =
      (((this.currentIndex - 1) % this.itemQuantity) + this.itemQuantity) %
      this.itemQuantity;
    this.nextItemIndex =
      (((this.currentIndex + 1) % this.itemQuantity) + this.itemQuantity) %
      this.itemQuantity;
  };

  refreshStyle = () => {
    this.removeSelectedStyle();
    this.applySelectedStyle();
  };

  applySelectedStyle = () => {
    this.items[this.currentItemIndex].classList.add("selected");
  };

  removeSelectedStyle = () => {
    this.items[this.previousItemIndex].classList.remove("selected");
    this.items[this.nextItemIndex].classList.remove("selected");
  };
}
