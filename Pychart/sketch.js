// initial data
const initialData = [
  { name: 'cars', value: 25 },
  { name: 'buses', value: 25 },
  { name: 'buses', value: 25 },
  { name: 'buses', value: 25 },
  { name: 'buses', value: 25 },
  { name: 'buses', value: 25 },
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
  const sum = data.reduce((accumulator, object) => {
    return accumulator + object.value;
  }, 0);

  data.forEach(element => {

    // should use class / contructor here
    let current = {
      name: element.name,
      percent: (element.value / sum) * 100,
      color: (this.percent / 255) * 100
    }

    final.push(current)
  }, 0);

  return final
}

// function that draws each segment of the chart
function drawSegments(data) {

  // holds all angles of previous rotations
  let rotations = []

  // draw first segment in same position every time
  const firstSeg = (data[0].percent / 100) * 360
  rotations.push(firstSeg)
  push()
  fill(0, 255, 0)
  arc(0, 0, pieX, pieY, 0, firstSeg)
  pop()

  // loop through the rest of the data
  for (let i = 1; i < data.length; i++) {
    push()
    fill(random(100, 255), 0, 0)

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
    pop()
  }

}

// set up
function setup() {
  createCanvas(screenWidth, screenHeight);
  background(200)
  angleMode(DEGREES)
  getPercent(initialData)
  noStroke()
  noLoop()
}

// draw 
function draw() {

  // translate to draw from origin in center
  // draw the segments
  translate(transX, transY)
  drawSegments(data)

}