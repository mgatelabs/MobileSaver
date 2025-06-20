(function () {

  // Setup Namespace
  window.MG = window.MG || {};
  window.MG.clz = window.MG.cls || {};
  const MG = window.MG;

  // Define the base class
  MG.clz.BaseBox = class {
    constructor(canvas, w, h) {
      this.canvas = canvas;
      this.w = w;
      this.h = h;
      this.img = undefined;
    }

    reset(canvasWidth, canvasHeight) {
      if (canvasWidth > 0 && canvasHeight > 0) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
      }
    }

    requestImage() {
      return undefined;
    }

    acceptImage(image) {
      this.img = image;
    }
  };

  MG.clz.BouncingBox = class extends MG.clz.BaseBox {

    constructor(canvas) {
      super(canvas, 200, 200);
      this.colorIndex = 0;
      this.colorTimer = Math.floor(Math.random() * (30 - 12 + 1)) + 12;
      //this.reset();

    }

    reset(canvasWidth = 0, canvasHeight = 0) {
      super.reset(canvasWidth, canvasHeight);
      this.leftBound = 0;
      this.topBound = 0;
      this.rightBound = this.canvasWidth - this.w;
      this.bottomBound = this.canvasHeight - this.h;

      this.dx = 90 * (MG.common.randomInt(1, 10) > 5 ? 1 : -1);
      this.dy = 90 * (MG.common.randomInt(1, 10) > 5 ? 1 : -1);

      this.x = Math.random() * (this.rightBound);
      this.y = Math.random() * (this.bottomBound);

      this.colorIndex = MG.common.randomInt(0, MG.common.colors.length - 1);
    }

    update(diffSec) {

      this.x += (this.dx * diffSec);
      this.y += (this.dy * diffSec);

      if (this.x > this.rightBound || this.x < 0) this.dx *= -1;
      if (this.y > this.bottomBound || this.y < 0) this.dy *= -1;

      this.colorTimer -= diffSec;
      if (this.colorTimer < 0) {
        this.colorIndex += 1;
        if (this.colorIndex > MG.colors.length) {
          this.colorIndex = 0;
        }
        this.colorTimer = Math.floor(Math.random() * (30 - 12 + 1)) + 12;
      }

    }

    draw(ctx) {
      ctx.fillStyle = MG.common.colors[this.colorIndex];
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }

  }

  MG.clz.DvdLogo = class extends MG.clz.BaseBox {

    constructor(canvas) {
      super(canvas, 256, 156);
      this.img = undefined;
      this.colorTimer = Math.floor(Math.random() * (30 - 12 + 1)) + 12;
      //this.reset();

    }

    reset(canvasWidth = 0, canvasHeight = 0) {
      super.reset(canvasWidth, canvasHeight);

      this.leftBound = 0;
      this.topBound = 0;
      this.rightBound = this.canvasWidth - this.w;
      this.bottomBound = this.canvasHeight - this.h;

      this.dx = 90 * (MG.common.randomInt(1, 10) > 5 ? 1 : -1);
      this.dy = 90 * (MG.common.randomInt(1, 10) > 5 ? 1 : -1);

      this.x = Math.random() * (this.rightBound);
      this.y = Math.random() * (this.bottomBound);

      this.colorIndex = MG.common.randomInt(0, MG.common.colors.length - 1);
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
        if (this.colorIndex > MG.common.colors.length) {
          this.colorIndex = 0;
        }
        this.colorTimer = Math.floor(Math.random() * (30 - 12 + 1)) + 12;
      }

    }

    draw(ctx) {
      ctx.fillStyle = MG.common.colors[this.colorIndex];
      ctx.fillRect(this.x + 1, this.y + 1, this.w - 2, this.h - 2);

      if (this.img && this.img.complete) {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
      }

    }

  }

  MG.clz.Flyer = class extends MG.clz.BaseBox {
    constructor(canvas, itemType, speedLimit = true) {
      super(canvas, 300, 300);
      this.itemType = itemType;
      this.speedLimit = speedLimit;
      //this.reset(true); // true to avoid delay at very first launch
    }

    reset(canvasWidth = 0, canvasHeight = 0, skipDelay = false) {
      super.reset(canvasWidth, canvasHeight);

      this.time = 0;
      this.visible = skipDelay;

      if (this.speedLimit) {
        if (this.itemType == 0) {
          this.delayFrames = MG.common.randomInt(4, 8); // 1–3 sec delay
        } else {
          this.delayFrames = MG.common.randomInt(8, 16);
        }
      } else {
        this.delayFrames = MG.common.randomInt(2, 4);
      }

      if (Math.random() * 5 > 2.25) {
        this.startX = -350;
        this.startY = (Math.random() * ((this.canvasHeight * 0.90) + 350)) - 350;
      } else {
        this.startX = (Math.random() * ((this.canvasWidth * 0.90) + 350)) - 350;
        this.startY = -350;
      }

      this.x = this.startX;
      this.y = this.startY;

      this.vx = 1 + Math.random();
      this.vy = 1 + Math.random();
      this.swayAmplitude = 20 + Math.random() * 10;
      this.swayFrequency = 0.05 + Math.random() * 0.02;

      this.timeMulti = 35 + Math.floor(Math.random() * 90);
      this.frameTime = 0;
      this.frame = MG.common.randomInt(0, 7);
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

      if (this.x > this.canvasWidth || this.y > this.canvasHeight) {
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


}());