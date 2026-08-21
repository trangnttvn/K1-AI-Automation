# Spec Kit — All-in-One Content Operations Command Center (Trang Nguyen)

> Bộ đặc tả kỹ thuật rút gọn theo phương pháp SDD (Specification-Driven Development) cho ứng dụng Web App MVP 4 Modules của Trang Nguyen.

---

## 1. PRD Rút Gọn (Product Requirements Document)

- **Mục tiêu 1 câu:** Cung cấp một giao diện web trực quan, tinh gọn giúp Trang Nguyen (All-in-One Business Partner) kiểm soát toàn bộ chuỗi 4 Modules vận hành nội dung khép kín: từ khai phá tín hiệu thị trường (Intake), lập lịch tuần (Planning), sinh bản đặc tả kịch bản Carousel 5 slide (Production) đến dựng đồ họa và xuất bản Meta API (Distribution).
- **Phạm vi 4 Modules trong MVP:**
  1. **Module 0 — Intake & Research:**
     - Tích hợp dữ liệu cào Apify (FB Public Group ngày 1 hàng tháng) & nhận tin Telegram OCR Vision (FB Private Group theo yêu cầu).
     - Bảng hiển thị Research Signals đã khử PII, phân loại 6 Core Bottlenecks, cầu nối giải pháp dịch vụ của Trang.
  2. **Module 1 — Strategy & Planning (Dept-Content):**
     - Hiển thị tỷ lệ cân bằng 4 Content Pillars (40% Pain, 30% System, 20% Proof, 10% Trang).
     - Danh sách đề xuất tuần (Weekly Content Proposals) với nút nạp 1-click sang khâu sản xuất.
  3. **Module 2 — Content Spec Production (D1/D2 Core Engine):**
     - Form nạp chủ đề, bộ tạo Visceral-Parallel Hook, Storyboard 5 slide tương tác 4:5, bảng kiểm 6 Quality Gates Live Monitor, Copy JSON.
  4. **Module 3 — Visual Render & Distribution:**
     - Trình diễn bản dựng Mockup Instagram Feed 1080x1350 (Puppeteer Render simulation).
     - Chốt chặn an toàn HITL Approval Gate (`Design approval` = `Approved` / `Pending`).
     - Xuất bản trực tiếp lên Instagram Business qua Meta Graph API và nhận Post ID.

---

## 2. User Stories (4 Modules)

1. **Module 0 Story:** *Là Trang Nguyen,* tôi muốn duyệt nhanh các nỗi đau thực tế từ nhóm Facebook đã được AI phân loại và khử PII để chọn ra tín hiệu đắt giá nhất chỉ bằng 1 cú click.
2. **Module 1 Story:** *Là Trang Nguyen,* tôi muốn xem lịch tuần đã được cân bằng đúng tỷ lệ 40-30-20-10 và bấm nút chuyển đề xuất sang khâu viết kịch bản ngay lập tức.
3. **Module 2 Story:** *Là Trang Nguyen,* tôi muốn AI sinh toàn bộ kịch bản 5 slide Carousel với đúng bảng màu Deep Ocean và font Barber Fill trong 2 giây.
4. **Module 3 Story:** *Là Trang Nguyen,* tôi muốn trực tiếp duyệt bản mockup thiết kế trước khi hệ thống gửi lệnh xuất bản lên Instagram để đảm bảo 100% không bao giờ đăng nhầm.

---

## 3. Test Scenarios (4 Scenarios Kiểm Thử)

| # | Kịch bản kiểm thử | Các bước thực hiện bằng tay | Kết quả kỳ vọng thấy trên màn hình |
|:---:|:---|:---|:---|
| **1** | **E2E 4 Modules (Happy Path)** | M0 (chọn tín hiệu) ➡️ M1 (chọn đề xuất) ➡️ M2 (Tạo spec 5 slide) ➡️ M3 (Duyệt Approved & Bấm Publish). | - Dữ liệu chảy mượt qua 4 tabs.<br>- M3 mở khóa nút Publish và hiển thị Post ID thành công. |
| **2** | **Validation Edge Case (M2)** | Xóa trắng ô Topic ở Module 2 và bấm Tạo Spec. | - Báo lỗi `THIEU_DU_LIEU` màu đỏ, không tạo dữ liệu rác. |
| **3** | **HITL Safety Lock (M3)** | Ở Module 3 để trạng thái là `Pending` và cố bấm Publish. | - Nút Publish bị vô hiệu hóa (disabled), hiển thị cảnh báo an toàn màu đỏ. |
| **4** | **Apify & Telegram Triggers (M0)** | Bấm nút cào Apify hoặc nhận tin Telegram ở Module 0. | - Thông báo toast xác nhận hoàn tất kèm cập nhật số lượng tín hiệu. |

---

## 4. Ràng buộc kỹ thuật
- Chạy trọn vẹn trên trình duyệt (HTML5, Vanilla CSS Glassmorphism, Modern JavaScript).
- Design Tokens: `#0B1B3D`, `#F4F5F7`, `#EDE0C8`, Font `Barber Fill` / `Montserrat` / `DM Sans`.
