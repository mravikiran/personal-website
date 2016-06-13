var app = require('express')();

var funcWithoutNext =  function(req, res,next) {
    console.log(" middleware without next");
    next();
};
var funcWithoutNextOnceMore =  function(req, res, next) {
    console.log(" middleware without next once more");
    next();
};

app.use(funcWithoutNext, funcWithoutNextOnceMore);
//app.use(funcWithoutNextOnceMore);


app.get('/home', function(req,res, next) {
                        console.log("First callback");
                        //res.send("Wats appening!!");
                        next();
                    
                 }, function (req, res, next) {
                            console.log("This is route handler");
                          //  res.send("This will not go to next middleware");
                             next();
                       }
       );

app.get('/home', function(req,res) {
                        console.log("last middlware ");
                        res.send("Wats appening!!");
                 }       
                 
);






app.listen(3030);

