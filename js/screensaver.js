$(function () {

    let allowExit = false;

    const sizeChartLookup = {
        "d": 0,
        "s": 1,
        "m": 2,
        "l": 3,
        "xl": 4,
        "xxl": 5
    }

    const sizeLookup = {
        "sd": [12, 4, 12, 24, 32, 40],
        "dvd": [1, 1, 2, 6, 12, 24],
        "box": [1, 1, 2, 6, 12, 24],
        "lines": [1, 1, 2, 6, 12, 24],
        "nftbros": [1, 1, 1, 1, 1, 1]
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
        } else if (type === 'lines') {
            for (let i = 0; i < itemCount; i++) {
                items.push(new MG.clz.FallingLines(MG.common.canvas));
            }
        } else if (type === 'nftbros') {
            items.push(new MG.clz.NftBros(MG.common.canvas));
        }

        MG.common.items = items;
    }

    async function enterFullscreen() {
        try {
            await document.documentElement.requestFullscreen();
            await MG.common.requestWakeLock();
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

    function startScreenSaver() {

        $('#button-panel').hide();
        $('#screen').show();

        init();

        allowExit = false;
        // Wait 1 Second
        setTimeout(() => allowExit = true, 1000);

        MG.common.startCursorCycle();

        MG.common.startDrawing();
    }

    function stopScreensaver() {

        cancelAnimationFrame(MG.common.animationFrame);
        MG.common.canvas.style.display = 'none';
        MG.common.releaseWakeLock();

        MG.common.stopCursorCycle();

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

    function updateDisplayInfo() {
        let element = $('.mode-choice.selected');
        $('#display_title').text(element.attr('title'));
        $('#display_description').text(element.attr('description'));
    }

    let last_display = localStorage.getItem('last_display');
    if (last_display) {
        $('#screenSaverType').val(last_display);
    }

    let current_type = $('#screenSaverType').val();
    if (current_type !== 'sd') {
        $('.mode-choice').removeClass('selected');
        $('.mode-choice').each(function () {
            let a = $(this);
            if (a.attr('mode') == current_type) {
                a.addClass('selected');
                return false;
            }
        });
        updateDisplayInfo();
    }

    $('.mode-choice').click(function () {
        var $a = $(this), mode = $a.attr('mode');
        $('.mode-choice').removeClass('selected');
        $a.addClass('selected');
        $('#screenSaverType').val(mode);
        localStorage.setItem('last_display', mode);
        if (mode === 'nftbros') {
            $('#crowd-selection').hide();
        } else {
            $('#crowd-selection').show();
        }
        updateDisplayInfo();
    });

    updateDisplayInfo();

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            stopScreensaver();
        }
    });
});