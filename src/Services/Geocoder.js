import superagent from 'superagent'

export default async (address) => {
  try {
    const res = await superagent.get('https://www.geocoding.jp/api/')
      .set('accept', '*/*')
      .set('accept-language', 'en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7')
      .set('Access-Control-Allow-Origin', '*')
      .buffer(true)
      .parse(({ text }) => text)
      .query({
        q: address,
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
    // eslint-disable-next-line no-console
    console.log(err)
    return null
  }
}
