import superagent from 'superagent'

export default async ({ lat, lng }) => {
  try {
    const res = await superagent.get('https://api.rakumachi.jp/land_price')
      .query({
        lat,
        lng,
      })
    return res.body
  } catch (err) {
    console.log(err)
    return null
  }
}
