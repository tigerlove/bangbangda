module.exports = {
    attributes: {
        'title':'string',
        'content': 'string',
        'type': 'string',
        'url': {
            type: 'string'
        },
        'to_topic': {
            model: 'topic'
        },
        'to_reply': {
            model: 'reply'
        },
        'owner': {
            model: 'user'
        },
        'author':{
            model:'user'
        },
        'read':{
            type:'boolean',
            defaultsTo:false
        }
    }
}