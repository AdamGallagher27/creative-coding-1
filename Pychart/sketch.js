
const screenWidth = 500
const screenHeight = 500
const transX = 250
const transY = 250
const pieX = 250
const pieY = 250

const data = [
  {name: 'cars', value: 10},
  {name: 'bus', value: 20},
  {name: 'cycle', value: 30}
]



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


function setup() {
  createCanvas(screenWidth, screenHeight);
  background(200);
  angleMode(DEGREES);

  getPercent(data)
}

function draw() {
  noStroke()
  translate(transX, transY)
  ellipse(0, 0, pieX, pieY)


}