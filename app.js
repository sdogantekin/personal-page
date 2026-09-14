(() => {
  'use strict';

  /* ---------- Data ---------- */

  const timelineData = [
    { role: 'Lead Product Manager', org: 'Distribusion Technologies, Berlin', period: 'Sep 2025 — Sep 2026', desc: 'Leading global payments strategy for a B2B transportation platform processing €140M/year across 15+ markets.', metrics: [{ value: '€140M', label: 'annual volume' }, { value: '15+', label: 'markets' }, { value: '3', label: 'new markets' }, { value: '22%', label: 'Mexico acceptance rate ↑' }, { value: '60%', label: 'expected volume growth' }] },
    { role: 'Senior Product Manager', org: 'Revolut, Berlin', period: 'Jun 2025 — Sep 2025', desc: "Led FinCrime's due diligence domain, balancing regulatory compliance with user experience across markets.", metrics: [{ value: '12%', label: 'fewer repeat submissions' }] },
    { role: 'Head of Product', org: 'Getir, Berlin', period: 'Aug 2021 — Oct 2024', desc: 'Led payments and cross-domain product strategy across 9 countries, processing 500K daily transactions.', metrics: [{ value: '9', label: 'countries' }, { value: '500K', label: 'daily transactions' }, { value: '40%', label: 'chargeback reduction' }, { value: '€600K', label: 'fraud savings/yr' }, { value: '80%', label: 'marketing conversion lift' }, { value: '€900K', label: 'opex savings/yr' }, { value: '+175%', label: 'ad revenue growth' }] },
    { role: 'Senior Product Manager', org: 'Delivery Hero, Berlin', period: 'Jul 2020 — Aug 2021', desc: "Built reusable fintech products across Delivery Hero's platform countries for users, riders, and merchants.", metrics: [{ value: 'YemekPay', label: 'foundation for Turkey e-money license' }] },
    { role: 'Senior Product Manager', org: 'Finleap, Berlin', period: 'Aug 2018 — Jul 2020', desc: 'Built PSD2-based open finance API platforms: account aggregation, financial timelines, payment initiation.', metrics: null },
    { role: 'Product Architect / Product Owner', org: 'Softtech Garage (İşbank), Istanbul', period: 'Dec 2016 — May 2018', desc: "Transformed İşbank's delivery cycles from quarterly to bi-weekly, grew Maximum Mobil's active users 150%+, and built Maximum İşyerim for SMEs from 0-to-1 in 6 months.", metrics: [{ value: '150%+', label: 'Maximum Mobil user growth' }, { value: '50,000+', label: 'Maximum İşyerim merchants in 4 months' }] },
    { role: 'Earlier: engineering & product leadership', org: 'BKM · Vodafone Turkey · Turkcell · Cybersoft', period: '2002 — 2016', desc: "As Digital Channels & Payments Development Manager at Interbank Card Center (BKM, 2014–2016), I led product engineering of BKM Express, Turkey's leading digital wallet, and founded BKMLab for new payment experiences. Earlier: Technical Product Manager at Vodafone Turkey (2010–2014), designing mobile wallet and payment solutions; Senior Software Engineer at Turkcell Technology (2007–2010), building Java-based VAS services; and Software Engineer at Cybersoft (2002–2006), lead backend developer on the Aurora core banking platform.", metrics: [{ value: '1.2M', label: 'BKM Express customers' }, { value: '20K', label: 'merchant acceptance points' }] },
  ];

  const skillGroups = [
    { group: 'Strategic Product Leadership', skills: ['Platform Strategy & Roadmapping', '0-to-1 Product Development', 'Growth & Optimization', 'Cross-Functional Leadership', 'Global Market Operations', 'Regulatory Compliance', 'Team Building & Management', 'Stakeholder Engagement'] },
    { group: 'Domain Expertise', skills: ['Payment Systems & Orchestration', 'Fraud Prevention & Risk Management', 'Marketing Automation', 'API Product Design', 'PSD2', 'PCI-DSS Compliance', 'Agentic Commerce (MCP/UCP)'] },
    { group: 'Tools & Technologies', skills: ['Analytics Platforms', 'Collaboration Tools', 'AI/ML Integration', 'API Design & Development'] },
  ];

  /* ---------- Router ---------- */

  const VALID_PAGES = ['about', 'resume', 'projects', 'writing', 'contact'];

  function applyRoute() {
    const hash = (window.location.hash || '#about').replace('#', '');
    const page = VALID_PAGES.includes(hash) ? hash : 'about';
    document.querySelectorAll('.page').forEach((el) => {
      el.classList.toggle('active', el.id === `page-${page}`);
    });
    document.querySelectorAll('.nav-link').forEach((el) => {
      el.classList.toggle('active', el.dataset.nav === page);
    });
    if (game.playing || game.showing) closeGame();
  }

  window.addEventListener('hashchange', applyRoute);

  /* ---------- Resume: timeline & skills ---------- */

  function renderTimeline() {
    const root = document.getElementById('timeline');
    let selectedIdx = -1;

    const items = timelineData.map((item, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'timeline-item';

      const rail = document.createElement('div');
      rail.className = 'timeline-rail';
      const dot = document.createElement('div');
      dot.className = 'timeline-dot';
      const line = document.createElement('div');
      line.className = 'timeline-line';
      rail.append(dot, line);

      const body = document.createElement('button');
      body.type = 'button';
      body.className = 'timeline-body';

      const row = document.createElement('div');
      row.className = 'timeline-row';
      const meta = document.createElement('div');
      meta.className = 'timeline-meta';
      meta.innerHTML = `
        <div class="timeline-period">${item.period}</div>
        <div class="timeline-role">${item.role}</div>
        <div class="timeline-org">${item.org}</div>
      `;
      const chevron = document.createElement('span');
      chevron.className = 'timeline-chevron';
      chevron.textContent = '▸';
      row.append(meta, chevron);

      const desc = document.createElement('div');
      desc.className = 'timeline-desc';
      desc.textContent = item.desc;

      body.append(row, desc);

      if (item.metrics && item.metrics.length) {
        const metrics = document.createElement('div');
        metrics.className = 'timeline-metrics';
        item.metrics.forEach((m) => {
          const cell = document.createElement('div');
          cell.innerHTML = `<div class="metric-value">${m.value}</div><div class="metric-label">${m.label}</div>`;
          metrics.appendChild(cell);
        });
        body.appendChild(metrics);
      }

      body.addEventListener('click', () => {
        selectedIdx = selectedIdx === i ? -1 : i;
        items.forEach((el, j) => el.classList.toggle('selected', j === selectedIdx));
      });

      wrap.append(rail, body);
      root.appendChild(wrap);
      return wrap;
    });
  }

  function renderSkillGroups() {
    const root = document.getElementById('skill-groups');
    skillGroups.forEach((grp) => {
      const wrap = document.createElement('div');
      wrap.className = 'skill-group';
      const title = document.createElement('div');
      title.className = 'skill-group-title';
      title.textContent = grp.group;
      const pills = document.createElement('div');
      pills.className = 'skill-pills';
      grp.skills.forEach((skill) => {
        const pill = document.createElement('span');
        pill.className = 'skill-pill';
        pill.textContent = skill;
        pills.appendChild(pill);
      });
      wrap.append(title, pills);
      root.appendChild(wrap);
    });
  }

  /* ---------- Footer game ---------- */

  const AREA_H = 140, GROUND_H = 12, BALL_D = 26, BALL_LEFT = 22;
  const GRAVITY = 0.75, OBS_SPEED = 2.8;
  const ARROW_HEAD_W = 10, ARROW_TAIL_W = 20, ARROW_W = ARROW_HEAD_W + ARROW_TAIL_W, ARROW_H = 10;
  const ARROW_LOW_LIFT = 52, ARROW_HIGH_LIFT = 92;
  const MIN_JUMP = 11, MAX_HOLD = 320;
  const CACTUS_SIZES = [{ w: 12, h: 22 }, { w: 14, h: 30 }, { w: 18, h: 40 }];
  const MAX_OBS = 3, MIN_GAP = 130, GAP_JITTER = 90;
  const GROUND_Y = AREA_H - GROUND_H;

  const gameEls = {
    wrap: document.getElementById('game-wrap'),
    toggle: document.getElementById('game-toggle'),
    area: document.getElementById('game-area'),
    obstacles: document.getElementById('game-obstacles'),
    ground: document.getElementById('game-ground'),
    ballShadow: document.getElementById('ball-shadow'),
    ball: document.getElementById('ball'),
    score: document.getElementById('game-score'),
    overlay: document.getElementById('game-overlay'),
    cloud1: document.getElementById('cloud1'),
    cloud2: document.getElementById('cloud2'),
    hint: document.getElementById('game-hint'),
  };

  const game = {
    showing: false, playing: false, gameOver: false, charging: false,
    timer: null, chargeStart: 0,
    lift: 0, liftVel: 0, score: 0, ticks: 0,
    cloud1X: 40, cloud2X: 200, groundOffset: 0,
    squashX: 1, squashY: 1, spin: 0,
    obstacles: [],
  };

  function randomBranches() {
    const sides = Math.random() < 0.5 ? ['left', 'right'] : ['right', 'left'];
    const yFrac1 = 0.12 + Math.random() * 0.25;
    const yFrac2 = 0.5 + Math.random() * 0.3;
    return [{ side: sides[0], yFrac: yFrac1 }, { side: sides[1], yFrac: yFrac2 }];
  }

  function spawnObstacle(x) {
    const type = Math.random() < 0.3 ? 'arrow' : 'cactus';
    const size = CACTUS_SIZES[Math.floor(Math.random() * CACTUS_SIZES.length)];
    const arrowLift = Math.random() < 0.5 ? ARROW_LOW_LIFT : ARROW_HIGH_LIFT;
    return {
      x, type,
      w: type === 'arrow' ? ARROW_W : size.w,
      h: type === 'arrow' ? ARROW_H : size.h,
      branches: type === 'cactus' ? randomBranches() : [],
      lift: type === 'arrow' ? arrowLift : 0,
    };
  }

  function resetGameState() {
    game.playing = false;
    game.gameOver = false;
    game.score = 0;
    game.lift = 0;
    game.liftVel = 0;
    game.obstacles = [{ x: 300, type: 'cactus', w: 14, h: 30, branches: [] }];
    game.ticks = 0;
    game.squashX = 1;
    game.squashY = 1;
  }

  function renderGame() {
    gameEls.score.textContent = game.score;
    gameEls.overlay.hidden = !game.gameOver;
    gameEls.overlay.textContent = game.gameOver ? `Score: ${game.score} — tap to retry` : '';

    gameEls.hint.innerHTML = '';
    if (game.playing) {
      gameEls.hint.textContent = 'space or enter to jump';
    } else if (game.gameOver) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'link-button';
      btn.textContent = 'Play again';
      btn.addEventListener('click', startGame);
      gameEls.hint.appendChild(btn);
    } else {
      gameEls.hint.textContent = 'tap to start';
    }

    gameEls.cloud1.style.left = game.cloud1X + 'px';
    gameEls.cloud2.style.left = game.cloud2X + 'px';
    gameEls.ground.style.backgroundPositionX = game.groundOffset + 'px';

    const ballTop = GROUND_Y - BALL_D * game.squashY - game.lift;
    gameEls.ball.style.left = BALL_LEFT + 'px';
    gameEls.ball.style.top = ballTop + 'px';
    gameEls.ball.style.width = (BALL_D * game.squashX) + 'px';
    gameEls.ball.style.height = (BALL_D * game.squashY) + 'px';
    gameEls.ball.style.transform = `rotate(${game.spin}deg)`;

    const shadowW = Math.max(0, BALL_D - 4 - Math.max(0, game.lift * 0.3));
    gameEls.ballShadow.style.left = (BALL_LEFT + 2) + 'px';
    gameEls.ballShadow.style.width = shadowW + 'px';

    gameEls.obstacles.innerHTML = '';
    const bob = game.ticks % 12 < 6 ? 0 : 3;
    game.obstacles.forEach((o) => {
      if (o.type === 'cactus') {
        const cactus = document.createElement('div');
        cactus.className = 'cactus';
        cactus.style.left = o.x + 'px';
        cactus.style.top = (GROUND_Y - o.h) + 'px';
        cactus.style.width = o.w + 'px';
        cactus.style.height = o.h + 'px';
        gameEls.obstacles.appendChild(cactus);
        (o.branches || []).forEach((b) => {
          const branch = document.createElement('div');
          branch.className = 'cactus';
          branch.style.left = (b.side === 'left' ? o.x - o.w * 0.55 : o.x + o.w * 0.95) + 'px';
          branch.style.top = (GROUND_Y - o.h + o.h * b.yFrac) + 'px';
          branch.style.width = (o.w * 0.6) + 'px';
          branch.style.height = '5px';
          gameEls.obstacles.appendChild(branch);
        });
      } else {
        const tail = document.createElement('div');
        tail.className = 'arrow-tail';
        tail.style.left = (o.x + ARROW_HEAD_W) + 'px';
        tail.style.top = (GROUND_Y - o.lift - ARROW_H / 2 - 1.5 + bob) + 'px';
        tail.style.width = ARROW_TAIL_W + 'px';
        gameEls.obstacles.appendChild(tail);

        const head = document.createElement('div');
        head.className = 'arrow-head';
        head.style.left = o.x + 'px';
        head.style.top = (GROUND_Y - o.lift - ARROW_H + bob) + 'px';
        gameEls.obstacles.appendChild(head);
      }
    });
  }

  function step() {
    game.ticks += 1;
    const areaW = gameEls.area.clientWidth || 320;
    const wasGrounded = game.lift === 0;
    const charging = game.charging && (performance.now() - game.chargeStart) < MAX_HOLD;
    game.liftVel -= charging ? GRAVITY * 0.32 : GRAVITY;
    game.lift = Math.max(0, game.lift + game.liftVel);
    const justLanded = !wasGrounded && game.lift === 0;
    if (game.lift === 0) game.liftVel = 0;

    game.cloud1X -= 0.35; if (game.cloud1X < -40) game.cloud1X = areaW + 20;
    game.cloud2X -= 0.22; if (game.cloud2X < -40) game.cloud2X = areaW + 50;
    game.groundOffset = (game.groundOffset - OBS_SPEED) % 22;
    game.spin = (game.spin + (game.lift === 0 ? OBS_SPEED * 6 : OBS_SPEED * 3)) % 360;

    let targetSX = 1, targetSY = 1;
    if (justLanded) { targetSX = 1.45; targetSY = 0.5; }
    else if (game.liftVel > 5) { targetSX = 0.8; targetSY = 1.25; }
    else if (game.liftVel < -5) { targetSX = 0.88; targetSY = 1.15; }
    game.squashX += (targetSX - game.squashX) * 0.2;
    game.squashY += (targetSY - game.squashY) * 0.2;

    game.obstacles = game.obstacles.map((o) => ({ ...o, x: o.x - (o.type === 'arrow' ? OBS_SPEED * 1.8 : OBS_SPEED) }));
    let passedCount = 0;
    game.obstacles = game.obstacles.filter((o) => {
      if (o.x < -o.w - 20) { passedCount += 1; return false; }
      return true;
    });
    const last = game.obstacles[game.obstacles.length - 1];
    if (game.obstacles.length < MAX_OBS && (!last || last.x < areaW - MIN_GAP - Math.random() * GAP_JITTER)) {
      game.obstacles.push(spawnObstacle(areaW + 10));
    }
    game.score += passedCount;

    const hitsObs = game.obstacles.some((o) => {
      const overlapsX = o.x < BALL_LEFT + BALL_D && o.x + o.w > BALL_LEFT;
      if (!overlapsX) return false;
      if (o.type === 'arrow') return game.lift < o.lift + o.h && game.lift + BALL_D > o.lift;
      return game.lift < o.h;
    });

    if (hitsObs) {
      clearInterval(game.timer);
      game.timer = null;
      game.playing = false;
      game.gameOver = true;
      game.lift = 0;
      game.liftVel = 0;
      renderGame();
      return;
    }
    renderGame();
  }

  function startGame() {
    if (game.timer) clearInterval(game.timer);
    resetGameState();
    game.playing = true;
    renderGame();
    game.timer = setInterval(step, 30);
  }

  function pressJump() {
    if (game.playing && game.lift === 0 && !game.charging) {
      game.charging = true;
      game.chargeStart = performance.now();
      game.liftVel = MIN_JUMP;
      game.squashX = 0.85;
      game.squashY = 1.2;
    }
  }

  function releaseJump() {
    game.charging = false;
  }

  function closeGame() {
    if (game.timer) { clearInterval(game.timer); game.timer = null; }
    game.charging = false;
    game.showing = false;
    resetGameState();
    gameEls.wrap.hidden = true;
    renderGame();
  }

  function openGame() {
    game.showing = true;
    resetGameState();
    gameEls.wrap.hidden = false;
    renderGame();
  }

  gameEls.toggle.addEventListener('click', () => {
    if (game.showing) closeGame();
    else openGame();
  });

  gameEls.area.addEventListener('mousedown', onPressStart);
  gameEls.area.addEventListener('mouseup', onPressEnd);
  gameEls.area.addEventListener('mouseleave', onPressEnd);
  gameEls.area.addEventListener('touchstart', onPressStart, { passive: true });
  gameEls.area.addEventListener('touchend', onPressEnd);

  function onPressStart() {
    if (game.playing) pressJump();
    else startGame();
  }
  function onPressEnd() {
    releaseJump();
  }

  window.addEventListener('keydown', (e) => {
    if ((e.code === 'Space' || e.code === 'Enter' || e.key === ' ' || e.key === 'Enter') && game.showing) {
      e.preventDefault();
      if (e.repeat) return;
      if (game.playing) pressJump();
      else startGame();
    }
  });
  window.addEventListener('keyup', (e) => {
    if ((e.code === 'Space' || e.code === 'Enter' || e.key === ' ' || e.key === 'Enter') && game.showing) {
      e.preventDefault();
      releaseJump();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && (game.playing || game.showing)) closeGame();
  });
  window.addEventListener('blur', () => {
    if (game.playing || game.showing) closeGame();
  });

  /* ---------- Init ---------- */

  renderTimeline();
  renderSkillGroups();
  resetGameState();
  renderGame();
  applyRoute();
})();
