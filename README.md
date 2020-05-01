# gunclockSpreadSheet

## 概要
* セルの変更をトリガにスクリプト(changeEvent())を呼び出す 
* colorセルの変更だった場合は、そのセルの色を変更 
* チェックボックスの変更(クリック)だった場合は、 
    * ガンマン時計をREST呼び出しして、jsonpで取得(UrlFetchApp.fetch) 
    * セルに値を代入 
    * セルの色を変更 

## manifest file( appsscript.json )
    {
      "timeZone": "Asia/Tokyo",
      "dependencies": {
      },
      "exceptionLogging": "STACKDRIVER",
      "runtimeVersion": "V8",
      "oauthScopes": [
        "https://www.googleapis.com/auth/script.external_request",
        "https://www.googleapis.com/auth/spreadsheets.currentonly",
        "https://www.googleapis.com/auth/spreadsheets"
      ]
    
    }
