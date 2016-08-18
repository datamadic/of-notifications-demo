// var a;

window.addEventListener('DOMContentLoaded', function(){
    // fin.desktop.Window.getCurrent().getOptions(function (options)  {
    //     const {name} = options;

    //     console.log('this is my name USERLAND', options, name);
    //     window.here = "asdfasdf" + Math.random();
    // })
});


fin.desktop.main(function() {

    console.log('hey there, main just finished');
    //is the the cause of a crash?!?!
    //YES, looks like the preload script runs w/o the url loaded
    a = fin.desktop.Window.getCurrent();
    a.show();

    var name = document.getElementById('name');
    var uuid = document.getElementById('uuid');

    name.innerHTML = a.name;
    uuid.innerHTML = a.uuid;

    fin.desktop.System.getVersion(function(v) {
        document.getElementById('version').innerHTML = v;
    });
		
    fin.desktop.InterApplicationBus.publish('im-ready', 'IM READY');
});

function getSearchVals() {
		return location.search
				.slice(1)
				.split('&')
				.map(function(parts)  {
						var vals = parts.split('=');
						return {key: vals[0], value: vals[1]};
				});
}

function getAction(action) {
		var value;
		
		var actionMap = getSearchVals().filter(function(valMap) {
				return valMap.key === action;
		})[0];

		return actionMap && actionMap.value;
}

function minimize() {
    fin.desktop.Window.getCurrent().minimize();
}

function maximize() {
    fin.desktop.Window.getCurrent().maximize();
}

function restore() {
    fin.desktop.Window.getCurrent().restore();
}

var listener = function d() { console.log('ive listened', d); };

var topic = document.getElementById('topic');
var data = document.getElementById('data');
var sendtoUuid = document.getElementById('sendto-uuid');
var sendtoName = document.getElementById('sendto-name');

var topicsub = document.getElementById('topic-sub');
var namesub = document.getElementById('name-sub');
var uuidsub = document.getElementById('uuid-sub');
var subresult = document.getElementById('subresult');

function publish() {
    fin.desktop.InterApplicationBus.publish(topic.value, data.value);
}

function send() {
    fin.desktop.InterApplicationBus.send(sendtoUuid.value, sendtoName.value, topic.value, data.value);
}

var ls = function(data, uuid) {
    subresult.value += data + ' \t ' + uuid + '\n';
}

function subscribe() {
    fin.desktop.InterApplicationBus.subscribe(uuidsub.value || '*', namesub.value, topicsub.value, ls);
}


wins = [];
apps = [];

var numApps = 1,
    child, app;

var child_count = 0;

function makewin() {
    child = new fin.desktop.Window({
        name: child_count ? 'child' + child_count : 'child', // ''+Math.random(),
        url: location.href, //'note.html',//location.href,
        autoShow: true
    }, function() {
        console.log('this is the child here', child);
       // child.contentWindow.logit()
    });

    wins.push(child);

    ++child_count;

}

// //child.addEventListener('blurred', function(){console.log('yes');})


function makeapp() {
    app = new fin.desktop.Application({
        name: 'app' + numApps,
        url: location.href,
        uuid: 'app' + numApps,
        autoShow: true
    });

    ++numApps;
    apps.push(app);
    app.run();
}


// var same;

function sameapp() {
    app = new fin.desktop.Application({
        name: 'same',
        url: location.href,
        uuid: 'same',
        autoShow: true
    });
}


function showDev() {
    fin.desktop.System.showDeveloperTools(a.uuid, a.name);
}


var notemsg = document.getElementById('notemsg')
var noteurl = document.getElementById('noteurl')
var notetimeout = document.getElementById('notetimeout')
var tonote = document.getElementById('tonote')
var fromnote = document.getElementById('fromnote')

function sendtonote() {
    notification.sendMessage(tonote.value || Date.now());
}

var msgnum = 1;

