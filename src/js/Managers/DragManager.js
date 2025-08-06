import { Volutus } from "../Volutus";

export class DragManager {
  constructor() {
    this.volutus = new Volutus();

    this.dragStrength = 0.8;
    this.volutus.debug.ui
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
    this.volutus.container.addEventListener("mousedown", () => {
      this.volutus.container.addEventListener("mousemove", this.handleMouseMove);
    });

    this.volutus.container.addEventListener("mouseup", () => {
      this.volutus.container.removeEventListener("mousemove", this.handleMouseMove);
    });
  };

  setDraggableForMobile = () => {
    this.volutus.container.addEventListener("touchstart", this.handleTouchStart);
    this.volutus.container.addEventListener("touchmove", this.handleTouchMove, {
      passive: false,
    });
    this.volutus.container.addEventListener("touchend", this.handleTouchEnd);
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
    this.volutus.targetScrollY = Math.round(
      this.volutus.targetScrollY - deltaY * this.dragStrength
    );
  };

  setDragCursor = () => {
    this.volutus.container.style.cursor = "grab";
  };
}
