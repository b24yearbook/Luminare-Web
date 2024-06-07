var pageNo = 0;

function pageChange() {
    localStorage.setItem("stdNo", stdNo);
    window.location.href = `../indiv_spread/indiv_spread.html#${stdNo}`;
}

function setup(n) {

    for (let i = n*12 + 1; i <= n*12 + 12; i++) {
        let gallery = document.getElementById("gallery");

        let item = document.createElement("div");
        item.className = "item";

        let link = document.createElement("a");
        link.href = "batchg_pic.html#" + i;
        link.innerHTML =
            '<img src="../../temp_assets/batch_gallery/gallery_' + i + '.png" class="picture"/>'

        /*
        let picture = document.createElement("img");
        picture.src = "../../resources/img/PLACEHOLDER.png";
        picture.alt = "Batch Picture";
        //picture.className = "picture";
        */

        let pictureName = document.createElement("p");
        pictureName.className = "pictureName";
        pictureName.innerText = "name";

        item.appendChild(link); item.appendChild(pictureName); gallery.appendChild(item);
        // link.appendChild(picture);
    }
}

function updatePage(n) {
    let gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    pageNo += n;
    setup(pageNo);
}
