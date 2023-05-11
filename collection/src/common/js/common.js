export function formatMoney (value) {
  return value && value.toString().replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}


export const getRatlist = (array, value) => {
 if (array instanceof Array) {
    const tableData = array.map(function (currentValue, index, arr) {
      value.forEach(function (element) {
        if (
          parseFloat(currentValue[element]) !== 0 &&
          currentValue[element] !== '/' && currentValue[element] !== null
        ) {
          currentValue[element] = (Math.round(currentValue[element] * 100)) + '%'
        }
      })
      return currentValue
    })
 }

}
