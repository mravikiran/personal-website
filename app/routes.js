// app/routes.js

var Candidate = require("../app/models/candidate");
var bodyParser = require('body-parser');
var jwt = require('express-jwt');

var auth = jwt(
{
  secret: 'STORE_IT_IN_ENV_SECRET',
  userProperty: 'payload'
}
    );




module.exports = function(app, passport) { 

	//server routes 
	// handles things like api calls

	// authentication routes

	//sample api route


    /*
    for protecting the api from access, auth will provide the JWT to be compared against 

    app.get ('/api/protected', auth, function(req,res){
    
            if(!req.payload._id){
                //user not logged in
                res.status(401).json({"message" : "no  user logged in"});
            }
            else
            {
                User.findById(req.payload._id).exec(function(err, user){ //do whatever});
            }

    } );
    */

	app.post('/api/candidates', auth,
			function(req, res) 
			{
                var body = req.body;
                console.log("The request is : " + body["name"]);
                if(!req.payload._id){
                    //user not logged in
                    console.log(req);
                    res.status(401).json({"message" : "no  user logged in from candidates"});
                }
                else {
				    Candidate.find({"name" : body["name"] },function(err, candidates) 
								{
									if(err) 
									{
										res.send(err);
									}
                                    console.log("/api/candidates : response");
                                    console.log(candidates);
                                    res.json(candidates);
								}
							);
                }
			}
		);

    app.post('/api/login', function(req,res,next)
                            {
                                passport.authenticate( 'local-login', 
                                    function(err, user, info) 
                                    {
                                            var token;

                                            if(err) 
                                            {
                                                res.status(404).json(err);
                                                return;
                                            }

                                            //if a user is found
                                            if(user) 
                                            {
                                                token = user.GenerateJwt();
                                                res.status(200);
                                                res.json({'token':token});
                                            }
                                            else
                                            {
                                                //if user is not found 
                                                res.status(401).json({'authMessage' : req.flash('loginMessage')});
                                            }     
                                    })(req,res,next);
                            }
            );

    app.post('/api/signup', function(req,res, next)
                                {
                                passport.authenticate( 'local-signup', 
                                    function(err, user, info) 
                                    {
                                            var token;

                                            if(err) 
                                            {
                                                res.status(404).json(err);
                                                return;
                                            }

                                            //if a user is found
                                            if(user) 
                                            {
                                                token = user.GenerateJwt();
                                                res.status(200);
                                                res.json({'token':token});
                                            }
                                            else
                                            {
                                                //if user is not found 
                                                res.status(401).json({'authMessage' : req.flash('signupMessage')});
                                            }     
                                    })(req,res,next);
                                    
                                }
            );


	// route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };

