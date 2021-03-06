String.prototype.replaceAll = function(search, replacement) {
	// https://stackoverflow.com/a/17606289
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
function getCookie(cname) {
	// https://www.w3schools.com/js/js_cookies.asp
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "0";
}
ivls = []
function interval(a, b) {
	ivls=ivls.concat(setInterval(a,b));
}
function clearIntervals() {
	for(i=0;i<ivls.length;++i)
		clearInterval(ivls[i]);
}
best_sc = getCookie('best');
points = 0;
SPACE=32;
LEFT=37;
RIGHT=39;
UP=38;
HEIGHT=10;
WIDTH=20;
started=false;
elements=[];
pos=0;
function onLoad(){
	body  = document.getElementById('body');
	title = document.getElementById('title');
	scene = document.getElementById('scene');
	best  = document.getElementById('best');
	p     = document.getElementById('p');
	hint  = document.getElementById('hint');
	b     = document.getElementById('buttons');
	animation();
}
function animation(){
	setTimeout(function(){title.innerHTML = 'SPACER v0.0';},1000);
	setTimeout(function(){scene.innerHTML = 'Loading...'; },4000);
	setTimeout(function(){scene.innerHTML = 'Loading..';  },5000);
	setTimeout(function(){scene.innerHTML = 'Loading.';   },6000);
	setTimeout(function(){scene.innerHTML = 'Loading';    },7000);
	setTimeout(function(){scene.innerHTML = 'Loading...'; },8000);
	setTimeout(function(){scene.innerHTML = 'Loading..';  },9000);
	setTimeout(function(){scene.innerHTML = 'Loading.';   },10000);
	setTimeout(function(){scene.innerHTML = 'Loading';    },11000);
	setTimeout(function(){mainMenu();},12000);
}
function notification(){if(started)return;scene.innerHTML = "To start a game, press [SPACE].";setTimeout(notificatioN,1000);}
function notificatioN(){if(started)return;scene.innerHTML = " ";setTimeout(notification,1000);}
function mainMenu(){
	b.style = 'visibility: hidden';
	best.innerHTML = 'Your best score is '+best_sc+'.';
	p.innerHTML = '';
	scene.onclick = startGame;
	started = false;
	notification();
	body.onkeydown=function(e){
		if(!e.metaKey){e.preventDefault();}
		switch(e.keyCode){
			case SPACE: if(!started)startGame(); break;
			case LEFT:  turnLeft();              break;
			case RIGHT: turnRight();             break;
			case UP:    shoot();                 break;
			case 68:    best_sc=0;               break;
			default: e.preventDefault();         break;
		}
		if(started)
			setScene();
	}
}
function turnLeft(){  pos=(WIDTH+pos-1)%WIDTH;if(started)setScene(); }
function turnRight(){ pos=(WIDTH+pos+1)%WIDTH;if(started)setScene(); }
function shoot(){}
function startGame(){
	b.style = '';
	scene.onclick = null;
	started=true;
	clearIntervals();
	scene.innerHTML = '';
	best.innerHTML = '';
	hint.innerHTML = '<span>Use your arrow keys on your keyboard to move.</span>';
	setScene();
	interval(mainLoop,1000);
	elements=[];
	interval(randomPoint,3000);
}
function setScene() {
	if(started)
		p.innerHTML = points;
	arr = Array(HEIGHT);
	for(i=0;i<arr.length;++i)
		arr[i]=Array(WIDTH).fill(' ').concat('\r\n');
	for(i=0;i<elements.length;++i)
		arr[elements[i].y][elements[i].x] = elements[i].t;
	arr[HEIGHT-1][pos]='@';
	scene.innerHTML = arr.toString().replaceAll(',','');
}
function shift() {
	for(i=0;i<elements.length;++i) {
		elements[i].y += 1;
		if(elements[i].y>=HEIGHT-1) {
			if(elements[i].x==pos) points += 1;
			else gameOver();
			elements.splice(i,1);
			--i; // because next element is now in place of deleted element
		}
	}
}
function randomPoint(){
	elements=elements.concat({y:0,x:Math.floor((Math.random() * (WIDTH-1))),t:'X'});
}
function mainLoop(){
	shift();
	setScene();
}
function gameOver(){
	started=false;
	setScene();
	hint.innerHTML = '';
	alert('Game over!');
	clearIntervals();
	if(points>best_sc)best_sc=points;
	document.cookie = "best="+best_sc;
	points=0;
	mainMenu();
}
