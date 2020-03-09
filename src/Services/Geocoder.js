import superagent from 'superagent'
import proxy from './proxy'

export default async (address) => {
  try {
    const res = await superagent.get(proxy('https://www.google.com/search'))
      .set('authority', 'www.google.com')
      .set('dpr', '1')
      .set('accept', '*/*')
      .set('accept-language', 'en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7')
      .buffer(true)
      .parse(({ text }) => text)
      .query({
        tbm: 'map',
        authuser: 0,
        hl: 'zh-TW&',
        gl: 'hk',
        q: address,
        tch: 1,
      })
    const { text } = res
    const matched = text.match(/(\d+\.\d+,\d+\.\d+)/g)
    if (!matched) return null
    const [lat, lng] = matched[matched.length - 1].split(',')
    return {
      lat,
      lng,
    }
  } catch (err) {
    console.log(err)
    return null
  }
}
