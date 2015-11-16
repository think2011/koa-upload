var app       = require('koa')(),
    fs        = require('co-fs'),
    path      = require('path'),
    bodyParse = require('koa-better-body'),
    cors      = require('koa-cors');

var port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParse({
    multipart: true
}));

app.use(function *() {
    if (this.request.method === 'POST') {
        var file    = this.request.body.files.file.path,
            newFile = path.join(__dirname, 'demo.jpg');

        //yield fs.createReadStream(file).pipe(fs.createWriteStream(newFile));

        this.type = 'jpg';
        this.body = yield fs.readFile();
    }
});

app.listen(port);
console.log(`working on the ${port}`);