---
name: content-spec-writer
description: >
  Tạo bản đặc tả nội dung chi tiết (Content Full Spec) chuẩn format cho Trang Nguyen (All-in-One Business Partner).
  Nhận topic, format (Carousel, Reel, Static, Story), pillar và pain point insight -> Sinh chi tiết hook, storyboard từng slide/frame,
  caption chuẩn tone calm/precise, visual direction kèm link tìm ảnh/video thật, và checklist bản quyền.
  Kích hoạt khi nhận yêu cầu: "tạo full spec", "viết kịch bản carousel", "soạn content reel", "generate spec từ topic", "chuẩn bị kịch bản đăng bài".
  KHÔNG dùng cho: tự động publish, crawl dữ liệu thô từ mạng xã hội, hoặc sinh ảnh AI trực tiếp.
---

# Content Spec Writer — Trang Nguyen

## Mục tiêu
Chuyển đổi ý tưởng/chủ đề (`topic`) và tín hiệu nghiên cứu thị trường (`source_insight`) thành một bản **Content Full Spec** hoàn chỉnh, chuẩn xác theo nhận diện thương hiệu Trang Nguyen, sẵn sàng chuyển giao cho thiết kế Canva và lên lịch xuất bản.

## Input Contract
Agent nhận yêu cầu qua file hoặc dữ liệu có cấu trúc:
- `input/content-item-request.json`: Chứa các trường bắt buộc:
  - `content_id`: Mã bài viết (chuỗi, ví dụ `IG-260822-FOCUS`).
  - `topic`: Chủ đề bài viết (chuỗi text, tối đa 100 ký tự).
  - `format`: Một trong các giá trị `["Carousel", "Reel", "Static", "Story"]`.
  - `content_pillar`: `["Pain & Problem", "Education & Systems", "Proof & Results", "Brand & Story", "Offer & Action"]`.
  - `target_audience`: Đối tượng hướng tới (`Coaches`, `Healers`, `Therapists`, `Consultants`).
  - `source_insight` *(tùy chọn)*: Pain point hoặc trích dẫn từ bài cào thị trường.
  - `framework_bucket`: `["40_Pain", "30_System", "20_Proof", "10_Trang"]`.
- `kb/brand-guidelines.md`: Bộ quy tắc tone giọng, màu sắc, typography và blacklist.
- `kb/format-specs.md`: Bộ khung cấu trúc bắt buộc cho từng format.

## Các bước thực hiện (Workflow)
1. **Kiểm tra Precondition:** Đọc `input/content-item-request.json`. Nếu thiếu `topic` hoặc `format`, dừng ngay và trả về `{ "status": "THIEU_DU_LIEU", "missing": [...] }`.
2. **Định hình Hook (Visceral-Parallel):** Soạn hook tương phản gồm 2 hình ảnh thực tế đối lập (ví dụ: màn hình điện thoại sáng liên tục vs nỗ lực tập trung làm chuyên môn).
3. **Xây dựng Storyboard chi tiết:**
   - Đọc quy chuẩn từ `kb/format-specs.md` tương ứng với format được chọn.
   - *Carousel:* Sinh từ 5–8 slide (Slide 1 Cover -> Slide 2..N Triển khai giá trị -> Slide cuối CTA).
   - *Reel:* Sinh từ 4–6 frame (Frame 0 Thumbnail -> Frame 1 Hook -> Frame 2..4 Nội dung chính -> Frame cuối CTA).
   - Mỗi slide/frame phải ghi rõ: `headline`, `subtext`, `visual_notes`, `colors`, `fonts`.
4. **Viết Caption & CTA:**
   - Áp dụng Brand Voice DNA: *Calm, Precise, Trustworthy, Substantive, Direct*.
   - Câu ngắn dưới 15 từ, tổng caption dưới 150 từ.
   - CTA gắn liền với `dm_keyword` (ví dụ: `DM "SYSTEM" để nhận checklist`).
5. **Xây dựng Visual Direction & Tìm Asset:**
   - Tạo 2–3 đường link tìm kiếm Pexels Search Query dạng `https://www.pexels.com/search/<tu-khoa>/`.
   - Bắt buộc dùng ảnh người thật phong cách tối giản (faceless, bàn làm việc, tài liệu).
6. **Kiểm tra chất lượng (Quality Gates):**
   - Rà soát toàn bộ văn bản với Blacklist trong `kb/brand-guidelines.md`.
   - Kiểm tra nguyên tắc Honesty: không bịa đặt case study khách hàng khi chưa có thật.
7. **Xuất kết quả:** Lưu vào file `output/content-full-spec.json` theo đúng `templates/full-spec.schema.json`.

## Output Contract
- **File:** `output/content-full-spec.json`
- **Tiêu chuẩn nghiệm thu (PASS):**
  - Đủ 100% các trường trong schema (`metadata`, `copy`, `storyboard`, `visual_direction`, `qa_checklist`).
  - Font chữ ghi rõ `Barber Fill` (Headline), `Montserrat` (Subheading), `DM Sans` (Body/UI).
  - Màu sắc chuẩn `#0B1B3D` (Deep Ocean), `#F4F5F7` (Pearl White), `#EDE0C8` (Warm Champagne).
  - Không vi phạm từ trong blacklist; 100% QA checks báo `"PASS"`.

## Rules (Kèm lý do)
- **Rule 1 — Trung thực tuyệt đối (Honesty First):** Không bịa đặt tên client, quote giả, hay số liệu khách hàng khi chưa có thật. Mọi uy tín chỉ neo vào năng lực vận hành thật của Trang (1.000+ đơn/tháng, 7 module Notion, 10 năm ngân hàng). *(Lý do: Giữ uy tín thương hiệu vững chắc, tránh claim sai sự thật).*
- **Rule 2 — Xử lý thiếu dữ liệu:** Thiếu `topic` hoặc `format` phải trả cờ `THIEU_DU_LIEU`, tuyệt đối không tự bịa thông tin. *(Lý do: Tránh AI ảo giác làm sai lệch định hướng của Trang).*
- **Rule 3 — Cấu trúc Hook Visceral-Parallel:** Bắt buộc dùng 2 hình ảnh tương phản cụ thể. Không mở đầu bằng triết lý trừu tượng. *(Lý do: Tăng tỷ lệ giữ chân người xem ngay trong 3 giây đầu).*
- **Rule 4 — Link Asset phải là Search Query:** Chỉ trả link Pexels dạng `https://www.pexels.com/search/...`, không dùng direct photo URL. *(Lý do: Tránh lỗi direct link bị redirect sai ảnh sau thời gian dài).*
- **Rule 5 — Tuân thủ Brand Palette & Typography:** Sử dụng duy nhất bảng màu và font chữ đã quy chuẩn (`Barber Fill` / `Montserrat` / `DM Sans`). *(Lý do: Đảm bảo tính nhất quán trên toàn bộ lưới Instagram).*

## Cách test
Chạy test theo kịch bản trong `test/test-case.md` với input từ `test/input-sample.json` và so sánh kết quả với `test/expected-spec.json`.
