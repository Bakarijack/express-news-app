const main = require('./lib/handlers/main')

module.exports = app => {
    app.get('/',main.home);

    app.get('/signup', main.signupPageRender);

    app.post('/api/signup/process', main.signupProcess);

    app.get('/login', main.loginRender);
}