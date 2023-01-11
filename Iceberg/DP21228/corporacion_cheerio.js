import cheerio from 'cheerio'
import moment from 'moment'

export default async function cheerioHelper (html) {
  console.log('i have reached here')
  const $ = cheerio.load(html)
  const table = $('table')
  const rows = table.find('tr')
  const data = []
  rows.each((i, row) => {
    console.log('i have reached here')
    const url = 'https://corpoguajira.gov.co/resoluciones/resoluciones-2022/'

    const titulo = $(row).find('td').eq(0).text()
    //  description in lowercase
    const description = $(row).find('td').eq(1).text().toLowerCase()
    const publishDate = moment($(row).find('td').eq(2).text(), 'DD/MM/YYYY').format('YYYY-MM-DD')
    const publishDateOriginale = $(row).find('td').eq(2).text()

    const uri = $(row).find('td').eq(3).find('a').attr('href')
    const resolutionNumber = titulo.split(' ')[2]

    const descriptionArray = description.split(' ')
    descriptionArray.shift()
    descriptionArray.pop()
    const descriptionString = descriptionArray.join(' ')
    // on titulo i want to extract the last 5 after splitting
    const fechaSplit = titulo.split(' ')
    const fechaArray = fechaSplit.slice(-5).join(' ')
    const fecha = moment(fechaArray, 'DD MMMM YYYY').format('YYYY-MM-DD')

    console.log(`i have reached here ${uri}`)
    if (resolutionNumber >= 1522) {
      data.push({
        titulo,
        descriptionString,
        publishDate,
        publishDateOriginale,
        fecha,
        uri,
        url
      })
    }
  })
  console.log(data)
  return data
}
