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

async function merge(platforms, p, q, r) {
  // Create L ← A[p..q] and M ← A[q+1..r]
  var n1 = q - p + 1;
  var n2 = r - q;

  var L = new Array(n1).fill( new Platform({in_arr: 0, color: "red", height: 0}));
  var M = new Array(n2).fill( new Platform({in_arr: 0, color: "red", height: 0}));
  // var L[n1], M[n2];

  for (let i = 0; i < n1; i++) {
    L[i].height = platforms[p + i].height;
    L[i].color = platforms[p + i].color;
    L[i].in_arr = platforms[p + i].in_arr;
  }
  for (let j = 0; j < n2; j++){
    M[j].height = platforms[q + 1 + j].height;
    M[j].color = platforms[q + 1 + j].color;
    M[j].in_arr = platforms[q + 1 + j].in_arr;
  }
  // Maintain current index of sub-arrays and main array
  let i, j, k;
  i = 0;
  j = 0;
  k = p;

    // Until we reach either end of either L or M, pick larger among
    // elements L and M and place them in the correct position at A[p..r]
    while (i < n1 && j < n2) {
      if (L[i].height <= M[j].height) {
        platforms[k].height = L[i].height;
        i++;
      } else {
        platforms[k].height= M[j].height;
        j++;
      }
      k++;
    }

    // When we run out of elements in either L or M,
    // pick up the remaining elements and put in A[p..r]
    while (i < n1) {
      platforms[k].height = L[i].height;
      i++;
      k++;
    }

    while (j < n2) {
      platforms[k].height = M[j].height;
      j++;
      k++;
    }
    await new Promise(r => setTimeout(r, insertion_speed));
    requestAnimationFrame(animate);
    } 


// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
async function mergeSort(platforms, l, r) {
  if (l >= r) {
    return;//returns recursively
  }
  var m = l + parseInt((r - l) / 2);
  mergeSort(platforms, l, m);
  mergeSort(platforms, m + 1, r);
  merge(platforms, l, m, r);
  platforms.forEach((p) => {
    console.log(p.height)
  })
  console.log("******************************")
  await new Promise(r => setTimeout(r, 100000));
  requestAnimationFrame(animate);
  console.log("AAA");
}

async function Mss(platforms) {
  requestAnimationFrame(animate);
  if(platforms.length > 1) {
        r = Math.floor(platforms.length/2);
        L = platforms.slice(0, r)
        M = platforms.slice(r, platforms.length )
        Mss(L)
        Mss(M)

        let i = j = k = 0

        while(i < L.length && j < M.length) {
            if (L[i].height < M[j].height) {
              ans[k].height = L[i].height
                i += 1
            }
            else{
              ans[k].height = M[j].height
                j += 1
                        }
                        ans[k].color = "green";
                        await new Promise(r => setTimeout(r, insertion_speed));
                        requestAnimationFrame(animate);
                    k += 1
        }
        while (i < L.length) {
          ans[k].height = L[i].height
          ans[k].color = "green";
            await new Promise(r => setTimeout(r, insertion_speed));
            requestAnimationFrame(animate);
            i += 1
            k += 1
}
        while (j < M.length) {
          ans[k].height = M[j].height
          ans[k].color = "green";
            await new Promise(r => setTimeout(r, insertion_speed));
            requestAnimationFrame(animate);
            j += 1
            k += 1
}
  }
}

if (button != 'none') {
  document.getElementById(button).style.backgroundColor = 'red';
}

var ans = platforms;
function startSort() {
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
      alert('Merge Sort is currently under Maintainence. Please try again later!')
      // platforms.forEach((p) => {
      //   console.log(p.height)
      // })
      // console.log("******************************1")
      // Mss(platforms);
      // platforms = ans;
      // requestAnimationFrame(animate);
        }

  }
}

var data_slider = document.getElementById("myRange_data");
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

