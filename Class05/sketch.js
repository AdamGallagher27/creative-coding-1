

// let fruits = [
//   {name:"banana", value: 200},
//   {name:"apple", value: 300},
  
// ]

let table
let data  = []

function preload() {
  table = loadTable('data/fruit_sales.csv', 'csv', 'header');
}


function cleanData() {
  for(let i = 0; i < table.getRowCount(); i++) {
    data.push(table.rows[0].obj)
  }
}


function setup() {
  createCanvas(500, 500)

  cleanData()
}

function draw() {
  background(0)
}