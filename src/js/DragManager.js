export class DragManager {
  constructor(infiniteSlider) {
    console.log("DragManager initialized");

    this.infiniteSlider = infiniteSlider;
    this.slider = infiniteSlider.slider;

    this.dragStrength = 0.8;
    infiniteSlider.gui.add(this, 'dragStrength').min(0.1).max(1.5).step(0.1).name('Drag strength')

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
    this.slider.addEventListener('mousedown', () => {
      this.slider.addEventListener('mousemove', this.handleMouseMove)
    })

    this.slider.addEventListener('mouseup', () => {
      this.slider.removeEventListener('mousemove',this.handleMouseMove)
    })

    this.setDragCursor()
  };

  setDragCursor = () => {
    this.slider.style.cursor = "grab"
  }

  handleMouseMove = (e) => {
    e.preventDefault
    this.handleDrag(e.movementY)
  }

  handleDrag = (deltaY) => {
    console.log(deltaY)
    this.infiniteSlider.targetScrollY = Math.round(
      this.infiniteSlider.targetScrollY - deltaY * this.dragStrength
    );
  };
}
