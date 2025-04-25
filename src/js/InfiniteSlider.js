import { gsap } from "gsap";
import { ScrollManager } from "./ScrollManager";
import { DragManager } from "./DragManager";
import { SnapManager } from "./SnapManager";

export class InfiniteSlider {
  constructor() {
    console.log('InfiniteSlider initialized')

    this.itemQuantity = 5;
    this.gap = 20;
    this.itemsToUpdate = [];
    this.lerpFactor = 0.05;

    this.currentIndex = 0;
    this.currentItemIndex = this.currentIndex % this.itemQuantity;
    this.targetScrollY = 0;
    this.scrollY = 0;

    this.animate = this.animate.bind(this);

    this.init();
  }

  init = () => {
    this.cacheDOM();
    this.instantiateManagers()
    this.getSizes();
    this.calculateCenterOffset();
    this.getInitialValue();
    this.editItemTemplate();
    this.removeItemTemplate();
    this.setItems();
    this.updateItems();
    this.animate();
  };

  cacheDOM = () => {
    this.slider = document.querySelector("#slider");
    this.item = this.slider.querySelector("#item");
  };

  instantiateManagers = () => {
    new ScrollManager(this);
    new DragManager(this);
    this.snapManager = new SnapManager(this)
  }

  getSizes = () => {
    this.itemHeight = this.item.getBoundingClientRect().height;
    this.containerHeight = (this.itemHeight + this.gap) * this.itemQuantity;
  };

  calculateCenterOffset = () => {
    this.viewportHeight = window.innerHeight;
    this.centerOffset = (this.viewportHeight - this.itemHeight) / 2;
  };

  getInitialValue = () => {
    this.initialValue = this.itemHeight + this.gap;
  };

  editItemTemplate = () => {
    this.item.removeAttribute("id");
  };

  removeItemTemplate = () => {
    this.item.remove();
  };

  setItems = () => {
    for (let i = 0; i < this.itemQuantity; i++) {
      const clone = this.item.cloneNode(true);
      this.editItem(clone, i);
      this.itemsToUpdate.push(clone);
      this.slider.appendChild(clone);
    }
  };

  editItem = (item, index) => {
    const itemTitle = item.children[0];
    itemTitle.innerText = `Item ${index}`;
  };

  updateItems = () => {
    this.itemsToUpdate.forEach((cover, index) => {
      let basePosition = index * (this.itemHeight + this.gap) + this.centerOffset;
      let adjustedPosition = -this.initialValue + ((basePosition - this.scrollY) % this.containerHeight);
      
      if (adjustedPosition < -this.initialValue) {
        adjustedPosition += this.containerHeight;
      }

      gsap.to(cover, {
        top: adjustedPosition,
        duration: 0,
      });
    });
  };

  animate = () => {
    this.scrollY += (this.targetScrollY - this.scrollY) * this.lerpFactor;

    this.updateItems();
    this.computeIndexes()
    this.snapManager.snap()
    requestAnimationFrame(this.animate);
  };

  computeIndexes = () => {
    this.currentIndex = Math.round(this.scrollY / (this.itemHeight + this.gap)) + 1
    this.currentItemIndex = ((this.currentIndex % this.itemQuantity) + this.itemQuantity) % this.itemQuantity;
  }

}
