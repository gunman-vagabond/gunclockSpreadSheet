var SIZE_COLUMN     = 2; // SIZEの列(1オリジン)
var COLOR_COLUMN    = 3; // COLORの列(1オリジン)
var CHECKBOX_COLUMN = 4; // チェックボックスの列(1オリジン)

function changeEvent() {
//  Browser.msgBox("changeEvent() called");
  var sheet = SpreadsheetApp.getActiveSheet();
  var changedCell = sheet.getActiveCell();
  var changedColumn = changedCell.getColumn();
  var changedRow =  changedCell.getRow();

  if (changedColumn == COLOR_COLUMN){ // COLOR列の値が変更された場合
    var range = SpreadsheetApp.getActiveRange();
    value = range.getValue();
    if (value.indexOf("#") == 0 && value.length == 7) { // #xxxxxx で7文字!!
      range.setBackgroundColor(value);
      // 色の濃さを確認
      if (getChannelLevel(value) > 400) {
        range.setFontColor("#000000");
      } else {
        range.setFontColor("#FFFFFF");
      }
    }
  }
  
  if (changedColumn == CHECKBOX_COLUMN){ // チェックボックス列の値が変更された場合
    
    var clocksize = sheet.getRange(changedRow, SIZE_COLUMN).getValue();
    const endpoint 
      = "https://script.google.com/macros/s/AKfycbxyreXaAJ4Xyn4QF7tNpUd5LFprjM8v1g8fC4PED66Swd0hhvw/exec?type=jsonp&clocksize="
      + clocksize;

    var clockcolor = sheet.getRange(changedRow, COLOR_COLUMN).getValue();
    sheet.getRange("f2").setBackground(clockcolor);
    if (getChannelLevel(clockcolor) > 400) {
      sheet.getRange("f2").setFontColor("#000000");
    } else {
      sheet.getRange("f2").setFontColor("#FFFFFF");
    }
    
    var options = {
      'method': 'get',
//      'contentType': 'application/json',
//      'payload': JSON.stringify({})
    };

    var response = UrlFetchApp.fetch(endpoint, options);
    var response_json = JSON.parse(response);
    var message = JSON.parse(response).message.replace(/,/g, "\n");
    
    sheet.getRange("f2").setValue(message);

    for ( var lineNo = 2; lineNo <= 11; lineNo ++ ) {
        sheet.getRange(lineNo, CHECKBOX_COLUMN).uncheck();
    }
  }
}

function getChannelLevel(baseColor){
  baseColor = baseColor.replace('#', '');
  if (baseColor.length != 6){ return '#000000'; }
  var totalValue = 0;
  for (i = 0; i < 3; i++){
    channelValue = parseInt(baseColor.substr((i * 2), 2), 16);
    totalValue += channelValue;
  }
  return totalValue;
}