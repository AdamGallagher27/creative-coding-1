// initial data
const initialData = [
  { name: 'Adam', value: 80 },
  { name: 'Niamh', value: 40 },
  { name: 'Sarah', value: 10},
  { name: 'Kate', value: 30 },
  { name: 'Brian', value: 100 },
  { name: 'Sean', value: 20 },
  { name: 'Holly', value: 10 },
  { name: 'Eleanor', value: 300 },
  { name: 'Adam', value: 80 },
  { name: 'Niamh', value: 40 },
  { name: 'Sarah', value: 10},
]

// clean data
const data = getPercent(initialData)

// global variables
const screenWidth = 500
const screenHeight = 500
const transX = 250
const transY = 250
const pieX = 250
const pieY = 250
const maxData = Math.max(...initialData.map(obj => obj.value))
const textMargin = 165

// holds all angles of previous rotations
let rotations = []

// function for converting the value to a percentage
// ...ie cleaning
function getPercent(data) {

  // final to be returned at the end
  let final = []

  // varaible for the color scale 
  const colorScale = scaleColor()

  // sum of all the values in inital data
  const sum = data.reduce((accumulator, object) => {
    return accumulator + object.value;
  }, 0);


  data.forEach((element, index) => {

    // should use class / contructor here
    // restructuring intial data to be a percentage and have a color
    let current = {
      name: element.name,
      percent: (element.value / sum) * 100,
      color: colorScale * (index + 1)
    }

    // add them to final
    final.push(current)
  }, 0);

  // return the new data in a sorted array
  return final.sort((a, b) => a.percent - b.percent)
}


// function that draws each segment of the chart
function makePie(data) {

  // draw the first segment in the same place every time
  const firstData = data[0]
  drawSegment(firstData)

  // loop through the rest of the data
  for (let i = 1; i < data.length; i++) {
    push()

    // the sum of all previous rotations
    const prevRotations = rotations.reduce((accumulator, object) => {
      return accumulator + object;
    })

    // draw the segment for the current
    drawSegment(data[i], prevRotations)
    pop()
  }


}


function drawSegment(data, prevRotat=0) {

  // current segment / varaible to make text sit upright
  const currentSeg = (data.percent / 100) * 360
  const upRight = makeUpRight(prevRotat, currentSeg)
  
  // add rotations to rotations array
  rotations.push(currentSeg)

  push()
  // asign colour and draw arc with first sec angle
  fill(0, data.color, 200)

  // if the previous rotation exists rotate the grid by that total
  if(prevRotat) {
    rotate(prevRotat)
  }

  // draw the segment
  arc(0, 0, pieX, pieY, 0, currentSeg)

  // draw label for each segment
  // rotate the text half of the current to get it in the middle
  rotate(currentSeg / 2)
  textAlign(CENTER)
  translate(textMargin, 0)

  // rotate by upright to make text upright
  rotate(upRight)
  text(data.name + ` (${data.percent.toFixed(1)}%)`, 0, 0)
  pop()


}

// makes the text appear upright on piechart
function makeUpRight(rotation, segment) {
  return (360 - rotation) - (segment / 2)
}

// function for scaling colour
function scaleColor() {
  const numColors = initialData.length
  const range = 255
  return range / numColors
}



const pieChart = new Pie(pieX, pieY, 0, 0, data)

console.log(pieChart)

// set up
function setup() {
  createCanvas(screenWidth, screenHeight)
  background(200)
  angleMode(DEGREES)
  getPercent(initialData)
  noStroke()
  noLoop()
}

// draw 
function draw() {
  background(30)

  // translate to draw from origin in center
  // draw the piechart
  translate(transX, transY)
  // makePie(data)
  pieChart.render()

}