export const getPageList = (list: any, pageInfo: any): void => {
    const pageSize = pageInfo.pageSize
    const start = pageSize * (pageInfo.page - 1)
    const end = start + pageSize
    return list.slice(start, end)
}


export  const getRatlist  = (array: any, value: any) => {
    const  tableData = array.map(function(currentValue: any, index: any, arr: any) {
     value.forEach(function(element: any)  {
         if (
           parseFloat(currentValue[element]) !== 0 &&
             currentValue[element] !== '/' && currentValue[element] !== null
         ) {
           currentValue[element] = currentValue[element] + '%'
         }
})
    return currentValue
})

}


 export const validateSequence = (rule, value, callback) => {
    const  regNum = /^.{1,25}$/
    if (value === '') {
        callback(new Error('Enter bank card number'))
    } else if (!Number.isInteger(+value)) {
        callback(new Error('type in data'))
    } else if (!regNum.test(value)) {
        callback(new Error('too long'))
    } else {
        callback()
    }
}

export function getRate(a:any, b:any) {
    if (b > 0) {
        console.log(a)
        console.log(b)
        const resRate = (((100 * Number(a)) / (Number(b))).toFixed(2)) + '%';
        return resRate
    } else {
        return "0%"
    }

}
