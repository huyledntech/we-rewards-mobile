// ── Sub-tab switching ───────────────────────────
const VALID_TABS = ['leaderboard', 'games', 'rules'];

const tabs = document.querySelectorAll('[data-ttab]');
const panels = {
  leaderboard: document.getElementById('tpanel-leaderboard'),
  games: document.getElementById('tpanel-games'),
  rules: document.getElementById('tpanel-rules'),
};

function activateTab(tabKey, pushState = true) {
  const key = VALID_TABS.includes(tabKey) ? tabKey : 'leaderboard';

  tabs.forEach(t => {
    t.classList.remove('tab-active');
    t.setAttribute('aria-selected', 'false');
  });
  const activeBtn = document.querySelector(`[data-ttab="${key}"]`);
  if (activeBtn) {
    activeBtn.classList.add('tab-active');
    activeBtn.setAttribute('aria-selected', 'true');
    // scroll tab into view on mobile
    activeBtn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }

  Object.values(panels).forEach(p => p?.classList?.add('hidden'));
  const panel = panels[key];
  if (panel) {
    panel.classList.remove('hidden');
    panel.style.animation = 'none';
    panel.offsetHeight;
    panel.style.animation = '';
  }

  // sync URL without reloading
  if (pushState) {
    const url = new URL(window.location);
    url.searchParams.set('tab', key);
    history.pushState({ tab: key }, '', url);
  }
}

// ── Click handler ───────────────────────────────
tabs.forEach(tab => {
  tab.addEventListener('click', () => activateTab(tab.dataset.ttab));
});

// ── Browser back/forward ────────────────────────
window.addEventListener('popstate', e => {
  const key = e.state?.tab ?? new URLSearchParams(window.location.search).get('tab');
  activateTab(key, false);
});

// ── Init from URL on load ───────────────────────
const initTab = new URLSearchParams(window.location.search).get('tab');
activateTab(initTab, false);
