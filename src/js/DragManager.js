import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export class DragManager {
  constructor(infiniteSlider) {
    console.log("DragManager initialized");

    this.infiniteSlider = infiniteSlider;
    this.slider = infiniteSlider.slider;

    this.dragStrength = 0.8;

    this.init();
  }

  init = () => {
    this.createProxy();
    this.setDraggable();
  };

  createProxy = () => {
    this.proxy = document.createElement("div");
  };

  setDraggable = () => {
    const handleDragReference = this.handleDrag;

    Draggable.create(this.proxy, {
      type: "y",
      trigger: this.slider,
      onDrag: function () {
        handleDragReference(this.deltaY);
      },
    });
  };

  handleDrag = (deltaY) => {
    this.infiniteSlider.targetScrollY = Math.round(
      this.infiniteSlider.targetScrollY - deltaY * this.dragStrength
    );
  };
}
