var COLOR_COLUMN = 3; // COLORの列(1オリジン)
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
//    Browser.msgBox("changeEvent() called-2: changedColumn = " + changedColumn);
    
//    sheet.getRange("d1:e11").setBackgroundRGB(0x88, 0x88, 0x88);
//    sheet.getRange("f2").setBackgroundRGB(0x88, 0x88, 0x88);
    
    var lineNo = 2;
//    for ( lineNo = 2; lineNo <= 11; lineNo ++ ) {
//
//      if ( lineNo == changedRow ) {
////        Browser.msgBox("o: lineNo=" + lineNo + ", CHECKBOX_COLUMN="+CHECKBOX_COLUMN);
//      } else {
////        Browser.msgBox("x: lineNo=" + lineNo + ", CHECKBOX_COLUMN="+CHECKBOX_COLUMN);
//        sheet.getRange(lineNo, CHECKBOX_COLUMN).uncheck();
////        sheet.getRange(lineNo, CHECKBOX_COLUMN).setValue("1");
//      }
//      
//    }

    var clocksize = sheet.getRange(changedRow, 2).getValue();
    const endpoint 
      = "https://script.google.com/macros/s/AKfycbxyreXaAJ4Xyn4QF7tNpUd5LFprjM8v1g8fC4PED66Swd0hhvw/exec?type=jsonp&clocksize="
      + clocksize;

    var clockcolor = sheet.getRange(changedRow, 3).getValue();
    sheet.getRange("f2").setBackground(clockcolor);
    if (getChannelLevel(clockcolor) > 400) {
      sheet.getRange("f2").setFontColor("#000000");
    } else {
      sheet.getRange("f2").setFontColor("#FFFFFF");
    }
    
//    $.ajax({
//        type: 'GET',
//        url: endpoint,
//        dataType: 'jsonp',
//        data: {
//        },
//        success: out => {
////            alert(out.message);
//            showJson(out.message);
//            gunClockAsync(out.message);
//        }
//    });
    
    var options = {
      'method': 'get',
//      'contentType': 'application/json',
//      'payload': JSON.stringify({})
    };

//    Browser.msgBox("kita--");
   
    var response = UrlFetchApp.fetch(endpoint, options);

    var response_json = JSON.parse(response);
    
//    Browser.msgBox("kita--2");
    
//    Browser.msgBox(response);
    var message = JSON.parse(response).message.replace(/,/g, "\n");
//    Browser.msgBox(JSON.parse(response).message);
//    Browser.msgBox(message);
    
//    sheet.getRange("f2").setValue(response.message);
//    sheet.getRange("f2").setValue(responses_json.message);
    sheet.getRange("f2").setValue(message);

    for ( lineNo = 2; lineNo <= 11; lineNo ++ ) {
        sheet.getRange(lineNo, CHECKBOX_COLUMN).uncheck();
    }

//    sheet.getRange("d1:e11").setBackgroundRGB(0xff, 0xff, 0xff);
//    sheet.getRange("f2").setBackgroundRGB(0xff, 0xff, 0xff);
    
//     checkBoxEvent(sheet);
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