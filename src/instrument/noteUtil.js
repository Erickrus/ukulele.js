function NoteUtil(){
	this.getNoteAlias = function (note) {
		if (note == "C#" || note == "Db" ) {
			return "C#/Db";
		}
		if (note == "D#" || note == "Eb" ) {
			return "D#/Eb";
		}
		if (note == "F#" || note == "Gb" ) {
			return "F#/Gb";
		}
		if (note == "G#" || note == "Ab" ) {
			return "G#/Ab";
		}
		if (note == "A#" || note == "Bb" ) {
			return "A#/Bb";
		}
		return note;
	}
}
var noteUtil = new NoteUtil();
