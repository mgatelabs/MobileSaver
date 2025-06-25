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

    // Check if a passed in version was sent in
    const hash = window.location.hash.toUpperCase(); // Normalize case

    if (hash === "#STEAMDECK") {
        console.log("Steam Deck mode activated!");
        contentType = 0;
    } else if (hash === "#EXTREMESTEAMDECK") {
        console.log("Extreme Steam Deck mode activated!");
        contentType = 0;
        itemCount = 52;
    } else if (hash === "#DVD") {
        console.log("Dvd mode activated!");
        contentType = 1;
        itemCount = 1;
    } else if (hash === "#DVDS") {
        console.log("Dvd 3 mode activated!");
        contentType = 1;
        itemCount = 3;
    } else if (hash === "#BOX") {
        console.log("Box mode activated!");
        contentType = 2;
        itemCount = 1;
    } else if (hash === "#BOXES") {
        console.log("Boxes mode activated!");
        contentType = 2;
        itemCount = 3;
    } else if (hash === "#NFT") {
        console.log("NFT mode activated!");
        contentType = 3;
    } else {
        console.log("No recognized hash found.");
    }

    window.MG = window.MG || {};
    const MG = window.MG;

    init();

    started = true;

    MG.common.startDrawing();
});