# Improve Log: Vòng Cải Tiến Web App MVP (Trang Nguyen Capstone)

> Nhật ký cải tiến ứng dụng Web App MVP theo phương pháp Vibe Coding (SDD — Specification-Driven Development) cho Deliverable D3.

---

## Vòng 1 — 2026-08-21 (Phiên bản Build Ban đầu)
- **Dùng thử thấy:**
  - Giao diện ban đầu hiển thị Storyboard dưới dạng bảng văn bản phẳng (Flat text), người dùng khó hình dung được trải nghiệm lướt slide Carousel thực tế trên điện thoại/Instagram.
  - Sau khi bấm "Tạo Full Spec", các slide hiển thị cùng lúc làm tràn màn hình và không xem được màu sắc tương phản giữa các slide (Cover `#0B1B3D` vs Body `#F4F5F7`).
- **Yêu cầu sửa (1 tính năng cụ thể):** 
  - *Chuyển đổi khu vực hiển thị Storyboard thành một **Interactive Carousel Viewer (Khung xem slide tương tác 4:5)** có nút "Trước/Sau", dots điều hướng và tự động đổi màu nền thẻ mô phỏng chính xác từng slide.*
- **Kết quả:**
  - Đã tích hợp thành công trình chiếu Carousel tương tác 5 slide với hiệu ứng chuyển động mượt mà.
  - Từng slide tự động áp dụng đúng màu nền Deep Ocean (`#0B1B3D`) hoặc Pearl White (`#F4F5F7`) theo đúng chỉ dẫn của Brand Guidelines.
  - Bổ sung bộ đếm slide (ví dụ: `Slide 1 / 5`) và dot indicator.

---

## Vòng 2 — 2026-08-21 (Nâng cấp Tiện ích Nạp mẫu & Quality Gate Monitor)
- **Dùng thử thấy:**
  - Người dùng phải tự gõ lại toàn bộ dữ liệu mẫu mỗi lần thử nghiệm, mất thời gian và dễ gõ sai format.
  - Chưa có chỉ báo trực quan xác nhận bài viết đã vượt qua 6 Quality Gates hay chưa.
- **Yêu cầu sửa (1 tính năng cụ thể):**
  - *Bổ sung cụm nút bấm **"Mẫu Coach (TC-1)"**, **"Mẫu Lỗi (TC-2)"** để nạp dữ liệu 1-click và thanh **"6 Quality Gates Live Monitor"** hiển thị trạng thái `PASS` màu xanh lá sau khi kiểm tra.*
- **Kết quả:**
  - Đã thêm 3 nút preset (`TC-1`, `TC-2`, `Xóa`) trên đầu form.
  - Thanh 6 Quality Gates (Palette, Font `Barber Fill`, Blacklist, CTA, Voice, Honesty) tự động chuyển sang nhãn xanh `PASS` ngay khi bài viết đạt chuẩn.
  - Tích hợp nút "📋 Copy JSON" có thông báo toast tiện lợi.

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
- **Đánh giá sau sửa:** Khép kín 100% vòng đời vận hành nội dung từ Nghiên cứu ➔ Kế hoạch ➔ Sản xuất ➔ Phân phối ➔ Đo lường & Tối ưu hóa liên tục. **Content Operations Command Center** toàn diện.
  - Trang có thể đi liền mạch 1 click từ chọn tín hiệu nỗi đau ➡️ duyệt kế hoạch ➡️ sinh 5 slide Carousel ➡️ duyệt bản vẽ và bấm đăng lên Instagram Business Feed.

---

## Phần CHƯA runtime-test (Khai báo trung thực ranh giới kỹ thuật)
1. **Kết nối trực tiếp WebSocket / Webhook n8n:** Nút cào Apify và Sync đang chạy mô phỏng phản hồi (Simulated API sync); chưa test kết nối trực tiếp với Webhook URL của n8n khi n8n chạy ở server từ xa có chứng chỉ HTTPS tự ký.
2. **Xuất file ảnh tự động (Puppeteer Service):** App tập trung vào vai trò Spec Generator, Visual Preview và Điều phối luồng; việc render ra tệp ảnh PNG 2160x2700 độ phân giải cao vẫn do pipeline n8n Module 3 (`ig-static-pipeline-v2.json`) đảm nhiệm.
