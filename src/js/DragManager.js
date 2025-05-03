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
    this.setDraggableForDesktop();
    this.setDraggableForMobile();
    this.setDragCursor()
  };

  createProxy = () => {
    this.proxy = document.createElement("div");
  };

  setDraggableForDesktop = () => {
    this.slider.addEventListener('mousedown', () => {
      this.slider.addEventListener('mousemove', this.handleMouseMove)
    })

    this.slider.addEventListener('mouseup', () => {
      this.slider.removeEventListener('mousemove',this.handleMouseMove)
    })
  };

  setDraggableForMobile = () => {
    this.slider.addEventListener('touchstart', this.handleTouchStart);
    this.slider.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    this.slider.addEventListener('touchend', this.handleTouchEnd);
  }

  handleMouseMove = (e) => {
    e.preventDefault
    this.handleDrag(e.movementY)
  }

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
    this.slider.style.cursor = "grab"
  }
}
