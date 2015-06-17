module.exports.routes = {

    'get /admin/topics/:id/edit': 'Admin/DashboardController.topicedit',
    'post /admin/topics/:id/update': 'Admin/DashboardController.topicupdate',
    'delete /admin/topics/:id/delete': "Admin/DashboardController.topicdestroy",
    'post /admin/topics/:id/top': "Admin/DashboardController.topictop",
    'get /admin/topics': 'Admin/DashboardController.topics',


	'get /signup': 'UserController.new',
	'post /signup': {
        controller:'UserController',
        action:'create'
    },

	'get /login': 'SessionController.new',
	'get /logout': 'SessionController.destroy',
	'post /login': {
        controller:'SessionController',
        action:'create'
    },
	
	'get /setting/password': 'Setting/passwordController.show',
	'post /setting/password/update': 'Setting/passwordController.update',

	'get /setting/profile': 'Setting/profileController.show',
	'post /setting/profile/update': 'Setting/profileController.update',

  	'post /avatar': 'Setting/AvatarController.uploadAvatar',
    'get /avatar/edit': 'Setting/AvatarController.edit',
    'get /avatar/:id':'Setting/AvatarController.avatar',
    'get /uploadimageshow':'UploadController.show',
    'post /uploadimage':'UploadController.uploadimage',
    'get /img/:id':'UploadController.images',


    'delete /topics/:id/delete': "TopicController.destroy",
	'get /topics/new': 'TopicController.new',
	'get /topics/:id/edit': 'TopicController.edit',
	'post /topics/:id/update': 'TopicController.update',
	'get /topics/:id/unlike': 'TopicController.unlike',
	'get /topics/:id/like': 'TopicController.like',

	'get /topics/:id': 'TopicController.show',
    
	'post /topics': 'TopicController.create',

    'get /~:username/topics':'PeopleController.show',
	'get /~:username':'PeopleController.show',
	'get /':'HomepageController.index',
	'get /topics': 'HomepageController.index',
    'get /counttag': 'HomepageController.counttag',

    'get /reply/:id/edit':'ReplyController.edit',
    'post /reply/:id/update':'ReplyController.update',
    'get /reply/:id/unlike':'ReplyController.unlike',
    'get /reply/:id/like':'ReplyController.like',
	'get /reply': 'ReplayController.show',
    'post /reply': 'ReplyController.create',
    'delete /reply/:id/delete': 'ReplyController.destroy',

	'get /notifications': 'NotificationController.index',
	'get /notification/:id/read':'NotificationController.read',
	'delete /notification/:id/delete': 'NotificationController.destroy'


};