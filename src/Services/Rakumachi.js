// import SuperAgent from 'superagent'
const SuperAgent = require('superagent')
const { JSDOM } = require('jsdom')

SuperAgent.get('https://www.rakumachi.jp/syuuekibukken/chugoku/hiroshima/dim1004/1592471/show.html')
  .end((err, res) => {
    // console.log(err)
    const dom = new JSDOM(res.text)
    const node = dom.window.document.querySelector('.Effect03')
    console.log(node.textContent)
  })
