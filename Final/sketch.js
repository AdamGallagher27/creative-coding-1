
// bar chart = 
// amount of kidney, lung, heart and liver transplants in ireland 2021

// donut chart =
// liver transplants by age group (35-45 to 65-75)

// horizontal chart =
// kidney transplants by year (2017 - 2021)

// stacked chart / 100 chart = 
// all transplants by age

// scatter chart =
// number of kidney transplants by age

// stacked hundred = 
// amount of alternate surgeries from year 2014 to 2020


// data thats added to charts
let stackedData
let barData
let donutData
let horData
let scatterData
let hundData


function preload() {

	// transplant data
	// https://data.cso.ie/table/DHA64


	// load transplant data from csv and return as array of objects
	let stacked = loadTable('./data/transplant-data/stacked-data.csv', 'csv', 'header', () => {
		stackedData = Object.values(stacked.getObject())
		// console.log("stacked chart data")
		// console.log(stackedData)
	})

	// load transplant data from csv and return as array of objects
	let bar = loadTable('./data/transplant-data/bar-data.csv', 'csv', 'header', () => {
		barData = Object.values(bar.getObject())
		// console.log("bar chart data")
		// console.log(barData)
	})

	// load transplant data from csv and return as array of objects
	let donut = loadTable('./data/transplant-data/donut-data.csv', 'csv', 'header', () => {
		donutData = Object.values(donut.getObject())
		// console.log("donut data")
		// console.log(donutData)
	})

	// load transplant data from csv and return as array of objects
	let horizontal = loadTable('./data/transplant-data/horizontal-data.csv', 'csv', 'header', () => {
		horData = Object.values(horizontal.getObject())
		// console.log("horizontal data")
		// console.log(horData)
	})

	// load transplant data from csv and return as array of objects
	let scatter = loadTable('./data/transplant-data/scatter-data.csv', 'csv', 'header', () => {
		scatterData = Object.values(scatter.getObject())
		// console.log("scatter data")
		// console.log(scatterData)
	})

	// load transplant data from csv and return as array of objects
	let hundred = loadTable('./data/transplant-data/hund-data.csv', 'csv', 'header', () => {
		hundData = Object.values(hundred.getObject())
		// console.log("hundred data")
		// console.log(hundData)
	})

}


// global text variables
const globalTextSize = 12
const globalTitleSize = 25


// donut chart global variables
const doTitle = 'liver transplants by age group (35-45 to 65-75)'
const doWidth = 200
const doHeight = 200
const doPosX = 800
const doPosy = 350


// bar chart global variables
const barChartTitle = 'amount of kidney, lung, heart and liver transplants in ireland 2021'
const barChartWidth = 300
const barChartHeight = 200
const barChartPosX = 170
const barChartPosy = 450
const barChartXLable = "type of transplants"
const barChartYLable = "num transplants"


// scatter chart global variables
const scatterChartTitle = 'number of kidney transplants by age'
const scatterChartWidth = 300
const scatterChartHeight = 200
const scatterChartPosX = 1200
const scatterChartPosy = 450
const scatterChartXLable = "age range"
const scatterChartYLable = "num transplants"


// stacked bar chart
const stackedWidth = 300
const stackedHeight = 200
const stackedPosX = 170
const stackedPosY = 900
const stackedXLable = 'age range'
const stackedYLable = 'number transplants'
const stackedTitle = 'all transplants by age'


// stacked 100% bar chart
const hundWidth = 400
const hundHeight = 300
const hundPosX = 1220
const hundPosY = 950
const hundTitle = 'type of surgeries by year'
const hundXLable = 'years'
const hundYLable = 'opperations'


// horizontal bar chart global variables
const horTitle = 'kidney transplants by year (2017 - 2021)'
const horBarChartWidth = 350
const horBarChartHeight = 200
const horBarChartPosX = 690
const horBarChartPosy = 900
const horBarChartXLable = "num kidney transplants"
const horBarChartYLable = "years"


// screen dimensions
const screenWidth = 1850
const screenHeight = 1500
const bg = 240
const marginT = globalTitleSize
const title = 'Organ Transplants Ireland 2021'


function setup() {

	// the font doesnt load when you first load it
	// you have to refresh the page
	textFont('Roboto')
	createCanvas(screenWidth, screenHeight)
	background(bg)
	angleMode(DEGREES)
	rectMode(CORNER)
	noLoop()

	// title for project
	textSize(globalTitleSize)
	textAlign(CENTER)
	text(title, screenWidth / 2, marginT)
	textSize(globalTextSize)


	// the bar, horizontal, donut and scatter charts can take any csv data as long as it has two values in it
	// this means there data variables can be switched and the chart will work fine

	// bar chart
	const barChart = new BarChart(barChartHeight, barChartWidth, barChartPosX, barChartPosy, barData, barChartXLable, barChartYLable, barChartTitle)
	barChart.render()

	// donut chart
	const donutChart = new Donut(doWidth, doHeight, doPosX, doPosy, donutData, doTitle)
	donutChart.render()

	
	// horizotal bar chart
	const horBarChart = new HorBarChart(horBarChartHeight, horBarChartWidth, horBarChartPosX, horBarChartPosy, horData, horBarChartXLable, horBarChartYLable, horTitle)
	horBarChart.render()
	
	// scatter chart
	const scatterChart = new ScatterChart(scatterChartHeight, scatterChartWidth, scatterChartPosX, scatterChartPosy, scatterData, scatterChartXLable, scatterChartYLable, scatterChartTitle)
	scatterChart.render()
	
	// the stacked / 100% stacked chart work with any csv data as long as it fits the specified shape
	// this means stacked and 100% stacked data can be switched and the charts will work fine

	// stacked bar chart
	const stackedBarChart = new StackedBarChart(stackedHeight, stackedWidth , stackedPosX, stackedPosY, stackedData, stackedXLable, stackedYLable, stackedTitle)
	stackedBarChart.render()

	// 100 % stacked bar chart
	const stackedHundred = new StackedHund(hundHeight, hundWidth, hundPosX, hundPosY, hundData, hundXLable, hundYLable, hundTitle)
	stackedHundred.render()







	// these charts bellow are the same classes but with different data

	// // bar chart
	// const barChartAlt = new BarChart(barChartHeight, barChartWidth, barChartPosX, barChartPosy, scatterData, barChartXLable, barChartYLable, barChartTitle)
	// barChartAlt.render()

	// // donut chart
	// const donutChartAlt = new Donut(doWidth, doHeight, doPosX, doPosy, barData, doTitle)
	// donutChartAlt.render()

	
	// // horizotal bar chart
	// const horBarChartAlt = new HorBarChart(horBarChartHeight, horBarChartWidth, horBarChartPosX, horBarChartPosy, donutData, horBarChartXLable, horBarChartYLable, horTitle)
	// horBarChartAlt.render()
	
	// // scatter chart
	// const scatterChartAlt = new ScatterChart(scatterChartHeight, scatterChartWidth, scatterChartPosX, scatterChartPosy, horData, scatterChartXLable, scatterChartYLable, scatterChartTitle)
	// scatterChartAlt.render()

	// // stacked bar chart
	// const stackedBarChartAlt = new StackedBarChart(stackedHeight, stackedWidth , stackedPosX, stackedPosY, hundData, stackedXLable, stackedYLable, stackedTitle)
	// stackedBarChartAlt.render()

	// // 100 % stacked bar chart
	// const stackedHundredAlt = new StackedHund(hundHeight, hundWidth, hundPosX, hundPosY, stackedData, hundXLable, hundYLable, hundTitle)
	// stackedHundredAlt.render()


}


function draw() {
	// null
} 