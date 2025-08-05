import { InfiniteSlider } from "../InfiniteSlider";

export class DragManager {
  constructor() {
    this.infiniteSlider = new InfiniteSlider();

    this.dragStrength = 0.8;
    this.infiniteSlider.debug.ui
      .add(this, "dragStrength")
      .min(0.1)
      .max(1.5)
      .step(0.1)
      .name("Drag strength");

    this.init();

    console.log("DragManager initialized");
  }

  init = () => {
    this.createProxy();
    this.setDraggableForDesktop();
    this.setDraggableForMobile();
    this.setDragCursor();
  };

  createProxy = () => {
    this.proxy = document.createElement("div");
  };

  setDraggableForDesktop = () => {
    this.infiniteSlider.container.addEventListener("mousedown", () => {
      this.infiniteSlider.container.addEventListener("mousemove", this.handleMouseMove);
    });

    this.infiniteSlider.container.addEventListener("mouseup", () => {
      this.infiniteSlider.container.removeEventListener("mousemove", this.handleMouseMove);
    });
  };

  setDraggableForMobile = () => {
    this.infiniteSlider.container.addEventListener("touchstart", this.handleTouchStart);
    this.infiniteSlider.container.addEventListener("touchmove", this.handleTouchMove, {
      passive: false,
    });
    this.infiniteSlider.container.addEventListener("touchend", this.handleTouchEnd);
  };

  handleMouseMove = (e) => {
    e.preventDefault;
    this.handleDrag(e.movementY);
  };

  handleTouchStart = (e) => {
    this.touchStartY = e.touches[0].clientY;
    this.lastTouchY = this.touchStartY;
  };

  handleTouchMove = (e) => {
    e.preventDefault();

    const currentTouchY = e.touches[0].clientY;
    const deltaY = this.lastTouchY - currentTouchY;
    this.lastTouchY = currentTouchY;

    this.handleDrag(-deltaY);
  };

  handleTouchEnd = () => {
    this.touchStartY = 0;
    this.lastTouchY = 0;
  };

  handleDrag = (deltaY) => {
    this.infiniteSlider.targetScrollY = Math.round(
      this.infiniteSlider.targetScrollY - deltaY * this.dragStrength
    );
  };

  setDragCursor = () => {
    this.infiniteSlider.container.style.cursor = "grab";
  };
}
