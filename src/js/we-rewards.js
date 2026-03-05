const tabActive = ['bg-white', 'text-gray-500', 'border', 'border-gray-200'];

// ── WE Predict sub-tabs ───────────────────────────
document.querySelectorAll('[data-ptab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-ptab]').forEach(b => {
      b.classList.remove('ptab-active');
      b.classList.add(tabActive);
    });
    btn.classList.add('ptab-active');
    btn.classList.remove(tabActive);

    document.querySelectorAll('.ppanel').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById('ppanel-' + btn.dataset.ptab);
    if (target) {
      target.classList.remove('hidden');
      target.style.animation = 'none'; target.offsetHeight; target.style.animation = '';
    }
  });
});

// ── Live Score day filter ─────────────────────────
document.querySelectorAll('[data-day]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-day]').forEach(b => {
      b.classList.remove('tfilter-active');
      b.classList.add(tabActive);
    });
    btn.classList.add('tfilter-active');
    btn.classList.remove(tabActive);
  });
});

// ── FAQ accordion ─────────────────────────────────
document.querySelectorAll('.faq-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const body = item.querySelector('.faq-body');
    const icon = item.querySelector('.faq-icon');
    const isOpen = !body.classList.contains('hidden');
    body.classList.toggle('hidden', isOpen);
    icon.innerHTML = isOpen ? '<i class="fa-solid fa-angle-up"></i>' : '<i class="fa-solid fa-angle-down"></i>';
  });
});

// ── Arrow scroll buttons ──────────────────────────
document.querySelectorAll('[data-scroll-left], [data-scroll-right]').forEach(btn => {
  btn.addEventListener('click', () => {
    const isLeft = btn.hasAttribute('data-scroll-left');
    const id = btn.getAttribute(isLeft ? 'data-scroll-left' : 'data-scroll-right');
    const el = document.getElementById(id);
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: isLeft ? -amount : amount, behavior: 'smooth' });
  });
});

// ── Tournament filter buttons ─────────────────────
document.querySelectorAll('[data-tfilter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-tfilter]').forEach(b => {
      b.classList.remove('tfilter-active');
      b.classList.add(tabActive);
    });
    btn.classList.add('tfilter-active');
    btn.classList.remove(tabActive);
  });
});

// ── WE Spin sub-tabs ──────────────────────────────
document.querySelectorAll('[data-spintab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-spintab]').forEach(b => {
      b.classList.remove('spin-filter-active');
      b.classList.add(tabActive);
    });
    btn.classList.add('spin-filter-active');
    btn.classList.remove(tabActive);
    document.querySelectorAll('.spin-ppanel').forEach(p => p.classList.add('hidden'));
    const t = document.getElementById('spanel-' + btn.dataset.spintab);
    if (t) { t.classList.remove('hidden'); t.style.animation = 'none'; t.offsetHeight; t.style.animation = ''; }
  });
});

// ── Mission tab filter buttons ────────────────────
document.querySelectorAll('.mission-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mission-filter').forEach(b => {
      b.classList.remove('tfilter-active');
      b.classList.add(tabActive);
    });
    btn.classList.add('tfilter-active');
    btn.classList.remove(tabActive);
  });
});

// ── Free tab filter buttons ───────────────────────
document.querySelectorAll('.free-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.free-filter').forEach(b => {
      b.classList.remove('tfilter-active');
      b.classList.add(tabActive);
    });
    btn.classList.add('tfilter-active');
    btn.classList.remove(tabActive);
  });
});

// ── Show More / Show Less ─────────────────────────
const collapsed = document.getElementById('card-collapsed');
const expanded = document.getElementById('card-expanded');
const showMoreBtn = document.getElementById('btn-show-more');
const showLessBtn = document.getElementById('btn-show-less');

showMoreBtn && showMoreBtn.addEventListener('click', () => {
  collapsed.style.display = 'none';
  expanded.style.display = 'flex';
  expanded.style.flexDirection = 'column';
});

showLessBtn && showLessBtn.addEventListener('click', () => {
  expanded.style.display = 'none';
  collapsed.style.display = 'flex';
  collapsed.style.flexDirection = 'column';
});

// ── DaisyUI Tab switching ─────────────────────────
const tabBtns = document.querySelectorAll('[role="tablist"] [data-tab]');
const panels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    // update tab styles
    tabBtns.forEach(b => {
      b.classList.remove('tab-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('tab-active');
    btn.setAttribute('aria-selected', 'true');

    // switch panels
    panels.forEach(p => p.classList.add('hidden'));
    const active = document.getElementById('panel-' + target);
    if (active) {
      active.classList.remove('hidden');
      active.style.animation = 'none';
      active.offsetHeight; // reflow
      active.style.animation = '';
    }
  });
});