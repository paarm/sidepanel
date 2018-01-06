var restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}
function respond_account(req, res, next) {
    res.send({
        id: req.params.id,
        params: req._url.query}
    );
}
function respond_account_new(req, res, next) {
    res.send('Konto '+req.params.accountName+" wurde angelegt. ID: 4711");
}

var server = restify.createServer();
server.use(restify.plugins.requestLogger());
server.use(restify.plugins.queryParser());
server.get('/hello/:name', respond);
server.get('/login', (req, res, next)=> {
    if (req.query.name==='Martin Paar' && req.query.password==='1234') {
        res.send({
            name: req.query.name,
            sessionid: Math.random()}
        );
    } else {
        res.send({
            error: 'Login failed'
        })
    }
});
server.get('/account/:id', respond_account);
server.post('/account/new/:accountName', respond_account_new);
server.get('/.*/', restify.plugins.serveStatic(
    {
        directory: 'static',
        default: 'index.html'
    })
);
//server.head('/hello/:name', respond);


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});