# Any.do API (unofficial)
This API allows to list and add tasks and also get auth token

## Installation
```bash
npm install anydo-api
```
## Example
```js
const Api = require('anydo-api');

const api = new Api('your_email', 'your_password');

const tasks = [
    {title: 'from api today'},
    {title: 'from api tomorrow', dueDate: 'tomorrow'},
    {title: 'from api upcoming', dueDate: 'upcoming'},
    {title: 'from api someday', dueDate: null},
    {title: 'from api to category', categoryId: 'youtCategoryId'}
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
* [Api](#Api)
    * [.login(options)](#Api+login) ⇒ <code>Promise</code>
    * [.sync([options])](#Api+sync) ⇒ <code>Promise</code>
    * [.setToken(token)](#Api+setToken) ⇒ <code>Promise</code>
    * [.addTask(options)](#Api+addTask) ⇒ <code>Promise</code>
    * [.addTasks(tasks)](#Api+addTasks) ⇒ <code>Promise</code>
    * [.deleteTask(object)](#Api+deleteTask) ⇒ <code>Promise</code>

<a name="Api+login"></a>

### api.login(options) ⇒ <code>Promise</code>
Get auth token

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.email | <code>string</code> | 
| options.password | <code>string</code> | 

<a name="Api+sync"></a>

### api.sync([options]) ⇒ <code>Promise</code>
Sync tasks
If it is invoked without options, it just returns all
undone and not deleted tasks

| Param | Type |
| --- | --- |
| [options] | <code>object</code> | 
| [options.updateSince] | <code>number</code> | 
| [options.includeDone] | <code>boolean</code> | 
| [options.includeDeleted] | <code>boolean</code> | 
| [options.models] | <code>object</code> | 

<a name="Api+setToken"></a>

### api.setToken(token) ⇒ <code>Promise</code>
Set token for current API instance

| Param | Type |
| --- | --- |
| token | <code>object</code> | 
| token.token | <code>string</code> | 

<a name="Api+addTask"></a>

### api.addTask(options) ⇒ <code>Promise</code>
Add new task

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.title | <code>string</code> | 
| [options.dueDate] | <code>number</code> \| <code>string</code> | 

<a name="Api+addTasks"></a>

### api.addTasks(tasks) ⇒ <code>Promise</code>
Add several tasks at once

| Param | Type |
| --- | --- |
| tasks | <code>Array.&lt;object&gt;</code> | 
| tasks[].title | <code>string</code> | 
| [tasks[].dueDate] | <code>number</code> \| <code>string</code> | 

<a name="Api+deleteTask"></a>

### api.deleteTask(object) ⇒ <code>Promise</code>
Delete task

| Param | Type |
| --- | --- |
| object | <code>object</code> | 
| object.taskId | <code>string</code> | 



## CLI
[Any.DO CLI](https://github.com/davoam/anydo-cli)
