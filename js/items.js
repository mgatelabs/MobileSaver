(function () {

  // Setup Namespace
  window.MG = window.MG || {};
  window.MG.clz = window.MG.cls || {};
  const MG = window.MG;

  /**
   * Basic point for general tracking
   */
  class BasicPoint {

    constructor() {
      this.x = 0;
      this.y = 0;
      this.rotation = 0;
      this.timer = 0;
      this.delay = 0;
      this.enabled = false;
      this.phase = 0;
    }

  }

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

    requestImages() {
      return [];
    }

    acceptImage(image) {
      this.img = image;
    }

    acceptImageWithName(image, name) {

    }
  };

  /**
   * Simple Bouncing Box
   */

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
        if (this.colorIndex > MG.common.colors.length) {
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

  /**
   * Simple Bouncing Box
   */

  MG.clz.FallingLines = class extends MG.clz.BaseBox {

    constructor(canvas) {
      super(canvas, 200, 200);
    }

    reset(canvasWidth = 0, canvasHeight = 0) {
      super.reset(canvasWidth, canvasHeight);
      this.delay = MG.common.randomInt(4, 64) / 4.0;
      this.colorIndex = MG.common.randomInt(0, MG.common.colors.length - 1);
      this.speed = MG.common.randomInt(25, 150);
      this.girth = MG.common.randomInt(1, 15);
      this.direction = MG.common.randomInt(0, 3);
      this.enabled = false;
      switch (this.direction) {
        case 0:
          this.y = 0 - this.girth;
          break;
        case 1:
          this.y = this.canvasHeight + this.girth;
          break;
        case 2:
          this.x = 0 - this.girth;
          break;
        case 3:
          this.x = this.canvasWidth + this.girth;
          break;
      }
    }

    update(diffSec) {

      this.delay -= diffSec;
      if (this.delay > 0) {
        return;
      } else {
        this.enabled = true;
      }

      let inBound = false;

      switch (this.direction) {
        case 0:
          this.y += this.speed * diffSec;
          inBound = this.y < this.canvasHeight;
          break;
        case 1:
          this.y -= this.speed * diffSec;
          inBound = this.y + this.girth > 0;
          break;
        case 2:
          this.x += this.speed * diffSec;
          inBound = this.x < this.canvasWidth;
          break;
        case 3:
          this.x -= this.speed * diffSec;
          inBound = this.x + this.girth > 0;
          break;
      }

      if (!inBound) {
        this.reset();
      }
    }

    draw(ctx) {
      ctx.fillStyle = MG.common.colors[this.colorIndex];
      switch (this.direction) {
        case 0:
        case 1:
          ctx.fillRect(0, this.y, this.canvasWidth, this.girth);
          break;
        case 2:
        case 3:
          ctx.fillRect(this.x, 0, this.girth, this.canvasHeight);
          break;
      }
      
    }

  }

  /**
   * DVD Video Logos
   */

  MG.clz.DvdLogo = class extends MG.clz.BaseBox {

    constructor(canvas) {
      super(canvas, 256, 154);
      this.img = undefined;
      this.colorTimer = Math.floor(Math.random() * (30 - 12 + 1)) + 12;
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

      this.colorIndex = MG.common.randomInt(0, 7);
    }

    requestImage() {
      return "./images/dvdlogos.webp";
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
        this.colorIndex = MG.common.randomInt(0, 7);;
        this.colorTimer = Math.floor(Math.random() * (30 - 12 + 1)) + 12;
      }

    }

    draw(ctx) {
      if (this.img && this.img.complete) {
        if (this.colorIndex < 4) {
          ctx.drawImage(this.img, 1 + this.colorIndex + ((this.colorIndex) * this.w), 1, this.w, this.h, this.x, this.y, this.w, this.h);
        } else {
          ctx.drawImage(this.img, 1 + (this.colorIndex - 4) + ((this.colorIndex - 4) * this.w), 156, this.w, this.h, this.x, this.y, this.w, this.h);
        }
      }
    }

  }

  MG.clz.Flyer = class extends MG.clz.BaseBox {
    constructor(canvas, itemType, speedLimit = true) {
      super(canvas, 300, 300);
      this.itemType = itemType;
      this.speedLimit = speedLimit;
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

  /**
   * This is a Text bubble
   */
  class TextBubble extends BasicPoint {

    constructor(index) {
      super();
      this.text = '';
      this.text_width = 0;
      this.index = index;
      this.bro = -1;
    }

  }

  let ntf_strings_calculated_size = -1;
  let ntf_strings_calculated_size_desired = -1;

  /**
   * The NFT Bro's info
   */
  class NftBro extends BasicPoint {

    constructor(index) {
      super();
      this.randomize();
      this.index = index;
      this.bubble = -1;
    }

    randomize() {
      // Reset the Phase
      this.phase = 0;
      this.sad = false;
      this.trend = true;
      this.enabled = false;
      this.delay = MG.common.randomInt(1, 15);
      // Choose a new profile & background
      this.profile_image = MG.common.randomInt(0, 15);
      this.profile_background = MG.common.randomInt(0, 7);
      // Left or right side?
      this.direction = MG.common.randomInt(0, 1);
      this.limit = 0;
      this.bubble = -1;
      this.speed = MG.common.randomInt(35, 75);
    }

  }

  /**
   * Explosions
   */
  class NftExplosion extends BasicPoint {

    constructor() {
      super();
      this.reset();
    }

    reset() {
      this.timer = 0;
      this.type = 0;
      this.img = undefined;
      this.sx = 0;
      this.sy = 0;
      this.sw = 0;
      this.sh = 0;
      this.dw;
      this.dh;
    }

  }

  /**
   * The Grinder
   */
  class NftGrinder extends BasicPoint {

    constructor() {
      super();
      this.reset();
    }

    reset() {
      this.timer = 16;
      this.phase = 0;
      this.type = 0;
    }

  }

  /**
   * Background markers
   */
  class NftMarker extends BasicPoint {

    constructor() {
      super();
      this.reset();
    }

    reset() {
      this.timer = 10;
      this.text = '';
    }

  }

  /**
   * NFT Bro's taking L's
   */

  MG.clz.NftBros = class extends MG.clz.BaseBox {

    constructor(canvas) {
      super(canvas, 200, 200);

      this.img_chunks = undefined;
      this.img_fire = undefined; // 128 x 60
      this.img_grinders = undefined;
      this.img_hexes = undefined;
      this.img_sad = undefined;
      this.img_happy = undefined;
      this.img_smoke = undefined;

      this.bros = [];
      this.bubbles = [];
      this.marks = [];
      this.explosions = [];
      this.grinder = new NftGrinder();

      this.release_timer = 0;
      this.release_side = 0;

      for (let i = 0; i < 10; i++) {
        this.bros.push(new NftBro(i));
      }

      for (let i = 0; i < 10; i++) {
        this.bubbles.push(new TextBubble(i));
      }

      for (let i = 0; i < 20; i++) {
        this.explosions.push(new NftExplosion());
      }
      for (let i = 0; i < 40; i++) {
        this.marks.push(new NftMarker());
      }
    }

    requestImages() {
      return ["./images/nft_chunks.webp", "./images/nft_fire.webp", "./images/nft_grinders.webp", "./images/nft_hexes.webp", "./images/nft_happy.webp", "./images/nft_sad.webp", "./images/nft_smoke.webp"];
    }

    acceptImageWithName(image, name) {
      console.log('Accept Image: ' + name);
      switch (name) {
        case './images/nft_chunks.webp':
          this.img_chunks = image;
          break;
        case './images/nft_fire.webp':
          this.img_fire = image;
          break;
        case './images/nft_grinders.webp':
          this.img_grinders = image;
          break;
        case './images/nft_hexes.webp':
          this.img_hexes = image;
          break;
        case './images/nft_happy.webp':
          this.img_happy = image;
          break;
        case './images/nft_sad.webp':
          this.img_sad = image;
          break;
        case './images/nft_smoke.webp':
          this.img_smoke = image;
          break;
      }
    }

    reset(canvasWidth = 0, canvasHeight = 0) {
      super.reset(canvasWidth, canvasHeight);

      this.fire_offset_x = 0;
      this.fire_offset_y = 0;
      this.fire_offset_x_mode = 0;
      this.fire_offset_y_mode = 0;
      this.fire_offset_timer = 0;
      this.fire_count = Math.floor(canvasWidth / 128.0) + 1;
      this.mark_timer = 3;
      this.bro_max_time = Math.floor(canvasWidth / 70.0) - 1;

      if (canvasHeight > 1024) {
        ntf_strings_calculated_size_desired = 2;
      } else {
        ntf_strings_calculated_size_desired = 1;
      }
    }

    getTextBubble() {
      for (let item of this.bubbles) {
        if (item.enabled == false) {
          item.enabled = true;
          return item;
        }
      }
      return undefined;
    }

    getMarker() {
      for (let item of this.marks) {
        if (item.enabled == false) {
          item.enabled = true;
          return item;
        }
      }
      return undefined;
    }

    issueMarker(bro, isTrending, isFalling) {
      let mark = this.getMarker();
      if (mark) {
        let source;
        if (isFalling) {
          source = MG.strings.nft.marker_fail;
        } else if (isTrending) {
          source = MG.strings.nft.marker_good;
        } else {
          source = MG.strings.nft.marker_bad;
        }
        mark.text = source[MG.common.randomInt(0, source.length - 1)];
        mark.x = bro.x;
        mark.y = bro.y + 64;
        mark.timer = 10;
      }
    }

    issueTextForBro(bro, stringSource, mode = 0, yRise = 0) {
      let bubble = this.getTextBubble();
      if (bubble) {
        let text_item = stringSource[MG.common.randomInt(0, stringSource.length - 1)];
        bubble.text = text_item.t;
        bubble.text_width = text_item.w;
        bubble.mode = mode;
        bubble.speed = bro.speed;

        if (mode == 0) {
          if (bro.direction === 0) {
            bubble.x = bro.x + 128 + 10;
          } else {
            bubble.x = bro.x - bubble.text_width - 10;
          }
          bubble.yRise = yRise;
          bubble.y = bro.y + (ntf_strings_calculated_size_desired === 1 ? 52 : 48);
        } else {
          bubble.x = bro.x - Math.floor(bubble.text_width / 2.0) + 64;
          bubble.y = bro.y;
        }
        bubble.bro = bro.index;
        bro.bubble = bubble.index;
        bubble.direction = bro.direction;
        bubble.timer = 4;
      }
    }

    getExplosionItems(count) {
      let result = [];
      for (let item of this.explosions) {
        if (item.enabled === false) {
          item.enabled = true;
          result.push(item);
          if (result.length === count) {
            break;
          }
        }
      }
      return result;
    }

    createExplodedProfileSet(image, profile_index, layer, destX, destY) {
      let layerNodes = this.getExplosionItems(3);
      if (layerNodes.length === 0) {
        // Nothing to do, skip
        return;
      }
      let sourceX = (profile_index % 4) * 256;
      let sourceY = (Math.floor(profile_index / 4)) * 256;
      let layerOffset = layer * 85;
      for (let i = 0; i < 3 && i < layerNodes.length; i++) {
        let node = layerNodes[i];
        node.type = 0;
        node.x = destX;
        node.y = destY;
        node.image = image;
        node.dw = 42;
        node.dh = 42;
        node.sx = sourceX + (i * 85);
        node.sy = sourceY + layerOffset;
        node.sw = 85;
        node.sh = 85;
        node.degree = MG.common.randomInt(90, 180);
        node.speed = 250;
        node.timer = 4;
        node.vx = undefined;
        node.vy = undefined;
      }

    }

    createExplodedJunk(image, junk_index, destX, destY) {
      let layerNodes = this.getExplosionItems(1);
      if (layerNodes.length === 0) {
        // Nothing to do, skip
        return;
      }
      let sourceX = (junk_index % 3) * 64;
      let sourceY = (Math.floor(junk_index / 3)) * 64;

      let node = layerNodes[0];
      node.type = 0;
      node.x = destX;
      node.y = destY;
      node.image = image;
      node.dw = 64;
      node.dh = 64;
      node.sx = sourceX;
      node.sy = sourceY;
      node.sw = 64;
      node.sh = 64;
      node.degree = MG.common.randomInt(90, 180);
      node.speed = 450;
      node.timer = 4;
      node.vx = undefined;
      node.vy = undefined;

    }

    silenceBubble(bro) {
      if (bro.bubble != -1 && this.bubbles[bro.bubble].bro === bro.index) {
        this.bubbles[bro.bubble].enabled = false;
        bro.bubble = -1;
      }
    }

    update(diffSec) {

      let leave_marks = false;
      this.mark_timer -= diffSec;
      if (this.mark_timer < 0.0) {
        this.mark_timer = 3;
        leave_marks = true;
      }

      for (let mark of this.marks) {
        if (mark.enabled) {
          mark.timer -= diffSec;
          if (mark.timer < 0) {
            mark.enabled = false;
          }
        }
      }

      // Fire Movement Logic
      this.fire_offset_timer += diffSec;
      if (this.fire_offset_timer > 0.3) {
        this.fire_offset_timer = 0;

        if (this.fire_offset_x_mode == 0) {
          let offset = MG.common.randomInt(0, 3);
          this.fire_offset_x += offset;
          if (this.fire_offset_x > 45) {
            this.fire_offset_x = 45;
            this.fire_offset_x_mode = 1;
          }
        } else {
          let offset = MG.common.randomInt(0, 3);
          this.fire_offset_x -= offset;
          if (this.fire_offset_x < -45) {
            this.fire_offset_x = -45;
            this.fire_offset_x_mode = 0;
          }
        }

        if (this.fire_offset_y_mode == 0) {
          let offset = MG.common.randomInt(0, 3);
          this.fire_offset_y += offset;
          if (this.fire_offset_y > 15) {
            this.fire_offset_y = 15;
            this.fire_offset_y_mode = 1;
          }
        } else {
          let offset = MG.common.randomInt(0, 3);
          this.fire_offset_y -= offset;
          if (this.fire_offset_y < 0) {
            this.fire_offset_y = 0;
            this.fire_offset_y_mode = 0;
          }
        }
      }

      // Explosion logic
      for (let item of this.explosions) {
        if (item.enabled) {
          item.timer -= diffSec;
          if (item.timer < 0) {
            item.enabled = false;
          } else {
            MG.common.updateExplodingChunk(item, diffSec);
            if (item.y > this.canvasHeight) {
              item.enabled = false;
            }
          }
        }
      }

      // Grinder
      if (this.grinder.phase === 0) {
        // Delay
        this.grinder.timer -= diffSec;
        if (this.grinder.timer < 0) {
          this.grinder.phase = 1;
          this.grinder.x = 128 + MG.common.randomInt(0, this.canvasWidth - 256);
          this.grinder.y = MG.common.randomInt(160, this.canvasHeight - 240);
          this.grinder.type = MG.common.randomInt(0, 2);
          this.grinder.enabled = true;
          this.grinder.timer = MG.common.randomInt(5, 10);
        }
      } else if (this.grinder.phase === 1) {
        this.grinder.timer -= diffSec;
        if (this.grinder.timer < 0) {
          this.grinder.phase = 0;
          this.grinder.enabled = false;
          this.grinder.timer = MG.common.randomInt(9, 16);
        } else {

          for (var bro of this.bros) {
            if (bro.enabled === true && MG.common.arePointsClose(bro.x, bro.y, this.grinder.x, this.grinder.y, 450)) {
              this.grinder.phase = 2;
              bro.phase = 200;
              this.grinder.bro = bro;
              this.silenceBubble(bro);
              break;
            }
          }


        }
      } else if (this.grinder.phase === 2) {
        if (!MG.common.moveTowardPoint(this.grinder.x + 68, this.grinder.y - 64, this.grinder.bro.x, this.grinder.bro.y, diffSec, 300, this.grinder.bro)) {
          this.grinder.phase = 3;
          this.createExplodedProfileSet(this.img_hexes, this.grinder.bro.profile_background, 2, this.grinder.x + 32, this.grinder.y + 128);
          this.createExplodedProfileSet(this.img_sad, this.grinder.bro.profile_image, 2, this.grinder.x + 32, this.grinder.y + 128);
          switch (this.grinder.type) {
            case 0:
              this.issueTextForBro(this.grinder.bro, MG.strings.nft.strings_corp, 0, 0);
              break;
            case 1:
              this.issueTextForBro(this.grinder.bro, MG.strings.nft.strings_degen, 0, 0);
              break;
            case 2:
              this.issueTextForBro(this.grinder.bro, MG.strings.nft.strings_money, 0, 0);
              break;
          }
          this.createExplodedJunk(this.img_chunks, MG.common.randomInt(0, 5), this.grinder.x + 32, this.grinder.y + 128);
          this.createExplodedJunk(this.img_chunks, MG.common.randomInt(0, 5), this.grinder.x + 32, this.grinder.y + 128);
          this.grinder.timer = 0.45;
        } else if (leave_marks) {
          this.issueMarker(this.grinder.bro, false, true);
        }
      } else if (this.grinder.phase === 3) {
        this.grinder.timer -= diffSec;
        if (this.grinder.timer < 0) {
          this.grinder.phase = 4;
          this.grinder.timer = 0.45;
          this.grinder.bro.y += 42 - 15;
          this.grinder.bro.limit += 1;
          this.createExplodedProfileSet(this.img_hexes, this.grinder.bro.profile_background, 1, this.grinder.x + 32, this.grinder.y + 128);
          this.createExplodedProfileSet(this.img_sad, this.grinder.bro.profile_image, 1, this.grinder.x + 32, this.grinder.y + 128);
          this.createExplodedJunk(this.img_chunks, MG.common.randomInt(0, 5), this.grinder.x + 32, this.grinder.y + 128);
          this.createExplodedJunk(this.img_chunks, MG.common.randomInt(0, 5), this.grinder.x + 32, this.grinder.y + 128);
        }
      } else if (this.grinder.phase === 4) {
        this.grinder.timer -= diffSec;
        if (this.grinder.timer < 0) {
          this.grinder.phase = 5;
          this.grinder.timer = 0.25;
          this.grinder.bro.y += 42 - 15;
          this.grinder.bro.limit += 1;
          this.createExplodedProfileSet(this.img_hexes, this.grinder.bro.profile_background, 0, this.grinder.x + 32, this.grinder.y + 128);
          this.createExplodedProfileSet(this.img_sad, this.grinder.bro.profile_image, 0, this.grinder.x + 32, this.grinder.y + 128);
          this.createExplodedJunk(this.img_chunks, MG.common.randomInt(0, 5), this.grinder.x + 32, this.grinder.y + 128);
          this.createExplodedJunk(this.img_chunks, MG.common.randomInt(0, 5), this.grinder.x + 32, this.grinder.y + 128);

        }
      } else if (this.grinder.phase === 5) {
        this.grinder.timer -= diffSec;
        if (this.grinder.timer < 0) {
          this.grinder.bro.randomize();
          this.grinder.phase = 0;
          this.grinder.enabled = false;
          this.grinder.timer = MG.common.randomInt(9, 16);
        }
      }

      // Bubbles

      for (let bubble of this.bubbles) {
        if (bubble.enabled) {
          bubble.timer -= diffSec;
          if (bubble.timer < 0) {
            bubble.enabled = false;
            bubble.bro = -1;
          } else {
            if (bubble.mode === 0) {
              if (bubble.direction == 0) {
                bubble.x += bubble.speed * diffSec;
              } else {
                bubble.x -= bubble.speed * diffSec;
              }
              bubble.y += bubble.yRise * diffSec;
            } else {
              bubble.y -= 40 * diffSec;
            }
          }
        }
      }

      // Bros

      this.release_timer += diffSec;
      let release = false;


      for (let bro of this.bros) {

        if (bro.enabled === true) {

        }

        if (bro.phase == 0) { // Travel phase
          bro.delay -= diffSec;

          if (bro.delay < 0 && this.release_timer > 6 && !release) {
            this.release_timer = 0;
            bro.direction = this.release_side;
            this.release_side = (this.release_side + 1) % 2;
            release = true;
            // They are active
            bro.phase = 100; // Escaping
            bro.enabled = true;
            bro.delay = MG.common.randomInt(Math.floor(this.bro_max_time / 4.0), this.bro_max_time);
            if (bro.direction == 0) {
              // Left side
              bro.x = -128;
            } else {
              // Right side
              bro.x = this.canvasWidth;
            }
            bro.y = MG.common.randomInt(0, this.canvasHeight - 196);
          }
        } else if (bro.phase == 100) { // Escaping
          let escaped = false;
          if (bro.direction == 0) {
            bro.x += bro.speed * diffSec;
            if (bro.x > 0) {
              escaped = true;
            }
          } else {
            bro.x -= bro.speed * diffSec;
            if (bro.x < this.canvasWidth - 128) {
              escaped = true;
            }
          }

          if (escaped) {
            this.issueTextForBro(bro, MG.strings.nft.strings_open, 0, -10);
            bro.phase = 1;
            bro.trend = true;
            bro.timer = 0;
          }

        } else if (bro.phase == 1) { // Travel phase

          if (leave_marks) {
            this.issueMarker(bro, bro.trend, false);
          }

          if (bro.direction == 0) {
            bro.x += bro.speed * diffSec;
            if (bro.x + 128 > this.canvasWidth) {
              bro.direction = 1;
            }
          } else {
            bro.x -= bro.speed * diffSec;
            if (bro.x < 0) {
              bro.direction = 0;
            }
          }

          bro.timer += diffSec;

          if (bro.timer > 5) {
            bro.trend = MG.common.randomInt(0, 10) > 5;
            bro.timer = 0;

            if (MG.common.randomInt(0, 10) > 5) {
              if (bro.trend) {
                this.issueTextForBro(bro, MG.strings.nft.strings_winning, 0, -10);
              } else {
                this.issueTextForBro(bro, MG.strings.nft.strings_losing, 0, 50);
              }
            }
          }

          if (bro.trend) {
            bro.y -= 10 * diffSec;
          } else {
            bro.y += 50 * diffSec;
          }

          if (bro.y > this.canvasHeight - 80) {
            bro.phase = 3;
            this.issueTextForBro(bro, MG.strings.nft.strings_zero, 1, 0);
          }

          bro.delay -= diffSec;

          if (bro.delay < 0) {
            bro.phase = 2;
            bro.trend = false;
          }

        } else if (bro.phase == 2) { // Falling phase


          if (bro.direction == 0) {
            bro.x += bro.speed * diffSec;
            if (bro.x + 128 > this.canvasWidth) {
              bro.direction = 1;
            }
          } else {
            bro.x -= bro.speed * diffSec;
            if (bro.x < 0) {
              bro.direction = 0;
            }
          }

          if (leave_marks) {
            this.issueMarker(bro, false, true);
          }

          bro.timer += diffSec;

          bro.y += 50 * diffSec;


          if (bro.y > this.canvasHeight - 80) {
            bro.phase = 3;
            this.silenceBubble(bro);
            this.issueTextForBro(bro, MG.strings.nft.strings_zero, 1, 0);
          }

        } else if (bro.phase == 3) { // Falling Phase
          bro.y += 70 * diffSec;

          if (bro.y > this.canvasHeight) {
            bro.randomize();
          }
        }

      }

    }

    draw(ctx) {

      if (ntf_strings_calculated_size_desired === 1) {
        ctx.font = "24px Sans-serif";
      } else {
        ctx.font = "32px Sans-serif";
      }

      // One time setup
      if (ntf_strings_calculated_size === -1 || ntf_strings_calculated_size_desired !== ntf_strings_calculated_size) {
        ntf_strings_calculated_size = ntf_strings_calculated_size_desired;
        for (let item of MG.strings.nft.strings_winning) {
          item.w = ctx.measureText(item.t).width;
        }
        for (let item of MG.strings.nft.strings_losing) {
          item.w = ctx.measureText(item.t).width;
        }
        for (let item of MG.strings.nft.strings_open) {
          item.w = ctx.measureText(item.t).width;
        }
        for (let item of MG.strings.nft.strings_zero) {
          item.w = ctx.measureText(item.t).width;
        }
        for (let item of MG.strings.nft.strings_corp) {
          item.w = ctx.measureText(item.t).width;
        }
        for (let item of MG.strings.nft.strings_degen) {
          item.w = ctx.measureText(item.t).width;
        }
        for (let item of MG.strings.nft.strings_money) {
          item.w = ctx.measureText(item.t).width;
        }
      }

      // Explosions
      for (let item of this.marks) {
        if (item.enabled === true) {
          ctx.fillText(item.text, item.x, item.y);
        }
      }


      // Draw the NFT Profile Images
      if (this.img_hexes && this.img_hexes.complete && this.img_happy && this.img_happy.complete && this.img_sad && this.img_sad.complete) {
        for (let bro of this.bros) {
          if (bro.enabled === true) {
            let x = (bro.profile_background % 4);
            let y = Math.floor(bro.profile_background / 4);
            let sh = bro.limit == 0 ? 256 : 256 - bro.limit * 85;
            let dh = bro.limit == 0 ? 128 : 128 - bro.limit * 42;

            ctx.drawImage(this.img_hexes, (x * 256), (y * 256), 256, sh, bro.x, bro.y, 128, dh);

            x = (bro.profile_image % 4);
            y = Math.floor(bro.profile_image / 4);

            if (bro.trend === false) {
              ctx.drawImage(this.img_sad, (x * 256), (y * 256), 256, sh, bro.x, bro.y, 128, dh);
            } else {
              ctx.drawImage(this.img_happy, (x * 256), (y * 256), 256, sh, bro.x, bro.y, 128, dh);
            }
          }
        }
      }

      // Grinder
      if (this.grinder.enabled) {
        ctx.drawImage(this.img_grinders, this.grinder.type * 256, 0, 256, 256, this.grinder.x, this.grinder.y, 256, 256);
      }

      // Explosions
      if (this.img_hexes && this.img_sad && this.img_hexes.complete && this.img_sad.complete) {
        for (let item of this.explosions) {
          if (item.enabled === true) {
            ctx.drawImage(item.image, item.sx, item.sy, item.sw, item.sh, item.x - Math.floor(item.dw / 2), item.y - Math.floor(item.dh / 2), item.dw, item.dh);
          }
        }
      }
      // Text Bubbles
      for (let bubble of this.bubbles) {
        if (bubble.enabled === true) {

          ctx.fillStyle = "white";
          ctx.fillRect(bubble.x, bubble.y, bubble.text_width + 6, ntf_strings_calculated_size_desired === 1 ? 24 : 36);

          ctx.strokeStyle = "grey";
          ctx.strokeRect(bubble.x, bubble.y, bubble.text_width + 6, ntf_strings_calculated_size_desired === 1 ? 24 : 36);

          ctx.fillStyle = "black";
          ctx.fillText(bubble.text, bubble.x + 3, bubble.y + (ntf_strings_calculated_size_desired === 1 ? 21 : 33));
        }
      }

      // Draw the fire
      if (this.img_fire && this.img_fire.complete) {
        for (let i = 0; i < this.fire_count; i++) {
          ctx.drawImage(this.img_fire, 0, 0, 128, 60, ((i * 128) - 64) + this.fire_offset_x, (this.canvasHeight - 60) + this.fire_offset_y, 128, 60);
        }
      }

    }

  }

}());