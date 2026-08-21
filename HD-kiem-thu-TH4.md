# Hướng Dẫn Nghiệm Thu TH4 (Workflow n8n)

Workflow đã được tạo dưới dạng file JSON và lưu tại thư mục `checkpoints`. Bạn vui lòng làm theo các bước sau để nghiệm thu.

## 1. Import Workflow vào n8n
1. Mở n8n (local hoặc cloud của bạn).
2. Tạo một workflow mới.
3. Nhấp vào menu **Settings** ở góc trên phải, chọn **Import from File**.
4. Chọn file: `d:\TRANG\Knowledge Hub\Antigravity\Antigravity Test\hocvien_k1_aiautomation\Trang Nguyen - baitap\checkpoints\n8n-hr-screening-workflow.json`.
5. Thực hiện tương tự để import Error Workflow từ file `n8n-hr-screening-error-workflow.json`.

## 2. Liên kết Credentials
Khi import xong, một số node sẽ yêu cầu bạn cấp quyền truy cập. Bạn cần chọn đúng credential đang hoạt động trên hệ thống n8n của bạn:
- **Lớp 1 — Gọi Google AI Studio (HTTP Request node):** Chọn credential loại **Header Auth** chứa API key của bạn (ví dụ `Google AI Studio Header Auth`).
- **Lớp 4 — Google Sheets (2 node):** Chọn credential **Google Sheets OAuth2 API** của bạn.

## 3. Chạy thử nghiệm thu (Holdout CV)
Để thay đổi CV chạy thử, bạn chỉ cần thay đổi **đúng một thao tác**:
1. Bấm vào node **Input CV Markdown** (node thứ 2, Lớp 1).
2. Ở phần **Assignments**, đổi giá trị của cột `cv_markdown` thành nội dung CV Holdout mới của bạn.
3. Đổi giá trị của `run_id` (ví dụ: `run-20260730-holdout-001`) để dễ theo dõi trong bảng log.
4. Bấm nút **Execute Workflow** để bắt đầu quá trình chạy tự động 4 lớp.

## 4. Kiểm tra kết quả
Sau khi workflow chạy xong (mất khoảng 10-20 giây để gọi LLM):
- Mở Google Sheets của bạn.
- Bạn sẽ thấy một hàng mới trong tab **Scorecard** với dữ liệu được trích xuất, chấm điểm và đánh giá phân loại.
- Bạn sẽ thấy một hàng mới trong tab **Run Log** thông báo tiến trình `WORKFLOW_COMPLETE` với status `SUCCESS`.

*Lưu ý: Workflow đang ở chế độ Inactive. Nó chỉ chạy khi bạn tự tay bấm nút (hoặc cấu hình thêm trigger).*
