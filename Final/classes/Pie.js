

class Pie {
    constructor(width, height, xPos, yPos, data) {
        this.width = width
        this.height = height
        this.xPos = xPos
        this.yPos = yPos
        this.data = data


        this.maxData = Math.max(...this.data.map(obj => obj.value))
        this.textMargin = 165
        this.rotations = []
        this.cleanData = this.getPercent(this.data)
    }

    getPercent(data) {
        // final to be returned at the end
        let final = []

        // varaible for the color scale 
        const colorScale = this.scaleColor()


        // sum of all the values in inital data
        const sum = data.reduce((accumulator, object) => {
            return accumulator + object.value;
        }, 0);

        console.log(sum)

        data.forEach((element, index) => {

            // should use class / contructor here
            // restructuring intial data to be a percentage and have a color
            let current = {
                name: element.name,
                percent: (element.value / sum) * 100,
                color: colorScale * (index + 1)
            }

            console.log(current)
            // add them to final
            final.push(current)
        }, 0);

        // return the new data in a sorted array
        return final.sort((a, b) => a.percent - b.percent)
    }

    // function that draws each segment of the chart
    render(data) {

        translate(this.xPos, this.yPos)

        noStroke()

        // draw the first segment in the same place every time
        const firstData = this.cleanData[0]
        this.drawSegment(firstData)


        // loop through the rest of the data
        for (let i = 1; i < this.data.length; i++) {
            push()

            // the sum of all previous rotations
            const prevRotations = this.rotations.reduce((accumulator, object) => {
                return accumulator + object;
            })

            // draw the segment for the current
            this.drawSegment(this.cleanData[i], prevRotations)
            pop()
        }


    }

    drawSegment(data, prevRotat = 0) {


        // current segment / varaible to make text sit upright
        const currentSeg = (data.percent / 100) * 360
        const upRight = this.makeUpRight(prevRotat, currentSeg)

        // add rotations to rotations array
        this.rotations.push(currentSeg)

        push()
        // asign colour and draw arc with first sec angle
        fill(0, data.color, 200)

        // if the previous rotation exists rotate the grid by that total
        if (prevRotat) {
            rotate(prevRotat)
        }

        // draw the segment
        arc(0, 0, this.width, this.height, 0, currentSeg)

        // draw label for each segment
        // rotate the text half of the current to get it in the middle
        rotate(currentSeg / 2)
        textAlign(CENTER)
        translate(this.textMargin, 0)

        // rotate by upright to make text upright
        rotate(upRight)
        text(data.name + ` (${data.percent.toFixed(1)}%)`, 0, 0)
        pop()


    }

    // makes the text appear upright on piechart
    makeUpRight(rotation, segment) {
        return (360 - rotation) - (segment / 2)
    }


    // function for scaling colour
    scaleColor() {
        const numColors = this.data.length
        const range = 255
        return range / numColors
    }


}