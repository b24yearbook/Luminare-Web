const DEBUG = true;

statiCrypt = document.createElement("script");
statiCrypt.src = "/scripts/staticrypt.js" 
document.head.appendChild(statiCrypt);
const SALT = "7e7610a1628c19f6d53bfbaee6f92f59"

pass = localStorage.password;

async function decryption(content) {
    if (DEBUG) return content;

    result = decode(content, pass, SALT)
    if (result.success) return result.decoded;
    else throw new Error("Incorrect Password...");
}
function failDec() {
    alert("Please Login to Access!")
    window.location.replace('/');
}