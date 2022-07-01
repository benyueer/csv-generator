
const fs = require('fs')
const log = require('single-line-log').stdout

interface ColumnConfig {
  type: string
  len: number
}

const strBase = '1234567890qwertyuiopasdfghjklzxcvbnm'
const numberBase = '1234567890'

function format(date: Date, fmt: string){ //author: meizz
  var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


function generator(path: string, lines: number, columnConfigList: ColumnConfig[], delimiter: string = ',') {
  console.log('开始生成。。。')
  const writeStream = fs.createWriteStream(path)
  for (let i = 0; i < lines; i++) {
    let lineArr = []
    for (let j = 0; j < columnConfigList.length; j++) {
      lineArr[j] = genCase(columnConfigList[j])
    }
    let columnStr = lineArr.join(delimiter) + (i === lines-1 ? '' : '\n')
    // writeStream.write(columnStr)
    i % 1000 === 0 && progress(i, lines)
    // log(`生成第${i + 1}行`)
  }
  console.log(`\n写入成功！${path}`)
}

function genCase(config: ColumnConfig) {
  let str
  const {len, type} = config
  switch (type) {
    case 'string':
      str = genStr(len)
      break;
    case 'number':
      str = genNumber(len)
      break;
    case 'date':
      str = genDate()
  }

  return str
}


function genStr(len: number) {
  let res = ''
  for (let i = 0; i < len; i++) {
    res += strBase[Math.floor(Math.random() * 36)]
  }
  return res
} 

function genNumber(len: number) {
  let res = ''
  for (let i = 0; i < len; i++) {
    res += numberBase[Math.floor(Math.random() * 10)]
  }
  return Number(res)
}

function genDate() {
  return format(new Date(), 'yyyy-MM-dd hh:mm:ss')
}

function progress(curIndex: number, ans: number) {
  const p = Math.floor((curIndex / ans) * 100)
  // console.log(curIndex, ans, p)
  const str = new Array(p).fill('█').join('') + new Array(100 - p).fill('░').join('') + '\t' + curIndex + ' / ' + ans + '\t' + p + '%'
  // console.log(str)
  log(str)
}



// const s = generator(10, [{type: 'number', len: 5}, {type: 'string', len: 10}])
// console.log(s)
// writeFile('hello.csv', 'qwe,qwe')




generator('hello.csv', 1000000, [
  {
    type: 'string',
    len: 12
  },
  {
    type: 'string',
    len: 12
  },
  {
    type: 'string',
    len: 12
  },
  {
    type: 'string',
    len: 12
  },
  {
    type: 'date',
    len: 12
  },
])