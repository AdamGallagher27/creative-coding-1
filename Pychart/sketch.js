// initial data
const initialData = [
  { name: '1', value: 100 },
  { name: '2', value: 5 },
  { name: '3', value: 5 },
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
const maxData = Math.max(...initialData.map(obj => obj.value));



// function for converting the value to a percentage
// ...ie cleaning
function getPercent(data) {

  let final = []
  const colorScale = scaleColor()
  const sum = data.reduce((accumulator, object) => {
    return accumulator + object.value;
  }, 0);


  data.forEach((element, index) => {

    // should use class / contructor here
    let current = {
      name: element.name,
      percent: (element.value / sum) * 100,
      color: colorScale * (index + 1)
    }

    final.push(current)
  }, 0);

  console.log(final)
  return final.sort((a, b) => a.percent - b.percent)
}

// function that draws each segment of the chart
function drawPie(data) {

  // holds all angles of previous rotations
  let rotations = []
  const firstData = data[0]

  // draw first segment in same position every time
  const firstSeg = (firstData.percent / 100) * 360
  const firstUpRight = makeUpRight(0, firstSeg)

  // add rotations to rotations array
  rotations.push(firstSeg)

  
  push()
  // asign colour and draw arc with first sec angle
  fill(0, firstData.color, 200)
  arc(0, 0, pieX, pieY, 0, firstSeg)
  rotate(firstSeg/2)
  textAlign(CENTER)
  translate(165, 0)
  rotate(firstUpRight)
  text(firstData.name + ` (${firstData.percent.toFixed(1)}%)`, 0, 0)
  pop()

  // loop through the rest of the data
  for (let i = 1; i < data.length; i++) {
    push()

    fill(0, data[i].color, 200)

    // current segment / the sum of all previous rotations
    const currentSeg = (data[i].percent / 100) * 360
    const prevRotations = rotations.reduce((accumulator, object) => {
      return accumulator + object;
    })
    
    // add current segment to rotations
    rotations.push(currentSeg)
    
    // rotate the sum of previous rotations then draw the arc of current seg
    rotate(prevRotations)
    arc(0, 0, pieX, pieY, 0, currentSeg)

    // variable for setting the text to be upright 
    const upRight = makeUpRight(prevRotations, currentSeg)
    
    // rotate each label to the center of its segment
    rotate(currentSeg / 2)

    // draw label code
    push()
    textAlign(CENTER);
    translate(165, 0)
    rotate(upRight)
    text(data[i].name + ` (${data[i].percent.toFixed(1)}%)`, 5, 5)
    pop()
    pop()
  }


}


function makeUpRight(rotation, segment ) {
  return (360 - rotation) - (segment / 2)
}

// function for scaling colour
function scaleColor() {
  const numColors = initialData.length
  const range = 255
  return range / numColors
}


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
  background(20)

  // translate to draw from origin in center
  // draw the segments
  translate(transX, transY)
  drawPie(data)
}