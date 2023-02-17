
let values = [23, 56, 78, 90, 50, 20, 15 ]
let charts = []




function setup() {
  createCanvas(500, 500);
  background(200);
  angleMode(DEGREES);
  rectMode(CORNER);
  noLoop();

  // charts.push(new BarChart(400, 400, 50, 450, fruits))

  // charts.push(new BarChart(200, 200, 50, 250, fruits))
  charts.push(new BarChart(400, 200, 50, 450, values))

}

function draw() {
  charts[0].render()
}


// let firstChart = new BarChart(500)
// let secondChart = new BarChart(200)



console.log(charts)