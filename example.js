const Api = require('anydo-api');

const api = new Api('your_email', 'your_password');

api.addTasks([
        {title: 'from api today'},
        {title: 'from api tomorrow', dueDate: 'tomorrow'},
        {title: 'from api upcoming', dueDate: 'upcoming'},
        {title: 'from api someday', dueDate: null},
    ])
    .then(() => api.sync())
    .then(res => {
        console.log(res.models.task.items.map(t => t.title))
    });

