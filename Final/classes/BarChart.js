
class BarChart {
    // constructs object
    constructor(height, width, posX, posY, data, xLable = '', yLable = '', title = '') {
        this.height = height
        this.width = width
        this.posX = posX
        this.posY = posY
        this.xLable = xLable
        this.yLable = yLable
        this.title = title
        
        // changed the keys in data to be X and Y
        // cleanedData expects data to be an array of objects
        // each object should have 2 properties
        // first property is expected to be the X value
        // second is the Y value
        this.data = this.cleanData(data)

        // globals
        this.valGap = 5
        this.nBlocks = this.data.length
        this.marginL = 20
        this.marginT = 10
        this.marginB = 10
        this.marginAxisT = 70
        this.marginAxisL = 50
        this.tickWidth = 10
        this.nTicks = 4
        this.titleSize = 18
        this.titleMargin = -290

        // calculations
        this.blockWidth = (this.width - (this.marginL * 2) - ((this.nBlocks - 1))) / this.nBlocks
        this.mainGap = this.blockWidth + this.valGap
        this.maxVal = Math.max(...this.data.map(o => o.y))

        // colors
        this.colorIndex = 0
        this.colors = ['#004c6d', '#4c7c9b', '#86b0cc', '#c1e7ff']
        this.firstPass = true
        this.dark = 10
    }




    // renders the chart
    render() {
        push()
        translate(this.posX, this.posY)
        this.mainTitle()
        this.drawBars()
        this.drawAxis()
        this.drawAxis(false)
        this.axisTitles()
        pop()

    }

    // draw main title
    mainTitle() {
        push()
        textSize(this.titleSize)
        noStroke()
        rectMode(CENTER)
        const titleWidth = this.width
        text(this.title, this.width / 2, this.titleMargin, titleWidth)
        pop()
    }


    // draws the titles for each axis
    axisTitles() {
        textSize(this.titleSize)
        textAlign(CENTER)
        noStroke()

        // X axis lable
        text(this.xLable, this.width / 2, this.marginAxisT)

        // Y axis lable
        rotate(-90)
        text(this.yLable, this.height / 2, -this.marginAxisL)
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

            // draw each tick
            for (let i = 0; i <= this.nTicks; i++) {
                noStroke()
                textAlign(RIGHT, CENTER)
                fill(this.dark)
                text(i * numGap.toFixed(0), -this.tickWidth, i * -tGap)
                stroke(this.dark)
                line(0, i * -tGap, -6, -i * tGap)
            }
        }

    }

    // adds the titles and values for each bar
    barTitle(height, value, title) {
        fill(this.dark)
        const xAxis = (this.blockWidth / 2)
        const textAngle = -50
        textAlign(CENTER)
        text(value, xAxis, -height - this.marginT)
        translate(xAxis, this.marginB)
        push()
        textAlign(RIGHT, TOP)
        rotate(textAngle)
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
            push()
            translate(this.marginL + (i * this.mainGap), 0)
            fill(this.colorBar())
            rect(0, 0, this.blockWidth, -scaleData[i])
            this.barTitle(scaleData[i], this.data[i].y, this.data[i].x)
            pop()
        }
    }

    // scales data array
    scaleChart(arr) {
        let scaleValue = this.height / this.maxVal;
        let final = []

        for (let i = 0; i < arr.length; i++) {
            final.push(arr[i].y * scaleValue)
        }

        return final
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

    // function for cleaning 2d data
    cleanData(data) {

        let cleaned = []

        // get array of the keys
        const keys = Object.keys(data[0])

        // x lable
        const xLable = keys[0]

        // y lable
        const yLable = keys[1]
        
        // create a new object with 
        data.forEach(element => {
            const current = {
                x: element[xLable],
                y: element[yLable]
            }
            
            cleaned.push(current)
        })
        
        return cleaned
    }

}