"use strict"
const FILENAME = "utils.js";
const CFonts = require('cfonts');


/**
 * funkcija vrne Banner string
 * @param bannerNaziv
 * @return {string}
 */
 exports.printBanner = (bannerNaziv) => {
    let banner = '';
    for (let s of CFonts.render(bannerNaziv, {font: 'simple'}).array) {
        banner = `${banner}\n${s}`;
    }
    return banner;
};