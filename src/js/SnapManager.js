export class SnapManager{
    constructor(infiniteSlider){
        console.log('SnapManager initialized')

        this.infiniteSlider = infiniteSlider

        this.snapStrength = 0.02
        infiniteSlider.gui.add(this, 'snapStrength').min(0.001).max(0.15).step(0.002).name('Snap strength')
    }

    snap = () => {
        this.computeSnap()
        this.applySnap()
    }

    computeSnap = () => {
        this.blockHeight = this.infiniteSlider.itemHeight + this.infiniteSlider.gap
        this.currentIndex = this.infiniteSlider.currentIndex
        this.currentItemPosition = (this.currentIndex * this.blockHeight) - this.blockHeight
        this.currentScrollY = this.infiniteSlider.scrollY
        this.deltaToCurrentItemPosition = this.currentScrollY - this.currentItemPosition
        this.currentSnap = this.deltaToCurrentItemPosition * this.snapStrength
    }

    applySnap = () => {
        this.infiniteSlider.targetScrollY -= this.currentSnap
    }
}