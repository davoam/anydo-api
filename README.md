# Any.do API (unofficial)
This API allows to list and add tasks and also get auth token

## Example
```js
const Api = require('./lib/api');

const api = new Api('your_email', 'your_password');

api.addTask({title: 'from api'})
    .then(() => api.sync())
    .then(res => {
        console.log(res.models.task.items.map(t => t.title))
    });
```

## CLI
[Any.DO CLI](https://github.com/davoam/anydo-cli)
