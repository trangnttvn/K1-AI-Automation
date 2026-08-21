# Bản Đồ Chuyển Đổi Workflow (Workflow Plan) — Content Operations Pipeline

> Tài liệu kỹ thuật chi tiết hướng dẫn chuyển đổi từ Workflow mượn (B4 Contract Review + B7 Static Pipeline) sang Workflow chuẩn hóa cho use case của Trang Nguyen theo tinh thần **"Tối thiểu thay đổi — Tối đa tái sử dụng"**.

---

## 1. Bối cảnh & Hợp đồng nghiệm thu
- **Mục tiêu:** Xây dựng workflow n8n nhận yêu cầu chủ đề (On-demand qua Webhook hoặc Polling) -> Kiểm tra tính hợp lệ -> Kích hoạt AI Agent sinh Content Full Spec (Carousel 5 slide chuẩn Brand Guidelines Trang Nguyen) -> Đồng bộ hóa vào Notion Database `Content Production` (`87576ad4-b2eb-43e1-a295-3bf84733be16`) -> Phản hồi kết quả.
- **Ánh xạ Asserts:** Toàn bộ các thay đổi node đều nhắm trúng 5 Asserts trong [`e2e-test.md`](file:///d:/TRANG/Knowledge%20Hub/Antigravity/Antigravity%20Test/hocvien_k1_aiautomation/08-capstone/Trang%20Nguyen%20Capstone/d2-n8n-e2e/e2e-test.md):
  - `A-1`: Workflow chạy thông suốt từ Webhook, không crash.
  - `A-2`: Schema Full Spec đúng 100% (Metadata, Copy, 5 slide Storyboard, Visual links).
  - `A-3`: Brand Identity: Font `Barber Fill`, Palette `#0B1B3D`, 0 từ cấm, 2 link Pexels search query.
  - `A-4`: Bẫy lỗi thiếu dữ liệu `topic` / `format` trả HTTP 400 (`THIEU_DU_LIEU`).
  - `A-5`: Khóa an toàn HITL: Thiết lập trạng thái `Design approval: Pending` trên Notion.

---

## 2. Bảng phân loại Node (GIỮ / SỬA / THÊM / XÓA)

| STT | Tên Node trong Workflow mượn | Hành động | Tên Node mới / Thay đổi cụ thể | Mục đích (Map Assert) |
|:---:|:---|:---:|:---|:---:|
| 1 | `Webhook` (B4) | **SỬA** | Đổi path thành `content-pipeline`, `responseMode: responseNode`. | Phục vụ **Assert A-1** |
| 2 | `Extract .docx / Normalize` (B4) | **XÓA** | Xóa bỏ vì đây là logic riêng của file Word hợp đồng (tránh làm mất payload JSON). | Giữ sạch dữ liệu |
| 3 | `PII Redaction` (B4) | **XÓA** | Xóa bỏ khỏi luồng webhook trực tiếp để tối ưu tốc độ. | Tinh gọn luồng |
| 4 | *(Chưa có)* | **THÊM** | **`Validate Input (Preconditions)`** (Node Code JS kiểm tra bắt buộc phải có `topic` và `format`). | Phục vụ **Assert A-4** |
| 5 | *(Chưa có)* | **THÊM** | **`Check Valid?`** (Node If phân luồng: `true` đi tiếp, `false` rẽ sang bẫy lỗi). | Phục vụ **Assert A-4** |
| 6 | *(Chưa có)* | **THÊM** | **`Respond: 400 Bad Request`** (Node Respond to Webhook trả cờ `THIEU_DU_LIEU`). | Phục vụ **Assert A-4** |
| 7 | `AI Contract Review` (B4) | **SỬA** | **`AI Content Spec Writer (VietAPI)`**: Thay bằng System Prompt nghiệp vụ Trang Nguyen (6 Quality Gates, font `Barber Fill`). | Phục vụ **Assert A-2, A-3** |
| 8 | `Parse JSON Output` (B4) | **SỬA** | **`Parse & Validate Spec`**: Trích xuất `choices[0].message.content` thành object JSON. | Phục vụ **Assert A-2** |
| 9 | `Notion Create Page` (B7) | **SỬA** | **`Notion: Create/Sync Production Record`**: Đẩy vào Database `87576ad4-b2eb-43e1-a295-3bf84733be16`. | Phục vụ **Assert A-2, A-5** |
| 10 | `Respond to Webhook` (B4) | **SỬA** | **`Respond: 200 OK`**: Trả payload hoàn chỉnh cho Client. | Phục vụ **Assert A-1, A-2** |

---

## 3. Chi tiết tham số và Prompt cho Node AI (`AI Content Spec Writer`)

### Cấu hình Node:
- **Loại Node:** `n8n-nodes-base.httpRequest` (hoặc AI Agent Node)
- **Method:** `POST`
- **URL:** `https://api.vietapi.ai/v1/chat/completions` (hoặc `https://api.openai.com/v1/chat/completions`)
- **Authentication:** `Generic Credential Type` -> `Header Auth` (`Authorization: Bearer <API_KEY>`)

### System Prompt Nghiệp Vụ Đánh Số (Đã kiểm chứng):
```text
You are 03_Content_Writer for Trang Nguyen — All-in-One Business Partner for Coaches & Healers.
Transform raw topics into comprehensive, production-ready Content Full Specs.

STRICT BUSINESS RULES & 6 QUALITY GATES (MUST FOLLOW EXACTLY):
1. TONE OF VOICE: Calm, precise, trustworthy, substantive, direct. Sentences under 15 words. Total caption under 150 words.
   - Example NEGATIVE: "Let me transform your coaching business overnight with this game-changer!" (REJECT - overly hyped).
   - Example POSITIVE: "Your calendar is full. But 4 hours a day vanish into manual DM scheduling." (ACCEPT).

2. TYPOGRAPHY HIERARCHY:
   - Headline / Hero: "Barber Fill" (NEVER use "Barbek Fill" or browser defaults).
   - Subheading / Tag: "Montserrat".
   - Body / UI: "DM Sans".

3. COLOR PALETTE (Strict HSL / Hex):
   - Primary: #0B1B3D (Deep Ocean - 60%)
   - Background: #F4F5F7 (Pearl White - 25%)
   - Accent: #EDE0C8 (Warm Champagne - 10%)
   - Secondary: #4A607A (Muted Slate - 4%)
   - Muted: #C8CDD4 (Cool Silver - 1%)
   - Negative rule: NEVER use generic green/red/yellow or unbranded colors.

4. BLACKLIST (0 TOLERANCE):
   - Forbid: best, number one, game-changer, skyrocket, crush it, level up, next level, transform overnight, cam kết 100%, số 1, tốt nhất.

5. CREDIBILITY & HONESTY:
   - Rule: NEVER invent fictional client names or fake testimonials.
   - Anchors: Real e-commerce operation (1,000+ orders/mo, <0.5% error, 95% retention, 3-person team), 7 Notion modules, 10 years international banking.

6. VISUAL REFERENCE LINKS:
   - Must return 2-3 valid Pexels Search Query URLs (format: https://www.pexels.com/search/<keyword>/).
   - Negative rule: DO NOT return direct image links or fake placeholder URLs.

OUTPUT FORMAT: Return strictly valid JSON conforming to the schema (no markdown formatting, no conversational preamble).
```

---

## 4. Đặc tả Schema Output (`content-full-spec`)

```json
{
  "content_id": "string (Required)",
  "topic": "string (Required)",
  "platform": "Instagram (Default)",
  "format": "Carousel | Reel | Static | Story",
  "framework_bucket": "40_Pain | 30_System | 20_Proof | 10_Trang",
  "hook": "string (Visceral-Parallel: 2 contrasting images)",
  "caption": "string (<150 words)",
  "cta": "string",
  "dm_keyword": "string",
  "storyboard": [
    {
      "slide_or_frame": "integer (1 to 5)",
      "headline": "string (Barber Fill)",
      "subtext": "string (DM Sans)",
      "visual_notes": "string",
      "colors": "string (#0B1B3D + #F4F5F7 + #EDE0C8)",
      "fonts": "string (Barber Fill / Montserrat / DM Sans)"
    }
  ],
  "visual_direction": {
    "concept": "string",
    "reference_search_links": ["array of pexels search URLs"],
    "color_palette": ["#0B1B3D", "#F4F5F7", "#EDE0C8"],
    "typography_spec": "Barber Fill / Montserrat / DM Sans"
  },
  "qa_checklist": {
    "honesty_check": "PASS",
    "blacklist_check": "PASS",
    "brand_voice_check": "PASS"
  }
}
```

---

## 5. Thứ tự thao tác thực hiện trong UI n8n (Step-by-Step Execution Guide)

1. **Bước 1: Mở n8n và tạo Workflow mới:**
   - Vào n8n UI -> **Add Workflow** -> Đặt tên: `Trang Nguyen - Content Operations Pipeline`.
2. **Bước 2: Cấu hình Webhook:**
   - Thêm node **Webhook**: Đặt HTTP Method = `POST`, Path = `content-pipeline`, Response Mode = `Using 'Respond to Webhook' Node`.
3. **Bước 3: Thêm Node Validate Input:**
   - Thêm node **Code (JavaScript)**: Dán đoạn mã kiểm tra `$json.topic` và `$json.format`.
4. **Bước 4: Thêm Node Phân luồng If:**
   - Thêm node **If**: Điều kiện `$json.is_valid == true`.
   - Nhánh `false` nối vào node **Respond to Webhook (400 Bad Request)**.
5. **Bước 5: Thêm Node AI Spec Writer:**
   - Nối nhánh `true` của If vào node **HTTP Request (VietAPI / OpenAI)**: Cấu hình System Prompt như Mục 3.
6. **Bước 6: Thêm Node Parse JSON:**
   - Thêm node **Code** để parse `choices[0].message.content`.
7. **Bước 7: Thêm Node Notion Sync:**
   - Thêm node **HTTP Request (Notion API)**: Gửi request `POST https://api.notion.com/v1/pages` đến Database `87576ad4-b2eb-43e1-a295-3bf84733be16`.
8. **Bước 8: Thêm Node Respond to Webhook (200 OK):**
   - Nối sau node Notion để trả JSON Full Spec cho client.
9. **Bước 9: Lưu và Kích hoạt (Save & Activate):**
   - Bấm **Save** và gạt nút **Active**.
