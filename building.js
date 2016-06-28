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


    // TODO this has differing behavior in OF 5 vs 6
    // a.addEventListener('close-requested', function(data) {
    //     console.log('someone wants me to close.. ', data);
    //     fin.desktop.InterApplicationBus.publish('close-requested', data);
    // })


    // fin.desktop.InterApplicationBus.subscribe('*', 'close-requested', function(data)  {
    //     console.log('the close requested, IAB', data);
    // });

    fin.desktop.InterApplicationBus.publish('im-ready', 'IM READY');



});

// function getManifest() {
//     fin.desktop.Application.getCurrent().getManifest(function(d) {
//         console.log('sdf', d);
//     })
// };

// function launchExternalProcess() {
//     fin.desktop.System.launchExternalProcess('notepad',
//         '',
//         function() {
//             console.log('old success');
//         },
//         function() {
//             console.log('old fail');
//         });
// }

function minimize() {
    fin.desktop.Window.getCurrent().minimize();
}

function maximize() {
    fin.desktop.Window.getCurrent().maximize();
}

function restore() {
    fin.desktop.Window.getCurrent().restore();
}




var listener = function d() { console.log('ive listened', d) };

// // fin.desktop.InterApplicationBus.subscribe('app2', 'what', listener)

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

// var ls = function(data, uuid) {
//     subresult.value += data + ' \t ' + uuid + '\n';
// }

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
    // console.log(new Date());
    // new fin.desktop.Notification({message: 'waka waka', url: location.origin + '/note.html', timeout: 500000});


    notification = new fin.desktop.Notification({

        // url: noteurl.value ||  location.origin + '/note.html?a='+msgnum,
        url: noteurl.value ||  'https://datamadic.github.io/of-notifications-demo/note.html',
        message: notemsg.value || msgnum++,
        onClick: function(e) {
            // console.log("clicked - holy crap", e);
        },
        onClose: function() {
            // console.log("closed");
        },
        onDismiss: function() {
            // console.log("dismissed");
        },
        onError: function(reason) {
            console.log("error: " + reason);
        },
        onMessage: function(message) {
            console.log("are you fucking kidding me?!: ", message);
            fromnote.innerHTML = message.toString()
        },
        onShow: function() {
            // console.log("shown");
        },
        timeout: notetimeout.value? notetimeout.value * 1000 :  5000
    });

}

// function itHappened(data) {
//     var ih = document.getElementById('it-happened');
//     ih.innerHTML = ih.innerHTML + '.';
//     console.log('it sure did happen', data);
// }

// // if (!window.opener)
// // makewin();

// // if (!window.opener)
// // makewin();


// // var note = new fin.desktop.Notification({
// //   url: 'note.html',
// //   message: 'first',
// //   timeout: 20000
// // });


// // var me = fin.desktop.Window.getCurrent();

// // me.getOptions(opts=>{
// //    console.log(opts);


// // });

// // me.updateOptions({
// //    opacity: .6
// // });








//     var ch = new fin.desktop.Window({url: 'about:blank', name: 'asdf', autoShow: true});

//     ch.addEventListener('close-requested', (data)=>{console.log(data);});

//     var ch = new fin.desktop.Window.wrap('app1', 'app1');

//     ch.addEventListener('close-requested', (data)=>{console.log(JSON.stringify(data));});


// var app = fin.desktop.Application.getCurrent();

// app.getChildWindows(function(wnds) {
//   var numOfMatches = 0;



//   wnds.forEach(function(wnd) {
//     console.log('GOTCHA', wnd)
//   });

// });



// var app = fin.desktop.Application.getCurrent();

//     app.removeTrayIcon(
//         function() {
//           console.log('success');
//         },
//         function(error) {
//           console.log('big time fail');
//         }
//     );





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

//     var newApp = new fin.desktop.Application({url: 'about:blank',
//                                           name:'name',
//                                           uuid:'uuid',
//                                           autoShow: true
//                                          },
//                                          function(){
//                                              newApp.run();
//                                          });





