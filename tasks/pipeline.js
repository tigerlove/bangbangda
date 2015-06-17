var cssFilesToInject = [
  'styles/highlight_js_github.css',
  'styles/bangbangda.css',
  'styles/font-awesome.css'
];

var jsFilesToInject = [
  'js/jquery.js',
  'js/jquery.timeago.js',
  'js/jquery.timeago.zh-CN.js',
  'js/bootstrap.js'
];

var templateFilesToInject = [
  'templates/**/*.html'
];

module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
