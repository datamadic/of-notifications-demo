wins = [];
apps = [];

var numApps = 1,
    child, app;

var child_count = 0;

function  lcb(fn, ctx, args) {
    args = args || [];
    fn.apply(ctx, args.concat([console.log.bind(console, 'success') ,console.log.bind(console, 'fail')]));
}

var id = Math.random();

var idHTML = document.getElementById('id');
idHTML.innerHTML = id;

var r = true;
function util(){
    fin.desktop.Window.wrap('parent', 'parent')[r? 'minimize':'restore'](); r = !r;
}



window.addEventListener('DOMContentLoaded', function(){

    function jitter(){
        var left = false;
        var me = fin.desktop.Window.getCurrent();
        setInterval(function(){
            if (left) {
                me.moveTo(0,0);
                left = false;
            } else {
                me.moveTo(10,10);
                left = true;
            }
        }, 1000);
    }

    var buttons = document.getElementById('buttons');
    [makeBadWindow,
     four04win,
     make404app,
     sameapp,
     samewin,
     makeBadApp,
     makeBadNote].forEach(function(fn){
         var b = document.createElement('button');
         var action = fn.toString().slice(fn.toString().indexOf(' '), fn.toString().indexOf('{'))
         b.setAttribute('onclick', action);
         b.appendChild(document.createTextNode(action))
         buttons.appendChild(b);
    });
});

// window.addEventListener('DOMContentLoaded', function () {
//    console.log('DOMContentLoaded');
// });

fin.desktop.main(function() {

    // var focus = true;

    // if (window.name === fin.desktop.Window.getCurrent().uuid)
    // setInterval(function(){
    //     fin.desktop.Window.getCurrent()[focus ? 'blur' : 'focus']();
    //     focus = !focus;
    // }, 500);

    /*
     var pop = fin.desktop.Window.wrap('parent', 'parent');
     setInterval(function(){
         fin.desktop.Window.getCurrent()[focus ? 'minimize' : 'restore']();
         focus = !focus;
     }, 2000);

     */

    // setInterval(function(){
    //     fin.desktop.Window.getCurrent()[focus ? 'minimize' : 'restore']();
    //     focus = !focus;
    // }, 1000);

    // if (window.name === "child") {
    //     setTimeout(function(){
    //         location.href = location.href;
    //     }, 700);
    // }

    console.log('hey there, main just finished');
    //is the the cause of a crash?!?!
    //YES, looks like the preload script runs w/o the url loaded
    a = fin.desktop.Window.getCurrent();
    // a.show();
    // fin.desktop.System.showDeveloperTools(a.uuid, a.name);

    var name = document.getElementById('name');
    var uuid = document.getElementById('uuid');

    name.innerHTML = a.name;
    uuid.innerHTML = a.uuid;

    fin.desktop.System.getVersion(function(v) {
        document.getElementById('version').innerHTML = v;
    });

    fin.desktop.InterApplicationBus.publish('im-ready', 'IM READY');
});

// a = fin.desktop.Window.getCurrent();
// a.show(function(){console.log('success'),(){console.log('non-main fail')} });

function getSearchVals() {
    return location.search
        .slice(1)
        .split('&')
        .map(function(parts)  {
            var vals = parts.split('=');
            return {key: vals[0], value: vals[1]};
        });
}

function makeBadWindow(){
    badWin = new fin.desktop.Window(
        {
            name: 'bad-win' + Math.random(),
            url: 'http://this_asdf_KJHHIsdf234r&IUYGT&is a bad url',
            autoShow: true
        },
        function(s){
            console.log('the success called', s);
        },
        function(r,e){
            console.warn('there was an error!!', r, e);
        });
}


// var noteTest = new fin.desktop.Notification({
//     url: 'http://cdn.openfin.co/jsdocs/stable/'
// });


function four04win(){
    badWin = new fin.desktop.Window(
        {
            name: 'bad-win' + Math.random(),
            // url: 'http://local:5000/whatever',
            _url: 'https://github.com/openfin/this-not-a-real-url-and-never-should-be-12345',
            __url: 'https://github.com/openfin',
            url: 'http://call-cc.org/this-does-not-exist',
            autoShow: true
        },
        function(s){
            console.log('the success called', s);
        },
        function(e){
            console.warn('there was an error!!', e);
        });
}



function makeaboutblank() {

    child = new fin.desktop.Window({
        name: child_count ? 'child' + child_count : 'child', // ''+Math.random(),
        url: 'about:blank', // location.href, 
        autoShow: true,
        modal: true
    }, function(cb_return) {
        console.log('window create success', cb_return, child);
        console.log(child.contentWindow.document)
    });

    wins.push(child);

    ++child_count;
}


