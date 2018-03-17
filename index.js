const _ = require('lodash');
const request = require('request-promise-native');
const syncSample = require('./lib/syncSample');
const task = require('./lib/Task');

const API_URL = 'https://sm-prod2.any.do';

class Api {
    constructor(email, password) {
        if (email && password) {
            this.login({email, password});
        }
    }

    /**
     * Get auth token
     *
     * @param {object} options
     * @param {string} options.email
     * @param {string} options.password
     * @return {PromiseLike<T> | Promise<T>}
     */
    login(options) {
        const {email, password} = options;
        this.loginPromise = request
            .post({
                uri: `${API_URL}/login`,
                body: {email, password},
                json: true
            })
            .then((response) => {
                this.authToken = response.auth_token;
                return this.authToken;
            });
        return this.loginPromise
    }

    /**
     * Sync tasks
     * If it is invoked without options, it just returns all
     * undone and not deleted tasks
     *
     * @param {object} [options]
     * @param {number} [options.updateSince]
     * @param {boolean} [options.includeDone]
     * @param {boolean} [options.includeDeleted]
     * @param {object} [options.models]
     * @return {Promise<T>}
     */
    sync(options) {
        options = options || {};

        const defaultOptions = {
            includeDone: false,
            includeDeleted: false,
            updateSince: 0,
            models: syncSample(false, false)
        };

        _.defaults(options, defaultOptions);

        return this.loginPromise
            .then(() => {
                return request.post({
                    uri: `${API_URL}/api/v2/me/sync?updatedSince=${options.updateSince}`,
                    headers: {
                        'X-Anydo-Auth': this.authToken,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({models: options.models}),
                })
                    .then(res => JSON.parse(res));
            })
    }

    /**
     * Set token for current API instance
     *
     * @param {object} token
     * @param {string} token.token
     * @return {Promise}
     */
    setToken({token}) {
        this.authToken = token;
        this.loginPromise = new Promise((resolve) => resolve(token));
        return this.loginPromise;
    }

    /**
     * Add new task
     *
     * @param {object} options
     * @param {string} options.title
     * @param {number|string} [options.dueDate]
     * @return {Promise<T>}
     */
    addTask(options) {
        const models = syncSample();
        models.task.items.push(task(options));
        return this.sync({models, updateSince: Date.now()});
    }

    /**
     * Add several tasks at once
     *
     * @param {object[]} tasks
     * @param {string} tasks[].title
     * @param {number|string} [tasks[].dueDate]
     * @return {Promise<T>}
     */
    addTasks(tasks) {
        const models = syncSample();
        models.task.items = tasks.map(t => task(t));
        return this.sync({models, updateSince: Date.now()})
    }
}

module.exports = Api;

