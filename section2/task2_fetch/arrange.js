function parsePage ({ URL, responseBody, html, responseURL }) {
  const doc = {
    URI: [URL, decodeURI(URL), encodeURI(decodeURI(URL))].filter((c, i, a) => a.indexOf(c) === i)
  }
  const dataType = 'MEDIA'
  const locale = 'es'
  html = responseBody.content
    const data = []
  if (html) {
    const $ = cheerio.load(html, { decodeEntities: false })
    $('script, meta, base, iframe, frame').remove()
    $('a[href]').each(function (i) {
      const a = $(this)
      a.replaceWith(a.html())
    })
    const table = $('table')
    const rows = table.find('tr')

    rows.each((i, row) => {
      const titulo = $(row).find('td').eq(0).text()
      const description = $(row).find('td').eq(1).text()
      const fecha = moment($(row).find('td').eq(2).text(), 'DD/MM/YYYY').format('YYYY-MM-DD')
      const link = $(row).find('td').eq(3).find('a').attr('href')
      const resolutionNumber = titulo.split(' ')[2]
      // on description i want to remove the first word and last word
      const descriptionArray = description.split(' ')
      descriptionArray.shift()
      descriptionArray.pop()
      const descriptionString = descriptionArray.join(' ')

      if (resolutionNumber >= 1522) {
        data.push({
          resolutionNumber,
          descriptionString,
          fecha,
          link
        })
      }
    })
    doc.htmlContent = { fileFormat: 'text/html', content: sanitizeHtml($.html()), locale, dataType }
  }
  doc.metadata = data
  return [doc]
}
