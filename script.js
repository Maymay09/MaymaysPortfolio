function toggleDark(){
  const body=document.body;
  const isDark=body.hasAttribute('data-dark');
  if(isDark){body.removeAttribute('data-dark');document.querySelector('.dark-toggle').textContent='🌙 Dark'}
  else{body.setAttribute('data-dark','');document.querySelector('.dark-toggle').textContent='☀️ Light'}
}

document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
  });
});

const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:0.12});
reveals.forEach(el=>observer.observe(el));

function animateCounters(){
  document.querySelectorAll('[data-target]').forEach(el=>{
    const target=parseInt(el.dataset.target);
    const dur=1200,step=dur/60;
    let current=0;
    const inc=target/(dur/step);
    const timer=setInterval(()=>{
      current+=inc;
      if(current>=target){el.textContent=target+(target===100?'%':'+');clearInterval(timer)}
      else el.textContent=Math.floor(current);
    },step);
  });
}
const statsSection=document.querySelector('.about-stats');
if(statsSection){
  const so=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){animateCounters();so.disconnect()}
  },{threshold:0.3});
  so.observe(statsSection);
}

window.addEventListener('scroll',()=>{
  const nav=document.getElementById('navbar');
  nav.style.boxShadow=window.scrollY>40?'0 2px 20px rgba(0,0,0,0.06)':'none';
});
// Contact form — Formspree submission
const form = document.getElementById('contact-form');
if(form){
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if(res.ok){
        status.textContent = '✦ Message sent! I\'ll get back to you soon.';
        status.style.color = 'var(--gold)';
        status.style.display = 'block';
        form.reset();
        btn.textContent = 'Message Sent ✦';
      } else {
        throw new Error('Failed');
      }
    } catch(err){
      status.textContent = 'Oops! Something went wrong. Please email me directly at maymaysalami@gmail.com';
      status.style.color = '#c0392b';
      status.style.display = 'block';
      btn.textContent = 'Send Message ✦';
      btn.disabled = false;
    }
  });
}