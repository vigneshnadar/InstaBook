//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/insta-book'));


app.get('/*', function(req,res) {

    // res.sendFile(path.join('./dist/insta-book/index.html'));
    res.sendFile('index.html',{ root: './temp'});
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
