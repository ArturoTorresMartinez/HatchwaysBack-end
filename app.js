const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const graphqlHttp = require('express-graphql');
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolver");
const cors = require('cors');
const app = express();

//Enabling cors from all origins!
app.use(cors());
//Parser to help me read the body of the requests!
app.use(bodyParser.json());

// //Small hi for you guys when entering the (hopefully) landing page of the front end!
// app.get('/hellohatch', (req, res, next) => {
//     res.json({ msg: "Hello you guys over at Hatchways!" })
// });

//configuring my graphQL options with graphiql for GUI and little error handler!
app.use("/graphql", graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err) {
        if (!err.originalError) {
            return err;
        }
        const data = err.originalError.data;
        const message = err.message || "An error occured";
        const code = err.originalError.code || 500;
        return { message: message, status: code, data: data };
    }
}));

//General error handler!
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});


//Connecting with mongo database with newUrlParser and FindAndModify options so the console stops sending warnings!
const MONGODB_URI = "mongodb+srv://arthur:poq7283ipod@cluster0-e7jon.mongodb.net/assessment?retryWrites=true";
mongoose.connect(MONGODB_URI, { useFindAndModify: false, useNewUrlParser: true }).then(result => {
    //Just making sure it runs on the service provider intended port or 3000!
    app.listen(process.env.PORT || 3000);
    console.log('Listening to port 3000!');
}).catch(err => console.log(err));
