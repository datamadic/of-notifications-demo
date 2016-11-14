window.addEventListener('load', fin.desktop.main.bind(null, init));

function init(){

}

function onNotificationMessage(msg){
  console.log('got', msg);
		document.getElementById('msg').innerHTML = JSON.stringify(msg);
}

// (function(){
//   var dt = document.getElementById('date');
//   dt.innerHTML = new Date();
// }())

fin.desktop.main(function(){
    var name = document.getElementById('name');
    name.innerHTML = fin.desktop.Window.getCurrent().name;

		var unSub = fin.desktop.Notification.getCurrent().setMessageHandler(function (msg){
				console.log(msg);
		});

    // var note = fin.desktop.Notification.getCurrent();
    // note.setMessageHandler(function(a){
    //     console.log('the this and the that', a);
    // });



		// To unhook
		// unSub();

});

function closeme() {
    var note = fin.desktop.Notification.getCurrent();

    note.close();
}

function sendmsg() {
    var note = fin.desktop.Notification.getCurrent();

    note.sendMessageToApplication('heres the thing... ' +
                                  Date.now(),
                                  function(){console.log('called', arguments)});
    /*
        note.sendMessageToApplication("whatever man", function(){console.log('called', arguments)})
     */
}

//setInterval(()=>{document.getElementById('msg').innerHTML = Math.random();}, 300);

