/**
 * ChromaFolks & Co — Main Application Script
 * Dynamic Theme Engine, Interactive Demos, Case Study Modal, and Scope Calculator
 */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------------
  // 1. BRAND THEME & PALETTE SYSTEM
  // -------------------------------------------------------------------------

  const THEMES = {
    'caviar-gold': {
      name: 'Caviar & Champagne Gold',
      desc: 'Ultra-Luxury Agency &bull; Brushed Gold + Obsidian',
      accent: '#e5c07b'
    },
    'imperial-emerald': {
      name: 'Imperial Emerald & Onyx',
      desc: 'Prestige Tech &bull; Radiant Jade + Onyx',
      accent: '#00e599'
    },
    'titanium-stealth': {
      name: 'Titanium Stealth & Silver',
      desc: 'Monolith Studio &bull; Liquid Platinum + Carbon',
      accent: '#ffffff'
    },
    'kyoto-sapphire': {
      name: 'Kyoto Sapphire & Navy',
      desc: 'Architectural Elite &bull; Royal Ink + Sapphire',
      accent: '#3b82f6'
    },
    'electric-chroma': {
      name: 'Electric Chroma',
      desc: 'Studio Signature &bull; Neon Violet + Mint',
      accent: '#6366f1'
    },
    'acid-minimalist': {
      name: 'Acid Minimalist',
      desc: 'Bold Gen-Z &bull; Electric Citron + Black',
      accent: '#d2ff00'
    },
    'sunset-mirage': {
      name: 'Sunset Mirage',
      desc: 'Creator Warmth &bull; Peach + Cosmic Violet',
      accent: '#ff6b6b'
    },
    'nordic-editorial': {
      name: 'Nordic Editorial',
      desc: 'Clean Light &bull; Alabaster + Ink Studio',
      accent: '#4f46e5'
    }
  };

  const htmlRoot = document.documentElement;
  const themeDropdownBtn = document.getElementById('themeDropdownBtn');
  const themeDropdownMenu = document.getElementById('themeDropdownMenu');
  const activePaletteLabel = document.getElementById('active-palette-label');
  const footerPaletteDisplay = document.getElementById('footerPaletteDisplay');
  const quickPaletteBtn = document.getElementById('quick-palette-name');

  // Load saved theme or default to the ultra-luxury flagship 'caviar-gold'
  const savedTheme = localStorage.getItem('chromafolks_theme') || 'caviar-gold';
  setTheme(savedTheme, false);

  function setTheme(themeKey, saveToStorage = true) {
    if (!THEMES[themeKey]) return;

    htmlRoot.setAttribute('data-theme', themeKey);
    if (saveToStorage) {
      localStorage.setItem('chromafolks_theme', themeKey);
    }

    const themeData = THEMES[themeKey];
    if (activePaletteLabel) activePaletteLabel.textContent = themeData.name;
    if (footerPaletteDisplay) footerPaletteDisplay.textContent = themeData.name;

    // Update dropdown active status
    document.querySelectorAll('.theme-opt-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-set-theme') === themeKey);
    });

    // Update Palette Lab active card highlight
    document.querySelectorAll('.palette-card').forEach(card => {
      const isCurrent = card.getAttribute('data-palette') === themeKey;
      card.classList.toggle('active-palette-card', isCurrent);
      const applyBtn = card.querySelector('.palette-apply-btn');
      if (applyBtn) {
        applyBtn.textContent = isCurrent ? 'Active Palette' : 'Activate Theme';
        applyBtn.style.background = isCurrent ? 'var(--accent-primary)' : '';
        applyBtn.style.color = isCurrent ? '#000' : '';
      }
    });
  }

  // Dropdown toggle
  if (themeDropdownBtn && themeDropdownMenu) {
    themeDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = themeDropdownMenu.classList.toggle('open');
      themeDropdownBtn.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!themeDropdownMenu.contains(e.target) && !themeDropdownBtn.contains(e.target)) {
        themeDropdownMenu.classList.remove('open');
        themeDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Theme option clicks
  document.querySelectorAll('[data-set-theme]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const themeKey = btn.getAttribute('data-set-theme');
      setTheme(themeKey, true);
      if (themeDropdownMenu) themeDropdownMenu.classList.remove('open');
      showToast(`Activated ${THEMES[themeKey].name} palette!`);
    });
  });

  if (quickPaletteBtn) {
    quickPaletteBtn.addEventListener('click', () => {
      const lab = document.getElementById('palette-lab');
      if (lab) lab.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // -------------------------------------------------------------------------
  // 2. SWATCH CLICK TO COPY & TOAST NOTIFICATION
  // -------------------------------------------------------------------------

  const copyToast = document.getElementById('copy-toast');
  let toastTimer = null;

  function showToast(message) {
    if (!copyToast) return;
    copyToast.textContent = message;
    copyToast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      copyToast.classList.remove('show');
    }, 2500);
  }

  document.querySelectorAll('.swatch-item').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.getAttribute('data-hex');
      if (hex) {
        navigator.clipboard.writeText(hex).then(() => {
          showToast(`Copied ${hex} to clipboard!`);
        }).catch(() => {
          showToast(`Color: ${hex}`);
        });
      }
    });
  });

  // -------------------------------------------------------------------------
  // 3. MOBILE MENU TOGGLE
  // -------------------------------------------------------------------------

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavFlyout = document.getElementById('mobileNavFlyout');

  if (mobileMenuBtn && mobileNavFlyout) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavFlyout.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavFlyout.classList.remove('open');
      });
    });
  }

  // -------------------------------------------------------------------------
  // 4. INTERACTIVE APP PREVIEW SANDBOX (Pillar 1)
  // -------------------------------------------------------------------------

  const screenDisplay = document.getElementById('interactiveScreenDisplay');
  const screenTabs = document.querySelectorAll('.screen-tab');

  const SCREEN_TEMPLATES = {
    wallet: `
      <div class="mock-device-preview">
        <div class="device-status-bar">
          <span>9:41</span>
          <span>5G 􀛨 100%</span>
        </div>
        <div class="device-dynamic-content">
          <div class="card-glow-preview">
            <span class="card-badge">Horizon Global Pay</span>
            <div class="card-num">&bull;&bull;&bull;&bull; 8892</div>
            <div class="card-bal">$84,390.20</div>
          </div>
          <div class="action-grid-3">
            <div class="action-circle">⬆️ Transfer</div>
            <div class="action-circle">⬇️ Request</div>
            <div class="action-circle">📊 Staking</div>
          </div>
          <div class="activity-feed">
            <div class="activity-row">
              <span class="dot"></span>
              <span>App Store Payout</span>
              <strong class="plus">+$12,400.00</strong>
            </div>
            <div class="activity-row">
              <span class="dot"></span>
              <span>Cloud Server Infra</span>
              <strong class="minus">-$189.50</strong>
            </div>
          </div>
        </div>
      </div>
    `,
    fitness: `
      <div class="mock-device-preview">
        <div class="device-status-bar">
          <span>9:41</span>
          <span>GPS 􀛨 ACTIVE</span>
        </div>
        <div class="device-dynamic-content">
          <div class="card-glow-preview" style="background: linear-gradient(135deg, #10b981, #06b6d4);">
            <span class="card-badge">Kinetix AI Coach</span>
            <div class="card-num">HIIT &bull; Day 24 Streak</div>
            <div class="card-bal">740 kcal 🔥</div>
          </div>
          <div class="action-grid-3">
            <div class="action-circle">⏱️ 42m</div>
            <div class="action-circle">💓 148 bpm</div>
            <div class="action-circle">🎯 98% Form</div>
          </div>
          <div class="activity-feed">
            <div class="activity-row">
              <span class="dot" style="background: #10b981;"></span>
              <span>AI Pose Tracker: Perfect Depth</span>
              <strong class="plus">+50 XP</strong>
            </div>
            <div class="activity-row">
              <span class="dot" style="background: #06b6d4;"></span>
              <span>Weekly Milestone Unlocked</span>
              <strong class="plus">Top 3%</strong>
            </div>
          </div>
        </div>
      </div>
    `,
    'social-app': `
      <div class="mock-device-preview">
        <div class="device-status-bar">
          <span>9:41</span>
          <span>CREATOR PRO</span>
        </div>
        <div class="device-dynamic-content">
          <div class="card-glow-preview" style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: #fff;">
            <span class="card-badge" style="color: #fff;">Viral Analytics</span>
            <div class="card-num">30-Day Growth Engine</div>
            <div class="card-bal" style="color: #fff;">2.8M Views</div>
          </div>
          <div class="action-grid-3">
            <div class="action-circle">📈 +340%</div>
            <div class="action-circle">👥 48k Fans</div>
            <div class="action-circle">💬 9.2k Shares</div>
          </div>
          <div class="activity-feed">
            <div class="activity-row">
              <span class="dot" style="background: #ec4899;"></span>
              <span>Reel Hook: "Zero to 1M"</span>
              <strong class="plus">Viral (840k)</strong>
            </div>
            <div class="activity-row">
              <span class="dot" style="background: #8b5cf6;"></span>
              <span>TikTok Audio Trend Match</span>
              <strong class="plus">99% Fit</strong>
            </div>
          </div>
        </div>
      </div>
    `
  };

  screenTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      screenTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const screenKey = tab.getAttribute('data-screen');
      if (screenDisplay && SCREEN_TEMPLATES[screenKey]) {
        screenDisplay.style.opacity = '0';
        setTimeout(() => {
          screenDisplay.innerHTML = SCREEN_TEMPLATES[screenKey];
          screenDisplay.style.opacity = '1';
        }, 150);
      }
    });
  });

  // -------------------------------------------------------------------------
  // 5. PORTFOLIO FILTERING
  // -------------------------------------------------------------------------

  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 6. CASE STUDY DETAIL MODAL DATA & CONTROLLER
  // -------------------------------------------------------------------------

  const CASE_STUDIES = {
    velox: {
      title: "Velox Pay — Frictionless Global Wallet",
      category: "Mobile App (iOS & Android) & Design System",
      client: "Velox Technologies (San Francisco / London)",
      challenge: "Velox was experiencing a 42% drop-off rate during user identity verification and card linking. The legacy interface was cluttered with technical crypto jargon that alienated young professional users.",
      solution: "ChromaFolks designed a streamlined 3-step biometric onboarding, introduced spatial micro-haptics for transaction confirmation, and engineered an ultra-minimalist dark UI design system with dynamic spending sparklines.",
      metrics: [
        { label: "App Store Rating", val: "4.9★ (38k Reviews)" },
        { label: "Drop-off Reduction", val: "-42% Abandonment" },
        { label: "Daily Active Users", val: "+140% in 90 Days" },
        { label: "Funding Round", val: "$22M Series B" }
      ],
      deliverables: ["iOS & Android Figma Architecture", "Design Tokens & Tailwind Specs", "Haptic Motion Library", "App Store Video Previews"]
    },
    aura: {
      title: "Aura Botanicals — Viral DTC Social Overhaul",
      category: "Social Media Handling & Creative Direction",
      client: "Aura Botanicals (New York)",
      challenge: "Aura had a high-end clean skincare product line but almost zero traction on TikTok or Instagram. Their feed looked like stale stock photos with poor engagement (under 200 views per post).",
      solution: "We took over their creative direction completely: scripted 3-second 'sensory ASMR' visual hooks, built a cohesive pastel-mirage aesthetic grid, and orchestrated a continuous 30-day UGC creator flywheel with custom trending sound curation.",
      metrics: [
        { label: "Follower Growth", val: "1.2k to 240,000" },
        { label: "Organic Views", val: "18.4M+ Impressions" },
        { label: "Attributed Revenue", val: "$1.2M in Q2" },
        { label: "Viral Videos", val: "14 Posts > 1M Views" }
      ],
      deliverables: ["16x Monthly 4K Reels/TikToks", "Aesthetic 9-Grid Template System", "Audio Trend Algorithm Radar", "Creator Outreach Scripting"]
    },
    kinetix: {
      title: "Kinetix AI — Spatial Motion Fitness Coach",
      category: "Mobile App & WatchOS Ecosystem",
      client: "Kinetix Health Labs (Zurich / Austin)",
      challenge: "Real-time computer vision workout feedback is technically complex. Existing apps overwhelmed users with confusing skeletal overlays and clinical data graphs during heavy exercise.",
      solution: "We developed a high-contrast, minimalist HUD interface that uses subtle peripheral color pulses (neon mint for correct posture, coral for misalignment) so users don't need to stare at their phone while lifting.",
      metrics: [
        { label: "30-Day Retention", val: "88% (Industry Avg: 24%)" },
        { label: "App of the Day", val: "Apple App Store Feature" },
        { label: "Daily Workouts", val: "320,000+ Completed" },
        { label: "Average Session", val: "38.5 Minutes" }
      ],
      deliverables: ["SwiftUI-Ready UI Architecture", "WatchOS Companion Interface", "Sound & Haptic Feedback System", "Interactive Prototype"]
    },
    drift: {
      title: "Drift Supply — Hype-Drop Social Rollout",
      category: "Social Media Engine & Viral Campaign",
      client: "Drift Supply Streetwear (Tokyo / Los Angeles)",
      challenge: "Launching a limited 500-piece outerwear drop with zero paid ads, strictly relying on Gen-Z culture, meme pacing, and social urgency.",
      solution: "Engineered a cinematic 14-day countdown strategy featuring grainy VHS behind-the-scenes teasers, cryptic scavenger hunt clues hidden in TikTok audio waveforms, and exclusive Instagram Broadcast Channel drops.",
      metrics: [
        { label: "Drop Sell-Out Time", val: "4 Minutes Flat" },
        { label: "Waitlist Size", val: "320,000 Registered" },
        { label: "Engagement Rate", val: "18.4% on Reels" },
        { label: "Paid Ad Spend", val: "$0 (100% Organic)" }
      ],
      deliverables: ["Kinetic Motion Video Series", "Broadcast Channel Visual Assets", "Countdown Sticker System", "Post-Drop Community Hype Loop"]
    },
    synthetix: {
      title: "Synthetix AI — Autonomous Command Center",
      category: "SaaS Dashboard & Enterprise Design System",
      client: "Synthetix AI (San Francisco)",
      challenge: "Autonomous multi-agent AI systems generate thousands of concurrent events. Engineering managers were suffering cognitive overload trying to visualize task trees and token budgets.",
      solution: "Created an obsidian dark-mode interface featuring modular glassmorphism cards, dynamic node graph clustering, and real-time latency monitors that make orchestrating 100+ agents feel like flying a spacecraft.",
      metrics: [
        { label: "Task Completion Speed", val: "3.8x Faster Debugging" },
        { label: "Enterprise Adoption", val: "12 Fortune 500 Teams" },
        { label: "Series A Raised", val: "$18M Led by Top Tier VC" },
        { label: "User NPS Score", val: "+74" }
      ],
      deliverables: ["Desktop SaaS Web Application UX", "Component Library (200+ Variants)", "Interactive Graph Canvas UI", "Design Tokens for React"]
    },
    'chroma-identity': {
      title: "ChromaFolks & Co — Studio Brand Architecture",
      category: "Brand Identity, Iconography & Multi-Chromatic System",
      client: "Internal Studio Project",
      challenge: "A design agency serving both high-precision product software (apps) and viral youth-culture entertainment (social media) needed an identity system that bridges engineering rigor with artistic dynamism.",
      solution: "We engineered the aerodynamic bird emblem—sharp, swift, and visionary—paired with four distinct algorithmic color palettes (Electric Chroma, Acid Minimalist, Sunset Mirage, Nordic Editorial) allowing the studio to pivot aesthetic tone effortlessly.",
      metrics: [
        { label: "Dynamic Palettes", val: "4 Complete Color Systems" },
        { label: "Vector Mark", val: "Pixel-Perfect SVG Geometry" },
        { label: "Client Conversion", val: "3.2x Inquiries Since Rebrand" },
        { label: "Design Recognition", val: "Featured on Awwwards & Siteinspire" }
      ],
      deliverables: ["Scalable Bird Mark & Monogram", "Full Color Palette Tokens (Hex/RGB/HSL)", "Typography Guidelines", "Web System Implementation"]
    }
  };

  const caseStudyModal = document.getElementById('caseStudyModal');
  const modalDynamicBody = document.getElementById('modalDynamicBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openModal(projectId) {
    const data = CASE_STUDIES[projectId];
    if (!data || !caseStudyModal || !modalDynamicBody) return;

    modalDynamicBody.innerHTML = `
      <div class="modal-case-header">
        <span class="pillar-badge app-badge">${data.category}</span>
        <h2 class="modal-case-title" style="font-family: var(--font-heading); font-size: 1.8rem; margin: 8px 0 4px;">${data.title}</h2>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 24px;">Client: <strong>${data.client}</strong></div>
      </div>

      <div class="modal-grid-metrics" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 28px; background: var(--bg-surface-elevated); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        ${data.metrics.map(m => `
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">${m.label}</div>
            <div style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: var(--accent-primary); margin-top: 2px;">${m.val}</div>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; flex-direction: column; gap: 18px; line-height: 1.6; font-size: 0.95rem; color: var(--text-secondary);">
        <div>
          <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 6px;">The Challenge</h4>
          <p>${data.challenge}</p>
        </div>

        <div>
          <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 6px;">The ChromaFolks Solution</h4>
          <p>${data.solution}</p>
        </div>

        <div>
          <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 8px;">Key Deliverables</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${data.deliverables.map(d => `<span class="stack-tag" style="background: var(--bg-surface-elevated); padding: 4px 10px; border-radius: 6px; font-size: 0.8rem;">✦ ${d}</span>`).join('')}
          </div>
        </div>
      </div>

      <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <span style="font-size: 0.85rem; color: var(--text-muted);">Want results like this for your brand?</span>
        <button class="btn btn-primary" id="modalBookBtn">
          <span>Book a Similar Sprint</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </button>
      </div>
    `;

    caseStudyModal.classList.add('open');
    caseStudyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hook up modal book button
    const modalBookBtn = document.getElementById('modalBookBtn');
    if (modalBookBtn) {
      modalBookBtn.addEventListener('click', () => {
        closeModal();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const detailsArea = document.getElementById('clientDetails');
          if (detailsArea) {
            detailsArea.value = `Hi ChromaFolks! I was impressed by the ${data.title} case study. We are looking for similar high-impact design/social work for our project: `;
            detailsArea.focus();
          }
        }
      });
    }
  }

  function closeModal() {
    if (!caseStudyModal) return;
    caseStudyModal.classList.remove('open');
    caseStudyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-open-modal');
      openModal(projId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (caseStudyModal) {
    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseStudyModal && caseStudyModal.classList.contains('open')) {
      closeModal();
    }
  });

  // -------------------------------------------------------------------------
  // 7. INTERACTIVE SCOPE & BUDGET ESTIMATOR
  // -------------------------------------------------------------------------

  const calcCheckboxes = document.querySelectorAll('.calc-check');
  const calcPriceDisplay = document.getElementById('calcPriceDisplay');
  const calcTimeDisplay = document.getElementById('calcTimeDisplay');
  const applyEstimateBtn = document.getElementById('applyEstimateToContact');

  function updateEstimate() {
    let totalPrice = 0;
    let totalDays = 0;
    let selectedNames = [];

    calcCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cost = parseInt(cb.getAttribute('data-cost') || '0', 10);
        const days = parseInt(cb.getAttribute('data-days') || '0', 10);
        totalPrice += cost;
        totalDays += days;
        const name = cb.closest('.calc-checkbox-label').querySelector('.check-name').textContent;
        selectedNames.push(name);
      }
    });

    if (totalPrice === 0) {
      if (calcPriceDisplay) calcPriceDisplay.textContent = '$0';
      if (calcTimeDisplay) calcTimeDisplay.textContent = 'Please select at least 1 service';
      return { totalPrice, totalDays, selectedNames };
    }

    // Format currency
    if (calcPriceDisplay) {
      calcPriceDisplay.textContent = '$' + totalPrice.toLocaleString('en-US');
    }

    // Estimate timeline
    let timelineText = '';
    if (totalDays <= 7) {
      timelineText = `Approx. 1-2 Weeks Sprint Delivery`;
    } else if (totalDays <= 14) {
      timelineText = `Approx. 2-3 Weeks Sprint Delivery`;
    } else {
      timelineText = `Approx. 3-5 Weeks Phased Delivery`;
    }

    if (calcTimeDisplay) {
      calcTimeDisplay.textContent = timelineText;
    }

    return { totalPrice, totalDays, selectedNames };
  }

  calcCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateEstimate);
  });

  if (applyEstimateBtn) {
    applyEstimateBtn.addEventListener('click', () => {
      const { totalPrice, selectedNames } = updateEstimate();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });

        // Auto select budget bracket
        const budgetSelect = document.getElementById('clientBudget');
        if (budgetSelect) {
          if (totalPrice < 6000) {
            budgetSelect.value = '$3,000 - $6,000';
          } else if (totalPrice <= 12000) {
            budgetSelect.value = '$6,000 - $12,000';
          } else {
            budgetSelect.value = '$12,000 - $25,000+';
          }
        }

        // Fill details textarea
        const detailsArea = document.getElementById('clientDetails');
        if (detailsArea) {
          detailsArea.value = `Estimated Scope (~$${totalPrice.toLocaleString('en-US')}):\nSelected Services:\n` +
            selectedNames.map(s => `• ${s}`).join('\n') +
            `\n\nProject Context & Goals: `;
          detailsArea.focus();
        }

        showToast('Scope applied to contact form below!');
      }
    });
  }

  // Plan select buttons in pricing table
  document.querySelectorAll('.select-plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const planName = btn.getAttribute('data-plan');
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const detailsArea = document.getElementById('clientDetails');
        if (detailsArea) {
          detailsArea.value = `I am interested in booking the "${planName}" package. Here are the details about our business and goals: `;
          detailsArea.focus();
        }
        showToast(`Selected "${planName}". Complete brief below.`);
      }
    });
  });

  // -------------------------------------------------------------------------
  // 8. CONTACT FORM PILL SELECTOR & SUBMISSION
  // -------------------------------------------------------------------------

  const formPillBtns = document.querySelectorAll('.form-pill-btn');
  const selectedServicesInput = document.getElementById('selectedServicesInput');

  formPillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      formPillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (selectedServicesInput) {
        selectedServicesInput.value = btn.getAttribute('data-val');
      }
    });
  });

  const inquiryForm = document.getElementById('projectInquiryForm');
  const formFeedback = document.getElementById('formFeedback');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const email = document.getElementById('clientEmail').value.trim();
      const details = document.getElementById('clientDetails').value.trim();
      const serviceVal = selectedServicesInput ? selectedServicesInput.value : 'Both Apps & Social';

      if (!name || !email || !details) {
        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.className = 'form-feedback-message feedback-error';
          formFeedback.textContent = 'Please fill out your name, email, and project overview.';
        }
        return;
      }

      // Successful simulated submission
      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.className = 'form-feedback-message feedback-success';
        formFeedback.innerHTML = `
          🎉 Thank you <strong>${name}</strong>! Your inquiry regarding <strong>${serviceVal.toUpperCase()}</strong> has been delivered directly to the ChromaFolks & Co studio leads. We will review your brief and reply within 24 hours.
        `;
      }

      inquiryForm.reset();
      showToast('Project brief sent successfully!');
    });
  }

});
