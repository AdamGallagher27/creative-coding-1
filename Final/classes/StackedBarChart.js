
class StackedBarChart {
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
        this.valGap = 5
        this.nBlocks = this.data.length
        this.marginL = 20
        this.marginT = 10
        this.marginB = 10
        this.marginAxisT = 120
        this.marginAxisL = 50
        this.tickWidth = 10
        this.nTicks = 4
        this.blockWidth = (this.width - (this.marginL * 2) - ((this.nBlocks - 1))) / this.nBlocks
        this.mainGap = this.blockWidth + this.valGap
        this.maxVal = Math.max(...this.data.map(o => int(o.total)))



        // colors
        this.colorIndex = 0
        this.colors = ['#004c6d', '#4c7c9b', '#86b0cc', '#c1e7ff']
        this.firstPass = true
    }


    render() {
        console.log(this.maxVal)
        console.log(this.data)
        push()
        translate(this.posX, this.posY)
        this.scaleChart(this.data)
        this.drawAxis()
        this.drawAxis(false)
        this.drawBars()
        pop()
    }

    // scales data array
    scaleChart(arr) {
        let scaleValue = this.height / this.maxVal;
        let final = []

        for (let i = 0; i < arr.length; i++) {
            final.push(arr[i].total * scaleValue)
        }

        return final
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

            // gaps between ticks
            let tGap = this.height / this.nTicks

            // value to display beside each tick
            let numGap = this.maxVal / this.nTicks

            // draw each tick
            for (let i = 0; i <= this.nTicks; i++) {
                noStroke()
                textAlign(RIGHT, CENTER)
                fill(0)
                text(i * numGap.toFixed(0), -this.tickWidth, i * -tGap)
                stroke(100)
                line(0, i * -tGap, -6, -i * tGap)
            }
        }
    }


    // draws the bars on the chart
    drawBars() {

        // data converted to an array of heights that are the right scale
        let scaleValue = this.height / this.maxVal;

        // console.log(scaleData)
        // console.log("--------------------------")

        noStroke()

        // draw each bar
        for (let i = 0; i < this.nBlocks; i++) {

            push();
            translate(this.marginL + (i * this.mainGap), 0)
            
            const current = this.data[i]

            Object.keys(current).forEach((key, index )=> {
                console.log(key)
                if(index != 0) {
                    console.log(int(current[key]) * scaleValue)
                    fill(index * 10)
                    rect(index * 2, 0, this.blockWidth, -int(current[key]) * scaleValue)
                }
            })


            // rect(0, 0, this.blockWidth, -scaleData[i]);
            // this.barTitle(scaleData[i], this.data[i].percent, this.data[i].type)
            pop();

        }
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
