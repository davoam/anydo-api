function getRandomValue() {
    return Math.random() * 256;
}
/**
 * Generate id like anydo website does
 *
 * @return {string}
 */
function generateId() {
    var id = "";
    for (var n = 0; n < 16; n++)
        id += String.fromCharCode(getRandomValue());
    return Buffer.from(id).toString('base64').replace(/\//g, "_").replace(/\+/g, "-")

}

/**
 * Return task object
 *
 * It seems that minimal set of fields to add task in any.do
 * is [title, id, dueDate]
 *
 * @param {string} title
 * @param {number} dueDate
 * @return {{title: *, dueDate: number, id: string}}
 */
function task({title, dueDate = Date.now()}) {
    return {title, dueDate, id: generateId()};
}

module.exports = task;