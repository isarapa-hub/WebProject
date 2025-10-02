const express = require("express");
const app = express();
const memberRoutes = require("./routes/member");
const cors = require('cors');
const path = require('path');

//  CORS ต้องมาก่อนทุกอย่าง
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ตรวจสอบ routing
app.use("/member", memberRoutes);

// เพิ่ม test route เพื่อตรวจสอบ
app.get("/test", (req, res) => {
    res.json({ message: "API is working!", timestamp: new Date() });
});

//  Error handling middleware
app.use((err, req, res, next) => {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => {
    console.log("🚀 Server is running at http://localhost:3000");
});

