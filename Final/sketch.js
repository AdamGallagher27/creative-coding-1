
// instanciate variables for csv data
let table
let sales

function preload() {
  // data
  // https://data.gov.ie/dataset/oss01-household-consumption-of-digital-services/resource/03a2c013-2a9c-400f-a7ea-de045873e81f/view/e2fa8642-fc65-472f-af8d-299368769582#&r=C03856V04606&c=TLIST(A1)
  
  // load data from csv and return it as array of objects
  let data = loadTable('data/household_consumption_of_digital_services.csv', 'csv', 'header', () => {
  table = Object.values(data.getObject())
  })

  // load fake data from csv and return as array of objects
  let salesStats = loadTable('data/testdata.csv', 'csv', 'header', () => {
    sales = Object.values(salesStats.getObject())
    console.log(sales)
    })
}


// global text variables
const globalTextSize = 12
const globalTitleSize = 30



// pie chart global variables
const pieWidth = 250
const pieHeight = 250
const PiePosX = 600
const PiePosy = 250



// bar chart global variables
const barChartWidth = 300
const barChartHeight = 200
const barChartPosX = 70
const barChartPosy = 350
const barChartXLable = "Digital Services"
const barChartYLable = "Spending in %"


// stacked bar chart
const stackedWidth = 200
const stackedHeight = 300
const stackedPosX = 70
const stackedPosY = 800
const stackedXLable = 'salesmen'
const stackedYLable = 'sales this year'


// screen dimensions
const screenWidth = 900
const screenHeight = 900


function setup() {
  createCanvas(screenWidth, screenHeight);
  background(240);
  angleMode(DEGREES);
  rectMode(CORNER);
  noLoop();
  
  // load title size
  textSize(globalTitleSize)
  text("Household Consumption of Digital Services Europe", 0, 25)

  // load normal size
  textSize(globalTextSize)

  // bar chart
  const barChart = new BarChart(barChartHeight, barChartWidth, barChartPosX, barChartPosy, table, barChartXLable, barChartYLable )
  barChart.render()

  // pie chart
  const pieChart = new Pie(pieWidth, pieHeight, PiePosX, PiePosy, table)
  pieChart.render()

  // stacked bar chart
  const stackedBarChart = new StackedBarChart(stackedWidth, stackedHeight, stackedPosX, stackedPosY, sales, stackedXLable, stackedYLable)
  stackedBarChart.render()

  
  
}

function draw() {
  // null
} 