module.exports = {
    attributes: {
        'content': 'string',
        // 'mentioned_user_id': {
        //     type: 'array',
        //     defaultsTo: []
        // },
        'upvote_ids': {
            type: 'array',
            defaultsTo: []
        },
        'reply_to': {
            type: 'string',
            defautsTo: ''
        },
        'to_topic': {
            model: 'topic'
        },
        'floors':{
            type:'string'
        },
        'owner': {
            model: 'user'
        }
    }
}