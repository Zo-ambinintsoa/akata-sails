module.exports = {
    attributes: {

        project: {
            model: 'Projects',
            required: true
        },
        owner: {
            model: 'Users',
            required: true
        },
        title: {
            type: 'string',
            required: true,
            maxLength: 150,
            example: 'Make search engine'
        },
        body: {
            type: 'string',
            required: false
        },
    }
};