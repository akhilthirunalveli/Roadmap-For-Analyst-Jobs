(function(){
  const KEY = 'roadmap-checked-days-v2';
  const checkboxes = Array.from(document.querySelectorAll('.day-checkbox'));
  const resetBtn = document.getElementById('resetBtn');
  const progressBar = document.getElementById('progressBar');
  const progressLabel = document.getElementById('progressLabel');
  const doneCountEl = document.getElementById('doneCount');
  const toggleButtons = Array.from(document.querySelectorAll('.toggle-tasks'));
  const filterInput = document.getElementById('filter');

  function load(){
    try{
      const raw = localStorage.getItem(KEY);
      const saved = raw ? JSON.parse(raw) : {};
      checkboxes.forEach(cb => cb.checked = !!saved[cb.dataset.day]);
    }catch(e){
      console.error('Could not load saved state', e);
    }
    updateProgress();
  }

  function save(){
    const state = {};
    checkboxes.forEach(cb => state[cb.dataset.day] = cb.checked);
    try{ localStorage.setItem(KEY, JSON.stringify(state)); } catch(e){ console.error(e) }
    updateProgress();
  }

  function updateProgress(){
    const total = checkboxes.length;
    const done = checkboxes.filter(cb => cb.checked).length;
    const pct = Math.round((done/total)*100);
    progressBar.style.width = pct + '%';
    progressLabel.textContent = pct + '%';
    doneCountEl.textContent = done;
  }

  // checkbox change
  document.addEventListener('change', (e)=>{
    if(e.target && e.target.classList && e.target.classList.contains('day-checkbox')){
      save();
    }
  });

  // reset
  resetBtn.addEventListener('click', ()=>{
    checkboxes.forEach(cb => cb.checked = false);
    save();
  });

  // accordion toggles
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', ()=>{
      const head = btn.closest('.card');
      const body = head.querySelector('.card-body');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.textContent = expanded ? 'Show' : 'Hide';
      if(expanded) body.hidden = true; else body.hidden = false;
    });
  });

  // filter
  filterInput && filterInput.addEventListener('input', (e)=>{
    const q = e.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(c => {
      const text = c.textContent.toLowerCase();
      c.style.display = q === '' || text.includes(q) ? '' : 'none';
    });
  });

  // init
  load();
})();
