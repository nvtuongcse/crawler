const express = require('express');
const router = express.Router();
const app = express()
const cheerio = require('cheerio');
const url = "http://www.muabannhadat.vn/nha-dat-3490?p=";
const request = require('request');
var port = 3000
var pages = 20
const stupid_space = '                                                                    '
var arr = [];

app.get("/page20",function(req,re){
    // pages = req.params.id;
    for(var i = 0;i<pages;i++){
        request(url + i, function (err, res, body) {
            if (err) {
                console.log("toang")
            }
            else {
                const $ = cheerio.load(body);
                $(body).find('div.resultItem').each(function (i, elem) {
                    var name = $(elem).find('a.title-filter-link').text().trim();
                    var price = $(elem).find('div#MainContent_ctlList_ctlResults_repList_ctl00_' + i + '_divListingInformationPrice_' + i).text()
                    var area = $(elem).find('div.col-xs-12').text().replace(/\n/g, "").trim().split(stupid_space)[0]
                    var location = $(elem).find('div.col-xs-12').text().replace(/\n/g, "").trim().split(stupid_space)[1]
                    arr.push({
                        name: name,
                        price: price,
                        location: location,
                        area: area
                    })
                })
    
            }
            if(arr.length>=pages*10)
            re.json(
                arr
            )
            re.end
            
        })
        
    }
})
    



app.listen(port)
