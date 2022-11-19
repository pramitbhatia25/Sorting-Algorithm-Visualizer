const canvas = document.querySelector('canvas')
canvas.width = 1024;
canvas.height = 520;
var ctx = canvas.getContext("2d");
console.log("A")
canvas.contentEditable = true;

class Platform {
  constructor({ in_arr, height, color }) {
    this.position_in_arr = in_arr,
      this.width = 20;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(100 + this.position_in_arr * 40, 400, this.width, 1 + (-1 * (this.height * canvas.height * 5) / sum_heights));
  }

  update() {
    this.draw();
  }
}
let random_heights = []
for (let i = 0; i < 20; i++) {
  let a = Math.floor(Math.random() * 100);
  random_heights.push(a);
}
let platforms = []
for (let i = 0; i < 20; i++) {
  platforms.push(new Platform({ in_arr: i + 1, height: random_heights[i], color: "red" }));
}

let sum_heights = 0
let max_heights = -1

platforms.forEach((p) => {
  sum_heights += p.height
  max_heights < p.height ? max_heights = p.height : max_heights = max_heights;
})

function animate() {
  ctx.fillStyle = 'white';
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
        await new Promise(r => setTimeout(r, 100));
        requestAnimationFrame(animate);
        let height = platforms[j + 1].height;
        platforms[j + 1].height = platforms[j].height;
        platforms[j].height = height;
        platforms[j].color = "red";
        platforms[j + 1].color = "red";
        await new Promise(r => setTimeout(r, 100));
        requestAnimationFrame(animate);
      }
    }
  }
};

async function insertion() {
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].color = "teal";
    await new Promise(r => setTimeout(r, 500));
    requestAnimationFrame(animate);
    let min_idx = i
    for (let j = i + 1; j < platforms.length; j++) {
      platforms[j].color = "orange";
      await new Promise(r => setTimeout(r, 500));
      requestAnimationFrame(animate);
      if (platforms[min_idx].height > platforms[j].height) {
        if(min_idx != i) {
          platforms[min_idx].color = "red";
        }
        min_idx = j
      }
      else {
        platforms[j].color = "red";
      }
    }
    await new Promise(r => setTimeout(r, 1000));
    requestAnimationFrame(animate);
    platforms[i].color = "blue";
    platforms[min_idx].color = "blue";
    await new Promise(r => setTimeout(r, 1000));
    requestAnimationFrame(animate);
    let h = platforms[i].height
    platforms[i].height = platforms[min_idx].height
    platforms[min_idx].height = h
    platforms[i].color = "red";
    platforms[min_idx].color = "red";
    await new Promise(r => setTimeout(r, 1000));
    requestAnimationFrame(animate);
  }
}

console.log(button);
if (button == 'bubble') {
  console.log("bubbleA");
  bubble();
}
else if (button == 'insertion') {
  console.log("insertionB");
  insertion();
}
