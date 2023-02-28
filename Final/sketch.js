
// bar chart = 
// amount of kidney, lung, heart and liver transplants in ireland 2021

// donut chart =
// liver transplants by age group (35-45 to 65-75)

// horizontal chart =
// kidney transplants by year (2017 - 2021)

// stacked chart = 
// all transplants by age



// instanciate variables for csv data
let digital
let sales

let stackedData
let barData
let donutData
let horData


function preload() {
  // digital consumption data
  // https://data.gov.ie/dataset/oss01-household-consumption-of-digital-services/resource/03a2c013-2a9c-400f-a7ea-de045873e81f/view/e2fa8642-fc65-472f-af8d-299368769582#&r=C03856V04606&c=TLIST(A1)

  // transplant data
  // https://data.cso.ie/table/DHA64

  // load data from csv and return it as array of objects
  let data = loadTable('data/household_consumption_of_digital_services.csv', 'csv', 'header', () => {
    digital = Object.values(data.getObject())
  })

  // load transplant data from csv and return as array of objects
  let stacked = loadTable('./data/transplant-data/stacked-data.csv', 'csv', 'header', () => {
    stackedData = Object.values(stacked.getObject())
    console.log("stacked chart data")
    console.log(stackedData)
  })

  // load transplant data from csv and return as array of objects
  let bar = loadTable('./data/transplant-data/bar-data.csv', 'csv', 'header', () => {
    barData = Object.values(bar.getObject())
    console.log("bar chart data")
    console.log(barData)
  })

  // load transplant data from csv and return as array of objects
  let donut = loadTable('./data/transplant-data/donut-data.csv', 'csv', 'header', () => {
    donutData = Object.values(donut.getObject())
    console.log("donut data")
    console.log(donutData)
  })

  // load transplant data from csv and return as array of objects
  let horizontal = loadTable('./data/transplant-data/horizontal-data.csv', 'csv', 'header', () => {
    horData = Object.values(horizontal.getObject())
    console.log("horizontal data")
    console.log(horData)
  })


  // load fake data from csv and return as array of objects
  // let salesStats = loadTable('data/testdata.csv', 'csv', 'header', () => {
  //   sales = Object.values(salesStats.getObject())
  //   })

}


// global text variables
const globalTextSize = 12
const globalTitleSize = 30



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



// bar chart global variables
const horBarChartWidth = 300
const horBarChartHeight = 300
const horBarChartPosX = 550
const horBarChartPosy = 900
const horBarChartXLable = "num kidney transplants"
const horBarChartYLable = "years"


// screen dimensions
const screenWidth = 900
const screenHeight = 1200


function setup() {
  createCanvas(screenWidth, screenHeight);
  background(240);
  angleMode(DEGREES);
  rectMode(CORNER);
  noLoop();

  // load title size
  textSize(globalTitleSize)
  text("Household Consumption of Digital Services Europe", 0, 25)
  text("Organ TransPlants By Age", 0, 600)


  // load normal size
  textSize(globalTextSize)

  // bar chart
  const barChart = new BarChart(barChartHeight, barChartWidth, barChartPosX, barChartPosy, barData, barChartXLable, barChartYLable)
  barChart.render()

  // donut chart
  const donutChart = new Donut(doWidth, doHeight, doPosX, doPosy, digital)
  donutChart.render()

  // stacked bar chart
  const stackedBarChart = new StackedBarChart(stackedWidth, stackedHeight, stackedPosX, stackedPosY, stackedData, stackedXLable, stackedYLable)
  stackedBarChart.render()

  // horizotal bar chart
  const horBarChart = new HorBarChart(horBarChartHeight, horBarChartWidth, horBarChartPosX, horBarChartPosy, horData, horBarChartXLable, horBarChartYLable)
  horBarChart.render()

}

function draw() {
  // null
} 