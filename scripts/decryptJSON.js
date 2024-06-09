const DEBUG = false;

pass = localStorage.passkey;

async function decryption(content) {
    if (DEBUG) return Promise.resolve(content);
    return decode(content, pass, SALT).then(result => {

    if (result.success) return Promise.resolve(result.decoded);
    else throw new Error("Incorrect Password...");
    });
}
function failDec() {
    alert("Please Login to Access!")
    window.location.replace('/');
}