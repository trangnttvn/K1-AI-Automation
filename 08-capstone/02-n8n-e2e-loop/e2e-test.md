# E2E Test — Content Operations Automation Pipeline (Trang Nguyen)

> File hợp đồng nghiệm thu kiểm thử E2E (End-to-End Test-First) cho Deliverable D2. Điền và đóng băng TRƯỚC khi điều chỉnh workflow n8n.

---

## 1. Workflow dưới test (Workflow Under Test)
- **Tên workflow n8n:** `content-operations-pipeline`
- **Nguồn mượn làm khung:** 
  - [`07-ai-video/build/n8n/ig-static-pipeline-v2.json`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/07-ai-video/build/n8n/ig-static-pipeline-v2.json) (Khung render HTML/CSS, Notion polling & Instagram Graph API publishing).
  - [`Business_Partner_System/Business_Partner_System/writer-production-n8n-workflow-v3.json`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Business_Partner_System/Business_Partner_System/writer-production-n8n-workflow-v3.json) (Khung AI Content Spec Writer & Visual Suggestion).
- **Target Databases:** 
  - Notion Content Production: `87576ad4-b2eb-43e1-a295-3bf84733be16`
  - Notion Research Signals: `2daaa695-27e1-4d6a-9625-c8a7ee941b7e`

---

## 2. Bộ Input Mẫu Kiểm Thử (Test Input Datasets)

| # | Tên ca kiểm thử | File / Nội dung payload | Kỳ vọng nghiệp vụ |
|:---:|:---|:---|:---|
| **TC-1** | **Happy Path (Trường hợp vàng)** | `{"content_id": "IG-260822-FOCUS", "topic": "Tại sao coach càng có nhiều khách thì càng mất thời gian làm chuyên môn", "format": "Carousel", "content_pillar": "Pain & Problem", "framework_bucket": "40_Pain", "target_audience": "Coaches & Healers", "source_insight": "Mất 4 tiếng mỗi ngày xếp lịch và trả lời DM thủ công"}` | Workflow chạy trọn vẹn, sinh Full Spec JSON 5 slide, cập nhật Notion, trả HTTP 200. |
| **TC-2** | **Bad Input (Thiếu trường bắt buộc)** | `{"content_id": "IG-ERR-001", "topic": "", "format": null}` | Node Validation bắt lỗi ngay, không gọi LLM gây tốn token, trả HTTP 400 kèm cờ `THIEU_DU_LIEU`. |
| **TC-3** | **HITL Approval Gate Test** | Record trên Notion có `Status: Copy ready`, `Format: Carousel`, nhưng `Design approval: Pending` (hoặc chưa tick `Approved`) | Workflow tạo bản thảo thiết kế draft, cập nhật trạng thái `Design review` và **DỪNG LẠI** tại cổng duyệt, tuyệt đối **KHÔNG** tự ý kích hoạt node Publish sang Meta Graph API. |

---

## 3. Danh mục Asserts Nghiệm Thu (≥4 Asserts)

| # | Assert | Cách kiểm tra (Verification Method) | Tiêu chí đạt (PASS Criteria) |
|:---:|:---|:---|:---|
| **A-1** | **Khởi chạy & Kết nối đồ thị** | Trigger webhook từ Postman/Curl hoặc n8n UI Test | HTTP 200, execution status = `success`, không có node báo đỏ (`crash`). |
| **A-2** | **Cấu trúc dữ liệu Full Spec (Schema)** | Soi response JSON từ AI node và thuộc tính cập nhật trên Notion DB `87576ad4-b2eb-43e1-a295-3bf84733be16` | Đúng 100% trường `metadata`, `copy`, `storyboard` (5 slide), `visual_direction`, `qa_checklist`. |
| **A-3** | **Tuân thủ Brand Identity & Blacklist** | Kiểm tra trường `fonts`, `colors`, `caption` trong payload sinh ra | - Font Headline: `Barber Fill` (không phải Barbek Fill).<br>- Màu sắc: `#0B1B3D`, `#F4F5F7`, `#EDE0C8`.<br>- 0 từ cấm blacklist (`game-changer`, `số 1`...).<br>- Có ít nhất 2 link Pexels Search Query hợp lệ. |
| **A-4** | **Bẫy lỗi Input xấu (Edge Case TC-2)** | Gửi payload TC-2 vào Webhook | Workflow không sập, trả HTTP 400: `{"status": "THIEU_DU_LIEU", "missing": ["topic", "format"]}`. |
| **A-5** | **Khóa an toàn duyệt thủ công (HITL Gate TC-3)** | Chạy với record chưa duyệt `Design approval` | Node Router/IF chặn lại; không có execution nào gửi request sang endpoint Instagram Graph API khi chưa có trạng thái `Approved`. |

