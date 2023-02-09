const initialData = [
  { name: 'cars', value: 33 },
  { name: 'bus', value: 90 },
  { name: 'yes', value: 180 },
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

  console.log(sum)

  data.forEach(element => {

    // should use class / contructor here
    let current = {
      name: element.name,
      percent: (element.value / sum) * 100,
    }

    final.push(current)
  }, 0);

  console.log(final)
  return final
}


function drawSegments(data) {

  // draw first segment in same position every time
  const firstSeg = (data[0].percent / 100) * 360
  push()
  fill(0)
  arc(0, 0, pieX, pieY, 0, firstSeg)
  pop()


}


function setup() {
  createCanvas(screenWidth, screenHeight);
  background(200);
  angleMode(DEGREES);
  getPercent(initialData)
}


function draw() {
  translate(transX, transY)
  ellipse(0, 0, pieX, pieY)

  drawSegments(data)

}