function makewin() {

    child = new fin.desktop.Window({
        name: child_count ? 'child' + child_count : 'child', // ''+Math.random(),
        url: location.href, // 'about:blank', // location.href, //'note.html',//location.href,
        autoShow: true,
        modal: true
    }, function(cb_return) {
        console.log('window create success', cb_return, child);
        console.log(child.contentWindow.document)
    });

    wins.push(child);

    ++child_count;
}


function makeapp() {
    app = new fin.desktop.Application({
        name: 'app' + numApps,
        url: location.href,
        uuid: 'app' + numApps,
        autoShow: true
    }, function (s,d ) {
        console.log('app success ', s,d );
    }, function (e,d) {
        console.log('app fail ', e, d);
    });

    ++numApps;
    apps.push(app);
    app.run(function (s,d ) {
        console.log('app success ', s,d );
    }, function (e,d) {
        console.log('app fail ', e, d);
    });
}

function make404app() {
    app = new fin.desktop.Application({
        name: 'app' + numApps,
        url: 'http://local:5000/whatever',
        uuid: 'app' + numApps,
        autoShow: true
    }, function (s, d) {
        console.log('app 404 success ', s,d);
    }, function (e,d) {
        console.log('app 404 fail ', e,d);
    });

    ++numApps;
    apps.push(app);
    app.run(function (s,d) {
        console.log('app 404 run success ', s,d);
    }, function (e,d) {
        console.log('app 404 run fail ', e,d);
    });
}





function sameapp() {
    app = new fin.desktop.Application({
        name: 'same',
        url: location.href,
        uuid: 'same',
        autoShow: true
    }, function(a,s){
        app.run();
        console.log('success',a, s);
    },function(a,s){
        console.log('fail', a, s);
    });
}

function samewin() {
    app = new fin.desktop.Window({
        name: 'same',
        url: location.href,
        // uuid: 'same',
        autoShow: true
    }, function(a,s){
        console.log('success',a, s);
    },function(a,s){
        console.log('fail', a, s);
    });
}



function makeBadApp() {
    app = new fin.desktop.Application({
        name: 'app' + numApps,
        url: 'http://this_asdf_KJHHIsdf234r&IUYGT&is a bad url',
        uuid: 'app' + numApps,
        autoShow: true
    }, function (s){
        console.log('app success', s);
    }, function (e){
        console.log('app fail', e);
    });

    ++numApps;
    apps.push(app);
    app.run(function (s) {
        console.log('app run success ', s);
    }, function (e, d) {
        console.log('app run fail ', e, d);
    });
}



function getAction(action) {
    var value;

    var actionMap = getSearchVals().filter(function(valMap) {
        return valMap.key === action;
    })[0];

    return actionMap && actionMap.value;
}

function maximize() {
    fin.desktop.Window.getCurrent().maximize();
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




// //child.addEventListener('blurred', function(){console.log('yes');})




// var same;

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

    var theUrl = noteurl.value  ||
            location.host === 'datamadic.github.io'? 'https://datamadic.github.io/of-notifications-demo/note.html' :  location.origin + '/note.html?a='+msgnum;

    console.log('should be..', theUrl);

    notification = new fin.desktop.Notification({

        url: theUrl,
        // || 'http://local:8080/foo'
        // url: noteurl.value ||  'https://datamadic.github.io/of-notifications-demo/note.html',
        message: notemsg.value || msgnum++,
        ignoreMouseOver: true,
        onClick: function(e) {
            console.log("clicked - holy crap", e);
        },
        onClose: function(e) {
            console.log("closed", e);
        },
        onDismiss: function(e) {
            console.log("dismissed");
        },
        onError: function(reason, eobj) {
            console.log("error: " + reason, eobj);
        },
        onMessage: function(message) {
            console.log("are you fucking kidding me?!: ", message);
            fromnote.innerHTML = message.toString();
        },
        onShow: function(successObj) {
            console.log("shown", successObj);
        },
        timeout: notetimeout.value? notetimeout.value * 1000 :  5000
    }, function(){
        console.log('so that worked');
    }, function() {
        console.log('so that failed');
    });

}

