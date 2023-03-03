
class ScatterChart {
	// constructs object
	constructor(height, width, posX, posY, data, xLable = '', yLable = '', title = '') {
		this.height = height
		this.width = width
		this.posX = posX
		this.posY = posY
		this.data = data
		this.xLable = xLable
		this.yLable = yLable
		this.title = title

		// globals
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
		this.maxVal = Math.max(...this.data.map(o => o.value))
		this.scaleValue = this.height / this.maxVal
		this.numPlots = this.data.length


		// colors
		this.colorIndex = 0
		this.colors = ['#004c6d', '#4c7c9b', '#86b0cc', '#c1e7ff']
		this.firstPass = true
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

		push()

		// translating half the gap to center plots
		translate(gap / 2, 0)

		// add the plots and draw the lables
		for(let i = 0; i < this.numPlots; i++) {
			const element = this.data[i]
			const currentHeight = this.findPlot(element.value)
			ellipse(i * gap, -currentHeight, 10, 10)
			this.valueTitle((i) * gap, element.age)
		}
		pop()
	}


	// draw main title
	mainTitle() {
		console.log(this.data)
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

	// adds the titles for each value
	valueTitle(xPos, title) {
        push()
		translate(xPos, 0)
		textAlign(RIGHT, TOP)
		noStroke()
        rotate(-50)
        text(title, 0, 0)
		pop()
    }
}