
class StackedBarChart {
    // constructs object
    constructor(height, width, posX, posY, data, xLable = '', yLable = '', title = '') {
        
        this.height = height
        this.width = width
        this.posX = posX
        this.posY = posY
        this.data = this.cleanData(data, this.show)
        this.oldData = data
        this.xLable = xLable
        this.yLable = yLable
        this.title = title
        this.titleSize = 18
        this.titleMargin = -40

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
        this.widthOffset = 6


        // calculations
        this.blockWidth = ((this.width - (this.marginL * 2) - ((this.nBlocks - 1))) / this.nBlocks) - this.widthOffset
        this.mainGap = this.blockWidth + this.valGap
        this.maxVal = Math.max(...this.data.map(o => int(o.total)))
        this.scaleValue = this.height / this.maxVal

        // legend data
        this.meanYellow = "#FFD580"
        this.meanLine = { mean: this.meanYellow }
        this.meanRadius = 10
        this.meanWeight = 4
        this.legendData = { ...this.meanLine }

        // colors
        this.colors = ['#004c6d', '#4c7c9b', '#86b0cc', '#c1e7ff']
        this.dark = 10

       
    }

    // renders stacked bar chart to screen
    render() {
        push()
        translate(this.posX, this.posY)
        this.scaleChart(this.data)
        this.drawAxis()
        this.drawAxis(false)
        this.drawBars()
        this.filterLegend()
        this.drawLegend(this.legendData)
        this.barTitle(this.data)
        this.axisTitles()
        const meanPosition = this.getMeanPositions()
        this.drawMeanLines(meanPosition)
        this.mainTitle()
        this.filterLegend(this.legendData)
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
        text(this.title, this.width / 2, -this.height + this.titleMargin, titleWidth)
        pop()
    }

    

    // scales data array
    scaleChart(arr) {
        let final = []

        for (let i = 0; i < arr.length; i++) {
            final.push(arr[i].total * this.scaleValue)
        }

        return final
    }


    // draws the vertical axis
    drawAxis(vertical = true, lable = true) {
        noFill()
        stroke(this.dark)

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
                fill(this.dark)
                text(i * numGap.toFixed(0), tickMargin, i * -tGap)
                stroke(this.dark)
                line(0, i * -tGap, -this.tickWidth, -i * tGap)
            }
        }
    }


    // draws the bars on the chart
    drawBars() {
        noStroke()

        // draw each bar
        for (let i = this.data.length - 1; i > -1; i--) {

            // move bar over to next position
            push();
            translate(this.marginL + (i * this.mainGap), 0)

            // this gets the current object and removes age_group && total
            const current = (({ a, b, c }) => ({ a, b, c }))(this.data[i]);
            let colorIndex = 0

            // loop over keys in current object 
            for (const value in current) {

                // create current colour and make it the fill
                const col = this.colors[colorIndex]
                fill(col)

                // the block height is the value in current object
                const blockHeight = -int(current[value]) * this.scaleValue

                // draw a bar with blockwidth and the blockheight
                // translate up blockheight
                rect(0, 0, this.blockWidth, blockHeight)
                translate(0, blockHeight)

                colorIndex += 1

                this.legendData[value] = col
                
            }
            pop();
        }
    }

    // filters the legend data
    filterLegend() {
        
        // gets the key namese from old data
        // ie liver, heart, lung
        const keys = Object.keys(this.oldData[0])

        // array for the cleaned data property names
        const lables = ['a', 'b', 'c']


        let newLables = []

        // titles to replace a, b, c
        // the old titles are expected to be 
        // in these positions
        const aTitle = keys[1]
        const bTitle = keys[2]
        const cTitle = keys[3]

        // add the new lables to the array
        newLables.push(aTitle, bTitle, cTitle)

        // replace the cleaned data with the old data names
        lables.forEach((element, index) => {
            const newKey = newLables[index]
            this.legendData[ newKey] = this.legendData[element]
            delete this.legendData[element]
        })

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

        // draw legend 
        for (const property in obj) {
            fill(this.dark)
            text(property, this.width + textMargin, -this.height - textPos)
            fill(obj[property])
            ellipse(this.width + circleMargin, -this.height - textPos, circleSize)

            // move the text down a line
            textPos -= lineSpacing
        }

    }

    // gives titles for everybar
    barTitle(data) {
        fill(this.dark)
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
            text(data[i].title, 0, 0)
            pop()
        }
    }

    // draws the titles for each axis
    axisTitles() {
        push()
        // size / rotation
        const size = 18

        textSize(size)
        textAlign(CENTER)
        noStroke()

        // X axis lable
        text(this.xLable, this.width / 2, this.marginAxisT)

        // Y axis lable
        textAlign(RIGHT, CENTER)
        text(this.yLable, -this.marginAxisL , -this.height / 2, 0)
        pop()

    }

    // gets the positions of the mean lines
    getMeanPositions() {

        let final = []
        let posX = []


        // add scale value for mean X 
        this.data.forEach(object => {
            posX.push(object.mean * this.scaleValue)
        });


        // add X and Y position to final
        for (let i = 0; i < this.nBlocks; i++) {
            const currentGap = i * this.mainGap
            push()
            translate((currentGap + this.marginL) + (this.blockWidth / 2), -posX[i])
            final.push([(currentGap + this.marginL) + (this.blockWidth / 2), -posX[i]])
            fill(this.meanYellow)
            ellipse(0, 0, this.meanRadius)
            pop()
        }

        return final
    }

    // draws the mean lines
    drawMeanLines(positions) {

        stroke(this.meanYellow)
        strokeWeight(this.meanWeight)

        // draw a line from the two coordinates in position variable
        for (let i = 0; i < positions.length - 1; i++) {
            line(...positions[i], ...positions[i + 1])
        }


    }


    cleanData(data, show) {

        let cleaned = []

        // get array of the keys
        const keys = Object.keys(data[0])

        // title lable
        const title = keys[0]

        // A lable
        const aLable = keys[1]

        // B lable
        const bLable = keys[2]

        // C lable
        const cLable = keys[3]

        // total lable
        const total = keys[4]

        // mean lable
        const mean = keys[5]


        // create a new object with 
        data.forEach(element => {
            const current = {
                title: element[title],
                a: element[aLable],
                b: element[bLable],
                c: element[cLable],
                total: element[total],
                mean: element[mean],
            }


            cleaned.push(current)
        })

        return cleaned
    }
}