function makeBadNote() {

    notification = new fin.desktop.Notification({

        url: 'http://this_asdf_KJHHIsdf234r&IUYGT&is a bad url',
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
        onError: function(reason, eobj) {
            console.log("error: " + reason, eobj);
        },
        onMessage: function(message) {
            console.log("are you fucking kidding me?!: ", message);
            fromnote.innerHTML = message.toString();
        },
        onShow: function() {
            console.log("shown");
        },
        timeout: notetimeout.value? notetimeout.value * 1000 :  5000
    }, function(s){
        console.log('note success ', s);
    }, function(e) {
        console.log('note failed', e);
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

function minimize () {
    fin.desktop.Window.getCurrent().minimize();
}

function laRicarda(){};

window.chica = new laRicarda();
function createNNotes(n) {
    var interval;
    var counter = 0;
    n = n || 40;

    var interval = setInterval(function() {
        var note = new fin.desktop.Notification({
            // url: 'about:blank',
            url: location.href,
            onClose: function() {
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

// setInterval(function(){
//     var t = 1000000;
//     var arr = [];

//     while (t--) arr.push({
//         something: Math.random()
//     });

//     var str = JSON.stringify(arr);

// }, 30);

// setInterval(function(){
//     if (window.opener) {
//         window.opener.console.log('Im here');
//     }
// }, 2000)

function createNWindows(n) {
    var interval;
    var counter = 0;
    n = n || 40;

    var interval = setInterval(function() {

        var note = new fin.desktop.Window({
            url: 'about:blank',
            name: Math.random() + '',
            autoShow: true
        }, function() {
            note.close();
        });

        ++counter;

        if (counter >= n) {
            clearInterval(interval);
        }

        console.log('%d created', counter);

    }, 1000);
}
/*

var c = new fin.desktop.Window({
    name: ''+Math.random(),
    url: 'about:blank',
    autoShow: true
});

*/

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

// function(completionCallback) {

//     fin.desktop.InterApplicationBus.subscribe('*', 'will-reload', function getNoteLengths(){
//         fin.desktop.InterApplicationBus.unsubscribe('*', 'will-reload', getNoteLengths);
//         setTimeout(function(){
//             getCurrNotes(function(notes){
//                 console.log('these are the notes..', notes);
//             });
//         }, 5000);

//     });

//     var parentWin = utils.createWindow({
//         name: 'parentWin',
//         // url: location.href,
//         code: "console.log('RAN');\
//     new fin.desktop.Notification({\
//     url: 'https://datamadic.github.io/of-notifications-demo/note.html',\
//     timeout: 3 * 60 * 1000,\
//     onShow: function() {\
//    console.log('SHOWN!!!');\
//    fin.desktop.InterApplicationBus.publish('will-reload', true);\
//         location.href = location.href;\
//     }});"
//     }, function(){console.log('CREATED');});


//     function windowIsNotification(name) {
//         const noteGuidRegex = /^A21B62E0-16B1-4B10-8BE3-BBB6B489D862/;

//         return noteGuidRegex.test(name);
//     }
//     function getCurrNotes (cb) {
//         return fin.desktop.System.getAllWindows(function(winds){
//             cb(winds.reduce(function (prev, currApp) {
//                 var childWindows = currApp.childWindows;
//                 var childrenAsIdentities = childWindowsAsIdentities(childWindows, currApp.uuid);
//                 return prev.concat(childrenAsIdentities);
//             }, []));

//         });

//     }

//     function childWindowsAsIdentities(childWindows, appUuid) {
//         return childWindows
//             .filter(function (win) {windowIsNotification(win.name)})
//             .map(function (win) {

//                 return {
//                     name: win.name,
//                     uuid: appUuid,
//                 };
//             });
//     }


// }

/*\
 new fin.desktop.Notification({\
 url: 'https://datamadic.github.io/of-notifications-demo/note.html',\
 timeout: 3 * 60 * 1000,\
 onShow: function() {\
 console.log('SHOWN!!!');\
 fin.desktop.InterApplicationBus.publish('will-reload', true);\
 location.href = location.href + '?created=1';\
 }});} \
 */

// function whatever() {
//     var that = 123;
//     console.log("something");
// }

// whatever.toString()





// function(completionCallback) {

//     var hasReloaded = false;
//     var evalFunctionString = runInChildWin.toString();
//     var execInChild = evalFunctionString.slice(evalFunctionString.indexOf('{') + 1, -1);



//     fin.desktop.InterApplicationBus.subscribe('*', 'will-reload', function getNoteLengths(){
//         // fin.desktop.InterApplicationBus.unsubscribe('*', 'will-reload', getNoteLengths);

//         // give 2 sec for the reloaded windoe
//         setTimeout(function(){
//             getCurrNotes(function(notes){
//                 console.log('these are the notes..', notes);
//                 completionCallback(notes.length === 0);
//             });
//         }, 2000)

//     });


//     var parentWin = utils.createWindow({
//         name: 'parentWin',
//         code: execInChild
//     }, function(){console.log('CREATED');});


//     function runInChildWin () {
//         if (!window.opener.hasReloaded) {
//            var note = new fin.desktop.Notification({
//                 timeout: 3 * 60 * 1000,
//                 url: 'about:blank',
//                 onShow: function(){
//                     fin.desktop.InterApplicationBus.publish('will-reload', true);
//                     location.href = location.href;
//                 }
//             });
//             window.opener.hasReloaded = true;
//         }

//     }



//     function windowIsNotification(name) {
//         const noteGuidRegex = /^A21B62E0-16B1-4B10-8BE3-BBB6B489D862/;

//         return noteGuidRegex.test(name);
//     }


//     function getCurrNotes (cb) {
//         return fin.desktop.System.getAllWindows(function(winds){
//             cb(winds.reduce(function (prev, currApp) {
//                 var childWindows = currApp.childWindows;
//                 var childrenAsIdentities = childWindowsAsIdentities(childWindows, currApp.uuid);
//                 return prev.concat(childrenAsIdentities);
//             }, []));

//         });

//     }

//     function childWindowsAsIdentities(childWindows, appUuid) {
//         return childWindows
//             .filter(function (win) {windowIsNotification(win.name)})
//             .map(function (win) {

//                 return {
//                     name: win.name,
//                     uuid: appUuid,
//                 };
//             });
//     }


// }
/*
fin.desktop.System.getAllWindows(function(wins){
    console.log(wins);
})

fin.desktop.System.getAllWindows(function(wins){
    console.log(wins.map(w=>w.childWindows.map(cw=>cw.name).join('  ')));
})
 */



// var evalFunctionString = runInChildWin.toString();
// var execInChild = evalFunctionString.slice(evalFunctionString.indexOf('{') + 1, -1);

// window.hasReloaded = false;

// fin.desktop.InterApplicationBus.subscribe('*', 'parent-reloaded', function getNoteLengths(){
//     var noteExists = false;

//     // give the note time to spin down
//     setTimeout(function(){

//         getCurrNotes(function(notes){
//             var notesLeft = notes.length;

//             if (notesLeft) {
//                 notes.forEach(function(note){
//                     fin.desktop.Window.wrap(note.uuid, note.name)
//                         .isShowing(function(showing){
//                             --notesLeft;

//                             if (showing) {
//                                 completionCallback(false);
//                             }

//                             if (!notesLeft) {
//                                 completionCallback(true);
//                             }
//                         })
//                 })

//             } else {
//                 completionCallback(true);
//             }

//         });
//     },2000)

// });

// utils.createWindow({
//     name: 'parentWin',
//     code: execInChild
// });


// function runInChildWin () {

//     if (!window.opener.hasReloaded) {

//         new fin.desktop.Notification({
//             timeout: 3 * 60 * 1000,
//             url: 'https://datamadic.github.io/of-notifications-demo/note.html',
//             onShow: function(){

//                 location.href = location.href;
//             }
//         });

//         window.opener.hasReloaded = true;

//     } else {
//         fin.desktop.InterApplicationBus.publish('parent-reloaded', true);
//     }

// }

// function windowIsNotification(name, uuid) {
//     var noteGuidRegex = /^A21B62E0-16B1-4B10-8BE3-BBB6B489D862/;
//     var isNotificationV6 = noteGuidRegex.test(name);
//     var isNotificationv5 = uuid === 'service:notifications';
//     var isNotQueueCounter = name !== 'queueCounter';
//     var isNotification = isNotQueueCounter && ( isNotificationV6 || isNotificationv5);

//     return isNotification;
// }


// function getCurrNotes (cb) {
//     return fin.desktop.System.getAllWindows(function(winds){

//         cb(winds.reduce(function (prev, currApp) {
//             var childWindows = currApp.childWindows;
//             var childrenAsIdentities = childWindowsAsIdentities(childWindows, currApp.uuid);
//             return prev.concat(childrenAsIdentities);
//         }, []));

//     });

// }

// function childWindowsAsIdentities(childWindows, appUuid) {

//     return childWindows
//         .filter(function (win) {return windowIsNotification(win.name, appUuid)})
//         .map(function (win) {

//             return {
//                 name: win.name,
//                 uuid: appUuid,
//             };
//         });
// }

 
// fin.desktop.Window.getCurrent().moveTo(0, 200)


var u = document.getElementById('uuid');
u.addEventListener('click', function(e){
    console.log(e);
    console.log(this);
});


// function make() {
//     var a = new fin.desktop.Window({
//         name: 'asdf' + Math.random(),
//         url: location.href,
//         autoShow: true
//     }, function(){
//         console.log('we in here ');
//         // setTimeout(function(){
//         // },500);
//     });

//     setTimeout(function(){
//         a.close();
//     },2000);
// }


// for (var i = 0; i < 20; i++) {
//     console.log('sdfasdf');
//     // make()
// }
/*
 fin.desktop.Window.getCurrent().updateOptions({opacity: 1})
 */
// fin.desktop.InterApplicationBus.subscribe('*', 'asdf', function(){
//     var me = fin.desktop.Window.getCurrent().name;
//     console.log('this is my name...', me);
// })
// fin.desktop.InterApplicationBus.publish('asdf', 'asdf');
// var i = document.createElement('iframe')
// i.setAttribute('width', 500); i.setAttribute('height', 500); i.setAttribute('src', location.href);
// document.body.appendChild(i)
// winesap apples

