module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  '*': 'read_cookie',

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
  SessionController: {
    'destroy':'require_login'
  },
  // UserController:{
  //   'create':'require_not_login',
  //   'new': 'require_not_login'
  // },
  'Setting/profileController':{
    '*':['read_cookie','require_login']
  },
    'Admin/dashboardController':{
        '*':['read_cookie','require_login','require_admin']
    },
  'TopicController':{
    'create':['read_cookie','require_login'],
    'new':['read_cookie','require_login'],
    'update':['read_cookie','require_login'],
    'upvote':['read_cookie','require_login'],
    'unupvote':['read_cookie','require_login'],
    'edit':['read_cookie','require_login'],
    'index':['read_cookie']
  },
  'HomepageController':{
    'index':['read_cookie']
  },
  'PeopleController':{
      'show':['read_cookie']
  }
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
