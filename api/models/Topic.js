module.exports = {
    attributes: {
        'title': 'string',
        'content': 'string',
        'tags': 'string',
        'upvote_ids': {
            type: 'array',
            defaultsTo: []
        },
 
        'owner': {
            model: 'user'
        },
        'replies': {
            collection: 'reply',
            via: 'to_topic'
        },
        'top': {
            type:'boolean',
            defaultsTo:false
        }
    }
}