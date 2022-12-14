import cheerio from 'cheerio'
import moment from 'moment'
// eslint-disable-next-line camelcase
import rename_file from './rename_file.js'

const momentDate = (date) => {
  // convert  03/12/2022' to moment to iso format
  const momentDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
  return momentDate
}

export default function cheerioHelper (html, records, page) {
  const $ = cheerio.load(html)
  $('.ui-scrollpanel-content').each((index, element) => {
    const record = {}

    // find every tr
    $(element).find('tr').each((index, element) => {
      // find every td and map the first td to the key and the second td to the value
      // eslint-disable-next-line array-callback-return
      $(element).find('td').map((index, element) => {
        if (index === 0) {
          // if key is date, convert to moment js
          if ($(element).text().trim() === 'Fecha :') {
            record.date = momentDate($(element).next().find('span').text().trim())
          }
          record[$(element).find('span').text().replace(':', '').trim()] = $(element).next().find('span').text().trim()
          // return a json object

          return record
        } else { /* empty */ }
      })
      // click page to download pdf file using async and await
      // use async function
      async function downloadFile () {
        const number = 150

        await page.click(`#formularioConsultar\\:dgArchivos\\:0\\:j_idt${number}`)
      }

      downloadFile().then(() => {
        // set timeout to wait for file to download
        setTimeout(() => {
          rename_file(record)
        }, 5000)
      })
    })

    console.log('Timeout 5000s')
    records.push(record)
    console.log(records)
  })
}
