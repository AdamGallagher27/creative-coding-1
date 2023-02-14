
class BarChart {
    // constructs object
    constructor(_height, _width, _posX, _posY, _data) {
        this.height = _height
        this.width = _width
        this.posX = _posX
        this.posY = _posY
        this.data = _data

        this.valGap = 5
        this.nBlocks = this.data.length
        this.marginL = 20
        this.nTicks = 5
        this.blockWidth = (this.width - (this.marginL * 2) - ((this.nBlocks - 1))) / this.nBlocks
        this.mainGap = this.blockWidth + this.valGap
        this.maxVal = Math.max(...this.data);

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
                line(0, i*-tGap, -6, -i*tGap)
                textAlign(RIGHT, CENTER)
                text(i*numGap.toFixed(0), -10, i*-tGap)
            }
        }

    }

    // // draws the horizontal axis
    // drawHorizontal() {
    //     noFill()
    //     stroke(50)
    //     line(0, 0, this.width, 0)
    // }

    // draws the bars on the chart
    drawBars() {

        let data = this.scaleChart(this.data)

        for (let i = 0; i < this.nBlocks; i++) {
            push();
            translate(this.marginL + (i * this.mainGap), 0)
            fill(data[i], 0, 0)
            rect(0, 0, this.blockWidth, -data[i]);
            pop();
        }
    }

    // scales data array
    scaleChart(arr) {
        let scaleValue = this.height / this.maxVal;
        let final = []

        for (let i = 0; i < arr.length; i++) {
            final.push(arr[i] * scaleValue)
        }

        return final
    }

    
}