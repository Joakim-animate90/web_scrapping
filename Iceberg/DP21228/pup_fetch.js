
import cheerio from 'cheerio'
import fetch from 'node-fetch'

async function fetchURL ({ canonicalURL }) {
  // test canonical the https or http since it can be any
  if (canonicalURL.includes('https') || canonicalURL.includes('http')) {
    return await fetchHelper({ canonicalURL })
  } else {
    return ['hello']
  }
}
async function fetchHelper ({ canonicalURL }) {

    const response = await fetch(canonicalURL)
    const html = await response.text()
  const $ = cheerio.load(html)
  const table = $('table')
  const rows = table.find('tr')
  rows.each(async (i, row) => {
    const link = $(row).find('td').eq(3).find('a').attr('href')

    // click on the link
    if (link !== undefined) {
    // fetch the pdf and save it
      const response1 = await fetch(link)
      const buffer = await response1.arrayBuffer()
      console.log('i have reached here')
      //response content type
      console.log(response.headers.get('content-type'))
      // save buffer to file


    } else {
      console.log('error encountered')
    // go to the next row if the link is undefined
    }
  })

}
const canonicalURL = 'https://corpoguajira.gov.co/resoluciones/resoluciones-2022/'
fetchURL({ canonicalURL })
