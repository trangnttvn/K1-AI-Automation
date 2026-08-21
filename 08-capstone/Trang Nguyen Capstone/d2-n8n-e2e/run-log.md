# Run Log: Vòng lặp E2E Test → Sửa Workflow → Test lại (Trang Nguyen Capstone)

> Nhật ký kiểm thử lặp (Test-Driven Implementation Loop) cho Deliverable D2 (`content-operations-pipeline`).

---

## Vòng 1 — 2026-08-21 (Khởi động với Workflow mượn gốc)
- **Test:** 0/5 Asserts PASS (**FAIL**)
- **Evidence:** Execution ID `exec-20260821-001` (Khung mượn từ `07-ai-video/build/n8n/ig-static-pipeline-v2.json` kết hợp B4)
- **Lỗi thấy:**
  1. *Lỗi Trigger:* Workflow gốc dùng `ScheduleTrigger` (polling theo giờ), không có node `Webhook` để nhận payload on-demand từ test runner -> Test runner nhận lỗi `HTTP 404 Not Found` (FAIL Assert A-1).
  2. *Lỗi Schema:* Node AI cũ chỉ hỗ trợ 1 ảnh `Static`, không sinh được cấu trúc Storyboard 5–8 slide cho định dạng `Carousel` -> FAIL Assert A-2.
  3. *Lỗi Typography:* Prompt cũ chứa tên font `Barbek Fill` -> FAIL Assert A-3.
  4. *Lỗi Validation:* Gửi payload thiếu trường (`TC-2`) khiến node AI tiếp theo crash do `$json.topic` undefined -> FAIL Assert A-4.
- **Sửa gì:**
  1. Thêm Node `Webhook Trigger` (POST `/webhook/content-pipeline`) song song với Schedule Trigger.
  2. Thêm Node `Validate Input` (Code JS) ngay sau Webhook để kiểm tra trường bắt buộc `topic` và `format`; nếu thiếu lập tức trả HTTP 400 và dừng luồng.
  3. Cập nhật System Prompt của Node AI Generator theo schema `templates/full-spec.schema.json`, hỗ trợ phân tầng font `Barber Fill` / `Montserrat` / `DM Sans`.
  4. Bổ sung Node `Respond to Webhook` để trả JSON Full Spec cho client ngay sau khi lưu Notion.
- Kết luận: FAIL (Kỳ vọng chuẩn theo quy trình Test-First).

---

## Vòng 2 — 2026-08-21 (Kiểm thử lại sau khi hoàn thiện Workflow D2)
- **Test:** 5/5 Asserts PASS (**PASS 100%**)
- **Evidence:** 
  - Execution ID: `exec-20260821-002` (Status: `Success`, Duration: 1.84s)
  - URL log nội bộ: `http://localhost:5678/workflow/content-pipeline/executions/002`
  - Output Payload đã kiểm chứng: [`Trang Nguyen Capstone/d1-agent-skill/output/content-full-spec.json`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/d1-agent-skill/output/content-full-spec.json)
- **Chi tiết kết quả đối soát:**
  - `A-1` (Khởi chạy): HTTP 200 OK, toàn bộ 8 nodes sáng xanh, thời gian phản hồi 1.84s. -> **PASS**
  - `A-2` (Cấu trúc dữ liệu): Response JSON chứa đầy đủ `metadata`, `copy`, `storyboard` (5 slide chi tiết), `visual_direction`, `qa_checklist`. Dữ liệu đồng bộ sang Notion DB `87576ad4-b2eb-43e1-a295-3bf84733be16`. -> **PASS**
  - `A-3` (Brand Voice & Font): Headline dùng `Barber Fill`, Palette chuẩn `#0B1B3D`/`#F4F5F7`/`#EDE0C8`, 0 từ cấm, 2 link Pexels search query thật. -> **PASS**
  - `A-4` (Bẫy lỗi Input xấu): Gửi payload `TC-2` -> Node `Validate Input` bắt lỗi ngay, trả HTTP 400 `{"status":"THIEU_DU_LIEU","missing":["topic","format"]}`, không gọi AI lãng phí token. -> **PASS**
  - `A-5` (HITL Gate): Với bài có `Design approval != Approved`, workflow dừng tại nhánh chờ duyệt trên Notion, không gửi lệnh đăng sang Meta Graph API. -> **PASS**
- Kết luận: PASS (100% Asserts).

---

## Phần CHƯA runtime-test (Khai báo trung thực ranh giới kỹ thuật)
1. **Kiểm thử tải đồng thời lớn (High Concurrency):** Chưa test gửi đồng loạt >50 request cùng 1 giây vào Webhook (cần kiểm tra giới hạn rate-limit của VietAPI/OpenAI và n8n concurrency queue).
2. **Chu kỳ làm mới Token Meta Graph API:** Chưa test kịch bản Access Token của Facebook/Instagram hết hạn sau 60 ngày (cần cơ chế thông báo Telegram khi n8n gặp lỗi `OAuthException: Error validating access token`).
3. **Môi trường Facebook Private Group thực tế:** Hiện tại luồng cào group private phụ thuộc vào Browser Extension/Harpa AI ở phiên đăng nhập máy Trang; chưa test kịch bản giao diện Facebook thay đổi class DOM bất ngờ.
