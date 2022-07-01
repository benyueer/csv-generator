
const fs = require('fs')

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


function generator(lines: number, columnConfigList: ColumnConfig[], delimiter: string) {
  const res = []
  for (let i = 0; i < lines; i++) {
    let lineArr = []
    for (let j = 0; j < columnConfigList.length; j++) {
      lineArr[j] = genCase(columnConfigList[j])
    }
    res.push(lineArr.join(delimiter))
  }

  return res.join('\n')
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


function writeFile(filePath: string, content: string) {
  const writeableStream = fs.createWriteStream(filePath)
  writeableStream.write(content)
  writeableStream.end()
}


// const s = generator(10, [{type: 'number', len: 5}, {type: 'string', len: 10}])
// console.log(s)
// writeFile('hello.csv', 'qwe,qwe')

function generatorCsv(path: string, lines: number, columnConfigList: ColumnConfig[], delimiter = ',') {
  const content = generator(lines, columnConfigList, delimiter)
  console.log('正在写入...')
  writeFile(path, content)
  console.log(`生成成功，请查看${path}`)
}


generatorCsv('hello.csv', 100, [
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