# Usecase Brief — Content Operations Automation (Trang Nguyen)

> Data contract chuẩn hóa cho đồ án tự động hóa vận hành, sản xuất, phân phối và tối ưu nội dung đa kênh của Trang Nguyen (All-in-One Business Partner).

## [BẮT BUỘC] Bài toán
Trang hiện chưa có content calendar và hệ thống ý tưởng (idea) ổn định, dẫn đến việc sản xuất nội dung dễ bị ngắt quãng, bập bõm, trùng lặp và bí ý tưởng. Khi làm thủ công, dù đã có lịch thì khâu chuẩn chỉnh nội dung và thiết kế mất tới 2-3 giờ cho một carousel và 4-5 giờ cho một video. Quy trình cần tự động hóa toàn diện từ thu thập tín hiệu thị trường (Facebook groups), phân tích pain point, lập content calendar trên Notion, sinh content full spec (GPT-5/Claude Opus), tạo visual draft trên Canva, phân phối (Instagram/Facebook) sau khi duyệt, đến báo cáo weekly review để tối ưu vòng lặp nội dung.

## [BẮT BUỘC] Người dùng
- **Người dùng cuối & Người duyệt (HITL):** Trang Nguyen (All-in-One Business Partner, trực tiếp kiểm duyệt tại các chốt: Insight, Calendar, Full Spec, Design và Weekly Review).
- **Người nhận output:** Trang Nguyen (quản trị tập trung trên Notion, Canva, Instagram/Facebook Business) và tệp khách hàng mục tiêu (Coaches, Healers, Therapists, Consultants, Service Providers).
- **AI Workers:** GPT-5 & Claude Opus (phân tích insight, tạo calendar draft, sinh content full spec chi tiết).
- **Automation Runtime:** n8n self-hosted trên Hostinger; Apify crawler (cho group FB public); Browser extension (cho group FB private trên phiên của Trang).
- **Nguồn nghiên cứu:** Apify crawl định kỳ 1 tháng/lần với group public; Browser extension chạy khi Trang mở trình duyệt và yêu cầu nghiên cứu với group private.

## [BẮT BUỘC] Input hàng ngày
1. **Input định kỳ (Scheduled):**
   - Dữ liệu crawl từ Apify cho các group FB public (chạy định kỳ 1 tháng/lần).
   - Dữ liệu hiệu quả bài đăng (reach, impressions, saves, shares, comments) từ Instagram/Facebook cho weekly review.
   - Trạng thái các item đến hạn trên Notion Content Calendar (`3a7d98dd737980879a26d2c8b3e18fb4`).
2. **Input theo yêu cầu linh hoạt (On-demand Webhook / Chat / Notion State):**
   - Nghiên cứu group FB private: Kích hoạt Browser Extension khi Trang mở trình duyệt và có nhu cầu nghiên cứu cụ thể.
   - Đa điểm vào: Cho phép kích hoạt chạy từ bất kỳ node nào (`market_research`, `content_calendar`, `content_full_spec`, `design`, `weekly_review`, `repurpose`).
   - Cấu trúc input: `request_type` (continue, regenerate, redesign, repurpose, review, research), `start_from_node`, `record_id`, `instruction`.
   - *Ví dụ:* `request_type: redesign`, `start_from_node: design`, `record_id: [Notion page ID]`, `instruction: Giữ nguyên full spec và caption, tạo lại carousel theo visual direction mới với ảnh thật đã verify bản quyền.`

## [BẮT BUỘC] Output mong muốn
1. **Market Insight Database (Notion `2daaa695-27e1-4d6a-9625-c8a7ee941b7e` — Research Signals):** Record chứa URL nguồn, trích dẫn gốc (citation), phân loại pain point, context, objection, ngôn ngữ khách hàng, độ tin cậy và mapping content angle với dịch vụ của Trang.
2. **Content Production Database (Notion `87576ad4-b2eb-43e1-a295-3bf84733be16`):** Lịch xuất bản chi tiết (publish date/time theo Asia/Bangkok, format: Carousel/Reel/Static/Story, pillar, funnel, status pipeline, Canva project link).
3. **Content Full Spec:** Caption hoàn chỉnh theo brand tone (calm, precise, direct), hook, CTA, storyboard từng slide/frame, text overlay, visual suggestion chi tiết (bối cảnh, palette `#0B1B3D`/`#F4F5F7`, font Barber Fill/Montserrat/DM Sans) và link asset kèm trạng thái bản quyền.
4. **Bản thiết kế (Canva Design Draft) & Lịch đăng:** Link thiết kế Canva đúng format; bài được tự động schedule lên Instagram Business (cross-post Facebook Page) đúng giờ qua Meta Graph API sau khi Trang cấp trạng thái `Approved to publish` / `Design approval: Approved`.
5. **Weekly Review Report:** Thống kê hiệu suất bài đăng, phân tích angle/format hiệu quả kèm đề xuất điều chỉnh calendar/full spec.

