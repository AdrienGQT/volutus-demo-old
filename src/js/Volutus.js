import "../volutus.css";
import { ScrollManager } from "./Managers/ScrollManager";
import { DragManager } from "./Managers/DragManager";
import { SnapManager } from "./Managers/SnapManager";
import { ButtonsManager } from "./Managers/ButtonsManager";
import Debug from "./Utils/Debug";

let instance = null;

export class Volutus {
  constructor(parameters) {
    if (instance) {
      return instance;
    }

    instance = this;

    this.debug = new Debug();

    this.container = null;
    this.items = null;

    this.supportScroll = true;
    this.supportDrag = true;
    this.supportButtons = true;

    this.setValues(parameters)

    this.itemQuantity = this.items.length;
    this.gap = 5;
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
  }

  setValues(values) {
    if (values === undefined) {
      console.warn("Volutus: no parameter were provided");
      return;
    }

    for (const key in values) {
      const newValue = values[key];

      if (newValue === undefined) {
        console.warn(`Volutus: parameter '${key}' has value of undefined.`);
        continue;
      }

      const currentValue = this[key];

      if (currentValue === undefined) {
        console.warn(`Volutus: '${key}' is not a property of Volutus.`);
        continue;
      }

      this[key] = newValue;
    }
  }

  init = () => {
    this.applyRequiredStyles();
    this.instantiateManagers();
    this.getSizes();
    this.calculateCenterOffset();
    this.getInitialValue();
    this.updateItems();
    this.animate();
  };

  applyRequiredStyles = () => {
    this.applyContainerRequiredStyle();
    this.applyItemsRequiredStyle();
  };

  applyContainerRequiredStyle = () => {
    this.container.classList.add("volutusContainer");
  };

  applyItemsRequiredStyle = () => {
    this.items.forEach((item) => {
      item.classList.add("volutusItem");
    });
  };

  instantiateManagers = () => {
    if (this.supportScroll) {
      this.scrollManager = new ScrollManager();
    }
    if (this.supportDrag) {
      this.dragManager = new DragManager();
    }
    if (this.supportButtons) {
      this.buttonsManager = new ButtonsManager();
    }
    this.snapManager = new SnapManager();
  };

  getSizes = () => {
    this.itemHeight = this.items[0].getBoundingClientRect().height;
    this.blockHeight = this.itemHeight + this.gap;
    this.sliderBlocksTotalHeight =
      (this.itemHeight + this.gap) * this.itemQuantity;
  };

  calculateCenterOffset = () => {
    this.containerHeight = this.container.getBoundingClientRect().height;
    this.centerOffset = (this.containerHeight - this.itemHeight) / 2;
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
        ((basePosition - this.scrollY) % this.sliderBlocksTotalHeight);

      if (adjustedPosition < -this.initialValue) {
        adjustedPosition += this.sliderBlocksTotalHeight;
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
    this.items[this.currentItemIndex].classList.add("volutusItemSelected");
  };

  removeSelectedStyle = () => {
    this.items[this.previousItemIndex].classList.remove("volutusItemSelected");
    this.items[this.nextItemIndex].classList.remove("volutusItemSelected");
  };
}
