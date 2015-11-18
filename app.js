var app       = require('koa')(),
    coFs      = require('co-fs'),
    fs        = require('fs'),
    path      = require('path'),
    bodyParse = require('koa-better-body'),
    cors      = require('koa-cors');

var port     = process.env.PORT || 4000,
    demoFile = path.join(__dirname, 'demo.jpg');

app.use(cors());

app.use(bodyParse({
    multipart: true
}));

app.use(function *(next) {
    if (this.request.method === 'GET') {
        this.type = 'jpg';
        this.body = yield coFs.readFile(demoFile);
    }

    yield next;
});

app.use(function *(next) {
    if (this.request.method === 'POST') {
        var file    = this.request.body.files.file,
            demoSrc = 'http://' + path.join(this.req.headers.host, `demo.jpg?${Date.now()}`);

        if (+this.request.body.fields.fileLen !== file.size) {
            this.status = 403;
            return this.body = {msg: '传输数据大小校验不一致, 请重试'};
        }

        this.body = yield new Promise((resolve, reject) => {
            fs
                .createReadStream(file.path)
                .pipe(fs.createWriteStream(demoFile))
                .on('finish', function () {
                    resolve({
                        mtime: file.mtime,
                        name : file.name,
                        size : file.size,
                        type : file.type,
                        src  : demoSrc
                    });
                });
        });

        console.log(file, new Date());

        yield next;
    }
});

app.listen(port);
console.log(`working on the ${port}`);