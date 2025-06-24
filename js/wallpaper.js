let contentType = 0;
let itemCount = 12;
let started = false;

function init() {
    let items = [];

    if (contentType == 0) {
        for (let i = 0; i < itemCount; i++) {
            items.push(new MG.clz.Flyer(MG.common.canvas, 0));
        }
        for (let i = 0; i < itemCount; i++) {
            items.push(new MG.clz.Flyer(MG.common.canvas, 1));
        }
    } else if (contentType == 1) {
        for (let i = 0; i < itemCount; i++) {
            items.push(new MG.clz.DvdLogo(MG.common.canvas, 0));
        }
    } else if (contentType == 2) {
        for (let i = 0; i < itemCount; i++) {
            items.push(new MG.clz.BouncingBox(MG.common.canvas, 0));
        }
    } else if (contentType == 3) {
        items.push(new MG.clz.NftBros(MG.common.canvas));
    }

    MG.common.items = items;
}

window.livelyPropertyListener = function (name, val) {
    switch (name) {
        case "ContentType":
            contentType = val;

            if (started) {
                init();
                MG.common.resetForChange();
            }
            break;
        case "ItemCount":
            itemCount = val;
            if (started) {
                init();
                MG.common.resetForChange();
            }
            break;
    }
};



$(function () {

    window.MG = window.MG || {};
    const MG = window.MG;

    init();

    started = true;

    MG.common.startDrawing();
});