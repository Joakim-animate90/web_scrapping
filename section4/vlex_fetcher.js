import cheerio from 'cheerio'
import fetcher from './fetch.js'

function cheerioHelper (html) {
  const $ = cheerio.load(html)

  const results = []

    // if p contains the text The court , check the next element if its first text node contains the text of the case
    // if it does, push the case name to the results array and the following elements up to the next p element which contains the text The court'


    //the elements inside the body are p get the last two el of $('body') and convert to text
    $('body').children().slice(-2).map((i, el) => $(el).text()).get()
    // a regex to match this pattern 13 March and 3 April 1992
     // a regex to match this pattern  Harding -v- Teperoi Timbers Pty Ltd [1988] PNGLR 128
    const casesCitedRegex = /([A-Z][a-z]+\s-v-\s[A-Z][a-z]+\s[0-9]{4}\s[A-Z?][a-z?]+\d+?)/g

   // a regex to match either of this [In the National Court of Justice] or [National Court of Justice] letters can be either in capital or small the bracket is optional
    const courtRegex = /(\[?([Nn]ational\s[Cc]ourt\s[oO]f\s[Jj]ustice)\]?)/g
    //a regex to match [In the National Court of Justice] any letter can be either in capital even the middle letters or small the bracket is optional
    const judgeMentDateRegex = /([0-9]{1,2})\s([a-zA-Z]{3,9})\s([0-9]{4})/g
    const judgeMentDateRegex1 = /([0-9]{1,2}[a-zA-Z]+)\s([a-zA-Z]{3,9})\s([0-9]{4})/g
    const judgeMentDate = $(el).text().match(judgeMentDateRegex) || $(el).text().match(judgeMentDateRegex1)
    if (judgeMentDate) {
        //using moment to format the date
        const date = moment(judgeMentDate[0], 'DD MMMM YYYY').format('YYYY-MM-DD')
    }






    //a regex to match this pattern 1997 : 13 & 21 NOV the ampersand can be replaced with and
    const hearingDatesregex = /(\d{4})\s*:\s*(\d{1,2})\s*(and|&)\s*(\d{1,2})\s*(\w{3})/g
    const hearingDatesregex1 = /(\d{4})\s*:\s*(\d{1,2})(st|nd|rd|th)\s*(\w{3})\s*(and|&)\s*(\d{1,2})(st|nd|rd|th)\s*(\w{3})/g
    const docketNoregex = /[A-Z]+\s?[a-zA-Z]+.? \d+ [Oo][Ff] \d{4}/g
    const docketNumber = (docketNoregex).test($(el).text())  ? $(el).text() :  docketNo1regex.test($(el).text()) ? $(el).text() : null
    $('body').children().slice(-2).map((i, el) => {

        //if el text contains the word lawyer
        if ($(el).text().includes('Lawyer')) {

        }
    }





        $('p').each((i, el) => {

        //get the last two elements of 'p' using index of

        if ( )



       // a regex to match [1982]  it has variations
        const regex = /\[\d{4}\]/g;
        //if el contains anything that matches the regex

        if ($(el).text().match(regex)) {
            //gt the contents of the node

        }





        const docketNo1regex = /[A-Z]{2} \d+\/\d+/
        //a regex to find OS NO. 197 OF 1991  OS NO can be replaced with any other letters same for the numbers
        const docketNoregex = /[A-Z]+\s[a-zA-Z]+. \d+ OF \d{4}/g
        const docketNo = $(el).text().match(docketNoregex) || $(el).text().match(docketNo1regex)
        if (docketNo) {

        }else if(){

        }








        //a regex to math this N1049 with variations but N is always the first letter
        const caseNumberRegex = /N\d{4}/
        const caseNumber = $(el).text().match(caseNumberRegex)
        if (caseNumber) {
            results.push(caseNumber[0])
        }
        const dateRegex = /([0-9]{1,2})\s([a-zA-Z]{3,9})\s([0-9]{4})/g
        if ($(el).text().match(dateRegex) && $(el).next().text() === 'The court') {
            $(el).nextUntil('p:contains("The court")').each((i, el) => {
                results.push($(el).text())
            })
        }


        if ($(el).text().includes('The court')) {
            const nextEl = $(el).next()
  /*          if (nextEl.text().includes('The court')) {
            const caseName = $(nextEl).text()
            results.push(caseName)
            }*/
        }
    }


}
fetcher().then(res => cheerioHelper(res))
