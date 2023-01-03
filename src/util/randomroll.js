import crypto from "crypto";

const getCombinedSeed = (serverSeed, clientSeed, nonce) => {
    return [serverSeed, clientSeed, nonce].join("-");
}
  
const randomRoll = (serverSeed, clientSeed, nonce) => {
    const min = 1;
    const max = 100_001;

    const rollValue = getRandomIntValue(serverSeed, clientSeed, nonce, max - min);

    // Get random integer
    return rollValue + min;
}

const getRandomIntValue = (serverSeed, clientSeed, nonce, maxNumber) => {
    // Generate seed and hash
    const seed = getCombinedSeed(serverSeed, clientSeed, nonce);
    const hash = crypto.createHmac("sha256", seed).digest("hex");

    // Get value from hash
    const subHash = hash.substr(0, 8);
    const valueFromHash = parseInt(subHash, 16);

    // Get dynamic result for this roll
    return Math.abs(valueFromHash) % maxNumber;
}  

export default randomRoll;