

let data = [12, 100, 150, 90, 200, 100, 12 , 200, 35, 300]
let numBlocks = data.length;

let chartWidth = 300;
let chartHeight = 400;
let marginLeft = 20;
let marginRight = 5;
let blockGap = 10;
let screenWidth = 500;
let screenHeight = 500;
let blockWidth = (chartWidth - (marginLeft + marginRight) - ((numBlocks - 1) * blockGap)) / numBlocks;
let firstBlockxPos = ((screenWidth - chartWidth) / 2) + marginLeft;
let masterGap = blockWidth + blockGap


// function scaleChart(arr) {
//   // console.log(Math.max(...arr))
//   let maxValue = Math.max(...arr);
//   let scaleValue = chartHeight / maxValue;
//   let final = []

//   for(let i = 0; i < arr.length; i++) {
//     final.push(arr[i] * scaleValue)
//   }

//   console.log(final)
//   return final
// }

// scaleChart([1, 2, 3, 66, 7, 90])
// scaleChart([100, 300, 200, 150, 200, 10000])
// scaleChart([900, 200, 400, 150, 300, 700])
// scaleChart([50, 60, 80, 10, 20, 100])
// scaleChart([1, 2, 3, 4, 5, 6])
// let scaleData = scaleChart(data)

function scaleMe(num) {
  let maxValue = Math.max(...data);
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
  for (let i = 0; i < numBlocks; i++) {
    push();
    translate(firstBlockxPos + (i * masterGap), 450)
    fill(data[i], 0, 0)
    rect(0, 0, blockWidth, -scaleMe(data[i]));
    pop();
  }

}