# Any.do API (unofficial)
This API allows to list and add tasks and also get auth token

## Installation
```bash
npm install anydo-api
```
## Example
```js
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
```

## Methods

### api.setToken(token) ⇒ <code>Promise</code>
Set token for current API instance

| Param | Type |
| --- | --- |
| token | <code>object</code> | 
| token.token | <code>string</code> | 

<a name="Api+addTask"></a>

### api.addTask(options) ⇒ <code>Promise.&lt;T&gt;</code>
Add new task

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.title | <code>string</code> | 
| [options.dueDate] | <code>number</code> \| <code>string</code> | 

<a name="Api+addTasks"></a>

### api.addTasks(tasks) ⇒ <code>Promise.&lt;T&gt;</code>
Add several tasks at once

| Param | Type |
| --- | --- |
| tasks | <code>Array.&lt;object&gt;</code> | 
| tasks[].title | <code>string</code> | 
| [tasks[].dueDate] | <code>number</code> \| <code>string</code> | 

<a name="Api+deleteTask"></a>

### api.deleteTask(object)
Delete task

| Param | Type |
| --- | --- |
| object | <code>object</code> | 
| object.taskId | <code>string</code> | 


## CLI
[Any.DO CLI](https://github.com/davoam/anydo-cli)
