import base64
import sys
import json

def wav2json(filename):
    with open(filename, "rb") as wav_file:
        encodedStr = u"data:audio/wav;base64," + \
            base64.b64encode(wav_file.read()).decode('utf-8')
        return {"base64wav":encodedStr, "filename":filename}

jWav = wav2json(sys.argv[1])
print("waves['%s'] = '%s';\n" % (jWav["filename"].lower().replace(".wav",""), jWav["base64wav"]))

