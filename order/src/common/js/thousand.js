const MoneyTest = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;

const comdify = function (n) {
     if(!n) return n;
     let str = n.split('.');
     let re = /\d{1,3}(?=(\d{3})+$)/g;
     let n1 = str[0].replace(re, "$&,");
     return str.length > 1 && str[1] ? `${n1}.${str[1]}` : `${n1}`;
};

const delcommafy = function (num){
     if(!num) return num;
     num = num.toString();
     num = num.replace(/,/gi, '');
     return num;
};
const valdateFn = function (rule,val,cb) {
     setTimeout(() => {
     if(val) {
         let inputVal = delcommafy(val);
         if (rule.test(inputVal)) {
         cb()
         } else {
         cb('number')
         }
     }
     cb()
     })
}
const moneyValid = function (rule,val,cb) {
     valdateFn(/((^-?[1-9]\d*)|^-?0)(\.\d{0,2}){0,1}$/,val,cb);
};
const moneyNValid = function (rule,val,cb) {
     valdateFn(MoneyTest,val,cb);
};
export const getInputValue=(el) =>{
    //  let inputVal = el.target.value || '';
    //  return comdify(delcommafy(inputVal));
    return comdify(el)
};
