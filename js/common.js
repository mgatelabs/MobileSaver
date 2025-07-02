(function () {

    // Setup Namespace
    window.MG = window.MG || {};
    window.MG.common = window.MG.common || {};
    const MG = window.MG;

    MG.common.canvas = undefined;
    MG.common.ctx = undefined;
    
    MG.common.colors = ["lime", "red", "blue", "yellow", "magenta", "cyan", "white", "orange"];
    MG.common.items = [];
    MG.common.animationFrame = undefined;

    MG.common.init = function (is2d = true) {
        MG.common.canvas = document.getElementById("screen");
        MG.common.ctx = is2d ? MG.common.canvas.getContext && MG.common.canvas.getContext("2d") || undefined : undefined;
    };

    let lastTime = 0;

    const imageMap = {};

    MG.common.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    MG.common.width = 100;
    MG.common.height = 100;

    MG.common.resize = function () {
        MG.common.width = MG.common.canvas.width = window.innerWidth;
        MG.common.height = MG.common.canvas.height = window.innerHeight;
    }

    MG.common.drawMethod = function (currentTime) {
        const deltaTime = currentTime - lastTime;
        let msDiff = deltaTime / 1000.0;
        if (isNaN(msDiff) || msDiff < 0.01) {
            msDiff = 0.01;
        }
        lastTime = currentTime;

        MG.common.ctx.clearRect(0, 0, MG.common.width, MG.common.height);

        for (const item of MG.common.items) {
            item.update(msDiff);
            item.draw(MG.common.ctx);
        }

        MG.common.animationFrame = requestAnimationFrame(MG.common.drawMethod);
    };

    function getImageByName(image_name) {
        if (imageMap[image_name]) {
            return imageMap[image_name];
        } else {
            let img = new Image();
            img.src = image_name;
            imageMap[image_name] = img;
            return img;
        }
    }

    MG.common.resetForChange = function () {
        // Make sure everything is resized
        MG.common.resize();
        // Make sure the items have images
        for (const item of MG.common.items) {
            item.reset(MG.common.width, MG.common.height);
            image_name = item.requestImage();
            if (image_name) {
                item.acceptImage(getImageByName(image_name));
            } else {
                image_names = item.requestImages();
                if (image_names && image_names.length > 0) {
                    for (const image_name of image_names) {
                        item.acceptImageWithName(getImageByName(image_name), image_name);
                    }
                }
            }
        }
    }

    MG.common.startDrawing = function () {
        MG.common.resetForChange();
        MG.common.drawMethod();
    };

    MG.common.arePointsClose = function (x1, y1, x2, y2, maxDistance = 128) {
        let off;
        if (x1 > x2) {
            off = x1 - x2;
        } else {
            off = x2 - x1;
        }
        if (off > maxDistance)
            return false;

        if (y1 > y2) {
            off = y1 - y2;
        } else {
            off = y2 - y1;
        }
        if (off > maxDistance)
            return false;
        return true;

        //const dx = x2 - x1;
        //const dy = y2 - y1;
        //const distanceSquared = dx * dx + dy * dy;
        //return distanceSquared <= maxDistance * maxDistance;
    };

    MG.common.moveTowardPoint = function (x1, y1, x2, y2, timeInSeconds, distancePerSecond, resultObj) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (distancePerSecond / 16)) {
            // Already at the target
            resultObj.x = x1;
            resultObj.y = y1;
            return false;
        }

        const travelDistance = timeInSeconds * distancePerSecond;
        const t = Math.min(travelDistance / distance, 1); // Clamp to max 1 (don't overshoot)

        let xOff = dx * t;
        let yOff = dy * t;

        resultObj.x = x2 - xOff;
        resultObj.y = y2 - yOff;

        return true;
    };

    MG.common.updateExplodingChunk = function (obj, deltaTimeSeconds) {
        const gravity = 400; // pixels per second^2
        const drag = 0.98;   // slows down horizontal speed a bit (fake air resistance)

        // If no velocity yet, initialize from degree + speed
        if (obj.vx === undefined || obj.vy === undefined) {
            const rad = (obj.degree * Math.PI) / 180;
            obj.vx = Math.cos(rad) * obj.speed;
            obj.vy = Math.sin(rad) * -obj.speed; // negative because 0 is top of screen
        }

        // Apply gravity
        obj.vy += gravity * deltaTimeSeconds;

        // Apply drag to vx (optional)
        obj.vx *= drag;

        // Update position
        obj.x += obj.vx * deltaTimeSeconds;
        obj.y += obj.vy * deltaTimeSeconds;
    };

    // Cursor magic

    let cursorIndex = 0;

    const cursors = [
        "default", "pointer", "crosshair", "wait",
        "text", "move", "progress", "not-allowed"
    ];

    let cursorInterval = undefined;

    MG.common.startCursorCycle = function () {
        cursorInterval = setInterval(() => {
            cursorIndex = (cursorIndex + 1) % cursors.length;
            MG.common.canvas.style.cursor = cursors[cursorIndex];
        }, 3000); // change every 3 seconds
    };

    MG.common.stopCursorCycle = function () {
        clearInterval(cursorInterval);
        MG.common.canvas.style.cursor = "default";
    };

    // Wake lock

    let wakeLock = null;
    MG.common.requestWakeLock = async function () {
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
    };

    MG.common.releaseWakeLock = function () {
        if (wakeLock) {
            wakeLock.release();
            wakeLock = null;
        }
    };

}());

$(function () {
    // Reset everything when the screen resizes
    $(window).resize(function () {
        // Get the size info
        MG.common.resize();
        // Reset each item
        for (const item of MG.common.items) {
            item.reset(MG.common.width, MG.common.height);
        }
    });
});