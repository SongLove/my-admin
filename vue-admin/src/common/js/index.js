/* eslint-disable */
export const isDev = process.env.NODE_ENV === 'production' ? false : true

// 格式化时间
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 格式化时间
export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    )
  }
}

// 小于10的格式化函数
export function timeFillZero(param) {
  return param < 10 ? '0' + param : param
}

// 获取剩余时间
export function getLeftTime(leftTime) {
  let days = Math.floor(leftTime / 60 / 60 / 24)
  let hours = Math.floor((leftTime / 60 / 60) % 60)
  let minutes = Math.floor((leftTime / 60) % 60)
  let seconds = Math.floor(leftTime % 60)
  return {
    days: timeFillZero(days),
    hours: timeFillZero(hours),
    minutes: timeFillZero(minutes),
    seconds: timeFillZero(seconds)
  }
}

// px2rem
export function px2rem(px, base = 20) {
  return (px / base).toFixed(3)
}

/**
 * 微信自动播放背景音乐
 * @param {HTMLAudioElement} audio
 */
export const wxAutoPlay = audio => {
  audio.play()
  document.addEventListener(
    'WeixinJSBridgeReady',
    function() {
      audio.play()
    },
    { passive: false }
  )
}

/**
 * 处理iOS 微信客户端6.7.4 键盘收起页面未下移bug
 */
export function fixIOSInputBug() {
  ;/iphone|ipod|ipad/i.test(navigator.appVersion) &&
    document.addEventListener(
      'blur',
      e => {
        // 这里加了个类型判断，因为a等元素也会触发blur事件
        ;['input', 'textarea'].includes(e.target.localName) && document.body.scrollIntoView(false)
      },
      true
    )
}

/**
 * debounce
 * @param {Function} method 方法
 * @param {number} wait 间隔时间
 * @param {boolean} immediate 是否立即执行
 */
export function debounce(method, wait, immediate) {
  let timeout
  return function(...args) {
    let context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
    if (immediate) {
      // 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
      // 这样确保立即执行后wait毫秒内不会被再次触发
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        method.apply(context, args)
      }
    } else {
      // 如果immediate为false，则函数wait毫秒后执行
      timeout = setTimeout(() => {
        // args是一个类数组对象，所以使用fn.apply
        // 也可写作method.call(context, ...args)
        method.apply(context, args)
      }, wait)
    }
  }
}