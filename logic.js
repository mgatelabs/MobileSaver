/**
 * Steam Deck Screen Saver
 * By Michael Fuller
 */

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
const panel = document.getElementById("button-panel");
const button0 = document.getElementById("startBtn0");
const button0a = document.getElementById("startBtn0a");
const button0b = document.getElementById("startBtn0b");
const button1 = document.getElementById("startBtn1");
const button1a = document.getElementById("startBtn1a");
const button1b = document.getElementById("startBtn1b");
const button2 = document.getElementById("startBtn2");
const button2a = document.getElementById("startBtn2a");
let width, height;
let x = 100, y = 100, dx = 2, dy = 2;
let animationFrame;
let allowExit = false;
let wakeLock = null;

let selectedMode = 1;

let imageWidth = 50;
let imageHeight = 50;

const cursors = [
  "default", "pointer", "crosshair", "wait",
  "text", "move", "progress", "not-allowed"
];

let cursorIndex = 0;
let cursorInterval;

let currentColor = "lime";
const colors = ["lime", "red", "blue", "yellow", "magenta", "cyan", "white", "orange"];
let colorIndex = 0;
let colorInterval;

let items = [];
let imageMap = {};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startCursorCycle() {
  cursorInterval = setInterval(() => {
    cursorIndex = (cursorIndex + 1) % cursors.length;
    canvas.style.cursor = cursors[cursorIndex];
  }, 3000); // change every 3 seconds
}

function stopCursorCycle() {
  clearInterval(cursorInterval);
  canvas.style.cursor = "default";
}

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

let lastTime = 0;

function draw(currentTime) {

  const deltaTime = currentTime - lastTime;
  let msDiff = deltaTime / 1000.0;
  if (isNaN(msDiff) || msDiff < 0.01) {
    msDiff = 0.01;
  }
  lastTime = currentTime;

  ctx.clearRect(0, 0, width, height);

  for (const item of items) {
    item.update(msDiff);
    item.draw(ctx);
  }

  animationFrame = requestAnimationFrame(draw);
}

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => {
        console.log('Wake Lock released');
      });
      console.log('Wake Lock active');
    } else {
      console.warn('Wake Lock not supported');
    }
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
}

function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
  }
}

function enterSquare() {
  selectedMode = 0;

  items = [];
  items.push(new BouncingBox());

  enterFullscreen();
}

function enterSquareA() {
  selectedMode = 0;

  items = [];
  items.push(new BouncingBox());
  items.push(new BouncingBox());

  enterFullscreen();
}

function enterSquareB() {
  selectedMode = 0;

  items = [];
  items.push(new BouncingBox());
  items.push(new BouncingBox());
  items.push(new BouncingBox());
  items.push(new BouncingBox());
  items.push(new BouncingBox());

  enterFullscreen();
}

function enterDvd() {

  items = [];
  items.push(new DvdLogo());
  enterFullscreen();
}

function enterDvdA() {

  items = [];
  items.push(new DvdLogo());
  items.push(new DvdLogo());
  enterFullscreen();
}

function enterDvdB() {

  items = [];
  items.push(new DvdLogo());
  items.push(new DvdLogo());
  items.push(new DvdLogo());
  items.push(new DvdLogo());
  items.push(new DvdLogo());
  enterFullscreen();
}

function enterDecks() {
  items = [];
  for (let i = 0; i < 8; i++) {
    items.push(new Flyer(0));
  }
  for (let i = 0; i < 8; i++) {
    items.push(new Flyer(1));
  }
  enterFullscreen();
}

function enterDecksA() {
  items = [];
  for (let i = 0; i < 24; i++) {
    items.push(new Flyer(0, false));
  }
  for (let i = 0; i < 24; i++) {
    items.push(new Flyer(1, false));
  }
  enterFullscreen();
}

async function enterFullscreen() {
  try {
    await document.documentElement.requestFullscreen();
    await requestWakeLock();

    startCycle();
  } catch (e) {
    console.error("Failed to enter fullscreen:", e);
    // Let it play on devices where you can't get exclusive lock
    startCycle();
  }
}

