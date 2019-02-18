import base64
import sys
import json

def wav2json(filename):
    suffix = filename[-3:].lower()
    with open(filename, "rb") as wav_file:
        encodedStr = (u"data:audio/%s;base64," % suffix) + \
            base64.b64encode(wav_file.read()).decode('utf-8')
        return {"base64wav":encodedStr, "filename":filename}


jWav = wav2json(sys.argv[1])
suffix = sys.argv[1][-3:].lower()
print("waves['%s'] = '%s';\n" % (jWav["filename"].lower().replace("."+suffix,""), jWav["base64wav"]))

