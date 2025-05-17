const fs = require("fs");
const speech = require("@google-cloud/speech");

const client = new speech.SpeechClient({
    keyFilename: "google-key.json",
});

async function transcribeAudio(filePath) {
    const file = fs.readFileSync(filePath);
    const audioBytes = file.toString("base64");

    const audio = {
        content: audioBytes,
    };

    const config = {
        encoding: "WEBM_OPUS",
        sampleRateHertz: 48000,
        languageCode: "ko-KR",
    };

    const request = { audio, config };

    const [response] = await client.recognize(request);
    return response.results.map((r) => r.alternatives[0].transcript).join("\n");
}

module.exports = transcribeAudio;
