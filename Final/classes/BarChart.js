
class BarChart {
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
        this.marginAxisT = 70
        this.marginAxisL = 50
        this.tickWidth = 10
        this.nTicks = 5
        this.blockWidth = (this.width - (this.marginL * 2) - ((this.nBlocks - 1))) / this.nBlocks
        this.mainGap = this.blockWidth + this.valGap
        this.maxVal = Math.max(...this.data.map(object => object.value))

        // colors
        this.colorIndex = 0
        this.colors = ['#004c6d', '#4c7c9b', '#86b0cc', '#c1e7ff']
        this.firstPass = true
    }




    // renders the chart
    render() {
        push()
        translate(this.posX, this.posY)
        this.drawBars()
        this.drawAxis()
        this.drawAxis(false)
        this.axisTitles()
        pop()
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

            // gaps between ticks
            let tGap = this.height / this.nTicks

            // value to display beside each tick
            let numGap = this.maxVal / this.nTicks

            // draw each tick
            for(let i = 0; i <= this.nTicks; i++) {
                noStroke()
                textAlign(RIGHT, CENTER)
                fill(0)
                text(i*numGap.toFixed(0), -this.tickWidth, i*-tGap)
                stroke(0)
                line(0, i*-tGap, -6, -i*tGap)
            }
        }

    }


    barTitle(height, value, title) {
        fill(0)
        const xAxis = (this.blockWidth / 2)
        textAlign(CENTER)
        text(value, xAxis, -height - this.marginT)
        translate(xAxis, this.marginB)
        push()
        textAlign(RIGHT, TOP)
        rotate(-50)
        text(title, 0, 0)
        pop()
    }


    // draws the bars on the chart
    drawBars() {

        // data converted to an array of heights that are the right scale
        let scaleData = this.scaleChart(this.data)

        noStroke()

        // draw each bar
        for (let i = 0; i < this.nBlocks; i++) {
            push();
            translate(this.marginL + (i * this.mainGap), 0)
            fill(this.colorBar())
            rect(0, 0, this.blockWidth, -scaleData[i]);
            this.barTitle(scaleData[i], this.data[i].value, this.data[i].name)
            pop();
        }
    }

    // scales data array
    scaleChart(arr) {
        let scaleValue = this.height / this.maxVal;
        let final = []

        for (let i = 0; i < arr.length; i++) {
            final.push(arr[i].value * scaleValue)
        }

        return final
    }

    // color bars
    colorBar() {

        // if its the first pass display the first colour
        if(this.colorIndex === 0 && this.firstPass) {
            this.firstPass = false
            return color(this.colors[this.colorIndex]) 
        }

        // increment color index
        this.colorIndex += 1

        // if index is greater than length reset
        if(this.colorIndex === this.colors.length) {
            this.colorIndex = 0
        }

        // return the colour at colour index
        return color(this.colors[this.colorIndex])
    }
    
}