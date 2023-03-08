
class StackedHund {
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

		// calculations
		this.blockWidth = (this.width - (this.marginL * 2) - ((this.nBlocks - 1))) / this.nBlocks
		this.mainGap = this.blockWidth + this.valGap
		this.maxVal = 100
		this.scaleValue = this.height / this.maxVal;

		// legend data
		this.legendData = { ...this.medianLine }

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
		this.drawLegend(this.legendData)
		this.barTitle(this.data)
		this.axisTitles()
		this.mainTitle()
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
			let current = (({ lung, heart, liver }) => ({ lung, heart, liver }))(this.data[i]);
			let hundred = this.scaleBars(current)
			let colorIndex = 0

			// loop over keys in current object 
			for (const value in hundred) {
				
				// create hundred colour and make it the fill
				const col = this.colors[colorIndex]
				fill(col)

				// the block height is the value in hundred object
				const blockHeight = -hundred[value]


				// draw a bar with blockwidth and the blockheight
				// translate up blockheight
				rect(0, 0, this.blockWidth, blockHeight)
				translate(0, blockHeight)

				// add hundred value / hundred color to legend data
				this.legendData[value] = col

				colorIndex += 1
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
			text(data[i].age_group, 0, 0)
			pop()
		}
	}

	// draws the titles for each axis
	axisTitles() {
		push()
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
		pop()

	}


	// scales each bar to fit 100% of chart
	scaleBars(object) {
		const sum = Object.values(object).reduce((accumulator, value) => {
			return accumulator + int(value);
		}, 0);

		const scaleValue = this.height / sum

		for (key of Object.keys(object)) {
			object[key] = int(object[key]) * scaleValue
		}

		return object
	}

}
