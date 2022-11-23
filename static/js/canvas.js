const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth * 0.8;
canvas.height = 300;
var ctx = canvas.getContext("2d");
canvas.contentEditable = true;
let no_of_items = 60;
let bubble_speed = 40;
let insertion_speed = 10;
let selection_speed = 10;
let merge_speed = 10;

// alert('Please View On Laptop, Mobile Support Is Under Development');

class Platform {
  constructor({ in_arr, height, color }) {
    this.position_in_arr = in_arr,
    this.width = canvas.width / no_of_items;
    this.height = height;
    this.color = color;
    this.alt_color = "white"
  }

  draw() {
    ctx.fillStyle = this.alt_color;
    var centerX = (this.position_in_arr * (this.width)) + (this.width - 5) / 2 + 2;
    var centerY = 300 - (this.width - 5) / 2 - (1 * (this.height * canvas.height * 30) / 20000);
    var radius = (this.width - 5) / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.fillRect(this.position_in_arr * (this.width) + 2, 300 - (this.width - 5) / 2, this.width - 5, (-1 * (this.height * canvas.height * 30) / 20000));

    var centerX = (this.position_in_arr * (this.width)) + (this.width - 5) / 2 + 2;
    var centerY = 300 - (this.width - 5) / 2;
    var radius = (this.width - 5) / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.alt_color;
    ctx.fill();

    var centerX = (this.position_in_arr * (this.width)) + (this.width - 5) / 2;
    var centerY = 300 - (this.width - 5) / 2 - (1 * (this.height * canvas.height * 30) / 20000);
    var radius = (this.width - 5) / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.fillStyle = this.alt_color;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position_in_arr * (this.width), 300 - (this.width - 5) / 2, this.width - 5, (-1 * (this.height * canvas.height * 30) / 20000));

    var centerX = (this.position_in_arr * (this.width)) + (this.width - 5) / 2;
    var centerY = 300 - (this.width - 5) / 2;
    var radius = (this.width - 5) / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
  }
}

function randomize() {
    if (!started) {
    platforms = []
    random_heights = []
    for (let i = 0; i < no_of_items; i++) {
      let a = Math.floor(Math.random() * (500 - 50 + 1) + 50);
      random_heights.push(a);
    }
    for (let i = 0; i < no_of_items; i++) {
      platforms.push(new Platform({ in_arr: i, height: random_heights[i], color: "red" }));
    }

    sum_heights = 0
    max_heights = -1

    platforms.forEach((p) => {
      sum_heights += p.height
      max_heights < p.height ? max_heights = p.height : max_heights = max_heights;
    })
    requestAnimationFrame(animate);
  }
}

if(canvas.width / no_of_items < 5){
  no_of_items = 20;
}

let random_heights = []
for (let i = 0; i < no_of_items; i++) {
  let a = Math.floor(Math.random() * (400 - 50 + 1) + 50);
  random_heights.push(a);
}
let platforms = []
for (let i = 0; i < no_of_items; i++) {
  platforms.push(new Platform({ in_arr: i, height: random_heights[i], color: "red" }));
}

let sum_heights = 0
let max_heights = -1

platforms.forEach((p) => {
  sum_heights += p.height
  max_heights < p.height ? max_heights = p.height : max_heights = max_heights;
})

function animate() {
  ctx.fillStyle = 'rgb(57, 57, 57)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  platforms.forEach((p) => {
    p.update();
  })

  if (started) {
    document.getElementById('myRange_data').disabled = true;
  }
  if (!started) {
    document.getElementById('myRange_data').disabled = false;
  }

}

animate();
var started = false;

async function bubble() {
  started = true;
  let i, j;
  let n = platforms.length
  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      platforms[j].color = "orange";
      await new Promise(r => setTimeout(r, bubble_speed));
      requestAnimationFrame(animate);
      platforms[j + 1].color = "orange";
      await new Promise(r => setTimeout(r, bubble_speed));
      requestAnimationFrame(animate);
      if (platforms[j].height > platforms[j + 1].height) {
        platforms[j].color = "blue";
        platforms[j + 1].color = "blue";
        platforms[j].alt_color = "blue";
        platforms[j + 1].alt_color = "blue";
        await new Promise(r => setTimeout(r, bubble_speed));
        requestAnimationFrame(animate);
        let height = platforms[j + 1].height;
        platforms[j + 1].height = platforms[j].height;
        platforms[j].height = height;
        await new Promise(r => setTimeout(r, bubble_speed));
        requestAnimationFrame(animate);
        platforms[j].color = "red";
        platforms[j + 1].color = "red";
        platforms[j].alt_color = "white";
        platforms[j + 1].alt_color = "white";
      }
      platforms[j].color = "red";
      platforms[j + 1].color = "red";
      await new Promise(r => setTimeout(r, bubble_speed));
      requestAnimationFrame(animate);
    }
    platforms[j].color = "green";
    await new Promise(r => setTimeout(r, bubble_speed));
    requestAnimationFrame(animate);
  }
  platforms[0].color = "green";
  await new Promise(r => setTimeout(r, bubble_speed));
  requestAnimationFrame(animate);
  started = false;
};

