# FlowBook 📒

ระบบบัญชีส่วนตัว บันทึกรายรับรายจ่าย อ่านสลิปธนาคาร

## วิธี Deploy ขึ้น GitHub Pages (ทำครั้งเดียว)

### ขั้นที่ 1 — สร้าง Repository ใหม่
1. ไปที่ github.com/new
2. ตั้งชื่อ repo เช่น `flowbook`
3. เลือก **Public**
4. กด **Create repository**

### ขั้นที่ 2 — อัปโหลดไฟล์
อัปโหลดไฟล์ทั้งหมดเหล่านี้เข้า repo:
- `cashflow_tracker.html`
- `manifest.json`
- `sw.js`
- `icon-192.png`
- `icon-512.png`

> วิธีง่ายที่สุด: ลากไฟล์ทั้ง 5 วางในหน้า repo ได้เลย

### ขั้นที่ 3 — เปิด GitHub Pages
1. เข้าไปที่ **Settings** ของ repo
2. เลื่อนลงหา **Pages** (เมนูซ้าย)
3. Source → เลือก **Deploy from a branch**
4. Branch → เลือก **main** / root
5. กด **Save**

### ขั้นที่ 4 — เข้าใช้งาน
รอประมาณ 1-2 นาที แล้วเปิด:
```
https://[username].github.io/flowbook/cashflow_tracker.html
```

### ขั้นที่ 5 — ติดตั้งเป็น App บนโทรศัพท์

**Android (Chrome):**
- เปิด URL ในข้อ 4
- กด ⋮ (เมนู 3 จุด)
- เลือก **"Add to Home screen"** หรือ **"Install app"**

**iPhone (Safari):**
- เปิด URL ในข้อ 4 ใน Safari เท่านั้น
- กด 📤 (ปุ่ม Share)
- เลือก **"Add to Home Screen"**

---

## ไฟล์ในโปรเจกต์

| ไฟล์ | คำอธิบาย |
|------|----------|
| `cashflow_tracker.html` | แอปหลัก |
| `manifest.json` | ข้อมูล PWA (ชื่อ ไอคอน สี) |
| `sw.js` | Service Worker สำหรับใช้ offline |
| `icon-192.png` | ไอคอนแอป 192x192 |
| `icon-512.png` | ไอคอนแอป 512x512 |
