export function Drag (id) {
  const $ = function (flag) {
    return document.getElementById(flag)
  }
  $(id).onmousedown = function (e) {
    const d = document
    const that = $('recordBox')
    const page = {
      event: function (evt) {
        const ev = evt || window.event
        return ev
      },
      pageX: function (evt) {
        const e = this.event(evt)
        return e.pageX || (e.clientX + document.body.scrollLeft - document.body.clientLeft)
      },
      pageY: function (evt) {
        const e = this.event(evt)
        return e.pageY || (e.clientY + document.body.scrollTop - document.body.clientTop)
      },
      layerX: function (evt) {
        const e = this.event(evt)
        return e.offsetX
      },
      layerY: function (evt) {
        const e = this.event(evt)
        return e.offsetY
      }
    }
    const x = page.layerX(e)
    const y = page.layerY(e)
    if (that.setCapture) {
      that.setCapture()
    } else if (window.captureEvents) {
      window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
    }
    d.onmousemove = function (e) {
      const tx = page.pageX(e) - x
      const ty = page.pageY(e) - y
      that.style.left = tx + 'px'
      that.style.top = ty + 'px'
    }
    d.onmouseup = function () {
      if (that.releaseCapture) {
        that.releaseCapture()
      } else if (window.releaseEvents) {
        window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
      }
      d.onmousemove = null
      d.onmouseup = null
    }
  }
}
