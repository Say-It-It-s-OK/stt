const speech = require("@google-cloud/speech");
const fs = require("fs");

const client = new speech.SpeechClient();

const transcribeAudio = async (filePath) => {
    const audioBytes = fs.readFileSync(filePath).toString("base64");

    const audio = {
        content: audioBytes,
    };

    const config = {
        encoding: "WEBM_OPUS",
        sampleRateHertz: 48000,
        languageCode: "ko-KR",
    };

    const request = {
        audio,
        config,
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
        .map((result) => result.alternatives[0].transcript)
        .join("\n");

    console.log("📝 인식된 텍스트:", transcription);

    return transcription;
};

module.exports = transcribeAudio;