## [BẮT BUỘC] Quy trình xử lý (miêu tả tự nhiên)
1. **(Cứng - Automation):** Thu thập bài viết/comment từ group FB public bằng Apify (1 tháng/lần) hoặc từ group FB private qua Browser Extension (Harpa AI / Webhook Extension) khi Trang mở trình duyệt gửi lệnh; lọc bỏ quảng cáo/spam; lưu metadata và URL đối soát.
2. **(AI phán đoán):** LLM (GPT-5/Claude Opus) trích xuất pain point, objection, ngôn ngữ khách hàng, đánh giá confidence score và mapping vào 5 content pillar.
3. **(Người duyệt - HITL 1):** Trang duyệt/chỉnh sửa Market Insight trên Notion `Research Signals` trước khi đưa vào kho nguyên liệu.
4. **(AI phán đoán):** LLM lập Content Plan/Calendar draft dựa trên insight đã duyệt, brand guideline và khoảng trống lịch đăng trên Notion `Content Production`.
5. **(Người duyệt - HITL 2):** Trang duyệt/tinh chỉnh topic, format, publish time trên Notion.
6. **(AI phán đoán):** LLM sinh Content Full Spec (caption, storyboard chi tiết, visual direction, asset search query) theo đúng schema cố định.
7. **(Người duyệt - HITL 3):** Trang kiểm duyệt full spec; có thể trigger chạy lại (`regenerate`) hoặc chuyển bước tiếp theo (`Copy approved`).
8. **(AI phán đoán + Cứng):** AI tìm kiếm suggested link asset thật, ghi nhận license status; tạo Canva design draft theo template.
9. **(Người duyệt - HITL 4):** Trang duyệt thiết kế Canva và kiểm tra bản quyền hình ảnh (`Design approval: Approved` -> `Approved to publish`).
10. **(Cứng - Automation):** n8n đẩy bài lên lịch Instagram Business qua Meta Graph API trực tiếp (cross-post Facebook Page nếu bật).
11. **(Cứng + AI phán đoán + Người duyệt):** Định kỳ cuối tuần, n8n kéo metrics -> AI tổng hợp báo cáo và đề xuất tối ưu -> Trang duyệt thay đổi cho tuần kế tiếp.
*Quy tắc đa điểm vào: Mỗi node tự kiểm tra precondition trước khi chạy; nếu thiếu dữ liệu sẽ dừng lại, ghi log `blocked_reason` và báo Trang bổ sung.*

## [BẮT BUỘC] Tiêu chí thành công (đo được)
- Giảm thời gian xử lý carousel từ **2-3 giờ** xuống **dưới 45 phút** review và chỉnh sửa thủ công cho mỗi bài.
- Giảm thời gian xử lý video từ **4-5 giờ** xuống **dưới 90 phút** review và chỉnh sửa thủ công cho mỗi video.
- **100%** content item có đầy đủ `source`, `status`, `version` và liên kết 2 chiều giữa các node.
- **100%** bài post được schedule chỉ khi có trạng thái approval rõ ràng từ Trang (`Design approval: Approved`).
- Đạt tối thiểu **90%** tỷ lệ publish đúng lịch Asia/Bangkok trên Instagram Business trong các tuần có calendar đã duyệt.
- Giảm số lượng content item trùng lặp topic/angle về **0 lần/tháng** nhờ cơ chế kiểm tra chéo trước khi ghi vào Notion calendar.
- **100%** yêu cầu chạy từ node bất kỳ được log với `request_type`, `start_from_node`, record ID và execution status.

## Ràng buộc & công cụ sẵn có
- **Công cụ & Hạ tầng:** n8n self-hosted trên Hostinger; Apify (Facebook scraper); Harpa AI / Browser Extension; Notion Page `3a7d98dd737980879a26d2c8b3e18fb4` (chứa `Research Signals` `2daaa695-27e1-4d6a-9625-c8a7ee941b7e` & `Content Production` `87576ad4-b2eb-43e1-a295-3bf84733be16`); Canva; Meta Graph API (Instagram Business Content Publishing & Facebook Page API); GPT-5 & Claude Opus API.
- **Bảo mật & Quyền riêng tư:** Chỉ thu thập dữ liệu Facebook trong phạm vi quyền hạn cá nhân của Trang thông qua browser extension (không bypass login/bảo mật, không lưu PII nhạy cảm); không suy đoán dữ liệu khi thiếu input.
- **Tuân thủ Brand Identity:** Tuyệt đối áp dụng Brand Guideline Trang Nguyen (Bảng màu #0B1B3D, #F4F5F7, #EDE0C8; Typography Barber Fill / Montserrat / DM Sans; Tone: calm, precise, substantive; tuân thủ blacklist từ cấm).
- **Quy tắc Bản quyền Asset:** Asset hình ảnh/video bắt buộc có nguồn gốc và license status. Trạng thái `Needs License Review` không được phép xuất bản.
- **Human-in-the-loop (HITL):** Bắt buộc có người duyệt ở 5 chốt chặn: Insight -> Calendar -> Full Spec -> Design/License -> Weekly Review.
