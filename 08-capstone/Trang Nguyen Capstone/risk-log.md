# Risk Log: Quản Trị Rủi Ro Dự Án (Trang Nguyen Capstone)

> Nhật ký nhận diện, đánh giá và xây dựng phương án giảm thiểu rủi ro cho hệ thống Content Operations Automation.

---

## Bảng Ma Trận & Phương Án Giảm Thiểu Rủi Ro (≥3 Rủi Ro Cốt Lõi)

| # | Rủi ro nhận diện | Mức độ tác động | Khả năng xảy ra | Triệu chứng / Dấu hiệu nhận biết | Biện pháp giảm thiểu đã áp dụng & Dự phòng (Mitigation) |
|:---:|:---|:---:|:---:|:---|:---|
| **1** | **AI Ảo giác (Hallucination) & Bịa đặt uy tín** | **CAO** *(High)* | Trung bình | AI tự bịa tên khách hàng coach, số liệu kết quả giả định hoặc câu chuyện thành công không có thật. | • **Quy tắc Honesty trong Skill D1:** Cấm tạo case study giả định; neo chặt vào 3 sự thật vận hành có thật của Trang (1.000+ đơn E-com, 7 module Notion, 10 năm ngân hàng).<br>• **HITL Approval Gate:** Bắt buộc Trang phải duyệt `Approval = Done` trên Notion trước khi bài được đưa sang khâu thiết kế. |
| **2** | **Lệch chuẩn Nhận diện Thương hiệu & Từ cấm** | **TRUNG BÌNH** *(Medium)* | Thấp | Xuất hiện từ cấm sáo rỗng (`game-changer`, `tốt nhất`, `số 1`), sai font (`Barbek Fill` cũ) hoặc sai màu đại trà. | • **6 Quality Gates:** Tích hợp bộ lọc quét Blacklist tự động trong System Prompt n8n và web app MVP.<br>• **Đóng băng Design Tokens:** Cố định bảng màu `#0B1B3D`, `#F4F5F7`, `#EDE0C8` và phân tầng font `Barber Fill` / `Montserrat` / `DM Sans`. |
| **3** | **Access Token Meta Graph API hết hạn** | **CAO** *(High)* | Cao *(sau 60 ngày)* | n8n báo lỗi `OAuthException: Error validating access token` khi gửi request đăng bài lên Instagram. | • **Cơ chế Error Notification:** Bổ sung node Catch Error trong n8n gửi thông báo cảnh báo qua Telegram Bot cho Trang khi token sắp hết hạn.<br>• **Chốt chặn an toàn:** Khi token lỗi, trạng thái bài viết trên Notion chuyển về `Publish Error` thay vì bị mất dữ liệu. |
| **4** | **Thay đổi cấu trúc Facebook Private Groups** | **TRUNG BÌNH** *(Medium)* | Trung bình | Giao diện Facebook thay đổi class DOM khiến extension cào dữ liệu private groups bị lỗi trích xuất. | • **Kiến trúc Multi-entry:** Hệ thống không phụ thuộc 100% vào crawler; Trang có thể gửi trực tiếp ảnh chụp màn hình qua Telegram Bot OCR (Luồng `newsjacking-n8n-workflow.json`) hoặc nhập tay qua Web App MVP D3. |

---

## Kế Hoạch Đánh Giá Định Kỳ
- Rà soát lại token và kết nối API định kỳ ngày 1 hàng tháng cùng chu kỳ chạy của Apify Research Crawler.
