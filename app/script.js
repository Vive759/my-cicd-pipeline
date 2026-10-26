fetch('version.json', { cache: 'no-store' })
  .then(r => r.ok ? r.json() : Promise.reject())
  .then(v => {
    document.getElementById('build').textContent  = '#' + v.build;
    document.getElementById('commit').textContent = v.commit;
    document.getElementById('time').textContent   = v.time;
    const s = document.getElementById('status');
    s.textContent = 'Deployed by Jenkins';
    s.classList.add('ok');
  })
  .catch(() => {
    document.getElementById('status').textContent = 'Local run (no Jenkins build info)';
  });
