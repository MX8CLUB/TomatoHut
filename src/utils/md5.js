export function md5(pass) {
    let forge = require('node-forge');
    let md = forge.md.md5.create();
    return md.update(pass).digest().toHex();
}