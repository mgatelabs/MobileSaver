$(function () {

    let allowExit = false;
    let wakeLock = null;

    // Cursor magic

    let cursorIndex = 0;

    const cursors = [
        "default", "pointer", "crosshair", "wait",
        "text", "move", "progress", "not-allowed"
    ];

    function startCursorCycle() {
        cursorInterval = setInterval(() => {
            cursorIndex = (cursorIndex + 1) % cursors.length;
            MG.common.canvas.style.cursor = cursors[cursorIndex];
        }, 3000); // change every 3 seconds
    }

    function stopCursorCycle() {
        clearInterval(cursorInterval);
        MG.common.canvas.style.cursor = "default";
    }

    // Keep the screen awake

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

    const sizeChartLookup = {
        "d": 0,
        "s": 1,
        "m": 2,
        "l": 3,
        "xl": 4
    }

    const sizeLookup = {
        "sd": [12, 4, 12, 24, 48],
        "dvd": [1, 2, 3, 4, 5],
        "box": [2, 2, 3, 4, 5]
    }

    function init() {
        let items = [], type = $('#screenSaverType').val(), crowd = $('#screenSaverCrowd').val(), itemCount = 1;

        itemCount = sizeLookup[type][sizeChartLookup[crowd]];

        if (type === 'sd') {
            for (let i = 0; i < itemCount; i++) {
                items.push(new MG.clz.Flyer(MG.common.canvas, 0));
            }
            for (let i = 0; i < itemCount; i++) {
                items.push(new MG.clz.Flyer(MG.common.canvas, 1));
            }
        } else if (type === 'dvd') {
            for (let i = 0; i < itemCount; i++) {
                items.push(new MG.clz.DvdLogo(MG.common.canvas));
            }
        } else if (type === 'box') {
            for (let i = 0; i < itemCount; i++) {
                items.push(new MG.clz.BouncingBox(MG.common.canvas));
            }
        }

        MG.common.items = items;
    }

    async function enterFullscreen() {
        try {
            await document.documentElement.requestFullscreen();
            await requestWakeLock();
        } catch (e) {
            console.error("Failed to enter fullscreen:", e);
            // Let it play on devices where you can't get exclusive lock

        } finally {
            startScreenSaver();
        }
    }

    function exitFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            stopScreensaver();
        }
    }

    function releaseWakeLock() {
        if (wakeLock) {
            wakeLock.release();
            wakeLock = null;
        }
    }

    function startScreenSaver() {

        $('#button-panel').hide();
        $('#screen').show();

        init();

        allowExit = false;
        // Wait 1 Second
        setTimeout(() => allowExit = true, 1000);

        startCursorCycle();

        MG.common.startDrawing();
    }

    function stopScreensaver() {

        cancelAnimationFrame(MG.common.animationFrame);
        MG.common.canvas.style.display = 'none';
        releaseWakeLock();

        stopCursorCycle();

        $('#button-panel').show();
        $('#screen').hide();
    }

    $('#start').click(function () {
        enterFullscreen();
    });

    $('#screen').click(function () {
        if (allowExit) {
            exitFullscreen();
        }
    });

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            stopScreensaver();
        }
    });
});