function note() {

    notification = new fin.desktop.Notification({

        url: noteurl.value  || location.origin + '/note.html?a='+msgnum,
				// || 'http://local:8080/foo' 
        // url: noteurl.value ||  'https://datamadic.github.io/of-notifications-demo/note.html',
        message: notemsg.value || msgnum++,
				ignoreMouseOver: true,
        onClick: function(e) {
            console.log("clicked - holy crap", e);
        },
        onClose: function() {
            console.log("closed");
        },
        onDismiss: function() {
            console.log("dismissed");
        },
        onError: function(reason) {
            console.log("error: " + reason);
        },
        onMessage: function(message) {
            console.log("are you fucking kidding me?!: ", message);
            fromnote.innerHTML = message.toString()
        },
        onShow: function() {
            console.log("shown");
        },
        timeout: notetimeout.value? notetimeout.value * 1000 :  5000
    }, function(){
				console.log('so that worked');
		}, function() {
				console.log('so that failed');
		});

}

function launch_hof_canary(){

		fin.desktop.System.getEnvironmentVariable("USERNAME",function (variable) {

		fin.desktop.System.launchExternalProcess({
        path: 'C:\\Users\\'+variable+'\\AppData\\Local\\OpenFin\\OpenFinRVM.exe',
        arguments: '--config="http://demoappdirectory.openf.in/desktop/config/apps/OpenFin/HelloOpenFin/canary.json"',
        listener: function(code) {
                console.log('the exit code', code);
            }
    },
    function() {
        console.log('all good');
    },
    function(){
        console.log('an error');
    });
				
		});
}


function laRicarda(){};

window.chica = new laRicarda();

function createNNotes (n) {
		var interval;
		var counter = 0;
		n = n || 40;
		
		var interval = setInterval(function(){
				var note = new fin.desktop.Notification({
						// url: 'about:blank',
						url: location.href,
						onClose: function(){
								note = null;
						}
				});

				if (counter >= n) {
						clearInterval(interval);
				}
				
				++counter;
				console.log('%d created', counter);
				
		}, 1000);
}

function createNWindows(n) {
		var interval;
		var counter = 0;
		n = n || 40;
		
		var interval = setInterval(function(){
				var note = new fin.desktop.Window({
						url: 'about:blank',
						name: Math.random()+'',
						autoShow: true
				}, function (){
						note.close();
				});

				++counter;
				
				if (counter >= n) {
						clearInterval(interval);
				}
				
				console.log('%d created', counter);
				
		}, 1000);
}

//   var cllistner = function(e){console.log(e.type)};
//   var colistner = function(e){console.log(e.type)};
//   var stlistner = function(e){console.log(e.type)};
//   var rrlistner = function(e){console.log(e.type)};

//   var rap = fin.desktop.Application.wrap('app1');
//   rap.addEventListener('closed',cllistner);
//   rap.addEventListener('connected',colistner);
//   rap.addEventListener('started',stlistner);
//   rap.addEventListener('run-requested',rrlistner);


//     var b = new fin.desktop.Window({url: './note.html', autoShow: true, name: 'bob'});

//     b.addEventListener('close-requested', function(e){console.log('DO IT',e);});

//     child.addEventListener('close-requested', function(e){
//         console.log('DO IT', e)
//         });

//     var kid = fin.desktop.Window.wrap('parent', 'child');

//     kid.addEventListener('minimized', ()=>{console.log('mini me');});
//     kid.addEventListener('connected', ()=>{console.log('CONNECTED');});
//     kid.addEventListener('dom-content-loaded', ()=>{console.log('CONNECTED');});

//     fin.desktop.System.getAllApplications(function(a){console.log(a)})

//     fin.desktop.System.getAllWindows(function(a){console.log(a)})

// /*
// var lsa = (a,b) => {console.log('addSubscribeListener ', a, b )}
// var lsr = (a,b) => {console.log('holy shit', a, b )}
// var lua = (a,b) => {console.log('addUnsubscribeListener', a, b )}
// var lur = (a,b) => {console.log('holy shit', a, b )}

// fin.desktop.InterApplicationBus.addSubscribeListener(lsa);
// fin.desktop.InterApplicationBus.addUnsubscribeListener(lua);
// fin.desktop.InterApplicationBus.removeSubscribeListener(lsa);
// fin.desktop.InterApplicationBus.removeUnsubscribeListener(lua);
// fin.desktop.InterApplicationBus.unsubscribe('parent','asdf', ls);

// // if ('serviceWorker' in navigator) {
// //  console.log('Service Worker is supported');
// //  navigator.serviceWorker.register('sw.js').then(function(reg) {
// //    console.log(':^)', reg);
// //    // TODO
// //  }).catch(function(err) {
// //    console.log(':^(', err);
// //  });
// // }