---

## 4. Bằng chứng kiểm chứng tính nghiêm ngặt (Tại sao Workflow gốc CHẮC CHẮN FAIL)

Khi mang workflow gốc từ B7 (`ig-static-pipeline-v2.json`) hoặc B4 vào chạy trực tiếp bộ test này mà **chưa chỉnh sửa**, test sẽ **FAIL** ngay vì các lý do sau:
1. **Thiếu Node Webhook:** Workflow B7 chỉ có `ScheduleTrigger` (polling theo giờ), không có endpoint Webhook để script/test runner gửi payload trực tiếp -> **FAIL Assert A-1 & A-4**.
2. **Chưa hỗ trợ định dạng Carousel:** Workflow B7 đặt cứng filter `Format: Static` và chỉ tạo 1 ảnh đơn, không sinh được Storyboard 5–8 slide cho Carousel -> **FAIL Assert A-2**.
3. **Lệch tên font:** Workflow cũ dùng prompt chứa `Barbek Fill` thay vì `Barber Fill` -> **FAIL Assert A-3**.
4. **Chưa có Node bẫy validation input:** Workflow cũ giả định input luôn có sẵn từ Notion, không có schema validator cho webhook payload -> **FAIL Assert A-4**.

---

## 5. Hướng dẫn chạy Test thủ công trên n8n (Manual Execution Guide)
1. **Mở n8n UI:** Truy cập `http://localhost:5678` (hoặc n8n trên Hostinger).
2. **Import Workflow:** Mở workflow `content-operations-pipeline.json`.
3. **Chạy TC-1:**
   - Bấm nút **"Test step"** trên node Webhook hoặc gửi lệnh cURL:
     ```bash
     curl -X POST http://localhost:5678/webhook/content-pipeline \
       -H "Content-Type: application/json" \
       -d '{"content_id": "IG-260822-FOCUS", "topic": "Tại sao coach càng có nhiều khách thì càng mất thời gian làm chuyên môn", "format": "Carousel", "content_pillar": "Pain & Problem", "framework_bucket": "40_Pain", "target_audience": "Coaches & Healers", "source_insight": "Mất 4 tiếng mỗi ngày xếp lịch và trả lời DM thủ công"}'
     ```
   - Quan sát tab **Executions**: Xem luồng đi qua các node `Validate Input` -> `GPT Full Spec Generator` -> `Notion Update` -> `Response`.
4. **Đối chiếu kết quả:** So sánh dữ liệu tạo ra trên Notion và JSON trả về với bảng Asserts ở Mục 3.

---

## 6. Nhật ký theo dõi kết quả các vòng lặp (E2E Test Run Log)

| Vòng (Loop) | Ngày thực hiện | Số Asserts PASS | Verdict (Kết luận) | Ghi chú & Hành động tiếp theo |
|:---:|:---:|:---:|:---:|:---|
| **Vòng 1** | *Khởi động* | 0 / 5 | **FAIL** (Kỳ vọng) | Workflow mượn gốc chưa có Webhook, thiếu format Carousel và bẫy validation. |
| **Vòng 2** | *Đang chờ* | ... / 5 | ... | Bổ sung Webhook, nâng cấp prompt Carousel và thêm node bẫy lỗi. |
