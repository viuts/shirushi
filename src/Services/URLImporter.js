import SuperAgent from 'superagent'
import { JSDOM } from 'jsdom'
import _ from 'lodash-es'

import Constant from '../Config/Constant'
import proxy from './proxy'

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

const rakumachi = async (link) => {
  const res = await SuperAgent.get(proxy(link))
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

const homes = async (link) => {
  const res = await SuperAgent.get(proxy(link))
    .set('Access-Control-Allow-Origin', '*')
  const dom = new JSDOM(res.text)
  const address = dom.window.document.querySelector('#chk-bkc-fulladdress').textContent.trim()
  const buildingString = dom.window.document.querySelector('#chk-bkc-housearea').textContent.trim()
  const buildingSize = Number(buildingString.match(/(\d+\.\d+)/g).join(''))
  const landString = dom.window.document.querySelector('#chk-bkc-landarea').textContent.trim()
  const landSize = Number(landString.match(/(\d+\.\d+)/g).join(''))
  const price = dom.window.document.querySelector('#chk-bkc-moneyroom').textContent.trim()
  const propertyStructureString = dom.window.document.querySelector('#chk-bkd-housekouzou').textContent.split('/')[0].trim()
  const propertyStructure = _.findKey(Constant.PROPERTY_STRUCTURES, item => item.label === propertyStructureString)
  const buildingYearString = dom.window.document.querySelector('#chk-bkc-kenchikudate').textContent.trim()
  const elapsedYear = Number(buildingYearString.match(/築(\d+)年/)[1])

  return {
    price,
    address,
    buildingSize,
    elapsedYear,
    landSize,
    propertyStructure,
  }
}

const providers = {
  rakumachi,
  homes,
}

export default async (provider, link) => {
  const func = providers[provider]
  if (!func) return null
  try {
    const result = await func(link)
    return result
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return null
  }
}
