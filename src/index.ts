
const fs = require('fs')

interface ColumnConfig {
  type: string
  len: number
}

const strBase = '1234567890qwertyuiopasdfghjklzxcvbnm'
const numberBase = '1234567890'


function generator(lines: number, columnConfigList: ColumnConfig[]) {
  const res = []
  for (let i = 0; i < lines; i++) {
    let lineArr = []
    for (let j = 0; j < columnConfigList.length; j++) {
      lineArr[j] = genCase(columnConfigList[j])
    }
    res.push(lineArr.join(','))
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


function writeFile(filePath: string, content: string) {
  const writeableStream = fs.createWriteStream(filePath)
  writeableStream.write(content)
  writeableStream.end()
}


// const s = generator(10, [{type: 'number', len: 5}, {type: 'string', len: 10}])
// console.log(s)
// writeFile('hello.csv', 'qwe,qwe')

function generatorCsv(path: string, lines: number, columnConfigList: ColumnConfig[]) {
  const content = generator(lines, columnConfigList)
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
    type: 'string',
    len: 12
  },
])