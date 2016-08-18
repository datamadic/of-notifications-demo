var fs = require('fs');

var app_json = require('./app.json');
var dest = process.argv[2];

switch (dest) {
case 'mac':
		console.log('setting url to ', app_json['startup_app']['url-mac'])
		app_json['startup_app'].url = app_json['startup_app']['url-mac'];
		fs.writeFileSync('./app.json', JSON.stringify(app_json, null, ' '));
		break;

case 'remote':
		console.log('setting url to ', app_json['startup_app']['url-remote'])
		app_json['startup_app'].url = app_json['startup_app']['url-remote'];
		fs.writeFileSync('./app.json', JSON.stringify(app_json, null, ' '));
		break;
default: break;
}
