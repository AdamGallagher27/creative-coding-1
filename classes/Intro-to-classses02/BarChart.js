
class BarChart {
    // constructs object
    constructor(_height, _width, _posX, _posY, _data, xLable=false, Ylable=false) {
        this.height = _height
        this.width = _width
        this.posX = _posX
        this.posY = _posY
        this.data = _data

        this.valGap = 5
        this.nBlocks = this.data.length
        this.marginL = 20
        this.marginT = 10
        this.tickWidth = 10
        this.nTicks = 5
        this.blockWidth = (this.width - (this.marginL * 2) - ((this.nBlocks - 1))) / this.nBlocks
        this.mainGap = this.blockWidth + this.valGap
        // this.maxVal = Math.max(...this.data.value);
        this.maxVal = Math.max(...this.data.map(object => object.value))
    }

    // renders the chart
    render() {
        push()
        translate(this.posX, this.posY)
        this.drawBars()
        this.drawAxis()
        this.drawAxis(false)
        pop()
    }

    // draws the vertical axis
    drawAxis(vertical=true, lable=true) {
        noFill()
        stroke(50)

        if(vertical) {
            line(0, 0, 0, -this.height)    
        }
        else {
            line(0, 0, this.width, 0)
        }


        // if lable is true show the ticks / lables
        if(lable) {
            let tGap = this.height / this.nTicks
            let numGap = this.maxVal / this.nTicks

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


    barTitle(height, value) {
        fill(0)
        const xAxis = (this.blockWidth / 2)
        textAlign(CENTER)
        text(value, xAxis, -height - this.marginT)
    }


    // draws the bars on the chart
    drawBars() {

        let scaleData = this.scaleChart(this.data)

        noStroke()
        for (let i = 0; i < this.nBlocks; i++) {
            push();
            translate(this.marginL + (i * this.mainGap), 0)
            fill(scaleData[i], 0, 0)
            rect(0, 0, this.blockWidth, -scaleData[i]);
            this.barTitle(scaleData[i], this.data[i].value)
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

    
}