function startCycle() {
    canvas.style.display = 'block';
    panel.style.display = 'none';

    resize();

    allowExit = false;
    setTimeout(() => allowExit = true, 1000);


    itemMap = {};

    for (const item of items) {
      item.reset();
      image_name = item.requestImage();
      if (image_name) {
        if (imageMap[image_name]) {
          item.acceptImage(imageMap[image_name]);
        } else {
          let img = new Image();
          img.src = image_name;
          imageMap[image_name] = img;
          item.acceptImage(img);
        }
      }
    }

    draw();
    startCursorCycle(); // start rotating cursors
}

function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

function stopScreensaver() {
  cancelAnimationFrame(animationFrame);
  canvas.style.display = 'none';
  releaseWakeLock();
  panel.style.display = 'block';
  stopCursorCycle(); // reset cursor      
}

canvas.addEventListener("click", () => {
  if (allowExit) {
    exitFullscreen();
  }
});

// Listen for the click event
button0.addEventListener("click", enterSquare);
button0a.addEventListener("click", enterSquareA);
button0b.addEventListener("click", enterSquareB);
button1.addEventListener("click", enterDvd);
button1a.addEventListener("click", enterDvdA);
button1b.addEventListener("click", enterDvdB);
button2.addEventListener("click", enterDecks);
button2a.addEventListener("click", enterDecksA);

// Resize when the window changes size
window.addEventListener("resize", () => {
  if (document.fullscreenElement) resize();
});

// Listen for Exit Full screen
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    stopScreensaver();
  }
});


class BouncingBox {

  constructor() {
    this.colors = ["lime", "red", "blue", "yellow", "magenta", "cyan", "white", "orange"];
    this.colorIndex = 0;
    this.colorTimer = Math.floor(Math.random() * (30 - 12 + 1)) + 12;
    this.reset();

  }

  reset() {

    this.w = 200;
    this.h = 200;

    this.leftBound = 0;
    this.topBound = 0;
    this.rightBound = canvas.width - this.w;
    this.bottomBound = canvas.height - this.h;

    this.dx = 90 * (randomInt(1, 10) > 5 ? 1 : -1);
    this.dy = 90 * (randomInt(1, 10) > 5 ? 1 : -1);

    this.x = Math.random() * (this.rightBound);
    this.y = Math.random() * (this.bottomBound);

    this.colorIndex = randomInt(0, this.colors.length - 1);
  }

  requestImage() {
    return undefined;
  }

  acceptImage(image) {
    // No Op
  }

  update(diffSec) {

    this.x += (this.dx * diffSec);
    this.y += (this.dy * diffSec);

    if (this.x > this.rightBound || this.x < 0) this.dx *= -1;
    if (this.y > this.bottomBound || this.y < 0) this.dy *= -1;

    this.colorTimer -= diffSec;
    if (this.colorTimer < 0) {
      this.colorIndex += 1;
      if (this.colorIndex > this.colors.length) {
        this.colorIndex = 0;
      }
      this.colorTimer = Math.floor(Math.random() * (30 - 12 + 1)) + 12;
    }

  }

  draw(ctx) {
    ctx.fillStyle = this.colors[this.colorIndex];
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

}

class DvdLogo {

  constructor() {
    this.img = undefined;
    this.colors = ["lime", "red", "blue", "yellow", "magenta", "cyan", "white", "orange"];
    this.colorTimer = Math.floor(Math.random() * (30 - 12 + 1)) + 12;
    this.reset();

  }

  reset() {

    this.w = 256;
    this.h = 156;

    this.leftBound = 0;
    this.topBound = 0;
    this.rightBound = canvas.width - this.w;
    this.bottomBound = canvas.height - this.h;

    this.dx = 90 * (randomInt(1, 10) > 5 ? 1 : -1);
    this.dy = 90 * (randomInt(1, 10) > 5 ? 1 : -1);

    this.x = Math.random() * (this.rightBound);
    this.y = Math.random() * (this.bottomBound);

    this.colorIndex = randomInt(0, this.colors.length - 1);
  }

