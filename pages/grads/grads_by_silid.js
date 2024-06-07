statiCrypt = document.createElement("script");
statiCrypt.src = "/scripts/decryptJSON.js" 
document.head.appendChild(statiCrypt);
GRADSJSON = "../grads/grads.json"

silids = [
    "A. Santos",
    "Alcala",
    "Baltazar",
    "Banzon",
    "Cruz",
    "Del Mundo",
    "Del Rosario",
    "Fronda",
    "G Velasquez",
    "Gomez",
    "Juliano",
    "Ramirez",
    "Trono",
    "Velasco",
    "Vergara",
    "Zara"
]

async function setup() {
    let messages = await fetch("messages.json").then(
                        f => f.text()).then(
                        enc => decryption(enc)).then(
                            i => JSON.parse(i),
                            err => {failDec()});

    silids.forEach(s => {
        let g = document.getElementById("silids");

        let h = document.createElement("h2");
        h.className = "silidName";
        h.innerText = s;

        let d = document.createElement("div");
        d.className = "silid";

        let a = document.createElement("a");
        a.href = "grads_section.html#" + s;

        let i = document.createElement("img");
        i.src = "../../resources/img/PLACEHOLDER2.png";
        i.alt = "Silid Picture";
        i.className = "silidPicture";

        let m = document.createElement("div");
        m.className = "silidMessage";

        let p1 = document.createElement("p");
        p1.innerHTML = '<i>"' + messages[s]["message"] + '"</i>';

        let p2 = document.createElement("p");
        p2.innerHTML += "<b>" + messages[s]["adviser"] + "</b>";
        p2.style.textAlign = "right";
        p2.style.marginTop = "60px";

        let p3 = document.createElement("p");
        p3.innerText = messages[s]["positions"];
        p3.style.textAlign = "right";

        d.appendChild(h); d.appendChild(a); a.appendChild(i); d.appendChild(m); m.appendChild(p1); m.appendChild(p2); m.appendChild(p3);
        g.appendChild(d);
    });
}

/*
    the code generated should look smth like this

    <div class="silid">
        <h2 class="silidName"> Math Unit </h2>
        <a href>
            <img src="../../resources/img/PLACEHOLDER2.png" alt="Silid Picture" class="silidPicture">
        </a>
        <div class="silidMessage"> 
            <p>message</p>
            <p>adviser</p>
            <p>positions</p>
        </div>
    </div>
*/