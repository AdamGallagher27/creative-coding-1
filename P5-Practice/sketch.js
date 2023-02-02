
let angle = 0;

// runs on start up
function setup() {
  // creates canvas / asigns background colour
  createCanvas(500, 500)
  background(200)

  // changes p5 to use degrees instead of radians
  angleMode(DEGREES);
}

// runs 60 times a second
function draw() {

  // redraw the background 
  background(200)

  // push and pop work like a div
  push()
  // gives shapes colours
  fill(200, 100, 10)

  // moves the origin of the grid
  // (moves the whole grid to specified position)
  translate(200, 200)

  // rotates the grid
  rotate(angle)
  
  // draws rectangles
  // rectanlge isnt at 0 0 because i translated
  // origin is now at 200 200 
  rect(0, 0, 250, 250)

  angle++
  pop()

  // this is outside the translation
  rect(0, 0, 30, 30)
  
}