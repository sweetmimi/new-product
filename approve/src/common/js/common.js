export function formatMoney (value) {
  return value && value.toString().replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
export function getRejectInfo (ids, d) {
  const _getResult = () => {
    const conclusion = d.conclusion
    for (const k in conclusion) {
      if (conclusion[k].id === +ids.result) {
        return conclusion[k].label
      }
    }
  }
  const _getReject = () => {
    const rejectReson = d.rejectReson
    const rejects = ids.reject
    let rejectInfo = []
    let rejectObj = {}
    rejectReson.forEach(reson => {
      reson.value.forEach(item => {
        rejectObj[item.id] = item.label
      })
    })
    rejects.forEach(reject => {
      rejectInfo.push(rejectObj[reject])
    })
    return rejectInfo.join('、')
  }
  const result = _getResult()
  const reject = _getReject()

  return Object.assign({}, {result, reject})
}
