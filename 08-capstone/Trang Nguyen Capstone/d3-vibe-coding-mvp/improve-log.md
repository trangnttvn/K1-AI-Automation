# Improve Log — Vibe Coding MVP (Trang Nguyen Capstone D3)

Nhật ký ghi lại các vòng dùng thử thực tế, phát hiện vấn đề và cải tiến ứng dụng MVP theo chuẩn Vibe Coding.

---

## Vòng 1 — 2026-08-21 (Khởi Tạo & Khung Nghiệp Vụ Cơ Bản)
- **Dùng thử thấy:**
  - Giao diện ban đầu chỉ có form nhập liệu thô, output JSON dạng text đơn điệu, khó hình dung layout thực tế của bài đăng Carousel trên Instagram.
- **Yêu cầu sửa (1 tính năng cụ thể):**
  - *Tích hợp trình xem trước Carousel 5 slide tương tác (Interactive Slide Viewer) hiển thị đúng tỷ lệ 4:5, có nút chuyển slide (Next/Prev) và hệ thống chấm điểm 6 Quality Gates theo thời gian thực.*
- **Kết quả:**
  - Người dùng có thể xem trước nội dung trực quan từng slide với đúng phân bổ màu sắc Deep Ocean / Warm Champagne / Pearl White.

---

## Vòng 2 — 2026-08-21 (Cải Tiến Trải Nghiệm & Thao Tác Nhanh)
- **Dùng thử thấy:**
  - Mỗi lần kiểm thử phải gõ tay toàn bộ tiêu đề và insight thị trường rất mất thời gian; chưa có nút copy nhanh payload JSON để đẩy sang hệ thống khác.
- **Yêu cầu sửa (1 tính năng cụ thể):**
  - *Bổ sung 2 nút nạp mẫu dữ liệu nhanh 1-click: "✨ Nạp Mẫu TC-1" (Happy Path) và "⚠️ Mẫu Lỗi TC-2" (Bad Input); bổ sung nút "📋 Copy JSON" có thông báo Toast mượt mà.*
- **Kết quả:**
  - Tốc độ kiểm thử nghiệm thu giảm từ 2 phút xuống **1.5 giây**.
  - Thanh 6 Quality Gates (Palette, Font `Barber Fill`, Blacklist, CTA, Voice, Honesty) tự động chuyển sang nhãn xanh `PASS` ngay khi bài viết đạt chuẩn.

---

### Vòng 3 — Mở rộng toàn diện 4 Modules Pipeline (Intake ➔ Planning ➔ Production ➔ Distribution)
- **Vấn đề phát hiện:** Ban đầu MVP chỉ tập trung vào khâu sinh Full Spec (Module 2), chưa trực quan hóa trọn vẹn luồng từ nghiên cứu nỗi đau (Module 0) đến lập kế hoạch tuần (Module 1) và phân phối qua Meta API (Module 3).
- **Cải tiến thực hiện:**
  - Bổ sung thanh điều hướng **Pipeline Stepper** kết nối liên hoàn 4 module.
  - Xây dựng giao diện Module 0: Nạp Signals nghiên cứu từ Apify & Telegram OCR kèm cầu nối dịch vụ (*Service Bridge*).
  - Xây dựng Module 1: Thanh cân bằng 4 Content Pillars (40-30-20-10) và 3 Đề xuất tuần.
  - Xây dựng Module 3: Bản dựng khung hình Instagram Feed tỷ lệ 4:5 và Khóa an toàn Duyệt bài HITL (*Design approval: Approved*).
- **Đánh giá sau sửa:** Toàn bộ hệ thống hoạt động liền mạch từ đầu vào nghiên cứu thô đến đầu ra phân phối.

---

### Vòng 4 — Chuẩn hóa Notion SSOT Hub & Vòng Lặp Đánh Giá Tuần (Feedback Loop)
- **Vấn đề phát hiện:** Cần thể hiện rõ vai trò của Notion như một Trung tâm dữ liệu duy nhất (Single Source of Truth - SSOT) kết nối 3 Database theo từng `Content ID` cụ thể; đồng thời thiếu khâu đánh giá lại bài đăng hàng tuần để hiệu chỉnh workflow tuần kế tiếp.
- **Cải tiến thực hiện:**
  - **Notion SSOT Live Bar:** Bổ sung thanh trạng thái kết nối trực tiếp 3 Notion Database (`Research Signals 2daaa695`, `Weekly Editorial cf3ea4bf`, `Full Content Specs 87576ad4`).
  - **Quản lý theo Content ID:** Gắn mã định danh duy nhất (`IG-260821-FOCUS`) xuyên suốt từ lúc sinh spec đến khi lưu trữ Notion và xuất bản.
  - **Module 4 (Analytics & Continuous Calibration):** Xây dựng bảng KPI kéo số liệu thực tế từ Meta Graph API (Reach 14,850, Saves +62%, 48 DMs với từ khóa *"SYSTEM"*), bảng chấm điểm từng Content ID và **AI Adaptation Engine** tự động đề xuất hiệu chỉnh tỷ trọng Content Pillar tuần kế tiếp (tăng Pain lên 45%).
- **Đánh giá sau sửa:** Khép kín 100% vòng đời vận hành nội dung từ Nghiên cứu ➔ Kế hoạch ➔ Sản xuất ➔ Phân phối ➔ Đo lường & Tối ưu hóa liên tục.
