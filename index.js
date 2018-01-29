const Api = require('./lib/api');

const api = new Api('davstepanov@gmail.com', 'david8961');

api.addTask({title: 'from api'})
    .then(() => api.sync())
    .then(res => {
        // console.log(typeof res);
        console.log(res.models.task.items.map(t => t.title))
    });

// api.addTask({title: 'from api'});
