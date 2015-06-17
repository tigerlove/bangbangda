module.exports = {
    attributes: {
        'username': {
            type: 'string',
            unique: true
        },
        'displayname': {
            type: 'string',
            unique: true
        },
        'email': {
            type: 'email',
            unique: true
        },
        'password': 'string',
        'url':'string',
        'description':'string',

        'topics':{
            collection:'topic',
            via:'owner'
        },
        'notifications':{
            collection:'notification',
            via:'owner'
        },
        'avatar':{
            type:'string'
        },
        'replies':{
            collection:'reply',
            via:'owner'
        }
    }
};