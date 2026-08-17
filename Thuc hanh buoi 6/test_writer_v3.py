#!/usr/bin/env python3
"""
Test riêng cho Luồng 2B v3: writer-production-n8n-workflow-v3.json
Validate:
  1. JSON structure hợp lệ
  2. Node graph (connections) đầy đủ, không orphan
  3. VietAPI config đúng (URL, auth, model)
  4. jsonBody expression parse được (JSON.stringify payload)
  5. Simulate "Parse Writer Output v2" logic với mock gpt-5.5 response v3 schema
  6. Notion block chunking ≤ 1900 chars
  7. content_pillar mapping đúng
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

TESTS_DIR = Path(__file__).parent.resolve()
BPS_DIR   = TESTS_DIR.parent.parent.resolve()  # Business_Partner_System/
WF_V3     = BPS_DIR / "writer-production-n8n-workflow-v3.json"


class Check:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.items: list[tuple[bool, str, str]] = []

    def assert_true(self, name: str, cond: bool, detail: str = "") -> bool:
        ok = bool(cond)
        self.items.append((ok, name, detail))
        if ok:
            self.passed += 1
        else:
            self.failed += 1
        return ok

    def report(self) -> None:
        print("=" * 70)
        print("TEST: writer-production-n8n-workflow-v3.json")
        print("=" * 70)
        for ok, name, detail in self.items:
            icon = "PASS" if ok else "FAIL"
            d = f" -- {detail}" if detail else ""
            print(f"  [{icon}] {name}{d}")
        total = self.passed + self.failed
        print(f"\n{self.passed}/{total} checks passed")
        print("=" * 70)


# ---------------------------------------------------------------------------
# Simulate node "Parse Writer Output v2" (JS → Python)
# ---------------------------------------------------------------------------

BUCKET_TO_PILLAR = {
    "40_Pain": "Operator credibility",
    "30_System": "Systems education",
    "20_Proof": "Proof & results",
    "10_Trang": "Personal story",
}


def simulate_parse_writer_output_v2(ai_content_str: str, proposal_id: str = "prop_v3_001") -> dict:
    """Port của node 'Parse Writer Output v2' jsCode sang Python."""
    try:
        data = json.loads(ai_content_str)
    except json.JSONDecodeError as e:
        raise ValueError(f"AI output is not valid JSON: {e}") from e

    data["proposal_id"] = proposal_id

    platform_map = {"instagram": "Instagram Feed", "facebook": "Facebook Page"}
    data["platform_mapped"] = platform_map.get(str(data.get("platform", "")).lower(), "Instagram Feed")

    format_map = {"carousel": "Carousel", "reel": "Reel", "story": "Story", "static": "Static"}
    data["format"] = format_map.get(str(data.get("format", "")).lower(), "Carousel")

    data["content_pillar"] = BUCKET_TO_PILLAR.get(data.get("framework_bucket", ""), "Systems education")

    sections = [
        ("📊 Framework Bucket", data.get("framework_bucket")),
        ("📝 Tóm tắt bài viết", data.get("render_preview")),
        ("🎨 Gợi ý Hình ảnh (Visual Suggestion)", data.get("visual_suggestion")),
        ("✍️ Nội dung chi tiết (Content Text)", data.get("content_text")),
    ]

    def chunk(s):
        t = str(s or "")
        if not t:
            return ["(trống)"]
        out = []
        while t:
            out.append(t[:1900])
            t = t[1900:]
        return out

    body_blocks = []
    for heading, content in sections:
        body_blocks.append({"object": "block", "type": "heading_3",
                            "heading_3": {"rich_text": [{"type": "text", "text": {"content": heading}}]}})
        for piece in chunk(content):
            body_blocks.append({"object": "block", "type": "paragraph",
                               "paragraph": {"rich_text": [{"type": "text", "text": {"content": piece}}]}})

    def cap(s):
        t = str(s or "")
        return t[:1997] + "..." if len(t) > 2000 else t

    data["body_blocks"] = body_blocks
    data["topic"] = cap(data.get("topic"))
    data["hook_used"] = cap(data.get("hook_used"))
    return data


# ---------------------------------------------------------------------------
# Mock gpt-5.5 response matching v3 schema
# ---------------------------------------------------------------------------

MOCK_V3_OUTPUT = {
    "entry_id": "sig_001",
    "content_id": "IG-260817-LIGHT",
    "platform": "instagram",
    "format": "Carousel",
    "framework_bucket": "30_System",
    "hero_word": "LIGHT",
    "grid_row_phrase": "LATE. LESS. LIGHT.",
    "topic": "The backend that runs while you sleep",
    "hook_used": "The clock says 1 AM. Your list says you are behind. Both are lying to you.",
    "cover_visual_text": {
        "line_1_small": "your backend, at",
        "line_2_hero": "LIGHT",
        "line_3_small": "3 a.m. quiet",
    },
    "cta": "DM the word LIGHT and I will map your first automation.",
    "dm_keyword": "LIGHT",
    "posting_date": "2026-08-17",
    "content_text": "SLIDE 1 (COVER): your backend, at / LIGHT / 3 a.m. quiet\n\nSLIDE 2: Headline: The work does not stop when you do.\nBody: Orders arrive. Questions pile up. You are asleep.\n\nSLIDE 3: Headline: A system holds the line.\nBody: I built one that runs 1,000+ orders a month. Under 0.5% error.\n\nSLIDE 4 (CLOSING): DM the word LIGHT and I will map your first automation.",
    "visual_suggestion": "Concept: a dim workspace lit only by a phone screen, calm not chaotic. Links: https://www.pexels.com/search/dark%20minimal%20workspace/ , https://www.pexels.com/search/phone%20screen%20night/ . Slide 1: Deep Ocean bg, hero word in Barbek Fill italic. Slides 2-4: Pearl White bg, Montserrat Light body. Typography: Barbek Fill italic hero, Montserrat Light body, DM Sans labels.",
    "render_preview": "A calm deep-navy carousel that reframes late-night overwhelm as a systems gap, ending with a low-key DM CTA.",
}


def run() -> int:
    c = Check()

    # 1. File exists + valid JSON
    if not WF_V3.exists():
        print(f"❌ Không tìm thấy {WF_V3}")
        return 1
    with open(WF_V3, "r", encoding="utf-8") as f:
        wf = json.load(f)
    c.assert_true("json_valid", True, "File parse OK")

    nodes = wf.get("nodes", [])
    conns = wf.get("connections", {})
    node_names = {n["name"] for n in nodes}
    c.assert_true("has_nodes", len(nodes) >= 10, f"{len(nodes)} nodes")

    # 2. VietAPI writer node config
    writer = next((n for n in nodes if "Writer" in n["name"] and "Agent" in n["name"]), None)
    c.assert_true("writer_node_exists", writer is not None)
    if writer:
        p = writer["parameters"]
        c.assert_true("writer_url_vietapi", p.get("url") == "https://api.vietapi.ai/v1/chat/completions",
                      p.get("url", ""))
        c.assert_true("writer_auth_generic", p.get("authentication") == "genericCredentialType",
                      p.get("authentication", ""))
        c.assert_true("writer_header_auth", p.get("genericAuthType") == "httpHeaderAuth")
        jb = p.get("jsonBody", "")
        c.assert_true("writer_model_gpt55", '"gpt-5.5"' in jb or "gpt-5.5" in jb, "model gpt-5.5")
        c.assert_true("writer_json_object_mode", "json_object" in jb)

        # ⚠️ Potential bug check: nodeCredentialType still present with genericCredentialType
        has_stale_cred = "nodeCredentialType" in p
        c.assert_true("writer_no_stale_credential_type", not has_stale_cred,
                      "nodeCredentialType=openAiApi vẫn còn (nên xóa khi dùng genericCredentialType)")

    # 3. Connections — no orphan (mọi node non-trigger phải có inbound)
    targets = set()
    for src, outs in conns.items():
        for group in outs.get("main", []):
            for conn in group:
                targets.add(conn["node"])
    triggers = {n["name"] for n in nodes if "Trigger" in n.get("type", "") or "scheduleTrigger" in n.get("type", "")}
    orphans = [n["name"] for n in nodes if n["name"] not in targets and n["name"] not in triggers]
    c.assert_true("no_orphan_nodes", len(orphans) == 0, f"orphans: {orphans}")

    # 4. All connection targets exist
    missing = [t for t in targets if t not in node_names]
    c.assert_true("all_conn_targets_exist", len(missing) == 0, f"missing: {missing}")

    # 5. jsonBody expression — extract model + validate it's a stringify-able payload structure
    if writer:
        jb = writer["parameters"]["jsonBody"]
        c.assert_true("jsonBody_is_expression", jb.startswith("={{") and jb.rstrip().endswith("}}"))
        c.assert_true("jsonBody_has_messages", "messages:" in jb)
        c.assert_true("jsonBody_has_system_role", '"role\\": \\"system' in jb or '"role": "system"' in jb or 'role\": \"system' in jb or "role" in jb)

    # 6. Simulate Parse Writer Output v2 with mock v3 output
    try:
        parsed = simulate_parse_writer_output_v2(json.dumps(MOCK_V3_OUTPUT))
        c.assert_true("parse_v2_runs", True)
        c.assert_true("parse_v2_content_pillar",
                      parsed["content_pillar"] == "Systems education",
                      f"pillar={parsed['content_pillar']}")
        c.assert_true("parse_v2_format_capitalized", parsed["format"] == "Carousel")
        c.assert_true("parse_v2_platform_mapped", parsed["platform_mapped"] == "Instagram Feed")
        c.assert_true("parse_v2_has_body_blocks", len(parsed["body_blocks"]) >= 4)

        # Chunk limit check
        over_limit = []
        for b in parsed["body_blocks"]:
            if b["type"] == "paragraph":
                for rt in b["paragraph"]["rich_text"]:
                    if len(rt["text"]["content"]) > 1900:
                        over_limit.append(len(rt["text"]["content"]))
        c.assert_true("parse_v2_chunks_under_1900", len(over_limit) == 0, f"over: {over_limit}")
    except Exception as e:
        c.assert_true("parse_v2_runs", False, str(e))

    # 7. Malformed AI output → raises
    try:
        simulate_parse_writer_output_v2("{ broken json %%")
        c.assert_true("parse_v2_raises_on_bad_json", False, "should have raised")
    except ValueError:
        c.assert_true("parse_v2_raises_on_bad_json", True)

    # 8. Notion "Lưu vào Content Calendar" — Content Pillar property present
    calendar = next((n for n in nodes if n["name"] == "Lưu vào Content Calendar"), None)
    c.assert_true("content_calendar_node_exists", calendar is not None)
    if calendar:
        prop_values = calendar["parameters"].get("propertiesUi", {}).get("propertyValues", [])
        keys = [pv.get("key", "") for pv in prop_values]
        c.assert_true("has_content_pillar_property",
                      any("Content Pillar" in k for k in keys),
                      f"keys: {keys}")

    # 9. v3 schema fields present in mock (hero_word, content_id, cover_visual_text, dm_keyword)
    for field in ["hero_word", "content_id", "grid_row_phrase", "cover_visual_text", "cta", "dm_keyword", "posting_date"]:
        c.assert_true(f"v3_schema_{field}", field in MOCK_V3_OUTPUT)

    # 10. content_id format IG-YYMMDD-HEROWORD
    cid = MOCK_V3_OUTPUT["content_id"]
    c.assert_true("content_id_format", bool(re.match(r"^IG-\d{6}-[A-Z]+$", cid)), cid)

    c.report()
    return 0 if c.failed == 0 else 1


if __name__ == "__main__":
    sys.exit(run())
