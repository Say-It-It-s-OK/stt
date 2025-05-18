require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sttRouter = require("./routes/stt");
const ttsRouter = require("./routes/tts");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/stt", sttRouter);
app.use("/tts", ttsRouter);

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`✅ STT 서버 실행 중: http://localhost:${PORT}`);
});
