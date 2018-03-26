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

function _getDueDate(dueDate) {
    switch (dueDate) {
        case 'upcoming':
        case 'u':
            return Date.now() + 7 * ONE_DAY_MSEC;
        case 'tomorrow':
        case 't':
            return Date.now() + ONE_DAY_MSEC;
        case 'someday':
        case 's':
            return null;
    }
}

function task({title, dueDate}) {
    // if dueDate is not defined
    // it will be set to today
    if (dueDate !== undefined) {
        if (typeof dueDate === 'string') {
            const shortcut = _getDueDate(dueDate);
            if (shortcut === undefined) {
                throw new Error('Due date shortcut was not found');
            } else {
                dueDate = shortcut;
            }
        }
    } else {
        dueDate = Date.now();
    }

    return {title, dueDate, id: _generateId()};
}

module.exports = task;