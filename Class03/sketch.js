

// let data = [12, 100, 150, 90, 200, 100, 12 , 200, 35, 300]

// data as array of objects 
let fruits = [
  {name:"bananas", sales:100},
  {name:"apples", sales:200},
  {name:"oranges", sales:300},
  {name:"grapes", sales:1000},
  {name:"pears", sales:150},
  {name:"pears", sales:600},
  {name:"pears", sales:150},
  {name:"pears", sales:150},
  {name:"pears", sales:2001},
  {name:"pears", sales:9001},
  {name:"pears", sales:2001},
]

// let numSales = []
// fruits.forEach(element => numSales.push(element.sales))


// global variables
let numBlocks = fruits.length;
let chartWidth = 200;
let chartHeight = 300;
let chartX = 100
let chartY = 450
let marginLeft = 20;
let marginRight = 20;
let blockGap = 5;
let screenWidth = 500;
let screenHeight = 500;
let chartTicks = 5;
let tickLength = 5;

// calculations from globals
let blockWidth = (chartWidth - (marginLeft + marginRight) - ((numBlocks - 1) * blockGap)) / numBlocks;
let masterGap = blockWidth + blockGap
let maxValue = Math.max(...fruits.map( obj => obj.sales ));


function scaleMe(num) {
  let maxValue = Math.max(...fruits.map( obj => obj.sales ));
  let scaleValue = chartHeight / maxValue;

  return num * scaleValue
}

function setup() {
  createCanvas(screenWidth, screenHeight);
  background(200);
  angleMode(DEGREES);
  rectMode(CORNER);
  noLoop();
}

function draw() {
  // makes all random() calls == 40
  // randomSeed(40)
  background(200);
  fill(0);

  // translates the whole chart
  translate(chartX, chartY)

  // loop draws bars
  for (let i = 0; i < numBlocks; i++) {
    push();
    translate(marginLeft + (i * masterGap), 0)
    fill(fruits[i].sales, 0, 0)
    rect(0, 0, blockWidth, scaleMe(-fruits[i].sales));
    pop();
  }

  // draws X axis
  // draw black line horizontally
  stroke(0)
  strokeWeight(1)

  let tGap = chartHeight / (chartTicks - 1)
  let numGap = maxValue / (chartTicks - 1)
  
  line(0, 0, chartWidth, 0)
  line(0, 0, 0, -chartHeight)

  for(let x = 0; x < chartTicks; x++) {
    line(0, x*-tGap, -tickLength, -x*tGap)
    textSize(15)
    textAlign(RIGHT, CENTER)
    text(x*numGap.toFixed(0), -10, x*-tGap)
  }

}