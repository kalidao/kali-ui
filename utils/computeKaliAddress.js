import { addresses } from "../constants/addresses"
import { ethers } from "ethers"

export const computeKaliAddress = (name, chainId) => {
    const kaliMaster = addresses[chainId]["kaliMaster"]
    const factoryAddress = addresses[chainId]["factory"]
    const salt = ethers.utils.keccak256(unpack(name))
    const bytecodeHash = ethers.utils.keccak256(ethers.utils.solidityPack(["bytes10", "bytes10", "address", "bytes15"], ['0x3d602d80600a3d3981f3', '0x363d3d373d3d3d363d73', kaliMaster, '0x5af43d82803e903d91602b57fd5bf3']))
   
    const address = ethers.utils.getCreate2Address(factoryAddress, salt, bytecodeHash)
    console.log(`Address for ${name} on ${chainId}:`, address)
    return address
}

function unpack(str) {
    let utf8 = [];
    for (let i = 0; i < str.length; i++) {
        let charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >>18),
                      0x80 | ((charcode>>12) & 0x3f),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}