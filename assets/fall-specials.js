(() => {
  const key = 'tea-valley-fall-2026-seen';
  const script = document.currentScript;
  const root = new URL('../', script.src);
  const dialog = document.createElement('dialog');
  dialog.className = 'tv-fall';
  dialog.setAttribute('aria-labelledby', 'tv-fall-title');
  dialog.innerHTML = `
    <div class="tv-fall-head"><div><p class="tv-fall-eyebrow">20 oz · Seasonal specials</p><h2 id="tv-fall-title">Fall is here at Tea Valley 🍂</h2></div><button type="button" class="tv-fall-close" aria-label="Close fall specials" autofocus>×</button></div>
    <div class="tv-fall-tabs" role="tablist" aria-label="Seasonal series"><button type="button" id="tv-fall-tab" role="tab" aria-selected="true" aria-controls="tv-fall-panel">Fall Series</button><button type="button" id="tv-pumpkin-tab" role="tab" aria-selected="false" aria-controls="tv-pumpkin-panel" tabindex="-1">Pumpkin Series</button></div>
    <div class="tv-fall-content"><div id="tv-fall-panel" role="tabpanel" aria-labelledby="tv-fall-tab"><img width="1080" height="1350" alt="Fall Series: Hojicha Latte with Black Sesame Cream; Caramel Apple Pie Matcha Latte; Campfire Caramel Coffee." /></div><div id="tv-pumpkin-panel" role="tabpanel" aria-labelledby="tv-pumpkin-tab" hidden><img width="1080" height="1350" alt="Pumpkin Series: Pumpkin Pie Cheesecake Viet Coffee; Pumpkin Crème Brûlée Hojicha Latte; Pumpkin Pie Matcha Latte." /></div></div>
    <p class="tv-fall-foot">Swap your base: hojicha, matcha, Viet coffee, or black milk tea.</p>`;
  const imgs = dialog.querySelectorAll('img');
  imgs[0].src = new URL('images/fall-series.webp', root);
  imgs[1].src = new URL('images/pumpkin-series.webp', root);
  document.body.append(dialog);
  let previousFocus;
  let previousOverflow;
  const open = () => {
    if (dialog.open) return;
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    try { sessionStorage.setItem(key, '1'); } catch (_) {}
  };
  dialog.querySelector('.tv-fall-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => {
    const r = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  });
  const tabs = [...dialog.querySelectorAll('[role="tab"]')];
  function select(i) {
    tabs.forEach((tab, n) => {
      tab.setAttribute('aria-selected', String(n === i));
      tab.tabIndex = n === i ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = n !== i;
    });
    dialog.querySelector('.tv-fall-content').scrollTop = 0;
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const n = e.key === 'Home' ? 0 : e.key === 'End' ? 1 : 1 - i;
      select(n); tabs[n].focus();
    });
  });
  document.querySelectorAll('[data-fall-open]').forEach(button => button.addEventListener('click', open));
  let seen = false;
  try { seen = sessionStorage.getItem(key) === '1'; } catch (_) {}
  if (!seen) window.setTimeout(open, 900);
})();
