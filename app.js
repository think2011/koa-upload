var app       = require('koa')(),
    os        = require('os'),
    bodyParse = require('koa-better-body'),
    cors      = require('koa-cors');

app.use(cors());

app.use(bodyParse({
    multipart: true
}));

app.use(function *(next) {
    if (this.request.method === 'POST') {

    }
});

app.listen(3000);
console.log('working on the 3000');