// var e = (a,s,d)=>{console.log(a,s,d)}; fin.desktop.InterApplicationBus.subscribe('parent', 'asdf', e);






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


// fin.desktop.Window.getCurrent().addEventListener('focus', ()=>{console.log('asdf')});




//  */









// // window.addEventListener('load', function(){
// //  // var id = document.createElement('h3');

// //  // var remote = require('remote'),
// //   //     BrowserWindow = remote.BrowserWindow;

// //  // id.innerHTML = remote.getCurrentWindow().id;

// //  // document.body.appendChild(id);

// //   // fin.desktop.main(function(){
// //   //   var dr = document.getElementById('drag-region'),
// //   //       hiddenWin = new fin.desktop.Window({
// //   //         name: 'resize',
// //   //         url: 'resize.html',
// //   //         autoShow: false
// //   //       }, function(){
// //   //         fin.desktop.Window.getCurrent()
// //   //           .getBounds(function(bounds){
// //   //             hiddenWin.moveTo(bounds.left, bounds.top, function(){
// //   //               hiddenWin.joinGroup('o','o');
// //   //               hiddenWin.show();
// //   //             });
// //   //           });

// //   //       });

// //   //   dr.addEventListener('dragstart',function(){
// //   //     console.log('started');
// //   //   });

// //   //   dr.addEventListener('dragend',function(){
// //   //     console.log('stopped');
// //   //   });
// //   // })

// // });


// // var myWin = fin.desktop.Window.getCurrent();

// // fin.desktop.System.getMonitorInfo(function (monitorInfo) {
// //   var availableRect = monitorInfo.primaryMonitor.availableRect;
// //   myWin.animate({
// //     size: {
// //       height: availableRect.bottom - availableRect.top,
// //       duration: 0.3
// //     },
// //     position: {
// //       top: 0,
// //       duration: 0.3
// //     }
// //   });
// // });


// /*
//   var kid = fin.desktop.Window({
//   url: location.origin + '/test.html'
//   });
// */

// //setTimeout(function() {
// //    console.log('do it now');
// //    var a = fin.desktop.Window.getCurrent();
// //    console.log(a);
// //
// //    a.moveBy(10, 10);
// //
// //
// //}, 8000);
// //



// // NODE_NO_READLINE=1 node --harmony_arrow_functions































// //if (typeof fin !== 'undefined')
// // var version = document.querySelector('div');
// // //version.innerHTML =
// // // fin.desktop.getVersion();

// // var options = {
// //         target: 'notepad',
// //         arguments: '',
// //         listener: function() {
// //             console.log('closed');
// //         }
// //     },
// //     success = function() {
// //         console.log('success');
// //     },
// //     failure = function() {
// //         console.log('fail');
// //     };

// //fin.desktop.System.launchExternalProcess(options,'', success, failure);

// //  fin.desktop.System.launchExternalProcess('notepad', '', function(){console.log('old success');}, function(){console.log('old fail');});


// // setTimeout(function() {
// //     console.log('do it now');
// //     var a = fin.desktop.Window.getCurrent();
// //     console.log(a);

// //     a.moveBy(10, 10);


// // }, 30000);



// // var theApp = apps.filter(app=>{
// //   return app.win.filter(win=>{
// //     return win.id === id;
// //   }).length;
// // })[0];

// // theApp && theApp.id


// // {
// //  "action": "process-notification-event",
// //  "payload": {
// //   "payload": {
// //    "notificationId": 0
// //   },
// //   "type": "click"
// //  }
// // }


// // if ('serviceWorker' in navigator) {
// //  console.log('Service Worker is supported');
// //  navigator.serviceWorker.register('sw.js').then(function(reg) {
// //    console.log(':^)', reg);
// //    // TODO
// //  }).catch(function(err) {
// //    console.log(':^(', err);
// //  });
// // }
