import crypto from "crypto";

function getRollHash(beacon, nonce, clientSeeds) {
    const seed = clientSeeds + "-" + nonce;
    return crypto.createHmac('sha512', beacon)
        .update(seed)
        .digest('hex');
}

function hexdec(hexString) {
    hexString = (hexString + '').replace(/[^a-f0-9]/gi, '');
    return parseInt(hexString, 16);
}

function getRoll(hash) {
    let subHash = hash.substr(0, 7)
    let number = hexdec(subHash)

    return number % 100000 + 1
}

function battleRoll(beacon, nonce, clientSeeds) {
    let roll = getRoll(getRollHash(beacon, nonce, clientSeeds));
    return roll;
}

export default battleRoll;