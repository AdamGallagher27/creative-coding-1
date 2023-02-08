const initialData = [
  {name: 'cars', value: 10},
  {name: 'bus', value: 10},
  {name: 'cycle', value: 10},
  {name: 'cycle', value: 10}
]

const data = getPercent(initialData)

const screenWidth = 500
const screenHeight = 500
const transX = 250
const transY = 250
const pieX = 250
const pieY = 250
const maxData = Math.max(...initialData.map( obj => obj.value ));


function getPercent(data) {

  let final = []
  const sum = data.reduce( (accumulator, object) => {
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


function myMap(n, start1, stop1, start2, stop2,) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2
}


function drawSegments(data) {

  // console.log(data[0].percent)
  // console.log(maxData)
  const firstSeg = myMap(data[0].percent, 0, maxData, 0, 360 )

  push()
  fill(0)
  arc(0, 0, pieX, pieY, 0,  firstSeg)
  pop()


  // for(let i = 0; i < data.length; i++) {

  // }
}


function setup() {
  createCanvas(screenWidth, screenHeight);
  background(200);
  angleMode(DEGREES);

  getPercent(initialData)

  // let value = 100;
  // let m1 = map(value, 0, 100, 0, 20);
  // let m2 = myMap(value, 0, 100, 0, 20);

  // console.log(m1, m2)


}


function draw() {
  translate(transX, transY)
  ellipse(0, 0, pieX, pieY)
  
  // const firstLine = line(0, 0, pieX / 2, 0);

  // push()
  // // rotate(90, 0)
  // // const secondLine = line(0, 0, -(pieX / 2), 0);
  // fill(0)
  // arc(0, 0, pieX, pieY, 0,  180)

  // pop()

  drawSegments(data)


}