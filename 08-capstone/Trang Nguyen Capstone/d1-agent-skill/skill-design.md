# Thiết kế Kiến trúc Agent Skill — `content-spec-writer` (Trang Nguyen)

> Tài liệu thiết kế D1 (Deliverable 1) cho đồ án Capstone theo `prompt/02-design-skill.prompt.md`.

---

## 1. Phân định phạm vi: Trong Skill vs Ngoài Skill

- **Phần đưa vào Skill (Tự động hóa & AI):**
  - Đọc tín hiệu insight, topic đã duyệt, content pillar và format (Carousel, Reel, Static, Story).
  - Áp dụng các quy tắc thương hiệu bất biến (Brand Voice: calm, precise, substantive; Typography: Barber Fill / Montserrat / DM Sans; Palette: Deep Ocean `#0B1B3D`, Pearl White `#F4F5F7`, Warm Champagne `#EDE0C8`).
  - Sinh cấu trúc nội dung chi tiết (Hook kiểu visceral-parallel, Storyboard từng slide/frame, Caption, CTA kèm DM keyword).
  - Tạo Visual Direction chi tiết kèm link truy vấn tìm kiếm asset ảnh/video thật (Pexels Search Query).
  - Kiểm tra chất lượng (Quality Gate): blacklist từ cấm, tính trung thực (không bịa đặt case study khách hàng giả định).
  *Lý do:* Đây là bước có quy tắc nghiệp vụ rõ ràng, lặp đi lặp lại nhiều nhất và tốn nhiều thời gian nhất (2–5 giờ/bài) nếu làm thủ công.

- **Phần giữ ngoài Skill (Automation nền & Human-in-the-loop):**
  - Thu thập dữ liệu từ Facebook qua Apify / Browser Extension (n8n & Extension đảm nhiệm).
  - Chốt chặn phê duyệt (Trang trực tiếp duyệt Insight, duyệt Full Spec, duyệt Thiết kế).
  - Đồng bộ trạng thái Notion và xuất bản lên Instagram/Facebook qua Meta Graph API (n8n đảm nhiệm).
  *Lý do:* Đảm bảo kiểm soát rủi ro nội dung, quyền riêng tư và bản quyền trước khi xuất bản.

---

## 2. Thông số Skill

### 2.1. Frontmatter
```yaml
name: content-spec-writer
description: >
  Tạo bản đặc tả nội dung chi tiết (Content Full Spec) chuẩn format cho Trang Nguyen (All-in-One Business Partner). 
  Nhận topic, format (Carousel, Reel, Static, Story), pillar và pain point insight -> Sinh chi tiết hook, storyboard từng slide/frame, 
  caption chuẩn tone calm/precise, visual direction kèm link tìm ảnh/video thật, và checklist bản quyền. 
  Kích hoạt khi nhận yêu cầu: "tạo full spec", "viết kịch bản carousel", "soạn content reel", "generate spec từ topic". 
  KHÔNG dùng cho: tự động publish, crawler dữ liệu thô, hoặc sinh ảnh trực tiếp.
```

### 2.2. Input Contract
Agent nhận dữ liệu đầu vào thông qua file JSON hoặc markdown:
- **`input/content-item-request.json`**:
  - `content_id`: Mã định danh bài viết (ví dụ: `IG-260825-LIGHT`).
  - `topic`: Chủ đề bài đăng (chuỗi text, tối đa 100 ký tự).
  - `format`: Một trong các giá trị `["Carousel", "Reel", "Static", "Story"]`.
  - `content_pillar`: Một trong các pillar `["Pain & Problem", "Education & Systems", "Proof & Results", "Brand & Story", "Offer & Action"]`.
  - `target_audience`: Đối tượng nhắm tới (`Coaches`, `Healers`, `Therapists`, `Consultants`).
  - `source_insight`: Trích dẫn hoặc pain point thực tế từ market research (nếu có).
  - `framework_bucket`: Phân bổ `40_Pain`, `30_System`, `20_Proof`, hoặc `10_Trang`.
- **`kb/brand-guidelines.md`**: Bộ quy chuẩn tone giọng, typography, bảng màu và danh sách blacklist.

### 2.3. Output Contract
Agent trả về file chuẩn hóa JSON và bản preview markdown:
- **`output/content-full-spec.json`**: Chứa toàn bộ trường dữ liệu có cấu trúc:
  - `metadata`: `content_id`, `topic`, `format`, `pillar`, `posting_date`.
  - `copy`: `hook` (visceral parallel), `caption` (ngắn gọn, dưới 15 từ/câu, không quá 150 từ tổng), `cta`, `dm_keyword`.
  - `storyboard`: Danh sách các slide/frame (mỗi slide có `slide_number`, `headline`, `subtext`, `visual_notes`, `colors`, `fonts`).
  - `visual_direction`: Khái niệm thị giác, 2-3 đường link Pexels Search Query (định dạng `https://www.pexels.com/search/...`), bảng màu và font chữ.
  - `qa_checklist`: Kết quả kiểm tra `honesty_check: PASS`, `blacklist_check: PASS`, `brand_voice_check: PASS`.
