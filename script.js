// Mobile nav, scroll progress, cursor glow, observer reveals, 3D tilt, accent switcher
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger?.addEventListener('click', ()=>{
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', ()=>{ if (window.innerWidth<960) nav.style.display='none'; });
});

// Scroll progress
const progress = document.getElementById('progress');
const onscroll = ()=>{
  const h = document.documentElement;
  const scrolled = (h.scrollTop)/(h.scrollHeight - h.clientHeight);
  progress.style.width = (scrolled*100).toFixed(2) + '%';
};
document.addEventListener('scroll', onscroll, {passive:true}); onscroll();

// Cursor glow
const cursor = document.getElementById('cursor');
document.addEventListener('pointermove', (e)=>{
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
}, {passive:true});

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Stagger inside visible sections
const ioStagger = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      ioStagger.unobserve(e.target);
      e.target.querySelectorAll('.stagger').forEach((c,i)=>{
        setTimeout(()=>{ c.style.opacity=1; c.style.transform='none'; }, i*70);
      });
    }
  });
},{threshold:0.15});
document.querySelectorAll('.section .container').forEach(el=>ioStagger.observe(el));

// 3D tilt for product cards
const tiltCards = document.querySelectorAll('[data-tilt]');
tiltCards.forEach(card=>{
  const strength = 12;
  card.addEventListener('mousemove', (e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y/rect.height)-0.5) * -strength;
    const ry = ((x/rect.width)-0.5) * strength;
    card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0)';
  });
});

// Accent switcher
document.querySelectorAll('.swatch').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const a = btn.getAttribute('data-a');
    const b = btn.getAttribute('data-b');
    document.documentElement.style.setProperty('--accent', a);
    document.documentElement.style.setProperty('--accent2', b);
  });
});

// back to top
const toTop = document.getElementById('toTop');
toTop?.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));
window.addEventListener('scroll', ()=>{
  if(toTop) toTop.style.display = window.scrollY>600 ? 'block' : 'none';
});
