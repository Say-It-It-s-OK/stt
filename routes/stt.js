const express = require("express");
const multer = require("multer");
const transcribeAudio = require("../googleSTT");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/", upload.single("audio"), async (req, res) => {
    try {
        const transcript = await transcribeAudio(req.file.path);
        res.json({ transcript });
    } catch (error) {
        console.error("❌ STT 오류:", error);
        res.status(500).json({ error: "STT 실패" });
    }
});

module.exports = router;
