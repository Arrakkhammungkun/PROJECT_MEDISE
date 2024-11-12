const jwt = require('jsonwebtoken');
const secretKey = '4b7x9h!xk^e@2Zr'; 


module.exports = function authMiddleware(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ status: false, message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, secretKey); // ตรวจสอบ token
        req.user = decoded; // เก็บข้อมูล user จาก token ลง req.user
        next(); // ดำเนินการต่อไปยังฟังก์ชันถัดไป
    } catch (error) {
        res.status(400).send({ status: false, message: "Invalid token." });
    }
};
