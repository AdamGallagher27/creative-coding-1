

class HorBarChart {
    // constructs object
    constructor(_height, _width, _posX, _posY, _data, _xLable='', _yLable='') {
        this.height = _height
        this.width = _width
        this.posX = _posX
        this.posY = _posY
        this.data = _data
        this.xLable = _xLable
        this.yLable = _yLable

        // globals
        this.valGap = 5
        this.nBlocks = this.data.length
        this.marginL = 20
        this.marginT = 10
        this.marginB = 10
        this.marginAxisT = 120
        this.marginAxisL = 50
        this.tickWidth = 10
        this.nTicks = this.data.length
        this.nBottomTitles = 4

        this.blockWidth = (this.width - (this.marginL * 2) - ((this.nBlocks - 1))) / this.nBlocks
        this.mainGap = this.blockWidth + this.valGap
        this.maxVal = Math.max(...this.data.map(obj => obj.percent))
        
        this.scaleData = this.height / this.maxVal;

        // colors
        this.colorIndex = 0
        this.colors = ['#004c6d', '#4c7c9b', '#86b0cc', '#c1e7ff']
        this.firstPass = true
    }


    render() {
        push()
            console.log(this.data)
            translate(this.posX, this.posY)
            this.drawAxis()
            this.drawAxis(false)
            this.valueTitles()
        pop()
    }

    // draws the vertical axis
    drawAxis(vertical=true, lable=true) {
        noFill()
        stroke(50)

        // if vertical is true draw the vertical line
        if(vertical) {
            line(0, 0, 0, -this.height)    
        }
        // else draw horizontal line
        else {
            line(0, 0, this.width + this.marginL, 0)
        }


        // if lable is true show the ticks / lables
        if(lable) {

            push()
            // gaps between ticks
            let tGap = this.height / this.nTicks
            
            translate(0, -tGap / 2)

            // draw each tick
            for(let i = 0; i < this.nTicks; i++) {
                noStroke()
                textAlign(RIGHT, CENTER)
                fill(0)
                text(this.data[i].type, -this.tickWidth, i*-tGap)
                stroke(100)
                line(0, i*-tGap, -6, -i*tGap)
            }

            pop()
        }

    }


    valueTitles() {
        noStroke()
        const gap  = this.width / this.nBottomTitles
        const textMargin = 16

        for(let i = 0; i < this.nBottomTitles + 1; i++) {

            const numGap = this.maxVal / this.nTicks
            fill(0)
            text(numGap.toFixed(0) * i, gap * i, textMargin)
        }
    }
    
}