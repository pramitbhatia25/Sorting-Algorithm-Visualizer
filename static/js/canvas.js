function newImage(name, ext) {
  const new_image = new Image()
  new_image.src = "/static/" + name + "." + ext;
  return new_image;
}

const canvas = document.querySelector('canvas')
canvas.width = 1024;
canvas.height = 520;
var ctx = canvas.getContext("2d");

canvas.contentEditable = true;

class Platform {
  constructor({in_arr, height}) {
    this.position_in_arr=in_arr,
    this.width = 20;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = 'brown';
      ctx.fillRect(100+this.position_in_arr*40, 400, this.width, 1+ (-1*(this.height*canvas.height*5) / sum_heights));
  }

  update() {
    this.draw();
  }
}
let random_heights = []
for(let i = 0; i < 20; i++) {
  let a = Math.floor(Math.random() * 100);
  random_heights.push(a);
  console.log(a)
}
let platforms = []
for(let i = 0; i < 20; i++) {
  platforms.push(new Platform({in_arr: i+1, height: random_heights[i]}));
}

let sum_heights = 0
let max_heights = -1

platforms.forEach((p) => {
  sum_heights += p.height
  max_heights < p.height ? max_heights = p.height: max_heights = max_heights;
})

console.log(max_heights)

function animate() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  platforms.forEach((p) => {
    p.update();
  })

  // ctx.fillStyle = "white";
  // ctx.font = '17px serif';
  // ctx.fillText("Score: " + score, 940, 30);
  // ctx.fillText("High Score: " + high_score, 902, 50);
  // ctx.fillText("Level: " + level, 940, 70);
  // ctx.fillText("Deaths: " + deaths, 940, 90);
}

animate();

let i, j;
let n = platforms.length
for(i = 0; i < n - 1; i++) {
  for (j = 0; j < n - i - 1; j++) {
    console.log("AA")
    if (platforms[j].height > platforms[j + 1].height) {
      let height = platforms[j+1].height;
      platforms[j+1].height = platforms[j].height;
      platforms[j].height = height;
      await new Promise(r => setTimeout(r, 50));
      requestAnimationFrame(animate);
    }
  }
}

