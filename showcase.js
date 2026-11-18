(function(){
var sc=document.querySelector('[data-showcase]');if(!sc)return;
var vp=sc.querySelector('.sc-vp'),track=sc.querySelector('.sc-track'),slides=[].slice.call(sc.querySelectorAll('.sc-s')),
dots=[].slice.call(sc.querySelectorAll('.sc-d')),play=sc.querySelector('.sc-play'),N=slides.length,DUR=6000,
rm=window.matchMedia('(prefers-reduced-motion:reduce)'),i=0,paused=rm.matches,timer,userPaused=rm.matches,visible=true;
sc.style.setProperty('--dur',DUR/1000+'s');
dots.forEach(function(d){var s=d.querySelector('span'),c=d.cloneNode(true);c.style.cssText='position:absolute;visibility:hidden;width:auto';c.classList.add('on');c.querySelector('span').style.position='static';c.querySelector('span').style.padding='0 20px';document.body.appendChild(c);d.style.setProperty('--w',Math.ceil(c.getBoundingClientRect().width)+'px');c.remove()});
function show(n){i=(n+N)%N;track.style.transform='translateX('+(-i*100)+'%)';
slides.forEach(function(s,k){s.classList.toggle('on',k===i);s.setAttribute('aria-hidden',k===i?'false':'true');[].forEach.call(s.querySelectorAll('a'),function(a){a.tabIndex=k===i?0:-1})});
dots.forEach(function(d,k){var on=k===i;if(on){d.classList.remove('on');void d.offsetWidth}d.classList.toggle('on',on);d.setAttribute('aria-current',on?'true':'false');d.querySelector('span').style.padding=on?'0 20px':''});
sched()}
function sched(){clearTimeout(timer);if(!paused&&visible)timer=setTimeout(function(){show(i+1)},DUR)}
function setPaused(p,user){paused=p;if(user)userPaused=p;sc.classList.toggle('paused',p);play.setAttribute('aria-label',p?'Play the showcase':'Pause the showcase');show(i)}
play.addEventListener('click',function(){setPaused(!paused,true)});
dots.forEach(function(d,k){d.addEventListener('click',function(){show(k)})});
sc.addEventListener('keydown',function(e){if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1)});
// swipe
var x0=null,y0=0,dx=0,w=1,lock=null;
vp.addEventListener('pointerdown',function(e){if(e.target.closest('a'))return;x0=e.clientX;y0=e.clientY;dx=0;lock=null;w=vp.offsetWidth;clearTimeout(timer)});
vp.addEventListener('pointermove',function(e){if(x0===null)return;dx=e.clientX-x0;if(lock===null&&Math.abs(dx)>8){lock=Math.abs(dx)>Math.abs(e.clientY-y0);if(lock){vp.classList.add('drag');try{vp.setPointerCapture(e.pointerId)}catch(_){}}}
if(lock)track.style.transform='translateX('+(-i*w+dx)+'px)'});
function end(){if(x0===null)return;var moved=lock;x0=null;vp.classList.remove('drag');if(moved&&Math.abs(dx)>w*.15)show(i+(dx<0?1:-1));else show(i)}
vp.addEventListener('pointerup',end);vp.addEventListener('pointercancel',end);
if('IntersectionObserver' in window)new IntersectionObserver(function(en){visible=en[0].isIntersecting;sched()},{threshold:.3}).observe(sc);
document.addEventListener('visibilitychange',function(){visible=!document.hidden;sched()});
rm.addEventListener&&rm.addEventListener('change',function(e){if(e.matches)setPaused(true,true)});
setPaused(paused,false);
})();
