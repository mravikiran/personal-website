// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called

var Schema = mongoose.Schema;

var degreeSchema = { degree :  {
                                                        level : String,
                                                        name : String,
                                                        major : String,
                                                        minor : String,
                                                        start : String,
                                                        end : String,
                                                        institute : String,
                                                        gpa : String
                                  }
                    };

var candidateSchema = new Schema({
                                name : { type : String, default:''},
                                gender : String,
                                education : [degreeSchema],
                                summary : [String]
                        }
        );

module.exports = mongoose.model('Candidate', candidateSchema,'resumes');

