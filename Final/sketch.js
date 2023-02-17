


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
const pieChart = new Pie(pieWidth, pieHeight, PiePosX, PiePosy, values)

// bar chart global variables
const barChartWidth = 400
const barChartHeight = 200
const barChartPosX = 90
const barChartPosy = 450
const barChartXLable = "Sales Workers"
const barChartYLable = "Sales This Year"
const barChart = new BarChart(barChartWidth, barChartHeight, barChartPosX, barChartPosy, values, barChartXLable, barChartYLable )


const screenWidth = 900
const screenHeight = 900

function setup() {
  createCanvas(screenWidth, screenHeight);
  background(240);
  angleMode(DEGREES);
  rectMode(CORNER);
  noLoop();
}

function draw() {
  barChart.render()
  pieChart.render()
}