
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


// instanciate variables for csv data
let digital
let sales


// data thats added to charts
let stackedData
let barData
let donutData
let horData
let scatterData


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

}


// global text variables
const globalTextSize = 12
const globalTitleSize = 25


// donut chart global variables
const doTitle = 'liver transplants by age group (35-45 to 65-75)'
const doWidth = 200
const doHeight = 200
const doPosX = 700
const doPosy = 350


// bar chart global variables
const barChartTitle = 'amount of kidney, lung, heart and liver transplants in ireland 2021'
const barChartWidth = 300
const barChartHeight = 200
const barChartPosX = 70
const barChartPosy = 450
const barChartXLable = "type of transplants"
const barChartYLable = "num transplants"


// bar chart global variables
const scatterChartTitle = 'number of kidney transplants by age'
const scatterChartWidth = 300
const scatterChartHeight = 200
const scatterChartPosX = 1100
const scatterChartPosy = 450
const scatterChartXLable = "age range"
const scatterChartYLable = "num transplants"


// stacked bar chart
const stackedWidth = 200
const stackedHeight = 300
const stackedPosX = 70
const stackedPosY = 900
const stackedXLable = 'age range'
const stackedYLable = 'number transplants'
const stackedTitle = 'all transplants by age'


// stacked 100% bar chart
const hundWidth = 200
const hundHeight = 300
const hundPosX = 1100
const hundPosY = 900
const hundXLable = 'age range'
const hundYLable = 'number transplants'


// horizontal bar chart global variables
const horTitle = 'kidney transplants by year (2017 - 2021)'
const horBarChartWidth = 350
const horBarChartHeight = 200
const horBarChartPosX = 550
const horBarChartPosy = 900
const horBarChartXLable = "num kidney transplants"
const horBarChartYLable = "years"


// screen dimensions
const screenWidth = 1500
const screenHeight = 1500
const bg = 240
const marginT = globalTitleSize
const title = 'Organ Transplants Ireland 2021'


function setup() {
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


	// bar chart
	const barChart = new BarChart(barChartHeight, barChartWidth, barChartPosX, barChartPosy, barData, barChartXLable, barChartYLable, barChartTitle)
	barChart.render()

	// donut chart
	const donutChart = new Donut(doWidth, doHeight, doPosX, doPosy, donutData, doTitle)
	donutChart.render()

	// stacked bar chart
	const stackedBarChart = new StackedBarChart(stackedWidth, stackedHeight, stackedPosX, stackedPosY, stackedData, stackedXLable, stackedYLable, stackedTitle)
	stackedBarChart.render()

	// 100 % stacked bar chart
	const stackedHundred = new StackedHund(hundWidth, hundHeight, hundPosX, hundPosY, stackedData, hundXLable, hundYLable, stackedTitle)
	stackedHundred.render()

	// horizotal bar chart
	const horBarChart = new HorBarChart(horBarChartHeight, horBarChartWidth, horBarChartPosX, horBarChartPosy, horData, horBarChartXLable, horBarChartYLable, horTitle)
	horBarChart.render()

	// bar chart
	const scatterChart = new ScatterChart(scatterChartHeight, scatterChartWidth, scatterChartPosX, scatterChartPosy, scatterData, scatterChartXLable, scatterChartYLable, scatterChartTitle)
	scatterChart.render()

}


function draw() {
	// null
} 