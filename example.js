const Api = require('anydo-api');

const api = new Api('your_email', 'your_password');

const tasks = [
    {title: 'from api today'},
    {title: 'from api tomorrow', dueDate: 'tomorrow'},
    {title: 'from api upcoming', dueDate: 'upcoming'},
    {title: 'from api someday', dueDate: null},
];

// create then delete tasks
api.addTasks(tasks)
    .then(() => api.sync())
    .then(res => {
        const titlesToFind = tasks.map(t => t.title);
        const filteredList = res.models.task.items.filter(t => titlesToFind.includes(t.title));

        console.log(filteredList.length);

        filteredList.forEach(t => api.deleteTask({taskId: t.id}));
    });
