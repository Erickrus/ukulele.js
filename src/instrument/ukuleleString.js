
/* A Ukulele String */
function UkuleleString(pos, ukulele) {
	this.pos = pos;
	this.ukulele = ukulele;
	this.currentSoundId = -1;
	this.sounds = [];
	this.init = function() {
		var waveNames = Object.keys(waves);
		var stringWaveNames = this.ukulele.classic.wavNames;
		for (var i=0;i<stringWaveNames.length;i++) {
			var currWaveName = stringWaveNames[i][this.pos];
			if (waveNames.indexOf(currWaveName)>=0) {
				var sound = new Sound(waves[currWaveName]);
				sound.snd.pos = this.pos;
				sound.snd.addEventListener('ended', function () {
					ukulele.strings[this.pos].currentSoundId=-1;
					ukulele.strings[this.pos].onStringStop();
					}
				);
				this.sounds.push(sound);
			} else {
				this.sounds.push(null);
			}
		}
	}
	this.onStringStart = function() {
		console.log("String"+this.pos+" starts");
	};
	this.onStringStop = function() {
		console.log("String"+this.pos+" stops");
	};
	this.play = function(soundId) {
		if (soundId>=0) {
			if (this.currentSoundId != -1) {
				this.sounds[this.currentSoundId].stop();
				this.sounds[this.currentSoundId].currentTime = 0;
			}
			
			this.sounds[soundId].currentTime = 0;
			this.sounds[soundId].play();
			this.currentSoundId = soundId;
			this.onStringStart();
		} else {
			this.currentSoundId = -1;
		}
	};
	this.stop = function() {
		if (this.currentSoundId != -1) {
			this.sounds[this.currentSoundId].stop();
			this.sounds[this.currentSoundId].currentTime = 0;
		}
		this.currentSoundId = -1;
	};
};

