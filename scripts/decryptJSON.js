const DEBUG = false;

passkey = localStorage.getItem("passkey");

async function decryption(content) {
    console.log(content);
    if (DEBUG) return Promise.resolve(content);
    return decode(content, passkey, SALT).then(result => {
    if (result.success) return Promise.resolve(result.decoded);
    else throw new Error("Incorrect Password...");
    });
}
function failDec() {
    alert("Please Login to Access!")
    window.location.replace('/');
}