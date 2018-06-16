var express = require("express");
var mongojs = require("mongojs");

var request = require("request");
var cheerio = require("cheerio");


var app = express();
app.use(express.static("public"));


var databaseUrl = "intercept";
var collections = ["interceptArticle"];

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/", function(req, res) {
    res.send("Hello world");
  });

  app.get("/all", function(req, res) {
    db.interceptArticles.find({}, function(error, found) {
      if (error) {
        console.log(error);
      }
      else {
        res.json(found);
      }
    });
  });

  app.get("/scrape", function(req, res) {
    request("https://theintercept.com/", function(error, response, html) {
      
      var $ = cheerio.load(html);
      
      $("h4.Promo-title").each(function(i, element) {

        var title = $(element).text();
        

        if(title) {
            db.scrapedData.insert({
                title
            },
            function(err, inserted) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(inserted);
                }
            
            });
        }
    });


    $("a.Promo-link").each(function(i, element) {

        var link = $(element).text();
        

        if(link) {
            db.scrapedData.insert({
                title
            },
            function(err, inserted) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(inserted);
                }
            
            });
        }
    });

    $("div.Promo-author").each(function(i, element) {

        var author = $(element).text();
        

        if(author) {
            db.scrapedData.insert({
                title
            },
            function(err, inserted) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(inserted);
                }
            
            });
        }
    });

    $("p.Excerpt").each(function(i, element) {

        var summary = $(element).text();
        

        if(summary) {
            db.scrapedData.insert({
                title
            },
            function(err, inserted) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(inserted);
                }
            
            });
        }
    });


});
res.send("scrape done");

    });


// //             var link = $(element).text();
// //             // var link = $(element).parent().attr("href");

// //             results.push({
// //                 link:link
// //                 // link: link
// //             });
// //         });

// //         $().each(function(i, element) {

// //             var author = $(element).text();
// //             // var link = $(element).parent().attr("href");

// //             results.push({
// //                 author: author
// //                 // link: link
// //             });
// //         });

// //         $("span.Promo-date").each(function(i, element) {

// //             var date = $(element).text();
// //             // var link = $(element).parent().attr("href");

// //             results.push({
// //                 date: date
// //                 // link: link
// //             });
// //         });

// //         $("p.Excerpt").each(function(i, element) {

// //             var summary = $(element).text();
// //             // var link = $(element).parent().attr("href");

// //             results.push({
// //                 summary:summary
// //                 // link: link
// //             });

// //         });


// //         console.log(results);


// // });
  
  
  


// // var db = mongojs(databaseUrl, collections);
// // db.on("error", function(error) {
// //     console.log("database error:", error);
// // });

// // app.get("/", function(req, res) {
// //     res.send("hello world");
// // });

// // app.get("/all", function(req, res) {
// //     db.scrapedData.find({}, function(error, found) {
// //         if (error) {
// //             console.log(error);
// //         }
// //         else {
// //             res.json(found);
// //         }
// //     });
// // });

// // app.get("/scrape", function(req, res) {
// //     request("https://theintercept.com/", function(error, response, html) {
        
// //     var $ = cheerio.load(html);

// //     $(".title").each(function(i, element) {
// //         var title = $(element).children("a").text();
// //         if(title) {
// //             db.scrapedData.insert ({
// //                 title: title
// //             },

// //             function(err, inserted) {
// //                 if (err) {
// //                     console.log(err);
// //                 }
// //                 else {
// //                     console.log(inserted);
// //                 }
// //             });

// //         }
// //     });

// //     });
// //     res.send("Scrape Complete");
// // });

// // app.listen(3000, function() {
// //     console.log("app runningon port 3000");
// // })

// // console.log("\n************\n" + "article practice\n" + "from INTERCEPT\n");

// request("https://theintercept.com/", function(error, response, html) {

//     var $ = cheerio.load(html);

//     var results = [];

//     $("h4.Promo-title").each(function(i, element) {

//                 var title = $(element).text();
//                 // var link = $(element).parent().attr("href");

//                 results.push({
//                     title: title,
//                     // link: link
//                 });
//             });

//         $("a.Promo-link").each(function(i, element) {

//             var link = $(element).text();
//             // var link = $(element).parent().attr("href");

//             results.push({
//                 link:link
//                 // link: link
//             });
//         });

//         $("div.Promo-author").each(function(i, element) {

//             var author = $(element).text();
//             // var link = $(element).parent().attr("href");

//             results.push({
//                 author: author
//                 // link: link
//             });
//         });

//         $("span.Promo-date").each(function(i, element) {

//             var date = $(element).text();
//             // var link = $(element).parent().attr("href");

//             results.push({
//                 date: date
//                 // link: link
//             });
//         });

//         $("p.Excerpt").each(function(i, element) {

//             var summary = $(element).text();
//             // var link = $(element).parent().attr("href");

//             results.push({
//                 summary:summary
//                 // link: link
//             });

//         });


//         console.log(results);


//     });