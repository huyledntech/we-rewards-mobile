const tabActive = ['bg-white', 'text-gray-500', 'border', 'border-gray-200'];
const hasSubTabs = ['we-predict', 'free', 'missions'];

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
    icon.innerHTML = isOpen ? '<i class="fa-solid fa-angle-down"></i>' : '<i class="fa-solid fa-angle-up"></i>';
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

const activatePTab = (target) => {
  const btn = document.querySelector(`[data-ptab="${target}"]`);
  if (!btn) return;

  document.querySelectorAll('[data-ptab]').forEach(b => {
    b.classList.remove('ptab-active');
    b.classList.add(tabActive);
  });
  btn.classList.add('ptab-active');
  btn.classList.remove(tabActive);

  document.querySelectorAll('.ppanel').forEach(p => p.classList.add('hidden'));
  const pPanel = document.getElementById('ppanel-' + target);
  if (pPanel) {
    pPanel.classList.remove('hidden');
    pPanel.style.animation = 'none'; pPanel.offsetHeight; pPanel.style.animation = '';
  }

  // update URL query param if tab is we-predict
  const url = new URL(window.location);
  if (hasSubTabs.includes(url.searchParams.get('tab'))) {
    url.searchParams.set('ptab', target);
    window.history.replaceState({}, '', url);
  }
};

// ── WE Predict sub-tabs ───────────────────────────
document.querySelectorAll('[data-ptab]').forEach(btn => {
  btn.addEventListener('click', () => {
    activatePTab(btn.dataset.ptab);
  });
});

// ── DaisyUI Tab switching ─────────────────────────
const tabBtns = document.querySelectorAll('[role="tablist"] [data-tab]');
const panels = document.querySelectorAll('.tab-panel');

const activateTab = (target) => {
  const btn = document.querySelector(`[role="tablist"] [data-tab="${target}"]`);
  if (!btn) return;

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

  // update URL query param
  const url = new URL(window.location);
  url.searchParams.set('tab', target);
  
  let ptabToActivate = null;

  if (!hasSubTabs.includes(target)) {
    url.searchParams.delete('ptab');
  } else {
    let ptab = url.searchParams.get('ptab');
    const ptabExistsInPanel = active ? active.querySelector(`[data-ptab="${ptab}"]`) : null;
    
    if (!ptabExistsInPanel && active) {
      const firstPtab = active.querySelector('[data-ptab]');
      if (firstPtab) {
        ptab = firstPtab.dataset.ptab;
      }
    }
    
    if (ptab) {
      url.searchParams.set('ptab', ptab);
      ptabToActivate = ptab;
    }
  }

  window.history.replaceState({}, '', url);

  if (ptabToActivate) {
    activatePTab(ptabToActivate);
  }
};

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    activateTab(btn.dataset.tab);
  });
});

// Check URL for active tab on load
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');

  if (tab) {
    activateTab(tab);
  }
});