function parsePage({responseBody, URL, html}) {
  const results = []

  const resultsDesicion = []
  const results_dic = {}
  $('body').each((i, el) => {


    const docketNoregex = /[a-zA-Z]+\s?[a-zA-Z]+.?\s*\d+\s*[Oo][Ff]\s*\d{4}/g
    const docketNo1regex = /[a-zA-Z]+\s\d+\/\d+/
    const docketNumber =  $(el).text().match(docketNoregex, false) || $(el).text().match(docketNo1regex, false)

    if (docketNumber) {
      results_dic.docketNumber = docketNumber[0]
    }

    const caseNumberRegex = /N\d{4}/
    const caseNumber = $(el).text().trim().match(caseNumberRegex)
    if (caseNumber) {
      results_dic.caseNumber = caseNumber[0]
    }

    const hearingDatesRegex = /(\d{4})\s*:\s*(\d{1,2})\s*(and|&)\s*(\d{1,2})\s*(\w+)/g
    const hearingDatesRegex1 = /(\d{4})\s*:\s*(\d{1,2})(st|nd|rd|th)\s*(\w+)\s*(and|&)\s*(\d{1,2})(st|nd|rd|th)\s*(\w+)/g
    const hearingDates = $(el).text().match(hearingDatesRegex, false) || $(el).text().match(hearingDatesRegex1, false)
    if (hearingDates) {
      results_dic.hearingDates = hearingDates[0]
    }
    const judgeMentDateRegex = /([0-9]{1,2})\s([a-zA-Z]{3,9})\s([0-9]{4})/g
    const judgeMentDateRegex1 = /([0-9]{1,2}[a-zA-Z]+)\s([a-zA-Z]{3,9})\s([0-9]{4})/g
    const judgeMentDate = $(el).text().match(judgeMentDateRegex) || $(el).text().match(judgeMentDateRegex1)
    if (judgeMentDate) {
      results_dic.judgeMentDate = moment(judgeMentDate[0], 'DD MMMM YYYY').format('YYYY-MM-DD')
    }
    const citedCasesRegex = /([^.!?]+\s-\s*v\s*-\s[^.!?]+)/g
    const citedCases = $(el).text().match(citedCasesRegex)

    if (citedCases){
      results_dic.citedCases = citedCases[0]
    }
    const courtRegex = /(\[?([Nn][Aa][Tt][Ii][Oo][Nn][Aa][Ll]\s*[Cc][Oo][Uu][Rr][Tt]\s*[oO][Ff]\s*[Jj][Uu][Ss][Tt][Ii][Cc][Ee])\]?)/g
    const inCourtRegex = /(\[?([Ii][Nn]\s*[Tt][Hh][Ee]\s*[Nn][Aa][Tt][Ii][Oo][Nn][Aa][Ll]\s*[Cc][Oo][Uu][Rr][Tt]\s*[oO][Ff]\s*[Jj][Uu][Ss][Tt][Ii][Cc][Ee])\]?)/g
    const court = $(el).text().match(inCourtRegex, false) || $(el).text().match(courtRegex, false)

    if (court) {
      results_dic.court = court[0].replace(/\[|\]/g, '')
    }


  })
  results_dic.fullText = $('body').text()
  const $p = $('body p').filter(function(){
    return /&nbsp;/.test($(this).text());
  }).remove()

  results_dic.solicitors = $('body').children().slice(-2).map((i, el) => $(el).text()).get()
  results.push(results_dic)
  return results

}