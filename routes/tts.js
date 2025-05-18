const express = require("express");
const textToSpeech = require("@google-cloud/text-to-speech");

const router = express.Router();
const client = new textToSpeech.TextToSpeechClient();

router.post("/", async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({ error: "텍스트가 비어 있습니다" });
        }

        const request = {
            input: { text },
            voice: {
                languageCode: "ko-KR",
                name: "ko-KR-Wavenet-B",
                ssmlGender: "FEMALE",
            },
            audioConfig: {
                audioEncoding: "MP3",
                speakingRate: 1.0,
                pitch: 3.0,
                volumeGainDb: 0.0,
            },
        };

        const [response] = await client.synthesizeSpeech(request);

        res.set({
            "Content-Type": "audio/mpeg",
            "Content-Length": response.audioContent.length,
        });

        res.send(response.audioContent);
    } catch (error) {
        console.error("❌ TTS 오류:", error);
        res.status(500).json({ error: "TTS 실패" });
    }
});

module.exports = router;
