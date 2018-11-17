function throttle(action, delay) {
  let timer = null
  let lastRun = 0
  return function () {
    if (timer) {
      return
    }
    let elapsed = Date.now() - lastRun
    let context = this
    let args = arguments
    let runCallback = function () {
      lastRun = Date.now()
      timer = null
      action.apply(context, args)
    }
    if (elapsed >= delay) {
      runCallback()
    } else {
      timer = setTimeout(runCallback, delay)
    }
  }
}
function getScrollEventTarget(element) {
  let currentNode = element
  // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    let overflowY = getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}
export {
  throttle
}
