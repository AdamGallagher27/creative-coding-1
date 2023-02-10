

// let data = [12, 100, 150, 90, 200, 100, 12 , 200, 35, 300]

// data as array of objects 
let travel = [
  {name:"car", value:100},
  {name:"bus", value:2000},
  {name:"walking", value:300},
  {name:"cycle", value:4500},
  
]

// let numSales = []
// fruits.forEach(element => numSales.push(element.sales))


// global variables
let numBlocks = travel.length;
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
let maxValue = Math.max(...travel.map( obj => obj.value ));


// changes given num to correct scale
function scaleMe(num) {
  let maxValue = Math.max(...travel.map( obj => obj.value ));
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
    fill(travel[i].value, 0, 0)
    rect(0, 0, blockWidth, scaleMe(-travel[i].value));
    pop();
  }

  // draws X / Y axis
  stroke(0)
  strokeWeight(1)
  


  drawAxis(0, chartHeight, createVector(0, 0), true)
  drawAxis(90, chartWidth, createVector(0, 0))
  drawAxis(700, chartWidth)
  drawAxis(10, chartWidth)
  drawAxis(30, chartWidth, )


}


function drawAxis( _angle, _length, _pos, _lable=false, _nTicks=5) {

  // tgap = tick gap
  let tGap = chartHeight / (_nTicks - 1)
  // num gap = numbers beside the gap
  let numGap = maxValue / (_nTicks - 1)
  

  translate(_pos.x, _pos.y)
  rotate(_angle)
  line(0, 0, 0, -_length)


  // draws the ticks and the numbers
  for(let x = 0; x < _nTicks; x++) {
    
    if(_lable) {
      line(0, x*-tGap, -tickLength, -x*tGap)
      textSize(15)
      textAlign(RIGHT, CENTER)
      text(x*numGap.toFixed(0), -10, x*-tGap)
    }
  }

}