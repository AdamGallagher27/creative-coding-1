
// instanciate variables for csv data
let digital
let sales
let transplants

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
  let tranStats = loadTable('data/transplant-data.csv', 'csv', 'header', () => {
    transplants = Object.values(tranStats.getObject())
    console.log(transplants)
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
const barChartXLable = "Digital Services"
const barChartYLable = "Spending in %"


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
const horBarChartPosX = 500
const horBarChartPosy = 900
const horBarChartXLable = "Spending in %"
const horBarChartYLable = "Digital Services"


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
  const barChart = new BarChart(barChartHeight, barChartWidth, barChartPosX, barChartPosy, digital, barChartXLable, barChartYLable )
  barChart.render()

  // donut chart
  const donutChart = new Donut(doWidth, doHeight, doPosX, doPosy, digital)
  donutChart.render()

  // stacked bar chart
  const stackedBarChart = new StackedBarChart(stackedWidth, stackedHeight, stackedPosX, stackedPosY, transplants, stackedXLable, stackedYLable)
  // stackedBarChart.render()

  // horizotal bar chart
  const horBarChart = new HorBarChart(horBarChartHeight, horBarChartWidth, horBarChartPosX, horBarChartPosy, digital, horBarChartXLable, horBarChartYLable )
  horBarChart.render()
  
}

function draw() {
  // null
} 