/**
 * Trang Nguyen — All-in-One Content Operations OS
 * Strict English Content Output & Brand Typography (Barber Fill / Montserrat / DM Sans)
 * 
 * 4 Modules Architecture:
 * Module 0: Intake & Research (Apify + Newsjacking)
 * Module 1: Strategy & Planning (Dept-Content)
 * Module 2: Spec Production (Agent Skill D1 + n8n D2)
 * Module 3: Visual Render & Distribution (HITL Gate + Meta API)
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // GLOBAL STATE & NAVIGATION
  // =========================================================================
  const stepTabs = document.querySelectorAll('.step-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const toast = document.getElementById('toast');

  let currentSpec = null;
  let currentSlideIndex = 0;

  // Signal Database (Module 0 - ENGLISH OUTPUT)
  const SIGNALS = [
    {
      id: "SIG-01",
      title: "Losing 4 hours every day on repetitive manual scheduling and DMs",
      quote: "My coaching roster is completely booked, but I spend half my day answering back-and-forth messages just to find a meeting slot and send Zoom links. I have zero mental bandwidth left for actual client delivery.",
      source: "Apify Crawler (FB Public Group)",
      category: "Mindset & Burnout",
      bridge: "Automated Onboarding & Notion Smart Calendar Sync",
      tavily: "Executive coaching burnout calendar automation trends"
    },
    {
      id: "SIG-02",
      title: "Clients missing appointments, scattered contract documents",
      quote: "Clients constantly forget their session times or send payments via random apps. I waste an hour searching through message threads just to find their intake notes.",
      source: "Telegram OCR Vision (Private Mastermind)",
      category: "Business Setup",
      bridge: "7-Module Notion Client Portal & CRM Architecture",
      tavily: "High-ticket client onboarding automation workflows"
    },
    {
      id: "SIG-03",
      title: "Fear of launching group coaching due to operational collapse",
      quote: "1-on-1 coaching is already overwhelming. If I scale to a group of 20 people, I will drown in manual homework check-ins and resource distribution.",
      source: "Apify Crawler (FB Public Group)",
      category: "Growth & Money",
      bridge: "Scalable Multi-Channel Backend Operations Architecture",
      tavily: "Group coaching backend scalable automation systems"
    }
  ];

  // Proposal Database (Module 1 - ENGLISH OUTPUT)
  const PROPOSALS = [
    {
      topic: "Why having more clients leads to less time for actual coaching",
      format: "Carousel",
      pillar: "40_Pain",
      insight: "Coaches spend up to 4 hours daily on repetitive admin work instead of high-value transformation.",
      headline: "FULLY BOOKED.<br><span class=\"highlight\">YET OVERWHELMED.</span>",
      heroWord: "OVERWHELMED"
    },
    {
      topic: "Systems exist not to work more — but to remember less",
      format: "Static",
      pillar: "30_System",
      insight: "Calm operations philosophy derived from 10 years in enterprise banking systems.",
      headline: "SYSTEMS EXIST TO<br><span class=\"highlight\">FREE YOUR MIND.</span>",
      heroWord: "FREEDOM"
    },
    {
      topic: "Behind the scenes: Scaling 1,000+ orders/month with only 3 people",
      format: "Reel",
      pillar: "20_Proof",
      insight: "Proof of lean operational efficiency using standardized Notion 7-Module Business OS.",
      headline: "1,000+ ORDERS.<br><span class=\"highlight\">JUST 3 OPERATORS.</span>",
      heroWord: "EFFICIENCY"
    }
  ];

  // Tab Switching Logic
  function switchTab(tabId) {
    tabPanels.forEach(p => p.classList.remove('active'));
    stepTabs.forEach(t => t.classList.remove('active'));

    const targetPanel = document.getElementById(tabId);
    const targetTab = document.querySelector(`.step-tab[data-tab="${tabId}"]`);

    if (targetPanel) targetPanel.classList.add('active');
    if (targetTab) targetTab.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  stepTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // =========================================================================
  // MODULE 0: INTAKE & RESEARCH LOGIC
  // =========================================================================
  const signalItems = document.querySelectorAll('.signal-item');
  const m0CurTitle = document.getElementById('m0-cur-title');
  const m0CurQuote = document.getElementById('m0-cur-quote');
  const m0CurBridge = document.getElementById('m0-cur-bridge');
  const btnPushToM1 = document.getElementById('btn-push-to-m1');
  const btnTriggerApify = document.getElementById('btn-trigger-apify');
  const btnSimulateTelegram = document.getElementById('btn-simulate-telegram');
  let selectedSignalIdx = 0;

  function renderSelectedSignal(idx) {
    selectedSignalIdx = idx;
    signalItems.forEach((el, i) => {
      if (i === idx) el.classList.add('active');
      else el.classList.remove('active');
    });

    const sig = SIGNALS[idx];
    if (sig) {
      m0CurTitle.textContent = sig.title;
      m0CurQuote.textContent = `"${sig.quote}"`;
      m0CurBridge.textContent = sig.bridge;
    }
  }

  signalItems.forEach((item, idx) => {
    item.addEventListener('click', () => renderSelectedSignal(idx));
  });

  document.querySelectorAll('.btn-select-signal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-signal-idx'), 10);
      renderSelectedSignal(idx);
      switchTab('tab-m1');
      showToast(`⚡ Selected Signal "${SIGNALS[idx].id}" pushed to Module 1 Planning!`);
    });
  });

  btnPushToM1.addEventListener('click', () => {
    switchTab('tab-m1');
    showToast(`⚡ Signal "${SIGNALS[selectedSignalIdx].id}" pushed to Module 1 Planning!`);
  });

  btnTriggerApify.addEventListener('click', () => {
    btnTriggerApify.textContent = "⏳ Scraping via Apify Actor...";
    btnTriggerApify.disabled = true;
    setTimeout(() => {
      btnTriggerApify.textContent = "🔄 Kích hoạt Apify Crawl (FB Public)";
      btnTriggerApify.disabled = false;
      showToast("✅ Apify Crawl complete: Ingested 18 raw posts from FB Public Groups!");
    }, 850);
  });

  btnSimulateTelegram.addEventListener('click', () => {
    btnSimulateTelegram.textContent = "⏳ Running Telegram OCR Vision...";
    btnSimulateTelegram.disabled = true;
    setTimeout(() => {
      btnSimulateTelegram.textContent = "📱 Nhận Tin Telegram OCR (Private)";
      btnSimulateTelegram.disabled = false;
      showToast("✅ Telegram OCR Vision: Extracted verbatim text from Private Group screenshot!");
    }, 750);
  });

  // =========================================================================
  // MODULE 1: STRATEGY & PLANNING LOGIC
  // =========================================================================
  const btnRunPlanner = document.getElementById('btn-run-planner');

  document.querySelectorAll('.btn-select-proposal').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-prop-idx'), 10);
      loadProposalToM2(idx);
      switchTab('tab-m2');
      showToast("🚀 Loaded weekly proposal into Module 2 Spec Production!");
    });
  });

  btnRunPlanner.addEventListener('click', () => {
    btnRunPlanner.textContent = "⏳ AI Strategist & Planner running...";
    btnRunPlanner.disabled = true;
    setTimeout(() => {
      btnRunPlanner.textContent = "⚡ Chạy AI Planner (8h Sáng Thứ Hai)";
      btnRunPlanner.disabled = false;
      showToast("✅ Planning complete: 3 weekly proposals balanced at 40-30-20-10 ratio!");
    }, 850);
  });

  function loadProposalToM2(idx) {
    const prop = PROPOSALS[idx];
    if (!prop) return;

    inputTopic.value = prop.topic;
    selectFormat.value = prop.format;
    selectPillar.value = prop.pillar;
    inputInsight.value = prop.insight;
  }

  // =========================================================================
  // MODULE 2: CONTENT SPEC PRODUCTION LOGIC (ENGLISH OUTPUT)
  // =========================================================================
  const inputTopic = document.getElementById('input-topic');
  const selectFormat = document.getElementById('select-format');
  const selectPillar = document.getElementById('select-pillar');
  const inputInsight = document.getElementById('input-insight');
  const btnGenerate = document.getElementById('btn-generate');
  const formAlert = document.getElementById('form-alert');

  const btnPresetHappy = document.getElementById('btn-preset-happy');
  const btnPresetBad = document.getElementById('btn-preset-bad');

  const outputEmpty = document.getElementById('output-empty');
  const outputContent = document.getElementById('output-content');
  const btnCopyJson = document.getElementById('btn-copy-json');
  const btnPushToM3 = document.getElementById('btn-push-to-m3');

  // Carousel Elements
  const slideHeadline = document.getElementById('slide-headline');
  const slideSubtext = document.getElementById('slide-subtext');
  const slideTag = document.getElementById('slide-tag');
  const slideBadge = document.getElementById('slide-number-badge');
  const slideVisualNotes = document.getElementById('slide-visual-notes');
  const slideCounter = document.getElementById('slide-counter');
  const btnSlidePrev = document.getElementById('btn-slide-prev');
  const btnSlideNext = document.getElementById('btn-slide-next');
  const carouselDots = document.getElementById('carousel-dots');
  const activeSlideCard = document.getElementById('active-slide-card');

  // Spec Details Elements
  const outHookText = document.getElementById('out-hook-text');
  const outCaption = document.getElementById('out-caption');
  const captionWordCount = document.getElementById('caption-word-count');
  const outCta = document.getElementById('out-cta');
  const outDmKeyword = document.getElementById('out-dm-keyword');
  const outVisualConcept = document.getElementById('out-visual-concept');
  const outPexelsList = document.getElementById('out-pexels-list');
  const jsonViewer = document.getElementById('json-viewer');

  // Quality Gates
  const gateColor = document.getElementById('gate-color');
  const gateTypo = document.getElementById('gate-typo');
  const gateBlacklist = document.getElementById('gate-blacklist');
  const gateCta = document.getElementById('gate-cta');
  const gateVoice = document.getElementById('gate-voice');
  const gateHonesty = document.getElementById('gate-honesty');

  // Presets
  btnPresetHappy.addEventListener('click', () => {
    loadProposalToM2(0);
    hideAlert();
    showToast("Loaded Happy Path (TC-1): Fully booked yet overwhelmed");
  });

  btnPresetBad.addEventListener('click', () => {
    inputTopic.value = "";
    inputInsight.value = "";
    hideAlert();
    showToast("Loaded Bad Input (TC-2)");
  });

  // Generate Spec Event
  btnGenerate.addEventListener('click', () => {
    const topic = inputTopic.value.trim();
    const format = selectFormat.value;
    const pillar = selectPillar.value;
    const insight = inputInsight.value.trim();

    if (!topic || !format) {
      showAlert("error", "⚠️ THIEU_DU_LIEU: Please provide both Topic and Format!");
      resetQualityGates();
      return;
    }

    hideAlert();
    btnGenerate.innerHTML = `⏳ Generating Full Spec (English)...`;
    btnGenerate.disabled = true;

    setTimeout(() => {
      generateFullSpecEnglish(topic, format, pillar, insight);
      btnGenerate.innerHTML = `⚡ Tạo Full Spec & Storyboard (D1/D2)`;
      btnGenerate.disabled = false;
      showToast("✨ Generated 5-Slide Full Spec (English) successfully!");
    }, 450);
  });

  // English Content Spec Generator
  function generateFullSpecEnglish(topic, format, pillar, insight) {
    const contentId = "IG-" + new Date().toISOString().slice(2, 10).replace(/-/g, '') + "-FOCUS";

    const storyboard = [
      {
        slide_or_frame: 1,
        headline: "FULLY BOOKED.<br><span class=\"highlight\">YET OVERWHELMED.</span>",
        subtext: "Why the more coaching clients you sign, the less time you have for actual coaching.",
        visual_notes: "Minimalist executive workspace, closed leather planner, calm natural morning lighting.",
        colors: "#0B1B3D (Background) + #F4F5F7 (Text) + #EDE0C8 (Accent)",
        fonts: "Barber Fill (Headline), Montserrat (Tag), DM Sans (Body)"
      },
      {
        slide_or_frame: 2,
        headline: "3 BOTTLENECKS DRAINING<br><span class=\"highlight\">YOUR DAILY ENERGY</span>",
        subtext: "1. Answering repetitive consultation DMs.\n2. Manual back-and-forth calendar scheduling.\n3. Chasing invoices & sending Zoom links by hand.",
        visual_notes: "Clean 3-block structure with generous whitespace on Light Pearl background.",
        colors: "#F4F5F7 (Background) + #0B1B3D (Text) + #4A607A (Secondary)",
        fonts: "Barber Fill (Headline), Montserrat (Subheading), DM Sans (Body)"
      },
      {
        slide_or_frame: 3,
        headline: "COACHING VALUE DROPS<br><span class=\"highlight\">WHEN ATTENTION IS FRAGMENTED</span>",
        subtext: "When 4 hours of your day are lost to administrative friction, you enter client sessions depleted instead of fully present.",
        visual_notes: "Hands writing in a journal with composed focus, zero desk clutter.",
        colors: "#0B1B3D (Background) + #F4F5F7 (Text) + #EDE0C8 (Accent)",
        fonts: "Barber Fill (Headline), Montserrat (Subheading), DM Sans (Body)"
      },
      {
        slide_or_frame: 4,
        headline: "THE FIX: DELEGATE<br><span class=\"highlight\">3 STEPS TO SYSTEMS</span>",
        subtext: "• Automated client onboarding intake.\n• Intelligent calendar sync with zero double-booking.\n• Automated meeting room generation and reminders.",
        visual_notes: "Minimalist 3-step linear flow diagram with elegant thin gold lines.",
        colors: "#F4F5F7 (Background) + #0B1B3D (Text) + #4A607A (Secondary)",
        fonts: "Barber Fill (Headline), Montserrat (Subheading), DM Sans (Body)"
      },
      {
        slide_or_frame: 5,
        headline: "RECLAIM 4 HOURS OF<br><span class=\"highlight\">DEEP WORK EVERY DAY.</span>",
        subtext: "Send a direct message with \"SYSTEM\" to receive our complimentary 7-Module Notion Business OS Audit for Coaches.",
        visual_notes: "Deep Ocean premium background with high-contrast Warm Champagne CTA badge.",
        colors: "#0B1B3D (Background) + #EDE0C8 (Accent Text)",
        fonts: "Barber Fill (Headline), Montserrat (Tag), DM Sans (Body)"
      }
    ];

    const hook = "Your calendar is booked solid. But 4 hours of every day are lost in repetitive DMs and manual scheduling.";

    const caption = `Your calendar is booked solid. But 4 hours of every day are lost in repetitive DMs and manual scheduling.

As your client roster grows, operational fragmentation starts eroding the energy you need for high-tier transformation.

Systems are not built so you can work more. Systems are built so you have fewer things to remember.

Here are 3 core pillars to automate immediately:
1. Centralized intake and seamless payment processing.
2. Automated calendar synchronization with instant Zoom link delivery.
3. A single-screen Notion client tracking portal.

You were born to guide humans, not to act as your own admin assistant.

DM "SYSTEM" to receive our 7-Module Notion Business OS Audit.`;

    const fullSpec = {
      content_id: contentId,
      topic: topic,
      platform: "Instagram",
      format: format,
      framework_bucket: pillar,
      hook: hook,
      caption: caption,
      cta: "DM \"SYSTEM\" to receive our 7-Module Notion Business OS Audit.",
      dm_keyword: "SYSTEM",
      storyboard: storyboard,
      visual_direction: {
        concept: "Minimalist calm workspace, hands writing in leather notebook, deep ocean tones, clean negative space.",
        reference_search_links: [
          "https://www.pexels.com/search/minimalist%20workspace%20desk/",
          "https://www.pexels.com/search/hands%20writing%20notebook%20calm/"
        ],
        color_palette: ["#0B1B3D", "#F4F5F7", "#EDE0C8", "#4A607A", "#C8CDD4"],
        typography_spec: "Barber Fill (Headline) / Montserrat (Subheading) / DM Sans (Body)"
      },
      qa_checklist: {
        color_check: "PASS",
        typography_check: "PASS",
        blacklist_check: "PASS",
        cta_alignment_check: "PASS",
        voice_check: "PASS",
        honesty_check: "PASS"
      }
    };

    currentSpec = fullSpec;
    renderSpecToUI(fullSpec);
    syncSpecToModule3(fullSpec);
  }

  function renderSpecToUI(spec) {
    outputEmpty.classList.add('hidden');
    outputContent.classList.remove('hidden');

    outHookText.textContent = spec.hook;
    outCaption.textContent = spec.caption;
    captionWordCount.textContent = spec.caption.split(/\s+/).filter(Boolean).length;
    outCta.textContent = spec.cta;
    outDmKeyword.textContent = spec.dm_keyword;
    outVisualConcept.textContent = spec.visual_direction.concept;

    outPexelsList.innerHTML = spec.visual_direction.reference_search_links.map(url => 
      `<li><a href="${url}" target="_blank" rel="noopener">🔗 ${url.replace('https://', '')}</a></li>`
    ).join('');

    jsonViewer.textContent = JSON.stringify(spec, null, 2);

    currentSlideIndex = 0;
    renderSlide(currentSlideIndex);
    updateQualityGatesPass();
  }

  function renderSlide(index) {
    if (!currentSpec || !currentSpec.storyboard) return;

    const slides = currentSpec.storyboard;
    const slide = slides[index];

    activeSlideCard.style.opacity = '0';
    activeSlideCard.style.transform = 'translateY(6px)';

    setTimeout(() => {
      slideHeadline.innerHTML = slide.headline;
      slideSubtext.innerHTML = slide.subtext.replace(/\n/g, '<br>');
      slideBadge.textContent = String(slide.slide_or_frame).padStart(2, '0');
      slideVisualNotes.textContent = "📷 " + slide.visual_notes;
      slideCounter.textContent = `Slide ${index + 1} / ${slides.length}`;

      const highlightEl = slideHeadline.querySelector('.highlight');

      // High-contrast Theme Switching
      if (slide.colors.includes('#F4F5F7 (Background)') || slide.colors.includes('#F4F5F7 (Nền)')) {
        activeSlideCard.classList.add('light-card');
        activeSlideCard.style.backgroundColor = '#F4F5F7';
        activeSlideCard.style.borderColor = '#4A607A';
        slideHeadline.style.color = '#0B1B3D';
        if (highlightEl) highlightEl.style.color = '#8C6D37'; // High-contrast Bronze
        slideSubtext.style.color = '#1E293B';
        slideTag.style.color = '#4A607A';
        slideBadge.style.backgroundColor = 'rgba(74, 96, 122, 0.15)';
        slideBadge.style.color = '#0B1B3D';
      } else {
        activeSlideCard.classList.remove('light-card');
        activeSlideCard.style.backgroundColor = '#0B1B3D';
        activeSlideCard.style.borderColor = '#EDE0C8';
        slideHeadline.style.color = '#F4F5F7';
        if (highlightEl) highlightEl.style.color = '#EDE0C8'; // Warm Champagne on Dark
        slideSubtext.style.color = '#E2E8F0';
        slideTag.style.color = '#EDE0C8';
        slideBadge.style.backgroundColor = 'rgba(237, 224, 200, 0.15)';
        slideBadge.style.color = '#EDE0C8';
      }

      const dots = carouselDots.querySelectorAll('.dot');
      dots.forEach((d, i) => {
        if (i === index) d.classList.add('active');
        else d.classList.remove('active');
      });

      activeSlideCard.style.opacity = '1';
      activeSlideCard.style.transform = 'translateY(0)';
    }, 120);
  }

  btnSlidePrev.addEventListener('click', () => {
    if (!currentSpec) return;
    currentSlideIndex = currentSlideIndex > 0 ? currentSlideIndex - 1 : currentSpec.storyboard.length - 1;
    renderSlide(currentSlideIndex);
  });

  btnSlideNext.addEventListener('click', () => {
    if (!currentSpec) return;
    currentSlideIndex = currentSlideIndex < currentSpec.storyboard.length - 1 ? currentSlideIndex + 1 : 0;
    renderSlide(currentSlideIndex);
  });

  carouselDots.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
      currentSlideIndex = parseInt(e.target.getAttribute('data-index'), 10);
      renderSlide(currentSlideIndex);
    }
  });

  btnCopyJson.addEventListener('click', () => {
    if (!currentSpec) {
      showToast("⚠️ No spec available to copy!");
      return;
    }
    navigator.clipboard.writeText(JSON.stringify(currentSpec, null, 2)).then(() => {
      showToast("📋 Copied Full Spec JSON (English) to Clipboard!");
    });
  });

  btnPushToM3.addEventListener('click', () => {
    if (!currentSpec) {
      generateFullSpecEnglish(PROPOSALS[0].topic, PROPOSALS[0].format, PROPOSALS[0].pillar, PROPOSALS[0].insight);
    }
    switchTab('tab-m3');
    showToast("🎨 Navigated to Module 3 Render & Distribution!");
  });

  function updateQualityGatesPass() {
    [gateColor, gateTypo, gateBlacklist, gateCta, gateVoice, gateHonesty].forEach(g => {
      g.classList.add('pass');
      g.querySelector('.gate-status').textContent = 'PASS';
      g.querySelector('.gate-status').className = 'gate-status';
    });
  }

  function resetQualityGates() {
    [gateColor, gateTypo, gateBlacklist, gateCta, gateVoice, gateHonesty].forEach(g => {
      g.classList.remove('pass');
      g.querySelector('.gate-status').textContent = 'READY';
      g.querySelector('.gate-status').className = 'gate-status status-pending';
    });
  }

  // =========================================================================
  // MODULE 3: VISUAL RENDER & DISTRIBUTION LOGIC (ENGLISH OUTPUT)
  // =========================================================================
  const btnRenderPreview = document.getElementById('btn-render-preview');
  const rcHeroText = document.getElementById('rc-hero-text');
  const rcSubText = document.getElementById('rc-sub-text');
  const m3CaptionPreview = document.getElementById('m3-caption-preview');
  const m3ApprovalSelect = document.getElementById('m3-approval-select');
  const btnPublishMeta = document.getElementById('btn-publish-meta');
  const publishStatusText = document.getElementById('publish-status-text');
  const m3PublishLog = document.getElementById('m3-publish-log');
  const m3RenderStatus = document.getElementById('m3-render-status');
  const btnPushToM4 = document.getElementById('btn-push-to-m4');

  function syncSpecToModule3(spec) {
    if (!spec) return;
    rcHeroText.textContent = "FREEDOM";
    rcSubText.textContent = "isn't fewer clients — it's fewer things to remember.";
    m3CaptionPreview.textContent = spec.caption.slice(0, 95) + "...";
  }

  btnRenderPreview.addEventListener('click', () => {
    btnRenderPreview.textContent = "⏳ Puppeteer rendering 1080x1350...";
    btnRenderPreview.disabled = true;
    m3RenderStatus.textContent = "Rendering...";

    setTimeout(() => {
      btnRenderPreview.textContent = "🎨 Render Mockup HTML/CSS (Puppeteer)";
      btnRenderPreview.disabled = false;
      m3RenderStatus.textContent = "Render: Complete (2160x2700)";
      showToast("✅ Rendered high-resolution 4:5 visual frame (English)!");
    }, 650);
  });

  // HITL Approval Gate Control
  function checkApprovalGate() {
    const val = m3ApprovalSelect.value;
    if (val === 'Approved') {
      btnPublishMeta.disabled = false;
      publishStatusText.textContent = "✅ Unlocked: Content spec approved by Trang, ready for Meta API publication.";
      publishStatusText.style.color = "#10B981";
    } else if (val === 'Pending') {
      btnPublishMeta.disabled = true;
      publishStatusText.textContent = "⏳ Safety Lock Active: Set status to 'Approved' to enable publishing.";
      publishStatusText.style.color = "#F87171";
    } else {
      btnPublishMeta.disabled = true;
      publishStatusText.textContent = "⚠️ Changes Requested: Please revise spec in Module 2.";
      publishStatusText.style.color = "#F59E0B";
    }
  }

  m3ApprovalSelect.addEventListener('change', checkApprovalGate);
  checkApprovalGate();

  btnPublishMeta.addEventListener('click', () => {
    btnPublishMeta.textContent = "⏳ Publishing via Meta Business Graph API...";
    btnPublishMeta.disabled = true;

    setTimeout(() => {
      btnPublishMeta.textContent = "🚀 Published to Instagram!";
      m3PublishLog.classList.remove('hidden');
      showToast("🎉 Successfully published to Instagram Business Feed!");
    }, 1100);
  });

  if (btnPushToM4) {
    btnPushToM4.addEventListener('click', () => {
      switchTab('tab-m4');
      showToast("📊 Chuyển sang Module 4: Đánh giá hiệu quả bài đăng & Tối ưu luồng!");
    });
  }

  // =========================================================================
  // MODULE 4: WEEKLY PERFORMANCE & CONTINUOUS CALIBRATION
  // =========================================================================
  const btnRunAnalytics = document.getElementById('btn-run-analytics');
  const btnCalibrateWorkflow = document.getElementById('btn-calibrate-workflow');
  const btnApplyCalibration = document.getElementById('btn-apply-calibration');

  if (btnRunAnalytics) {
    btnRunAnalytics.addEventListener('click', () => {
      btnRunAnalytics.textContent = "⏳ Pulling Meta Graph API Insights...";
      btnRunAnalytics.disabled = true;
      setTimeout(() => {
        btnRunAnalytics.textContent = "📈 Kéo Số Liệu Meta Insights Mới Nhất";
        btnRunAnalytics.disabled = false;
        showToast("✅ Pulled live metrics: Reach 14,850 · 48 DMs triggered · Saves +62%!");
      }, 750);
    });
  }

  if (btnCalibrateWorkflow) {
    btnCalibrateWorkflow.addEventListener('click', () => {
      btnCalibrateWorkflow.textContent = "⏳ Analyzing winning patterns...";
      btnCalibrateWorkflow.disabled = true;
      setTimeout(() => {
        btnCalibrateWorkflow.textContent = "🔄 Tự Động Hiệu Chỉnh Workflow Tuần Tới";
        btnCalibrateWorkflow.disabled = false;
        showToast("🎯 Calibrated: Increased 40_Pain ratio to 45%, prioritized 5-slide Carousel format!");
      }, 800);
    });
  }

  if (btnApplyCalibration) {
    btnApplyCalibration.addEventListener('click', () => {
      switchTab('tab-m1');
      showToast("⚡ Applied calibration to Module 1 Planning: 45% Pain / 25% System / 20% Proof / 10% Brand!");
    });
  }

  // =========================================================================
  // UTILITIES
  // =========================================================================
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  }

  function showAlert(type, msg) {
    formAlert.textContent = msg;
    formAlert.className = `alert-box ${type}`;
    formAlert.classList.remove('hidden');
  }

  function hideAlert() {
    formAlert.classList.add('hidden');
  }
});
