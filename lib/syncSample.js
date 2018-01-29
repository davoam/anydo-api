module.exports = (includeDone, includeDeleted) => ({
    category: {
        items: []
    },
    task: {
        items: [],
        config: { includeDone, includeDeleted }
    },
    attachment: {
        items: []
    },
    sharedMember: {
        items: []
    },
    userNotification: {
        items: []
    },
    taskNotification: {
        items: []
    }
});