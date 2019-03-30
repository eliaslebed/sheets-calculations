const privatBankApiUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

class SheetCalculation {
  private ss = SpreadsheetApp.getActiveSpreadsheet();

  getUsdToUah() {
    const response = UrlFetchApp.fetch(privatBankApiUrl);
    const data = JSON.parse(response.getContentText());
    return data[0].buy;
  }

  getUahToUsd() {
    const response = UrlFetchApp.fetch(privatBankApiUrl);
    const data = JSON.parse(response.getContentText());
    return data[0].sale;
  }

  getNotes() {
    const sheet = this.ss.getSheets()[1];
    const range = sheet.getRange('A11:A32');
    const results = range.getNotes();
    const values = range.getValues();
    const objectValues = Object.keys(values).map(key => values[key]);
    const objectResults = Object.keys(results).map(key => results[key]);
    const flatten = objectValues.reduce((acc, val) => acc.concat(val));
    const flattenRes = objectResults.reduce((acc, val) => acc.concat(val));

    console.log(range);

    return flatten
      .filter((_, i) => flattenRes[i] !== 'not for gain')
      .reduce((acc, x) => acc + x, 0);
  }
}

const calculation = new SheetCalculation();

function sumFood() {
  return calculation.getNotes();
}

function getUah() {
  return calculation.getUsdToUah()
}

function getUsd() {
  return calculation.getUahToUsd()
}
