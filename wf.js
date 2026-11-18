(function(){
if(!document.body.classList.contains('wfp'))return;
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};
/* the page has its own reveal; switch off the shared one */
window.gcReveal=function(){};$('.rv').forEach(function(e){e.classList.remove('rv','rv-card','in')});
$('.ft').forEach(function(s,i){if(i%2)s.classList.add('wf-alt')});
/* scroll-in blocks */
var map=[['.ft .ap-h','up'],['.ft-shot','pop'],['.fx>div','pop'],['.ap-sec>.w>.ap-h','up'],['.dc>div','up'],['.av>div','up'],['.steps li','row'],['#changelog .faq','up'],['.wfk-list .wfk-b','row'],['.wfk-out','pop']];
var els=[];map.forEach(function(m){$(m[0]).forEach(function(el,i){if(el.classList.contains('wf-r'))return;el.classList.add('wf-r');el.dataset.r=m[1];el.style.setProperty('--d',Math.min(i%6,5)*70+'ms');els.push(el)})});
if(rm||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('is-in')})}
else{
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;io.unobserve(el);el.classList.add('is-in');setTimeout(function(){el.classList.add('is-done')},1600)})},{rootMargin:'0px 0px -8% 0px'});
els.forEach(function(e){io.observe(e)});
setTimeout(function(){els.forEach(function(e){if(e.getBoundingClientRect().top<innerHeight)e.classList.add('is-in')})},1500);
}
/* scroll-linked: hero showcase and feature pictures flatten as they arrive */
var fine=matchMedia('(min-width:900px) and (hover:hover) and (pointer:fine)').matches;
if(!rm&&fine){
var hero=document.querySelector('#demo .sc'),shots=$('.ft-shot .dev'),q=false;
var upd=function(){q=false;
if(hero){var t=hero.parentElement.getBoundingClientRect().top,p=clamp((innerHeight-t)/(innerHeight*.8),0,1),k=1-p,lift=48*Math.min(1,hero.clientWidth/1000);
hero.style.transform='translate3d(0,'+(-lift*k).toFixed(1)+'px,0) scale('+(.84+.16*p).toFixed(4)+') rotateX('+(16*k).toFixed(2)+'deg)'}
shots.forEach(function(s,i){var r=s.parentElement.getBoundingClientRect();if(r.top>innerHeight*1.2||r.bottom<-200)return;var p=clamp((innerHeight-r.top)/(innerHeight*.7),0,1),k=1-p,side=i%2?1:-1;
s.style.transform='translateY('+(30*k).toFixed(1)+'px) scale('+(.92+.08*p).toFixed(4)+') rotateX('+(10*k).toFixed(2)+'deg) rotateY('+(side*5*k).toFixed(2)+'deg)'})};
var qu=function(){if(!q){q=true;requestAnimationFrame(upd)}};
upd();addEventListener('scroll',qu,{passive:true});addEventListener('resize',qu);
}
/* keys: pick a shortcut, see what it does */
var kb=$('.wfk-b');
if(kb.length){
var imgs=$('.wfk-i'),cap=document.querySelector('.wfk-cap');
var pick=function(i,focus){kb.forEach(function(b,k){b.setAttribute('aria-selected',k===i);b.tabIndex=k===i?0:-1});imgs.forEach(function(m,k){m.classList.toggle('on',k===i)});cap.innerHTML=kb[i].dataset.cap;if(focus)kb[i].focus()};
kb.forEach(function(b,i){b.addEventListener('click',function(){pick(i)});b.addEventListener('keydown',function(e){var d=e.key==='ArrowDown'||e.key==='ArrowRight'?1:e.key==='ArrowUp'||e.key==='ArrowLeft'?-1:0;if(d){e.preventDefault();pick((i+d+kb.length)%kb.length,true)}})});
pick(0);
}
})();
