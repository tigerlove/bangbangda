
module.exports = {
    send: function(options) {
        var works = [];
        works.push(Notification.create({
            title: '回复了你的主题',
            type: 'reply',
            to_topic: options.to_topic,
            owner: options.topic_owner,
            to_reply: options.to_reply,
            author: options.author,
            content: options.to_reply.cotent
        }).catch(function(err) {
            console.log(err);
        }));
        _.each(options.users, function(u) {

            if (u.id != options.topic_owner) {
                works.push(Notification.create({
                    title: '提到了你,在主题',
                    type: 'metion',
                    to_topic: options.to_topic,
                    owner: u.id,
                    author: options.author,
                    to_reply: options.to_reply,
                    content: options.to_reply.cotent
                }).catch(function(err) {
                    console.log(err);
                }));


            }
            console.log('send notification to ' + u.username);

        });
        return works;

    }
}