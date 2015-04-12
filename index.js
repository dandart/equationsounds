function set(val) {
	document.getElementById('box').value = val;
}
var ctx = document.getElementById('canvas').getContext('2d');
AudioContext = window.AudioContext || window.webkitAudioContext ;
context = new AudioContext();
var buffer = context.createBuffer(2, 10000, 22050);

var HEIGHT = 600;
function line(x1,y1,x2,y2) {
	ctx.beginPath();
	ctx.moveTo(x1, HEIGHT/2 - y1);
	ctx.lineTo(x2, HEIGHT/2 - y2);
	ctx.stroke();
}
var oldx = 0;
var oldy = 0;

var ch0 = buffer.getChannelData(0);
var ch1 = buffer.getChannelData(1);

function go() {
var r = document.getElementById('box').value;

for (var x = 0; x <= 10000; x++) {
	var newx = x;
	var newy = eval(r);
	line(
		oldx, oldy*100,
		newx, newy*100
	);
	oldx = newx;
	oldy = newy;
	ch0[x] = newy;
	ch1[x] = newy;
}
var source = context.createBufferSource();
source.buffer = buffer;
source.connect(context.destination);
source.start(0);

}