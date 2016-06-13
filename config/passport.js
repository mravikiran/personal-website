//config/passport.js


var localStrategy = require('passport-local').Strategy


var User = require('../app/models/user')


module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
                                done(null, user.id);
    }
    );
        
    passport.deserializeUser(function(id, done) {
                                User.findById(id, function(err,user) {
                                done(err, user);
                                }
                                );
    }
    );


    passport.use('local-signup', new localStrategy({
                            usernameField : 'email',        
                            passReqToCallback : true
                        },
                        function(req, email, password, done) {
                                console.log("Verify Callback");                                                                                                   

                            process.nextTick( function(){
                            

                                console.log("Next Ticking");                                                                        
                                User.findOne({'email':email}, function(err, user){

                                    if(err)
                                    {
                                        console.log("Some db error");                                        
                                        return done(err);
                                    }
                                    if(user) 
                                    {
                                        console.log("email is already taken");                                                                                
                                         return done(null, false, req.flash('signupMessage', 'That email is already taken.'));       
                                    }
                                    else
                                    {
                                        console.log("User not found so creating a new user");
                                        var newUser = new User();

                                        newUser.email = email;
                                        newUser.SetPassword(password);
                                        newUser.name = req.body.name;

                                        newUser.save(function(err) {
                                            if (err)
                                                throw err;
                                            return done(null, newUser);
                                        });

                                    }
                                });
                            }
                            );

                        }




            )
        );

    passport.use('local-login', new localStrategy({

                                usernameField : 'email',
                                passReqToCallback : true
                        },
                        function(req, email, password, done) {
                             // find a user whose email is the same as the forms email
                             // we are checking to see if the user trying to login already exists
                                User.findOne({ 'email' :  email }, function(err, user) {
                                // if there are any errors, return the error before anything else
                                if (err)
                                    return done(err);

                                // if no user is found, return the message
                                if (!user)
                                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                                 // if the user is found but the password is wrong
                                if (!user.ValidPassword(password))
                                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                                // all is well, return successful user
                                return done(null, user);


                            });

                        }




            )
        );


    }

