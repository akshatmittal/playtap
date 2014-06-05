document.addEventListener("keyup", start, false);
var flag = 0,
	count = 0,
	inTa = 10,
	i = inTa;
var pt = function () {
	this.time = 10;
	this.taps = 0;
};
window.onload = function () {
	var text = new pt();
	var gui = new dat.GUI();
	var gui1 = gui.addFolder('ZEN/Cheat Mode!')
	var c1 = gui1.add(text, 'time');
	var c2 = gui1.add(text, 'taps', 0, 10000).step(1);
	c1.onFinishChange(function (value) {
		zen.changeTime(value);
	});
	c2.onFinishChange(function (value) {
		zen.changeCount(value);
	});
};
$(document).ready(function () {
	$.ionSound({
		sounds: ["temple"],
		path: "sounds/",
		multiPlay: true,
		volume: "0.5"
	});
});

function reset() {
	flag = 0;
	i = inTa;
	count = 0;
	document.getElementById('presses').innerHTML = count;
	document.getElementById('mycounter').innerHTML = inTa + "s";
}

function start(e) {
	var keyCode = e.keyCode;
	if (keyCode == 32 && flag == 0) {
		flag = 1;
		document.getElementById("st").click();
	}
}

function startGame() {
	document.addEventListener("keyup", keyDownTextField, false);
}

function keyDownTextField(e) {
	var keyCode = e.keyCode;
	if (keyCode == 32 && i > 0) {
		count = count + 1;
		ga('send', 'event', 'Tap! Tap! Tap!', 'click');
		$("#presses")[0].innerHTML = count;
		animate();
		$.ionSound.play("temple");
	}
}

function onTimer() {
	i--;
	document.getElementById('mycounter').innerHTML = i + 's';
	if (i == 0) {
		$('#mycounter')[0].innerHTML = "Game Over!";
		$('.btn').removeClass('hide');
	} else {
		setTimeout(onTimer, 1000);
	}
}

function animate() {
	$('#presses').removeClass().addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
		$(this).removeClass();
	});
}
var zen = {};
zen.changeTime = function (t) {
	inTa = t;
	i = inTa;
	document.getElementById("mycounter").innerText = i + "s";
}
zen.share = function () {
	var url = "https://www.facebook.com/dialog/feed?app_id=235049906694588" +
		"&redirect_uri=http://akshatmittal.github.io/playtap/" +
		"&link=http://akshatmittal.github.io/playtap/" +
		"&caption=I made " + count + " taps in " + inTa + "s. Can you beat me?" +
		"&picture=http://akshatmittal.github.io/playtap/images/tap.png" +
		"&actions={name:'Playtap!',link:'http://akshatmittal.github.io/playtap/'}";
	window.open(url, '', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,height=600,width=1000');
}
zen.changeCount = function (c) {
	count = c;
	document.getElementById('presses').innerHTML = count;
}