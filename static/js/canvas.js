const canvas = document.querySelector('canvas')
canvas.width = 1024;
canvas.height = 300;
var ctx = canvas.getContext("2d");
console.log("A")
canvas.contentEditable = true;
let no_of_items = 20;
let bubble_speed = 40;
let insertion_speed = 10;

class Platform {
  constructor({ in_arr, height, color }) {
    this.position_in_arr = in_arr,
    this.width = 500 / no_of_items;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position_in_arr * (this.width+5), 300, this.width, (-1 * (this.height * canvas.height * 30) / 20000));
  }

  update() {
    this.draw();
  }
}
let random_heights = []
for (let i = 0; i < no_of_items; i++) {
  let a = Math.floor(Math.random() * ( 500 - 50 + 1) + 50);
  console.log(a)
  random_heights.push(a);
}
console.log(random_heights)
let platforms = []
for (let i = 0; i < no_of_items; i++) {
  platforms.push(new Platform({ in_arr: i + 1, height: random_heights[i], color: "red" }));
}

let sum_heights = 0
let max_heights = -1

platforms.forEach((p) => {
  sum_heights += p.height
  max_heights < p.height ? max_heights = p.height : max_heights = max_heights;
})

function animate() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  platforms.forEach((p) => {
    p.update();
  })
}

animate();

async function bubble() {
  let i, j;
  let n = platforms.length
  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      if (platforms[j].height > platforms[j + 1].height) {
        platforms[j].color = "blue";
        platforms[j + 1].color = "blue";
        await new Promise(r => setTimeout(r, bubble_speed));
        requestAnimationFrame(animate);
        let height = platforms[j + 1].height;
        platforms[j + 1].height = platforms[j].height;
        platforms[j].height = height;
        platforms[j].color = "red";
        platforms[j + 1].color = "red";
      }
    }
  }
};

async function insertion() {
for (let i = 1; i < platforms.length; i++) {
  let key = platforms[i].height;
  let j = i - 1;
  while (j >= 0 && key < platforms[j].height) {
    platforms[j].color = "orange";
    platforms[j + 1].color = "orange";
    await new Promise(r => setTimeout(r, insertion_speed));
    requestAnimationFrame(animate);
    let a = platforms[j+1].height
    platforms[j + 1].height = platforms[j].height;
    platforms[j].height = a
    platforms[j].color = "red";
    platforms[j + 1].color = "red";
    --j;
}
  platforms[j + 1].height = key;
}
}

if (button == 'bubble') {
  bubble();
}
else if (button == 'insertion') {
  insertion();
}

var data_slider = document.getElementById("myRange_data");
var speed_slider = document.getElementById("myRange_speed");

data_slider.oninput = function () {  
  console.log(no_of_items)
  no_of_items = this.value > 10 ? this.value : 5;
  platforms = []
  random_heights = []
  for (let i = 0; i < no_of_items; i++) {
    let a = Math.floor(Math.random() * ( 500 - 50 + 1) + 50);
    random_heights.push(a);
  }
  for (let i = 0; i < no_of_items; i++) {
    platforms.push(new Platform({ in_arr: i + 1, height: random_heights[i], color: "red" }));
  }
  
  sum_heights = 0
  max_heights = -1
  
  platforms.forEach((p) => {
    sum_heights += p.height
    max_heights < p.height ? max_heights = p.height : max_heights = max_heights;
  })
  insertion()
  requestAnimationFrame(animate);
}

speed_slider.oninput = function () {
  console.log(speed_slider.value)
  console.log(this.value);
  if(button = 'bubble') {
    bubble_speed = speed_slider.value;
  }
  if(button = 'insertion') {
    insertion_speed = speed_slider.value;
  }
}