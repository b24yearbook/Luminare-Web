const DEBUG = false;
const SALT = "7e7610a1628c19f6d53bfbaee6f92f59"

pass = localStorage.passkey;

async function decryption(content) {
    if (DEBUG) return content;
    return decode(content, pass, SALT).then(result => {

    if (result.success) return Promise.resolve(result.decoded);
    else throw new Error("Incorrect Password...");
    });
}
function failDec() {
    alert("Please Login to Access!")
    window.location.replace('/');
}