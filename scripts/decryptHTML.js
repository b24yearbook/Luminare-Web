// Each HTML file contains only a script. The script contains the page information.

// MAKE SURE TO NOT ENCRYPT THE <body></body> tags 

statiCrypt = document.createElement("script");
statiCrypt.src = "/scripts/staticrypt.js" 
document.head.appendChild(statiCrypt);
const SALT = "7e7610a1628c19f6d53bfbaee6f92f59"

pass = localStorage.password;

async function decryption(content) {
    result = decode(content, pass, SALT)
    if (result.success) {
        document.getElementById("loginScript").remove();
        document.body.innerHTML = result.decoded;
        return result.decoded;
    }
    else throw new Error("Incorrect Password...");
}

function failDec() {
    alert("Please Login to Access!")
    window.location.replace('/');
}
