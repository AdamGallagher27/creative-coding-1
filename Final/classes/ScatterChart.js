
class ScatterChart {
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
		this.marginL = 20
		this.marginT = 10
		this.marginB = 10
		this.marginAxisT = 90
		this.marginAxisL = 50
		this.tickWidth = 10
		this.nTicks = 4
		this.titleSize = 18
		this.titleMargin = -290

		// calculations
		this.maxVal = Math.max(...this.data.map(o => o.y))
		this.scaleValue = this.height / this.maxVal
		this.numPlots = this.data.length
		this.dark = 10

	}


	// renders the chart
	render() {
		push()
		translate(this.posX, this.posY)
		this.drawAxis()
		this.drawAxis(false)
		this.mainTitle()
		this.axisTitles()
		this.addPlot()
		pop()
	}

	// gets the location of the plots
	findPlot(value) {
		return value * this.scaleValue
	}

	// function to add the plots to the screen
	addPlot() {

		// gap for each plot
		const gap = this.width / this.numPlots
		const plotRadius = 10


		push()

		// translating half the gap to center plots
		translate(gap / 2, 0)

		// add the plots and draw the lables
		for (let i = 0; i < this.numPlots; i++) {
			const element = this.data[i]
			const currentHeight = this.findPlot(element.y)
			ellipse(i * gap, -currentHeight, plotRadius, plotRadius)
			this.valueTitle((i) * gap, element.x)
		}
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
		text(this.title, this.width / 2, this.titleMargin, titleWidth)
		pop()
	}


	// draws the titles for each axis
	axisTitles() {
		push()
		textSize(this.titleSize)
		textAlign(CENTER)
		noStroke()

		// X axis lable
		text(this.xLable, this.width / 2, this.marginAxisT)

		// Y axis lable
		rotate(-90)
		text(this.yLable, this.height / 2, -this.marginAxisL)
		pop()
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
			let tGap = this.height / this.nTicks

			// value to display beside each tick
			let numGap = this.maxVal / this.nTicks

			const tickLength = -6

			// draw each tick
			for (let i = 0; i <= this.nTicks; i++) {
				noStroke()
				textAlign(RIGHT, CENTER)
				fill(this.dark)
				text(i * numGap.toFixed(0), -this.tickWidth, i * -tGap)
				stroke(this.dark)
				line(0, i * -tGap, tickLength, -i * tGap)
			}
		}

	}

	// adds the titles for each value
	valueTitle(xPos, title) {

		const titleAngle = -50
		push()
		translate(xPos, 0)
		textAlign(RIGHT, TOP)
		noStroke()
		rotate(titleAngle)
		text(title, 0, 0)
		pop()
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