export class ScrollManager{
    constructor(infiniteSlider){
        console.log('ScrollManager initialized')

        this.infiniteSlider = infiniteSlider
        this.scrollStrength = 0.2
        infiniteSlider.gui.add(this, 'scrollStrength').min(0.01).max(1).step(0.01).name('Scroll strength')
        this.init()
    }
    
    init = () => {
        this.setEventListener()
    }

    setEventListener = () => {
        window.addEventListener('wheel', (e) => {
            this.infiniteSlider.targetScrollY = Math.round(this.infiniteSlider.targetScrollY - e.wheelDeltaY * this.scrollStrength);
        })
    }
}