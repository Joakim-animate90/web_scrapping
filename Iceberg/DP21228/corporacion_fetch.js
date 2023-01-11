
async function fetchPage ({ canonicalURL, requestURL, requestOptions, headers }) {
  if (!requestOptions) requestOptions = { method: 'GET', headers }
  if (!canonicalURL) canonicalURL = requestURL
  if (!requestURL) requestURL = canonicalURL
  return await fetch(requestURL, requestOptions)
    .then(response => {
      return {
        canonicalURL,
        request: Object.assign({ URL: requestURL }, requestOptions),
        response
      }
    })
}

const binaryDownload = async function ({ canonicalURL, requestURL, headers, requestOptions }) {
  const responsePage = await fetchPage({ canonicalURL, requestURL, headers, requestOptions })
  const type = responsePage.response.headers.get('content-type')
  type && console.log(`TYPE = ${type}`)
  if (responsePage.response.ok && /pdf|word/i.test(type)) { // Make sure your binary fileType is permitted by this regex
    const contentSize = parseInt(responsePage.response.headers.get('content-length') || '-1')
    const buffer = await responsePage.response.buffer()
    const bufferLength = buffer.length
    if (contentSize < 0 || bufferLength === contentSize) {
      responsePage.response = new fetch.Response(buffer, responsePage.response)
    } else if (contentSize == 0 || bufferLength == 0) { // empty response
      responsePage.response.ok = false
      responsePage.response.status = 404
      responsePage.response.statusText = `Empty ${type} document download: ${contentSize} > ${bufferLength}\n`.toUpperCase()
      responsePage.response = new fetch.Response(responsePage.response.statusText, responsePage.response)
    } else {
      responsePage.response.ok = false
      responsePage.response.status = 502
      responsePage.response.statusText = `incomplete ${type} document download: ${contentSize} > ${bufferLength}\n`.toUpperCase()
      responsePage.response = new fetch.Response(responsePage.response.statusText, responsePage.response)
    }
  } else {
    responsePage.response.ok = false
    responsePage.response.statusText = `either not pdf, or request did not succeed: ${responsePage.response.status} && ${type}\n`.toUpperCase()
    responsePage.response.status = 502
    responsePage.response = new fetch.Response(responsePage.response.statusText, responsePage.response)
  }
  return responsePage
}

async function fetchURL ({ canonicalURL, headers }) {
  if (/https?:.*https?:/i.test(canonicalURL)) {
    console.error('Rejecting URL', canonicalURL, 'returning [];')
    return []
  }
  const requestURL = null
  if (/\.(pdf|docx?)\b/i.test(canonicalURL)) {
    return [await binaryDownload({ canonicalURL, headers })]
  }
  const responsePage = await fetchPage({ canonicalURL, requestURL, headers })
  if (/html/i.test(responsePage.response.headers.get('content-type'))) {
    const html = await responsePage.response.text()
    const $ = cheerio.load(html, { decodeEntities: false })
    $('script, base, frame, frameset').remove()
    $('a[href]').each(function () {
      let href = $(this).attr('href')
      href = href && url.resolve(canonicalURL, href)
      href = href && encodeURI(decodeURI(href))
      href && $(this).attr('href', href.replace(/^http:/i, 'https:'))
    })
    responsePage.response = new fetch.Response($.html(), responsePage.response)
  }
  return [responsePage]
}
