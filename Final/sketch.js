
let pieTable

function preload() {
  // data
  // https://data.gov.ie/dataset/oss01-household-consumption-of-digital-services/resource/03a2c013-2a9c-400f-a7ea-de045873e81f/view/e2fa8642-fc65-472f-af8d-299368769582#&r=C03856V04606&c=TLIST(A1)
  
  // load data from csv and return it as array of objects
  let data = loadTable('data/household_consumption_of_digital_services.csv', 'csv', 'header', () => {
  pieTable = Object.values(data.getObject())
  })
}


const values = [
  {name: "Adam", value:20},
  {name: "Eleanor", value:50},
  {name: "Niamh", value:30},
  {name: "Brian", value:25},
  {name: "Linda", value:40},
  {name: "Ryan", value:46},
  {name: "Barry", value:30},
  {name: "Dave", value:25},
  
]


// pie chart global variables
const pieWidth = 250
const pieHeight = 250
const PiePosX = 600
const PiePosy = 250



// bar chart global variables
const barChartWidth = 400
const barChartHeight = 200
const barChartPosX = 90
const barChartPosy = 450
const barChartXLable = "Sales Workers"
const barChartYLable = "Sales This Year"


const screenWidth = 900
const screenHeight = 900


function setup() {
  createCanvas(screenWidth, screenHeight);
  background(240);
  angleMode(DEGREES);
  rectMode(CORNER);
  noLoop();
  

  const barChart = new BarChart(barChartWidth, barChartHeight, barChartPosX, barChartPosy, values, barChartXLable, barChartYLable )
  barChart.render()

  const pieChart = new Pie(pieWidth, pieHeight, PiePosX, PiePosy, pieTable)
  pieChart.render()
}

function draw() {
  // null
} 