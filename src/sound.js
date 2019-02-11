/*
var Sound = (function () {
    var df = document.createDocumentFragment();
    return function Sound(src) {
        var snd = new Audio(src);
        df.appendChild(snd); // keep in fragment until finished playing
        snd.addEventListener('ended', function () {df.removeChild(snd);});
        snd.play();
        return snd;
    }
}());

*/
var Sound = function(src) {
	this.elem = document.createDocumentFragment();
	this.src = src;
	this.snd = new Audio(src);
	this.elem.appendChild(this.snd);
	this.play = function() {
		this.snd.currentTime = 0;
		this.snd.play();
	};
	this.stop = function() {
		this.snd.pause();
		this.snd.currentTime = 0;
	};
};
