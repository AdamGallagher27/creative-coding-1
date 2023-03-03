

class HorBarChart {
    // constructs object
    constructor(height, width, posX, posY, data, xLable = '', yLable = '', title='') {
        this.height = height
        this.width = width
        this.posX = posX
        this.posY = posY
        this.xLable = xLable
        this.yLable = yLable
        this.title = title
        this.titleMargin = -50
        this.titleSize = 18

        // changed the keys in data to be X and Y
        // cleanedData expects data to be an array of objects
        // each object should have 2 properties
        // first property is expected to be the X value
        // second is the Y value
		this.data = this.cleanData(data)

        // globals
        this.nBlocks = this.data.length
        this.numAxisValues = 6
        this.marginL = 20
        this.marginAxisT = 60
        this.marginAxisL = 60
        this.tickMargin = 10
        this.tickWidth = -6
        this.titleSize = 18

        // calculations
        this.blockWidth = (this.height - (this.marginL * 2) - ((this.nBlocks - 1))) / this.nBlocks
        this.maxVal = Math.max(...this.data.map(obj => obj.y))
        this.scaleData = this.height / this.maxVal

        // colors
        this.colorIndex = 0
        this.colors = ['#004c6d', '#4c7c9b', '#86b0cc', '#c1e7ff']
        this.firstPass = true
    }

    // render chart to the screen
    render() {
        push()
        translate(this.posX, this.posY)
        this.drawAxis()
        this.drawAxis(false)
        this.drawBars(this.data)
        this.valueTitles()
        this.axisTitles()
        this.mainTitle()
        pop()
    }


    // draw main title
	mainTitle() {
		push()
		textSize(this.titleSize)
		noStroke()
		textAlign(CENTER)
		rectMode(CENTER)
		const titleWidth = this.width
        rotate(90)
		text(this.title, this.width / 2, -this.height + this.titleMargin, titleWidth)
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
            let tGap = this.height / this.nBlocks

            translate(0, -tGap / 2)

            // draw each tick
            for (let i = 0; i < this.nBlocks; i++) {
                noStroke()
                textAlign(RIGHT, CENTER)
                fill(0)
                text(this.data[i].x, -this.tickMargin, i * -tGap)
                stroke(100)
                line(0, i * -tGap, this.tickWidth, -i * tGap)
            }

            pop()
        }

    }

    // draws the values along the x axis
    valueTitles() {
        noStroke()

        // get the space between each value
        const gap = this.width / this.numAxisValues
        const textMargin = 25

        // loop for each num axis values and draw the
        // num gap for each lable
        for (let i = 0; i < this.numAxisValues + 1; i++) {
            const numGap = this.maxVal / this.numAxisValues
            fill(0)
            text(numGap.toFixed(0) * i, gap * i, textMargin)
        }
    }

    // draws the bars on the chart
    drawBars() {
        noStroke()

        // data converted to an array of heights that are the right scale
        const scaleData = this.scaleChart(this.data)

        // gap between each bar
        const gap = (this.height / this.nBlocks)

        // draw each bar
        for (let i = 0; i < this.nBlocks; i++) {
            push()
            rotate(-90)
            translate((i * gap), 0)
            fill(this.colorBar())
            rect(0, 0, this.blockWidth, scaleData[i])

            // set the grid system up right
            // draw the values foreach bar
            rotate(90)
            this.barTitles([scaleData[i], this.blockWidth / 2], this.data[i].y)
            pop();
        }
    }

    // scales data array
    scaleChart(arr) {
        let scaleValue = this.width / this.maxVal;
        let final = []

        // add all the scale values to an array
        for (let i = 0; i < arr.length; i++) {
            final.push(arr[i].y * scaleValue)
        }

        return final
    }


    // draws the values beside each bar 
    barTitles(position, value) {

        // position is expected to be
        // an array with an x / y pos
        const x = position[0]
        const y = -position[1]
        const textMargin = 10

        // draw each title
        textAlign(LEFT, CENTER)
        fill(0)
        text(value, x + textMargin, y)
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