  requestImage() {
    return "./images/dvdlogo.webp";
  }

  acceptImage(image) {
    this.img = image;
  }

  update(diffSec) {

    this.x += (this.dx * diffSec);
    this.y += (this.dy * diffSec);

    if (this.x > this.rightBound || this.x < 0) this.dx *= -1;
    if (this.y > this.bottomBound || this.y < 0) this.dy *= -1;

    this.colorTimer -= diffSec;
    if (this.colorTimer < 0) {
      this.colorIndex += 1;
      if (this.colorIndex > this.colors.length) {
        this.colorIndex = 0;
      }
      this.colorTimer = Math.floor(Math.random() * (30 - 12 + 1)) + 12;
    }

  }

  draw(ctx) {
    ctx.fillStyle = this.colors[this.colorIndex];
    ctx.fillRect(this.x + 1, this.y + 1, this.w - 2, this.h - 2);

    if (this.img && this.img.complete) {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

  }

}

class Flyer {
  constructor(itemType, speedLimit = true) {
    this.itemType = itemType;
    this.speedLimit = speedLimit;
    this.reset(true); // true to avoid delay at very first launch
  }

  reset(skipDelay = false) {
    this.time = 0;
    this.visible = skipDelay;

    if (this.speedLimit) {
      if (this.itemType == 0) {
        this.delayFrames = randomInt(4, 8); // 1–3 sec delay
      } else {
        this.delayFrames = randomInt(8, 16);
      }
    } else {
      this.delayFrames = randomInt(2, 4);
    }

    if (Math.random() * 5 > 2.25) {
      this.startX = -350;
      this.startY = (Math.random() * ((canvas.height * 0.90) + 350)) - 350;
    } else {
      this.startX = (Math.random() * ((canvas.width * 0.90) + 350)) - 350;
      this.startY = -350;
    }

    this.vx = 1 + Math.random();
    this.vy = 1 + Math.random();
    this.swayAmplitude = 20 + Math.random() * 10;
    this.swayFrequency = 0.05 + Math.random() * 0.02;

    this.timeMulti = 35 + Math.floor(Math.random() * 90);
    this.frameTime = 0;
    this.frame = randomInt(0, 7);
  }

  requestImage() {
    return "./images/steam_deck_grid.webp";
  }

  acceptImage(image) {
    this.img = image;
  }

  update(diffMs) {

    this.frameTime += diffMs;
    if (this.itemType == 0 && this.frameTime > 0.35) {
      this.frameTime = 0;
      if (this.itemType == 0) {
        this.frame = (this.frame + 1) % 8;
      }
    }

    if (!this.visible) {
      this.delayFrames -= diffMs;
      if (this.delayFrames <= 0) {
        this.visible = true;
        this.time = 0;
      }
      return;
    }

    this.time += (diffMs * this.timeMulti);
    this.x = this.startX + this.vx * this.time;
    this.y = this.startY + this.vy * this.time + this.swayAmplitude * Math.sin(this.swayFrequency * this.time);

    if (this.x > canvas.width || this.y > canvas.height) {
      this.reset(); // go into delay mode
    }
  }

  draw(ctx) {
    if (this.visible && this.img && this.img.complete) {
      if (this.itemType == 0) {
        if (this.frame < 4) {
          ctx.drawImage(this.img, (this.frame * 300), 0, 300, 300, this.x, this.y, 300, 300);
        } else {
          ctx.drawImage(this.img, ((this.frame - 4) * 300), 300, 300, 300, this.x, this.y, 300, 300);
        }
      } else if (this.itemType == 1) {
        if (this.frame < 4) {
          ctx.drawImage(this.img, ((this.frame) * 300), 600, 300, 300, this.x, this.y, 300, 300);
        } else {
          ctx.drawImage(this.img, ((this.frame - 4) * 300), 900, 300, 300, this.x, this.y, 300, 300);
        }
      }
    }
  }
}