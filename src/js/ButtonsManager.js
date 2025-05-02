export class ButtonsManager{
    constructor(infiniteSlider){
        console.log('ButtonsManager initialized')

        this.infiniteSlider = infiniteSlider

        this.init()
    }

    init = () => {
        this.infiniteSlider.gui.add(this, 'previousItem').name('Go to previous')
        this.infiniteSlider.gui.add(this, 'nextItem').name('Go to next')
    }

    previousItem = () => {
        this.infiniteSlider.targetScrollY -= this.infiniteSlider.blockHeight
    }

    nextItem = () => {
        this.infiniteSlider.targetScrollY += this.infiniteSlider.blockHeight
        
    }
}