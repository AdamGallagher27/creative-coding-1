

class HorBarChart {
    // constructs object
    constructor(_height, _width, _posX, _posY, _data, _xLable = '', _yLable = '') {
        this.height = _height
        this.width = _width
        this.posX = _posX
        this.posY = _posY
        this.data = _data
        this.xLable = _xLable
        this.yLable = _yLable

        // globals
        this.nBlocks = this.data.length
        this.marginL = 20
        this.marginT = 10
        this.marginB = 10
        this.marginAxisT = 60
        this.marginAxisL = 60
        this.tickMargin = 10
        this.tickWidth = -6
        this.nTicks = this.data.length
        this.nBottomTitles = 4  

        this.blockWidth = (this.height - (this.marginL * 2) - ((this.nBlocks - 1))) / this.nBlocks
        this.maxVal = Math.max(...this.data.map(obj => obj.value))

        this.scaleData = this.height / this.maxVal;

        // colors
        this.colorIndex = 0
        this.colors = ['#004c6d', '#4c7c9b', '#86b0cc', '#c1e7ff']
        this.firstPass = true
    }


    render() {
        push()
        translate(this.posX, this.posY)
        this.drawAxis()
        this.drawAxis(false)
        this.drawBars(this.data)
        this.valueTitles()
        this.axisTitles()
        pop()
    }

    // draws the vertical axis
    drawAxis(vertical = true, lable = true) {
        noFill()
        stroke(50)

        // if vertical is true draw the vertical line
        if (vertical) {
            line(0, 0, 0, -this.height)
        }
        // else draw horizontal line
        else {
            line(0, 0, this.width + this.marginL, 0)
        }


        // if lable is true show the ticks / lables
        if (lable) {

            push()
            // gaps between ticks
            let tGap = this.height / this.nTicks

            translate(0, -tGap / 2)

            // draw each tick
            for (let i = 0; i < this.nTicks; i++) {
                noStroke()
                textAlign(RIGHT, CENTER)
                fill(0)
                text(this.data[i].year, -this.tickMargin, i * -tGap)
                stroke(100)
                line(0, i * -tGap, this.tickWidth, -i * tGap)
            }

            pop()
        }

    }


    valueTitles() {
        noStroke()
        const gap = this.width / this.nBottomTitles
        const textMargin = 16

        for (let i = 0; i < this.nBottomTitles + 1; i++) {

            const numGap = this.maxVal / this.nTicks
            fill(0)
            text(numGap.toFixed(0) * i, gap * i, textMargin)
        }
    }

    // draws the bars on the chart
    drawBars() {

        // data converted to an array of heights that are the right scale
        let scaleData = this.scaleChart(this.data)

        noStroke()
        let tGap = (this.height / this.nTicks) 


        // draw each bar
        for (let i = 0; i < this.nBlocks; i++) {
            push();
            rotate(-90)
            translate((i * tGap), 0)
            fill(this.colorBar())
            rect(0, 0, this.blockWidth, scaleData[i]);
            pop();
        }
    }

    // scales data array
    scaleChart(arr) {
        let scaleValue = this.width / this.maxVal;
        let final = []

        for (let i = 0; i < arr.length; i++) {
            final.push(arr[i].value * scaleValue)
        }

        return final
    }


    // draws the titles for each axis
    axisTitles() {
        textSize(18)
        textAlign(CENTER)
        noStroke()

        // X axis lable
        text(this.xLable, this.width / 2, this.marginAxisT)

        // Y axis lable
        rotate(-90)
        text(this.yLable, this.height / 2, -this.marginAxisL)
    }

    // color bars
    colorBar() {

        // if its the first pass display the first colour
        if (this.colorIndex === 0 && this.firstPass) {
            this.firstPass = false
            return color(this.colors[this.colorIndex])
        }

        // increment color index
        this.colorIndex += 1

        // if index is greater than length reset
        if (this.colorIndex === this.colors.length) {
            this.colorIndex = 0
        }

        // return the colour at colour index
        return color(this.colors[this.colorIndex])
    }

}