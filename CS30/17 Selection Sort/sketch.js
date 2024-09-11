// Selection Sort
// Udaey Sandha
// Nov 3, 2023
// An implementation of the selection sort algorithm

let values = [];
const NUM_VALUES = 20;

function setup() {
  noCanvas();
  populateArray();
  print (values);
  selectionSort();
  print(values);
}

function selectionSort(){
  for (let index = 0; index <values.length-1;index++){
    let minimum = values[index];
    let minimumLoc= index;
    for (let searchIndex = index+1; searchIndex<values.length;searchIndex++){
      let cur =values[searchIndex];
      if (cur<minimum) minimum=cur,minimumLoc = searchIndex;

    }
    let temp = values[index];
    values[index] = values[minimumLoc];
    values[minimumLoc]=temp ;
  }
}

function populateArray(){
  for(let i = 0; i<NUM_VALUES;i++){
    values.push(floor(random(1000)));
  }
}