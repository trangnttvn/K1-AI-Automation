# 🌐 Hệ Sinh Thái 4 Module n8n Workflows — Trang Nguyen Content Operations OS

> Tài liệu hướng dẫn Giảng viên và Hội đồng thẩm định về cấu trúc vận hành của **Bộ 4 Module Workflow Chuyên Sâu** kết nối qua **Notion Database Hub (SSOT)**.

---

## 🏗️ 1. Sơ Đồ Kiến Trúc Luồng Vận Hành Toàn Diện (End-to-End Architecture)

Hệ thống hoạt động theo mô hình **Micro-workflows**, trong đó các workflow thực hiện nhiệm vụ độc lập và chia sẻ trạng thái qua 3 Notion Database:

```
                    ┌──────────────────────────────────────────────────┐
                    │            NOTION DATABASE HUB (SSOT)            │
                    │  1. Research Signals DB (2daaa695)               │
                    │  2. Weekly Editorial Calendar DB (cf3ea4bf)      │
                    │  3. Full Content Specs DB (87576ad4)             │
                    └────────────────────────┬─────────────────────────┘
                                             │
      ┌──────────────────────────────────────┼──────────────────────────────────────┐
      │                                      │                                      │
      ▼                                      ▼                                      ▼
┌─────────────────────────┐        ┌─────────────────────────┐        ┌─────────────────────────┐
│   MODULE 0: INTAKE      │        │   MODULE 1: PLANNING    │        │  MODULE 2: PRODUCTION   │
│ • module-0a-apify       │───────>│ • module-1-dept-content │───────>│ • module-2-writer-spec  │
│ • module-0b-newsjacking │        │   (Cân bằng 40-30-20-10)│        │   (5-Slide Storyboard)  │
└─────────────────────────┘        └─────────────────────────┘        └───────────┬─────────────┘
                                                                                  │
                                                                                  ▼
┌─────────────────────────┐                                           ┌─────────────────────────┐
│ MASTER PIPELINE HUB     │<──────────────────────────────────────────│ MODULE 3: DISTRIBUTION  │
│ • workflow-content-     │          (Chốt chặn HITL Gate)            │ • module-3-ig-pipeline  │
│   operations-pipeline   │                                           │   (Render & Meta API)   │
└─────────────────────────┘                                           └─────────────────────────┘
```

---

## 📁 2. Danh Sách & Vai Trò Từng Workflow Trong Thư Mục

### 🔹 Module 0A — `module-0a-apify-research-crawler.json` (Market Intake)
- **Cơ chế kích hoạt:** Cron Schedule định kỳ vào **ngày 01 hàng tháng**.
- **Nhiệm vụ:**
  - Gọi Apify Actor cào tự động 50–100 bài thảo luận mới nhất từ các Facebook Groups công khai của cộng đồng Life Coach / Healers.
  - Khử toàn bộ PII (số điện thoại, email, họ tên thật).
  - Phân loại vào 6 Core Bottlenecks và lưu vào **Notion DB 1 (`2daaa695...` — Research Signals)** với mã định danh `SIG-xx`.

### 🔹 Module 0B — `module-0b-newsjacking-telegram-ocr.json` (On-Demand Research)
- **Cơ chế kích hoạt:** Telegram Bot Webhook khi Trang gửi ảnh chụp màn hình từ các nhóm kín (Private Masterminds).
- **Nhiệm vụ:**
  - Chạy OCR Vision bóc tách nguyên văn câu từ của khách hàng (*Verbatim Voice of Customer*).
  - Gọi Tavily API tìm kiếm tin tức thời sự đối ứng.
  - Tự động gắn nhãn cầu nối dịch vụ (*Service Bridge*) và đẩy vào **Notion DB 1 (`2daaa695...`)**.

### 🔹 Module 1 — `module-1-dept-content-planning.json` (Strategy & Planning)
- **Cơ chế kích hoạt:** Cron Schedule vào lúc **08:00 sáng Thứ Hai hàng tuần**.
- **Nhiệm vụ:**
  - Đọc các tín hiệu nỗi đau chưa sử dụng từ Notion DB 1.
  - Áp dụng công thức phân bổ chuẩn nhận diện: `40% Pain · 30% System · 20% Proof · 10% Brand`.
  - Sinh 3 đề xuất chủ đề tuần (*Weekly Editorial Proposals*) ghi vào **Notion DB 2 (`cf3ea4bf...`)** chờ Trang tick chọn duyệt.