async function insertion() {
  started = true;
  for (let i = 1; i < platforms.length; i++) {
    let key = platforms[i].height;
    let j = i - 1;
    while (j >= 0 && key < platforms[j].height) {
      platforms[j].color = "orange";
      platforms[j + 1].color = "orange";
      platforms[j].alt_color = "orange";
      platforms[j + 1].alt_color = "orange";
      await new Promise(r => setTimeout(r, insertion_speed));
      requestAnimationFrame(animate);
      let a = platforms[j + 1].height
      platforms[j + 1].height = platforms[j].height;
      platforms[j].height = a
      await new Promise(r => setTimeout(r, insertion_speed));
      requestAnimationFrame(animate);
      platforms[j].color = "green";
      platforms[j + 1].color = "green";
      platforms[j].alt_color = "white";
      platforms[j + 1].alt_color = "white";
      --j;
    }
    platforms[j + 1].height = key;
  }
  started = false;
}

async function selection() {
  started = true
  let min_idx = 0
  for (let i = 0; i < platforms.length; i++) {
    min_idx = i
    for (let j = i + 1; j < platforms.length; j++) {
      platforms[j].color = "orange";
      await new Promise(r => setTimeout(r, selection_speed));
      requestAnimationFrame(animate);
      if (platforms[min_idx].height > platforms[j].height) {
        min_idx = j
      }
      platforms[j].color = "red";
    }
    platforms[min_idx].color = "orange";
    await new Promise(r => setTimeout(r, selection_speed));
    requestAnimationFrame(animate);
    platforms[min_idx].color = "blue";
    platforms[i].color = "blue";
    await new Promise(r => setTimeout(r, selection_speed));
    requestAnimationFrame(animate);
    let a = platforms[min_idx].height
    platforms[min_idx].height = platforms[i].height;
    platforms[i].height = a;
    platforms[min_idx].color = "red";
    platforms[i].color = "green";
    await new Promise(r => setTimeout(r, selection_speed));
    requestAnimationFrame(animate);
  }
  started = false;
}


async function merge(left, right){
    let arr = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    return [ ...arr, ...left, ...right ]
}

async function mergeSort(array) {
  const half = array.length / 2
  
  // Base case or terminating case
  if(array.length < 2){
    return array 
  }
  
  const left = array.splice(0, half)
  return merge(await mergeSort(left),await mergeSort(array))
}

if (button != 'none') {
  document.getElementById(button).style.backgroundColor = 'red';
}
var tempArr = [...platforms];

async function startSort() {
  if (!started) {
    if (button == "none") {
      alert("Please Select A Sorting Algorithm First.")
    }
    if (button == 'bubble') {
      bubble();
    }
    else if (button == 'insertion') {
      insertion();
    }
    else if (button == 'selection') {
      selection();
    }
    else if (button == 'merge') {
      let array = []
      platforms.forEach((p) => {
        array.push(p.height);
      })
      array = await mergeSort(array);
      i = 0
      platforms.forEach((p) => {
        p.height = array[i]
        p.color = "green"
        i++
      })
      await new Promise(r => setTimeout(r, insertion_speed));
      requestAnimationFrame(animate);
    }

  }
}

var data_slider = document.getElementById("myRange_data");
var small_speed_slider = document.getElementById("abra");
var speed_slider = document.getElementById("myRange_speed");

data_slider.oninput = function () {
  no_of_items = this.value > 5 ? this.value : 5;
  randomize();
}

speed_slider.oninput = function () {
  if (button == 'bubble') {
    bubble_speed = speed_slider.value * 2;
    console.log(bubble_speed)
  }
  if (button == 'insertion') {
    insertion_speed = speed_slider.value * 2;
    console.log(insertion_speed)
  }
  if (button == 'selection') {
    selection_speed = speed_slider.value * 2;
    console.log(selection_speed)
  }
  if (button == 'merge') {
    merge_speed = speed_slider.value * 2;
    console.log(merge_speed)
  }
}

small_speed_slider.oninput = function () {
  if (button == 'bubble') {
    bubble_speed = small_speed_slider.value * 2;
    console.log(bubble_speed)
  }
  if (button == 'insertion') {
    insertion_speed = small_speed_slider.value * 2;
    console.log(insertion_speed)
  }
  if (button == 'selection') {
    selection_speed = small_speed_slider.value * 2;
    console.log(selection_speed)
  }
  if (button == 'merge') {
    merge_speed = small_speed_slider.value * 2;
    console.log(merge_speed)
  }
}

