/**
 * @private
 * @return {number}
 */
function _getRandomValue() {
    return Math.random() * 256;
}
/**
 * @private
 * Generate id like anydo website does
 *
 * @return {string}
 */
function _generateId() {
    let id = "";
    for (let n = 0; n < 16; n++)
        id += String.fromCharCode(_getRandomValue());
    return Buffer.from(id).toString('base64').replace(/\//g, "_").replace(/\+/g, "-")

}

/**
 * Return task object
 *
 * It seems that minimal set of fields to add task in any.do
 * is [title, id, dueDate]
 *
 * @param {string} title
 * @param {number|string} dueDate
 * @return {{title: *, dueDate: number, id: string}}
 */

const ONE_DAY_MSEC = 60000 * 60 * 24;

const dueDateShortcuts  = {
    upcoming: Date.now() + 7 * ONE_DAY_MSEC,
    tomorrow: Date.now() + ONE_DAY_MSEC,
    someday: null
};

function task({title, dueDate}) {

    // if dueDate is not defined
    // it will be set to today
    if (dueDate) {
        if (typeof dueDate === 'string') {
            if (dueDateShortcuts[dueDate] === undefined) {
                throw new Error('Due date shortcut was not found');
            } else {
                dueDate = dueDateShortcuts[dueDate];
            }
        }
    } else {
        dueDate = Date.now();
    }

    return {title, dueDate, id: _generateId()};
}

module.exports = task;