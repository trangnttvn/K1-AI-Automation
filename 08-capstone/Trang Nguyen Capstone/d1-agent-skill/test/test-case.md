# Test Case — Agent Skill `content-spec-writer`

> File kịch bản kiểm thử nghiệm thu D1 cho Deliverable 1.

---

## 1. Thông tin Test Case
- **Mã test:** `TC-SPEC-01`
- **Mục tiêu:** Kiểm tra khả năng nhận diện input chủ đề Carousel, áp dụng quy chuẩn thương hiệu Trang Nguyen và sinh output Content Full Spec đạt 100% tiêu chuẩn.
- **File Input:** `test/input-sample.json`
- **File Output Kỳ vọng:** `test/expected-spec.json`

---

## 2. Dữ liệu đầu vào (Input)
```json
{
  "content_id": "IG-260822-FOCUS",
  "topic": "Tại sao coach càng có nhiều khách thì càng mất thời gian làm chuyên môn",
  "format": "Carousel",
  "content_pillar": "Pain & Problem",
  "framework_bucket": "40_Pain",
  "target_audience": "Coaches & Healers",
  "source_insight": "Nhiều coach than phiền rằng mất 4 tiếng mỗi ngày chỉ để trả lời tin nhắn lặp đi lặp lại, xếp lịch thủ công và gửi hóa đơn bằng tay."
}
```

---

## 3. Tiêu chí nghiệm thu (PASS / FAIL Criteria)

| STT | Hạng mục kiểm tra | Tiêu chí đạt (PASS) | Kết quả |
| :---: | :--- | :--- | :---: |
| 1 | **Cấu trúc JSON** | File đầu ra khớp 100% `templates/full-spec.schema.json`, không thiếu trường bắt buộc. | **PASS** |
| 2 | **Cấu trúc Storyboard** | Sinh đủ 5 slide Carousel logic: Slide 1 Cover -> Slide 2..4 Phân tích -> Slide 5 CTA. | **PASS** |
| 3 | **Typography System** | Ghi rõ ràng phân cấp: `Barber Fill` (Headline), `Montserrat` (Subheading/Tag), `DM Sans` (Body). | **PASS** |
| 4 | **Bảng màu (Palette)** | Sử dụng đúng các mã màu `#0B1B3D` (Deep Ocean), `#F4F5F7` (Pearl White), `#EDE0C8` (Warm Champagne). | **PASS** |
| 5 | **Visual Direction** | Có ít nhất 2 đường link Pexels Search Query hợp lệ, mô tả hình ảnh người thật tối giản (không AI). | **PASS** |
| 6 | **Blacklist & Honesty** | 0 từ cấm; không bịa case study khách hàng giả định; câu dưới 15 từ, tổng caption dưới 150 từ. | **PASS** |

---

## 4. Kịch bản kiểm thử thiếu dữ liệu (Edge Case)
- **Input:** `{ "topic": "" }` (thiếu `format` và `topic`).
- **Kỳ vọng:** Agent dừng xử lý và trả về:
  ```json
  {
    "status": "THIEU_DU_LIEU",
    "missing": ["topic", "format"],
    "message": "Vui lòng bổ sung topic và format để tạo Content Full Spec."
  }
  ```
- **Tiêu chí:** Không tự ý suy đoán chủ đề khi input trống.
