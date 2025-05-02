import { ScrollManager } from "./ScrollManager";
import { DragManager } from "./DragManager";
import { SnapManager } from "./SnapManager";
import { ButtonsManager } from "./ButtonsManager";

export class InfiniteSlider {
  constructor(gui) {
    console.log('InfiniteSlider initialized')

    this.gui = gui

    this.itemQuantity = 5;
    this.gap = 20;
    this.itemsToUpdate = [];
    this.lerpFactor = 0.05;
    this.gui.add(this, 'lerpFactor').min(0.01).max(0.3).step(0.01).name('Lerp factor')

    this.currentIndex = 0;
    this.currentItemIndex = ((this.currentIndex % this.itemQuantity) + this.itemQuantity) % this.itemQuantity;
    this.previousItemIndex = (((this.currentIndex - 1) % this.itemQuantity) + this.itemQuantity) % this.itemQuantity
    this.nextItemIndex = (((this.currentIndex + 1) % this.itemQuantity) + this.itemQuantity) % this.itemQuantity
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
    new ButtonsManager(this)
  }

  getSizes = () => {
    this.itemHeight = this.item.getBoundingClientRect().height;
    this.blockHeight = this.itemHeight + this.gap
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

      cover.style.top = `${adjustedPosition}px`
    });
  };

  animate = () => {
    this.scrollY += (this.targetScrollY - this.scrollY) * this.lerpFactor;

    this.updateItems();
    this.computeIndexes()
    this.snapManager.snap()
    this.refreshStyle()
    requestAnimationFrame(this.animate);
  };

  computeIndexes = () => {
    this.currentIndex = Math.round(this.scrollY / (this.itemHeight + this.gap)) + 1
    this.currentItemIndex = ((this.currentIndex % this.itemQuantity) + this.itemQuantity) % this.itemQuantity;
    this.previousItemIndex = (((this.currentIndex - 1) % this.itemQuantity) + this.itemQuantity) % this.itemQuantity
    this.nextItemIndex = (((this.currentIndex + 1) % this.itemQuantity) + this.itemQuantity) % this.itemQuantity
  }

  refreshStyle = () => {
    this.removeSelectedStyle()
    this.applySelectedStyle()
  }

  applySelectedStyle = () => {
    this.itemsToUpdate[this.currentItemIndex].classList.add('selected')
  }

  removeSelectedStyle = () => {
    this.itemsToUpdate[this.previousItemIndex].classList.remove('selected')
    this.itemsToUpdate[this.nextItemIndex].classList.remove('selected')
  }

}
