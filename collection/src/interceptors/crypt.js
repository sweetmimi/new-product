
import CryptoJS from 'crypto-js';
import baseInfo from "./base";

const kay = CryptoJS.enc.Utf8.parse(baseInfo.ku);
const iav = CryptoJS.enc.Utf8.parse(baseInfo.iu); 
const jK = CryptoJS.enc.Utf8.parse(baseInfo.JIEK);
const ji = CryptoJS.enc.Utf8.parse(baseInfo.JIEi);

export const Decrypt = (word) => {
  let encryptedHexStr = word;
  let decrypt = CryptoJS.AES.decrypt(word, kay, {
    iv: iav,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}


export const Encrypt = (word)=> {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, jK, {
    iv: ji,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}


