(function () {

    // Setup Namespace
    window.MG = window.MG || {};
    window.MG.common = window.MG.common || {};
    const MG = window.MG;

    MG.common.canvas = document.getElementById("screen");
    MG.common.ctx = MG.common.canvas.getContext("2d");
    MG.common.colors = ["lime", "red", "blue", "yellow", "magenta", "cyan", "white", "orange"];
    MG.common.items = [];
    MG.common.animationFrame = undefined;

    let lastTime = 0;

    const imageMap = {};

    MG.common.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    MG.common.width = 100;
    MG.common.height = 100;

    MG.common.resize = function() {
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

    MG.common.resetForChange = function() {

        MG.common.resize();

        for (const item of MG.common.items) {
            item.reset(MG.common.width, MG.common.height);
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
    }

    MG.common.startDrawing = function () {
        //canvas.style.display = 'block';
        //panel.style.display = 'none';

        //MG.common.resize();

        //allowExit = false;
        //setTimeout(() => allowExit = true, 1000);

        MG.common.resetForChange();
        

        MG.common.drawMethod();
    };

}());

$(function () {

    $(window).resize(function () {
        MG.common.resize();
        for (const item of MG.common.items) {
            item.reset(MG.common.width, MG.common.height);
        }
    });

});