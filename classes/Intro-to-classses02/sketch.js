
let values = [
  {name: "Adam", value:20},
  {name: "Eleanor", value:50},
  {name: "Niamh", value:30},
  {name: "Brian", value:25},
  {name: "Linda", value:40},
  {name: "Ryan", value:46},
  {name: "Barry", value:30},
  {name: "Dave", value:25},
  
]


const barChart = new BarChart(400, 200, 90, 450, values, "Sales Workers", "Sales This Year")


function setup() {
  createCanvas(700, 700);
  background(240);
  angleMode(DEGREES);
  rectMode(CORNER);
  noLoop();
}

function draw() {
  barChart.render()
}

