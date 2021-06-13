let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

canvas.style = "border: 1px solid";
canvas.width = 256;
canvas.height = 256;

let jump = false;
let start = 0;
let gravity = 980;
let jumpSpeed = 400;

let square = {
  size: 32,
  grounded: true,
  x: canvas.width / 2,
  y: canvas.height,
  y_velocity: 40.0
};

document.addEventListener("keydown", handleKeys);
document.addEventListener("keyup", handleKeys);

render();

function render(timestamp) {
  let delta;
  if (timestamp === undefined || start === undefined)
    delta = 0;
  else
    delta = (timestamp - start) / 1000;
  context.clearRect(0,0,canvas.width,canvas.height);
  // Handle jump
  if(square.grounded && jump){
    square.grounded = false;
    square.y_velocity = jumpSpeed;
  }
  //apply gravity
  square.y_velocity = square.y_velocity - (gravity * delta);
  //apply current square velocity
  square.y = square.y - (square.y_velocity * delta);
  //apply floor
  if(square.y > canvas.height){
    square.grounded = true;
    square.y = canvas.height;
    //square.y_velocity = 0;
  }
  context.fillStyle = "#ff0000"; // hex for red
  //context.strokeStyle = "#00ff00";
  //context.lineWidth = 16;
  context.beginPath();
  context.rect(
    square.x - square.size / 2,
    square.y - square.size, //anchor to bottom middle of square
    square.size,
    square.size
  );
  context.fill();
  //context.stroke();

  start = timestamp;
  requestAnimationFrame(render);
}

function handleKeys(e) {
  //jump = false;
  if (e.keyCode === 32) {
    jump = e.type === "keydown";
  }
}
