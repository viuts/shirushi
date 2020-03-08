import SuperAgent from 'superagent'
import { JSDOM } from 'jsdom'
import _ from 'lodash-es'

import Constant from '../Config/Constant'

const proxy = 'https://cors-anywhere.herokuapp.com/'

const rekumachiKeyMapping = {
  address: {
    key: '所在地',
    extract: val => val,
  },
  price: {
    key: '販売価格',
    extract: val => Number(val.match(/(\d)/g).join('')),
  },
  profitRate: {
    key: '表面利回り',
    extract: val => Number(val.match(/(\d+\.\d+)/g).join('')),
  },
  propertyStructure: {
    key: '建物構造',
    extract: val => _.findKey(Constant.PROPERTY_STRUCTURES, item => item.label === val),
  },
  elapsedYear: {
    key: '築年月',
    extract: val => Number(val.match(/築(\d+)年/)[1]),
  },
  buildingSize: {
    key: '建物面積',
    extract: val => Number(val.match(/(\d+\.\d+)/g).join('')),
  },
  landSize: {
    key: '土地面積',
    extract: val => Number(val.match(/(\d+\.\d+)/g).join('')),
  },
}

const rakumachi = async (link, useProxy = false) => {
  const url = useProxy ? `${proxy}${link}` : link
  const res = await SuperAgent.get(url)
    .set('Access-Control-Allow-Origin', '*')
  const dom = new JSDOM(res.text)
  const node = dom.window.document.querySelector('.Effect03')
  const targetNode = node.childNodes[1].childNodes
  const data = {}
  for (let i = 1; i < targetNode.length; i += 2) {
    const innerNode = targetNode[i].childNodes
    for (let j = 1; j < innerNode.length; j += 4) {
      const tagIndex = j
      const valueIndex = j + 2
      const tag = innerNode[tagIndex].textContent.trim().split('\n')[0].trim()
      const value = innerNode[valueIndex].textContent.trim().split('\n')[0].trim()
      data[tag] = value
    }
  }
  const transformed = Object.entries(data)
    .reduce((acc, [key, value]) => {
      const mappingKey = _.findKey(rekumachiKeyMapping, item => item.key === key)
      if (!mappingKey) return acc
      acc[mappingKey] = rekumachiKeyMapping[mappingKey].extract(value)
      return acc
    }, {})
  return transformed
}

const providers = {
  rakumachi,
}

export default async (provider, link, useProxy = false) => {
  const func = providers[provider]
  if (!func) return null
  try {
    const result = await func(link, useProxy)
    return result
  } catch (err) {
    console.log(err)
    return null
  }
}
