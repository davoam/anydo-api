const Api = require('./lib/api');

const api = new Api('your_email', 'your_password');

api.addTask({title: 'from api'})
    .then(() => api.sync())
    .then(res => {
        console.log(res.models.task.items.map(t => t.title))
    });