### 🔹 Module 2 — `module-2-writer-production-spec.json` (Spec Production)
- **Cơ chế kích hoạt:** Lắng nghe Webhook hoặc khi Notion DB 2 có trạng thái `Approved`.
- **Nhiệm vụ:**
  - Kích hoạt **Agent Skill `content-spec-writer` (D1)**.
  - Soạn thảo Hook tương phản, kịch bản 5 slide Carousel (100% tiếng Anh), Caption dưới 120 từ, CTA DM từ khóa `"SYSTEM"`, Pexels search links.
  - Quét tự động **6 Quality Gates** (Palette `#0B1B3D`, font `Barber Fill`, 0 từ cấm Blacklist, Credibility anchors).
  - Ghi toàn bộ Full Spec vào **Notion DB 3 (`87576ad4...`)** theo mã định danh `Content ID` (ví dụ `IG-260821-FOCUS`).

### 🔹 Module 3 — `module-3-ig-distribution-pipeline.json` (Render & Distribution)
- **Cơ chế kích hoạt:** 
  - **Lịch tự động:** Cron Schedule vào đúng **06:00 sáng hàng ngày** (`0 6 * * *`).
  - **Theo yêu cầu qua Telegram (On-Demand):** **Telegram Trigger** trực tiếp. Bất cứ khi nào Trang nhắn tin cho Bot (`/post`, `/publish` hoặc gửi mã bài viết), bot sẽ kích hoạt tức thì.
- **Nhiệm vụ:**
  - Puppeteer tự động dựng khung hình đồ họa 1080×1350 High-contrast chuẩn tỷ lệ 4:5.
  - **Thông báo & Duyệt 1-Click qua Telegram:** Tự động gửi ảnh render kèm nội dung bài viết và 2 nút bấm Inline `[✅ DUYỆT & ĐĂNG INSTAGRAM NGAY]` / `[⚠️ YÊU CẦU CHỈNH SỬA]` trực tiếp vào Telegram của Trang.
  - Khi Trang bấm nút trên Telegram, n8n nhận Callback Query, tự động đồng bộ `Design approval = Approved` vào Notion và gọi Meta Business Graph API xuất bản bài lên Instagram Business Feed.
  - Cập nhật trạng thái bài viết thành `Posted` và gửi thông báo xác nhận kèm `Meta Post ID` qua Telegram.

### 🔹 Master Workflow — `../workflow-content-operations-pipeline.json` (E2E Controller)
- **Cơ chế kích hoạt:** Webhook On-Demand nhận yêu cầu trực tiếp từ **Web App MVP (D3)**.
- **Nhiệm vụ:** Đóng gói toàn trình kiểm tra hợp lệ, bẫy lỗi HTTP 400, sinh spec và đồng bộ Notion trong **1.84 giây** (Dùng cho kiểm thử tự động, chấm điểm Capstone và vận hành On-demand).

---

## 🗄️ 3. Ánh Xạ Notion Database (Single Source of Truth - SSOT)

| Database Name | Notion Database ID | Khóa chính (Primary Key) | Thuộc tính quan trọng |
| :--- | :--- | :--- | :--- |
| **1. Research Signals** | `2daaa695-27e1-4d6a-9625-c8a7ee941b7e` | `Signal ID` (`SIG-01`,...) | Source, Verbatim Quote, Pain Category, Service Bridge, Status |
| **2. Weekly Editorial Calendar** | `cf3ea4bf-03f9-4672-8877-c93d9370cb8f` | `Proposal ID` (`PROP-WK34-01`) | Week, Pillar Bucket, Format, Topic Angle, Approval Status |
| **3. Full Content Specs** | `87576ad4-b2eb-43e1-a295-3bf84733be16` | `Content ID` (`IG-260821-FOCUS`) | Storyboard JSON, Hook, Caption, 6 Gates Pass, `Design approval`, Post ID |

---

## 🚀 4. Hướng Dẫn Giảng Viên Thử Nghiệm

1. **Kiểm thử Master Pipeline:** Import `workflow-content-operations-pipeline.json` ➔ Kích hoạt Webhook ➔ Chạy lệnh test mẫu trong `e2e-test.md`.
2. **Kiểm tra từng Sub-workflow:** Mở từng tệp trong thư mục `modules-ecosystem/` trên n8n để xem đồ thị logic chi tiết của từng trạm vận hành.
