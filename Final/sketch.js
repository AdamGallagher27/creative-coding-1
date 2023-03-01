
// bar chart = 
// amount of kidney, lung, heart and liver transplants in ireland 2021

// donut chart =
// liver transplants by age group (35-45 to 65-75)

// horizontal chart =
// kidney transplants by year (2017 - 2021)

// stacked chart / 100 chart = 
// all transplants by age


// instanciate variables for csv data
let digital
let sales


// data thats added to charts
let stackedData
let barData
let donutData
let horData


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

}


// global text variables
const globalTextSize = 12
const globalTitleSize = 25


// donut chart global variables
const doWidth = 250
const doHeight = 250
const doPosX = 600
const doPosy = 250


// bar chart global variables
const barChartWidth = 300
const barChartHeight = 200
const barChartPosX = 70
const barChartPosy = 350
const barChartXLable = "type of transplants"
const barChartYLable = "num transplants"


// stacked bar chart
const stackedWidth = 200
const stackedHeight = 300
const stackedPosX = 70
const stackedPosY = 900
const stackedXLable = 'age range'
const stackedYLable = 'number transplants'


// stacked bar chart
const hundWidth = 200
const hundHeight = 300
const hundPosX = 70
const hundPosY = 1300
const hundXLable = 'age range'
const hundYLable = 'number transplants'


// bar chart global variables
const horBarChartWidth = 300
const horBarChartHeight = 300
const horBarChartPosX = 550
const horBarChartPosy = 900
const horBarChartXLable = "num kidney transplants"
const horBarChartYLable = "years"


// screen dimensions
const screenWidth = 900
const screenHeight = 2000
const bg = 240
const marginT = globalTitleSize
const title = 'Organ Transplants Ireland 2021'


function setup() {
  createCanvas(screenWidth, screenHeight)
  background(bg)
  angleMode(DEGREES)
  rectMode(CORNER)
  noLoop()

  // title for project
  textSize(globalTitleSize)
  textAlign(CENTER)
  text(title, screenWidth / 2 , marginT )
  textSize(globalTextSize)

  
  // bar chart
  const barChart = new BarChart(barChartHeight, barChartWidth, barChartPosX, barChartPosy, barData, barChartXLable, barChartYLable)
  barChart.render()

  // donut chart
  const donutChart = new Donut(doWidth, doHeight, doPosX, doPosy, donutData)
  donutChart.render()

  // // stacked bar chart
  const stackedBarChart = new StackedBarChart(stackedWidth, stackedHeight, stackedPosX, stackedPosY, stackedData, stackedXLable, stackedYLable)
  stackedBarChart.render()

  // 100 % stacked bar chart
  const stackedHundred = new StackedHund(hundWidth, hundHeight, hundPosX, hundPosY, stackedData, hundXLable, hundYLable)
  stackedHundred.render()

  // horizotal bar chart
  const horBarChart = new HorBarChart(horBarChartHeight, horBarChartWidth, horBarChartPosX, horBarChartPosy, horData, horBarChartXLable, horBarChartYLable)
  horBarChart.render()

}


function draw() {
  // null
} 