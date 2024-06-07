function setup() {
    let picture = document.getElementById("picture");
    let url = window.location.href.split("#");

    picture.src = "../../temp_assets/batch_gallery/gallery_" + url[1] + ".png";
}

function updatePage(n) {
    let url = window.location.href.split("#");

    window.location.href = "batchg_pic.html#" + (parseInt(url[1]) + n);

    setup();
    
    /*
    let picture = document.getElementById("picture");
    let url = window.location.href.split("#");

    picture.src = "../../temp_assets/batch_gallery/gallery_" + (url[1] + n) + ".png";*/
}