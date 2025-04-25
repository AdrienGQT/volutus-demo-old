export class ScrollManager{
    constructor(infiniteSlider){
        console.log('ScrollManager initialized')

        this.infiniteSlider = infiniteSlider
        this.scrollStrength = 0.2
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