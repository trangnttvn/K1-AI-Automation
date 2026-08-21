# INPUT-CHECKLIST: Chuẩn bị trước khi chạy prompt lab 02 (Trang Nguyen)

Tất cả các hạng mục chuẩn bị đã hoàn tất:

- [x] **`usecase-brief.md` đã xong lab 00:** Đã hoàn thành và chuẩn hóa tại `Trang Nguyen Capstone/usecase-brief.md` (đủ 7 mục, tiêu chí đo lường rõ ràng, cơ chế Apify + Extension, font `Barber Fill`).
- [x] **Có 2–3 input mẫu của use case:** Đã xây dựng 3 ca kiểm thử:
  - `TC-1` (Happy path Carousel Coach: `IG-260822-FOCUS` có topic, format, pillar, source_insight).
  - `TC-2` (Bad input thiếu trường: `IG-ERR-001` thiếu format & topic).
  - `TC-3` (HITL Gate: bài có `Status: Copy ready`, `Design approval: Pending`).
- [x] **n8n đang chạy:** n8n đã sẵn sàng kết nối Notion API, Meta Graph API và VietAPI / OpenAI.
- [x] **Đã import & nghiên cứu khung workflow mượn:** Đã kiểm tra chi tiết luồng Webhook / Code / Response của B4 (`n8n-contract-review-solution.json`) và luồng B7 (`ig-static-pipeline-v2.json` / `writer-production-n8n-workflow-v3.json`).
- [x] **Resource map đã ghi rõ workflow mượn làm khung:** Đã hoàn thành bảng ánh xạ tại `Trang Nguyen Capstone/resource-map.md` (mượn 5 tài nguyên có path thật).

---
**Trạng thái:** ✅ **SẴN SÀNG** chuyển sang chạy `prompt/06-adapt-workflow.prompt.md` để sinh `workflow-plan.md`.