- **Tiêu chí đạt (PASS):** 100% trường trong schema được điền đầy đủ; không chứa từ trong blacklist; không bịa case study; storyboard đủ số lượng slide (Carousel: 5–8 slide, Reel: 4–6 frame).

---

## 3. Các quy tắc không đàm phán (Rules)

1. **Rule 1 — Tính trung thực & Bằng chứng (Honesty First):** Tuyệt đối không tự bịa đặt câu chuyện khách hàng, trích dẫn giả định hoặc số liệu thành công của client khi chưa có thật. Mọi uy tín phải neo vào năng lực vận hành thật của Trang (hệ thống E-commerce 1.000+ đơn/tháng, 7 module Notion, 10 năm ngân hàng).
2. **Rule 2 — Xử lý thiếu dữ liệu (No Hallucination on Missing Input):** Nếu input thiếu thông tin bắt buộc (`topic` hoặc `format`), skill phải dừng lại và trả về mã trạng thái `THIEU_DU_LIEU` kèm danh sách trường cần bổ sung, không được tự suy đoán chủ đề.
3. **Rule 3 — Chuẩn mực Hook (Visceral-Parallel):** Mọi hook phải gồm 2 hình ảnh tương phản cụ thể, rõ nét, gợi cảm xúc chân thực trước khi chuyển hướng (ví dụ: *"Bạn úp mặt điện thoại xuống bàn. Màn hình vẫn sáng lên từng phút."*).
4. **Rule 4 — Quy chuẩn Visual & Link Asset:** Visual gợi ý chỉ sử dụng ảnh/video người thật, phong cách tối giản, ưu tiên ảnh giấu mặt (faceless/hands/workspace). Đường link tham khảo bắt buộc là đường dẫn tìm kiếm Pexels Search Query URL (không dùng link ảnh trực tiếp để tránh redirect lỗi).
5. **Rule 5 — Tuân thủ Brand Identity & Blacklist:** Bắt buộc áp dụng Font `Barber Fill` (Headline), `Montserrat` (Subhead), `DM Sans` (Body); Palette `#0B1B3D`, `#F4F5F7`, `#EDE0C8`. Tuyệt đối loại bỏ các từ cấm (*game-changer, skyrocket, tốt nhất, số 1, uy tín, guaranteed...*).

---

## 4. Cấu trúc thư mục đề xuất

```text
d1-agent-skill/
├── SKILL.md                          # File chỉ dẫn chính của agent skill (kèm frontmatter)
├── kb/
│   ├── brand-guidelines.md           # Bộ quy chuẩn thương hiệu, màu sắc, font, blacklist
│   └── format-specs.md               # Quy định cấu trúc từng format (Carousel, Reel, Static)
├── templates/
│   └── full-spec.schema.json         # Schema JSON mẫu đầu ra
└── test/
    ├── test-case.md                  # Test case tối thiểu có input và expected output
    └── expected-spec.json            # File kết quả mẫu chuẩn để so sánh
```

---

## 5. Kế hoạch tái sử dụng tài nguyên mượn (Resource Mapping)

| Tài nguyên mượn | Mục đích mượn | Điều chỉnh cho Use Case của Trang |
| :--- | :--- | :--- |
| `06-content-engine/luong-nghiep-vu.md` | Mượn logic tách các bước Content Production từ input -> storyboard -> caption. | Bổ sung phần Visual Suggestion (tìm link asset thật Pexels) và gắn chặt với Brand Guidelines riêng của Trang. |
| `04-contract-review/templates/checklist-rui-ro.md` | Mượn mẫu checklist kiểm soát rủi ro đếm được. | Chuyển thành Quality Checklist: kiểm tra từ cấm (Blacklist check) và kiểm tra tính trung thực (Honesty check). |
| `Customer_Contexts/trang_nguyen/brand_profile.json` | Mượn toàn bộ thông tin nền tảng về niche, ICP, pillar, services và typography. | Tích hợp trực tiếp vào file `kb/brand-guidelines.md` của skill. |

---

## 6. Test Case nhỏ nhất (Minimal Test Case)

- **Input (`test/input-sample.json`):**
  ```json
  {
    "content_id": "IG-260822-FOCUS",
    "topic": "Tại sao coach càng có nhiều khách thì càng mất thời gian làm chuyên môn",
    "format": "Carousel",
    "content_pillar": "Pain & Problem",
    "framework_bucket": "40_Pain",
    "target_audience": "Coaches",
    "source_insight": "Nhiều coach than phiền rằng mất 4 tiếng mỗi ngày chỉ để trả lời tin nhắn, xếp lịch và gửi hóa đơn."
  }
  ```
- **Kỳ vọng đầu ra (Verification Criteria - PASS):**
  1. File JSON sinh ra đúng cấu trúc 7 slide (Slide 1 Cover -> Slide 2..6 Educational Breakdown -> Slide 7 CTA).
  2. Slide 1 có hook tương phản dạng Visceral-Parallel và Headline định dạng font `Barber Fill`.
  3. Màu sắc sử dụng đúng mã `#0B1B3D`, `#F4F5F7`, `#EDE0C8`.
  4. Không chứa từ cấm trong blacklist; CTA có kèm DM Keyword (ví dụ: `DM "SYSTEM"`).
  5. Có tối thiểu 2 link Pexels Search Query hợp lệ.
