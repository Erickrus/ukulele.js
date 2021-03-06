function Ukulele() {
	this.chord = new UkuleleChord();
	this.classic = new UkuleleClassic();
    this.strings = [
		new UkuleleString(0, this),
		new UkuleleString(1, this),
		new UkuleleString(2, this),
		new UkuleleString(3, this)
	];
	this.init = function() {
		for (var i=0;i<4;i++) {
			this.strings[i].init();
		}
	};

	this.playAString = function(stringId, pos) {
		this.strings[stringId].play(12+pos);
	};
	
	// https://www.guitarinstructor.com/product/ukulele/bruno-mars/count-on-me/1000188417
	// ukulele.playChordScript("C~8 Em~8 Am~4 G~4 F~8 C~8 Em~8 Am~4 G~4 ")
	this.playChordScript = function(chordScript) {
		var chordNotes = chordScript.split(" ");
		var interval = 600;
		var afterPeriod = 0;
		var backward = false;
		
		for (var i=0;i<chordNotes.length;i++) {
			var chordNoteItems = chordNotes[i].split("~");
			var mode = "major";
			var chordName = chordNoteItems[0];
			
			var modeList = ["maj7", "m7", "7", "minor" ], modeAbrevList = ["maj7", "m7", "7", "m" ];
			for (var j=0;j<modeAbrevList.length;j++) {
				if (chordNoteItems[0].endsWith(modeAbrevList[j])) {
					mode = modeList[j];
					chordName = chordName.substring(0, chordName.length- modeAbrevList[j].length);
					break;
				}
			}
			
			// set default repetition
			var repetation = 1;
			if (chordNoteItems.length > 1) {
				repetation = parseInt(chordNoteItems[1]);
			}
			for (var j=0;j<repetation;j++) {
				setTimeout('ukulele.playChord("'+mode+'", "'+chordName+'", '+backward+')', afterPeriod);
				afterPeriod += interval;
			}
		}
	};
	
	this.playSimplifiedScript = function(simpScript) {
		var simpNotes = simpScript.split(" ");
		var noteTable = [];
		for (var i=0;i<simpNotes.length;i++) {
			if (simpNotes[i] != "") {
				var soundHead = "440";
				if (simpNotes[i].startsWith("-")) {
					soundHead = "220";
				} else if (simpNotes[i].startsWith("+")) {
					soundHead = "880";
				} else {
					soundHead = "440";
				}
				
				var tempo = 1;
				if (simpNotes[i].endsWith("=")) {
					tempo = 4;
					simpNotes[i] = simpNotes[i].substring(0, simpNotes[i].length-1);
				} else if (simpNotes[i].endsWith("-")) {
					tempo = 2;
					simpNotes[i] = simpNotes[i].substring(0, simpNotes[i].length-1);
				}
				
				var toneOffset = 0;
				if (simpNotes[i].endsWith("#")) {
					simpNotes[i] = simpNotes[i].substring(0, simpNotes[i].length-1);
					toneOffset = 1;
				} else if (simpNotes[i].endsWith("b")) {
					simpNotes[i] = simpNotes[i].substring(0, simpNotes[i].length-1);
					toneOffset = -1;
				}

				var tone = Math.abs(parseInt(simpNotes[i]));
				
				//C,Db,D,Eb,E,F,Gb,G,Ab,A,Bb,B
				switch(tone) {
				  case 1:
					tone = 0; break;
				  case 2:
					tone = 2; break;
				  case 3:
					tone = 4; break;
				  case 4:
					tone = 5; break;
				  case 5:
					tone = 7; break;
				  case 6:
					tone = 9; break;
				  case 7:
					tone = 11; break;
				}
				
				if (tone<=9) {
					tone = "0"+(tone+toneOffset);
				} else {
					tone = ""+(tone+toneOffset);
				}
				
				noteTable.push(soundHead+"_"+tone);
			}
		}
		var interval = 500;
		var afterPeriod = 0;
		
		for (var i=0;i<noteTable.length;i++) {
			var found = false;
			for (var j=0;j<this.classic.wavNames.length;j++) {
				for (var k=0;k<3;k++) {
					if (this.classic.wavNames[j][k]==noteTable[i]) {
						found= true;
						setTimeout('ukulele.strings['+k+'].play('+j+')', afterPeriod);
						afterPeriod += interval / tempo;
						break
					};
				}
				if (found) {
					break
				};
			}
			if (!found) {
				afterPeriod += interval;
			}
		}
	};

	this.playChord = function(mode, chordName, backward) {
		var interval = 60;
		var chordPos = this.chord.getSoundOffset(mode, chordName);
		if (backward == undefined || !backward) {
			setTimeout('ukulele.strings[0].play(12+'+chordPos[0]+')', interval*0);
			setTimeout('ukulele.strings[1].play(12+'+chordPos[1]+')', interval*1);
			setTimeout('ukulele.strings[2].play(12+'+chordPos[2]+')', interval*2);
			setTimeout('ukulele.strings[3].play(12+'+chordPos[3]+')', interval*3);
		} else {
			setTimeout('ukulele.strings[0].play(12+'+chordPos[0]+')', interval*3);
			setTimeout('ukulele.strings[1].play(12+'+chordPos[1]+')', interval*2);
			setTimeout('ukulele.strings[2].play(12+'+chordPos[2]+')', interval*1);
			setTimeout('ukulele.strings[3].play(12+'+chordPos[3]+')', 1);
		}
	};
}

var ukulele = new Ukulele();
