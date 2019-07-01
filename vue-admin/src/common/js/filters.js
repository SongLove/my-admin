import { parseTime, getLeftTime } from '@/utils'

export default {
  // 2位生日 mm-dd
  formatBirth: birth => parseTime(birth * 1000, '{m}-{d}'),
  // 七个字名字
  format7name: name => {
    return name && name.length > 7 ? name.substring(0, 7) + '...' : name
  },
  // 格式化剩余时间
  formatLeftTime: time => {
    let left = getLeftTime(time)
    return `${left.minutes}:${left.seconds}`
  },
  // 格式化剩余时
  formatLeftTimeHour: time => {
    let left = getLeftTime(time)
    return `${left.hours}:${left.minutes}:${left.seconds}`
  },
  // 格式化心情
  formatMood: mood => {
    if (mood <= 50) {
      return '痛苦'
    } else if (mood <= 100) {
      return '沮丧'
    } else if (mood <= 150) {
      return '一般'
    } else {
      return '开心'
    }
  },
  // 格式化怀孕状态
  formatPregnant: pregnant => {
    if (pregnant === 10) {
      return '未怀孕'
    } else if (pregnant === 20) {
      return '已怀孕'
    } else if (pregnant === 30) {
      return '待收益'
    }
  },
  // 格式化距离
  formatDistance: distance => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(2)}公里`
    } else {
      return `${distance}米`
    }
  },
  // 格式化阶段
  formatStage: stage => {
    if (stage === 10) {
      return '幼年'
    } else if (stage === 20) {
      return '少年'
    } else if (stage === 30) {
      return '成年'
    }
  },
  // 格式化性别
  formatGender: gender => {
    const map = {
      0: '未知',
      1: '男',
      2: '女'
    }
    return map[gender] || '未知'
  },
  // 格式化阶段 图片
  formatStageImg: stage => {
    let imgSrc = ''
    switch (stage) {
      case 10:
        imgSrc = require('../assets/images/mating/stage1.png')
        break
      case 20:
        imgSrc = require('../assets/images/mating/stage2.png')
        break
      case 30:
        imgSrc = require('../assets/images/mating/stage3.png')
        break
    }
    return imgSrc
  }
}
