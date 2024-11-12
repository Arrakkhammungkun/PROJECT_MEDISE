const studentModel = require('../src/studentModel');
const key = '123456789trytrytry'; // คีย์สำหรับการเข้ารหัส
const encryptor = require('simple-encryptor')(key);
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

router.post('/login', async (req, res) => {
    console.log("Incoming request:", req.body);
    const { email, password } = req.body;

    try {
        const user = await studentModel.findOne({ email });

        if (!user || user.role !== 'admin') {
            return res.status(401).json({ message: 'ไม่พบผู้ใช้ หรือไม่ใช่แอดมิน' });
        }

        const decryptedPassword = encryptor.decrypt(user.password); // ถอดรหัสรหัสผ่าน

        if (password !== decryptedPassword) {
            return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send('เกิดข้อผิดพลาดในการล็อกอิน');
    }
});

module.exports = router;
