const initialData = [
  { name: 'cars', value: 25 },
  { name: 'buses', value: 25 },
  { name: 'buses', value: 25 },
  { name: 'buses', value: 25 },
  { name: 'buses', value: 25 },
  { name: 'buses', value: 25 },
]

const data = getPercent(initialData)

const screenWidth = 500
const screenHeight = 500
const transX = 250
const transY = 250
const pieX = 250
const pieY = 250
const maxData = Math.max(...initialData.map(obj => obj.value));


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


function drawSegments(data) {

  let rotations = []

  // draw first segment in same position every time
  const firstSeg = (data[0].percent / 100) * 360
  rotations.push(firstSeg)
  push()
  fill(0, 255, 0)
  arc(0, 0, pieX, pieY, 0, firstSeg)
  pop()


  for (let i = 1; i < data.length; i++) {
    push()
    fill(random(100, 255), 0, 0)
    const currentSeg = (data[i].percent / 100) * 360
    const prevRotations = rotations.reduce((accumulator, object) => {
      return accumulator + object;
    })

    rotations.push(currentSeg)
    rotate(prevRotations)
    arc(0, 0, pieX, pieY, 0, currentSeg)
    pop()
  }

}


function setup() {
  createCanvas(screenWidth, screenHeight);
  background(200);
  angleMode(DEGREES);
  getPercent(initialData)
  noStroke()
  noLoop();

}


function draw() {

  translate(transX, transY)
  ellipse(0, 0, pieX, pieY)
  drawSegments(data)

}