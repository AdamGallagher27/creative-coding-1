
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
        this.valGap = 11
        this.nBlocks = this.data.length
        this.marginL = 20
        this.marginT = 10
        this.marginB = 10
        this.marginAxisT = 65
        this.marginAxisL = 50
        this.tickWidth = 6
        this.nTicks = 4

        // calculations
        this.blockWidth = (this.width - (this.marginL * 2) - ((this.nBlocks - 1))) / this.nBlocks
        this.mainGap = this.blockWidth + this.valGap
        this.maxVal = Math.max(...this.data.map(o => int(o.total)))

        // legend data
        this.legendData = {}

        // colors
        this.colors = ['#004c6d', '#4c7c9b', '#86b0cc', '#c1e7ff']
    }

    // renders stacked bar chart to screen
    render() {
        push()
        translate(this.posX, this.posY)
        this.scaleChart(this.data)
        this.drawAxis()
        this.drawAxis(false)
        this.drawBars()
        this.drawLegend(this.legendData)
        this.barTitle(this.data)
        this.axisTitles()
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
            const tGap = this.height / this.nTicks

            // value to display beside each tick
            const numGap = this.maxVal / this.nTicks

            // margin left for the tick
            const tickMargin = -this.tickWidth - 6

            // draw each tick
            for (let i = 0; i <= this.nTicks; i++) {
                noStroke()
                textAlign(RIGHT, CENTER)
                fill(0)
                text(i * numGap.toFixed(0), tickMargin, i * -tGap)
                stroke(100)
                line(0, i * -tGap, -this.tickWidth, -i * tGap)
            }
        }
    }


    // draws the bars on the chart
    drawBars() {

        // data converted to an array of heights that are the right scale
        let scaleValue = this.height / this.maxVal;

        noStroke()

        // draw each bar
        for (let i = this.data.length - 1; i > -1; i--) {

            // move bar over to next position
            push();
            translate(this.marginL + (i * this.mainGap), 0)

            const current = this.data[i]
            let colorIndex = 0
            
            // loop over keys in current object 
            for(const value in current) {
                // for some reason || wont work
                // double if is bad but works for now
                // if value is not sales men or total draw bar and add colour value to obj
                if (value !== 'total') {
                    if (value !== 'age_group') {

                        // create current colour and make it the fill
                        const col = this.colors[colorIndex]
                        fill(col)

                        // the block height is the value in current object
                        const blockHeight = -int(current[value]) * scaleValue

                        // draw a bar with blockwidth and the blockheight
                        // translate up blockheight
                        rect(0, 0, this.blockWidth, blockHeight )
                        translate(0, blockHeight)

                        colorIndex += 1

                        // add current value / current color to legend data
                        this.legendData[value] = col
                    }

                }
            }
               
            pop();

        }


    }

    // draws legend for chart
    drawLegend(obj) {
        textAlign(LEFT)

        // used to hold the texts y value
        let textPos = 0
        
        // varaibles for positioning / spacing
        const textMargin = 40
        const circleMargin = 30
        const circleSize = 8
        const lineSpacing = 15

        for (const property in obj) {
            fill(0)
            text(property, this.width + textMargin, -this.height - textPos)
            fill(obj[property])
            ellipse(this.width + circleMargin, -this.height - textPos, circleSize)

            // move the text down a line
            textPos -= lineSpacing
        }

    }

    // gives titles for everybar
    barTitle(data) {
        fill(0)
        textAlign(RIGHT, CENTER)

        // text angle / margin
        const titleMargin = 10
        const textAngle = -50

        // for every title draw the title 
        // half way through every block
        for (let i = 0; i < this.nBlocks; i++) {

            const currentGap = i * this.mainGap
            push()
            translate((currentGap + this.marginL) + (this.blockWidth / 2), titleMargin)
            rotate(textAngle)
            text(data[i].age_group, 0, 0)
            pop()
        }
    }

    // draws the titles for each axis
    axisTitles() {

        // size / rotation
        const size = 18
        const rotation = -90

        textSize(size)
        textAlign(CENTER)
        noStroke()

        // X axis lable
        text(this.xLable, this.width / 2, this.marginAxisT)

        // Y axis lable
        rotate(rotation)
        text(this.yLable, this.height / 2, -this.marginAxisL)
    }




}
