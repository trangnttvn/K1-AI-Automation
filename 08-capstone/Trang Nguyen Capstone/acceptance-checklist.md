# Acceptance Checklist — Tự Chấm Nghiệm Thu (Trang Nguyen Capstone)

> Bản tự đánh giá và nghiệm thu toàn diện đồ án Capstone K1 theo các tiêu chuẩn kỹ thuật nghiêm ngặt của khóa học.

---

## 1. Hạng mục Chung (Data Contract & Project Scope)
- [x] **Brief đủ 7 mục, tiêu chí thành công đo được:** Đã hoàn thành tại [`usecase-brief.md`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/usecase-brief.md) (Bài toán, Người dùng, Input, Output, Quy trình 5 bước, Tiêu chí thành công giảm 70% thời gian, Ràng buộc 5 HITL gates).
- [x] **Resource map ≥3 tài nguyên, path thật:** Đã hoàn thành tại [`resource-map.md`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/resource-map.md) (5 tài nguyên thật từ B1, B4, B6, B7).
- [x] **Risk-log ≥3 rủi ro + cách giảm:** Đã hoàn thành tại [`risk-log.md`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/risk-log.md) (4 rủi ro lớn: Hallucination, Lệch brand, Token Meta hết hạn, Thay đổi DOM Facebook kèm biện pháp khắc phục).

---

## 2. Deliverable D1 — Agent Skill (`content-spec-writer`)
- [x] **SKILL.md frontmatter name + description rõ trigger:** Có name `content-spec-writer` và mô tả điều kiện kích hoạt rõ ràng.
- [x] **Folder đầy đủ:** `SKILL.md` + `kb/brand-guidelines.md` + `kb/format-specs.md` + `templates/full-spec.schema.json` + `test/`.
- [x] **≥1 test PASS trên input thật:** File [`d1-agent-skill/test/test-run.md`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/d1-agent-skill/test/test-run.md) chứng minh PASS 6/6 tiêu chí nghiệm thu (100%), sinh file output [`output/content-full-spec.json`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/d1-agent-skill/output/content-full-spec.json).

---

## 3. Deliverable D2 — n8n E2E Loop (`content-operations-pipeline`)
- [x] **Workflow import + chạy không lỗi:** Tệp [`d2-n8n-e2e/workflow-content-operations-pipeline.json`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/d2-n8n-e2e/workflow-content-operations-pipeline.json) có đồ thị 8 node nguyên vẹn, có Webhook trigger on-demand.
- [x] **e2e-test ≥3 assert:** Tệp [`d2-n8n-e2e/e2e-test.md`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/d2-n8n-e2e/e2e-test.md) có đủ 5 Asserts đo lường rõ ràng (Khởi chạy, Schema, Brand Identity, Validation bẫy lỗi, HITL Gate).
- [x] **run-log ≥2 vòng, có ≥1 vòng FAIL, có evidence:** Tệp [`d2-n8n-e2e/run-log.md`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/d2-n8n-e2e/run-log.md) ghi nhận Vòng 1 FAIL (Execution `exec-20260821-001`) và Vòng 2 PASS (Execution `exec-20260821-002`).

---

## 4. Deliverable D3 — Vibe Coding MVP Web App
- [x] **spec-kit đủ PRD + ≥3 user stories + ≥3 test scenarios:** Đã hoàn thành tại [`d3-mvp/spec-kit.md`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/d3-mvp/spec-kit.md) (4 Test Scenarios kiểm thử bằng tay).
- [x] **App chạy luồng input → output 1 lần đầu cuối:** Ứng dụng SPA tại [`d3-mvp/app/index.html`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/d3-mvp/app/index.html) chạy trọn vẹn từ nạp topic -> sinh Carousel Storyboard 5 slide -> hiển thị 6 Quality Gates -> copy JSON.
- [x] **improve-log ≥1 vòng cải tiến:** Đã ghi nhận 2 vòng cải tiến tại [`d3-mvp/improve-log.md`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/d3-mvp/improve-log.md).
- [x] **Có file RUN.md hướng dẫn chạy ≤3 lệnh:** Đã có tại [`d3-mvp/RUN.md`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/d3-mvp/RUN.md).

---

## 5. Deliverable D4 — Package + Pitch Slide HTML
- [x] **Package đủ cấu trúc chuẩn:** Đúng 100% cây thư mục theo `package-structure.md`.
- [x] **pitch.html mở được, 6 slide, không còn placeholder:** Tệp [`d4-package/pitch.html`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/d4-package/pitch.html) mở trực tiếp trên trình duyệt, có phím mũi tên chuyển slide, số liệu thật từ dự án.
- [x] **Có ảnh demo thật:** Đã lưu trữ trong thư mục `anh-demo/`.

---

## 6. Tính Trung Thực & Ranh Giới Kỹ Thuật (Honesty Principle)
- [x] **Mọi claim "chạy được" đều có bằng chứng:** Có nhật ký thực thi thực tế trong `test-run.md`, `run-log.md`, và output JSON thật.
- [x] **Phần chưa runtime-test được ghi rõ:** Khai báo rõ ràng ranh giới chưa test tải cao >50 req/s và token Meta 60 ngày trong `run-log.md` và `improve-log.md`.
