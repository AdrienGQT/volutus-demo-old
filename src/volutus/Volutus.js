import "./css/volutus.css";
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

    this.debug = null;

    // Parameters
    this.container = null;
    this.items = null;

    this.previousButton = null;
    this.nextButton = null;

    this.supportScroll = true;
    this.supportDrag = true;
    this.supportButtons = true;

    this.gap = 12;

    this.scrollStrength = 0.2;
    this.dragStrength = 1.5;
    this.snapStrength = 0.02;

    this.lerpFactor = 0.05;

    this.displayDebug = false;

    // Set values
    this.setValues(parameters);

    this.itemQuantity = this.items.length;

    this.itemSizes = {}
    this.containerSizes = {}
    this.sliderSizes = {}

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
    this.instantiateDebug();
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

  instantiateDebug = () => {
    if (this.displayDebug) this.debug = new Debug();
  };

  instantiateManagers = () => {
    if (this.supportScroll) this.scrollManager = new ScrollManager();
    if (this.supportDrag) this.dragManager = new DragManager();
    if (this.supportButtons) this.buttonsManager = new ButtonsManager();
    this.snapManager = new SnapManager();
  };

  getSizes = () => {
    this.itemSizes.height = this.items[0].getBoundingClientRect().height;
    this.blockHeight = this.itemSizes.height + this.gap;
    this.sliderSizes.height =
      (this.itemSizes.height + this.gap) * this.itemQuantity;
  };

  calculateCenterOffset = () => {
    this.containerSizes.height = this.container.getBoundingClientRect().height;
    this.centerOffset = (this.containerSizes.height - this.itemSizes.height) / 2;
  };

  getInitialValue = () => {
    this.initialValue = this.itemSizes.height + this.gap;
  };

  updateItems = () => {
    this.items.forEach((cover, index) => {
      let basePosition =
        index * (this.itemSizes.height + this.gap) + this.centerOffset;
      let adjustedPosition =
        -this.initialValue +
        ((basePosition - this.scrollY) % this.sliderSizes.height);

      if (adjustedPosition < -this.initialValue) {
        adjustedPosition += this.sliderSizes.height;
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
      Math.round(this.scrollY / (this.itemSizes.height + this.gap)) + 1;
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
