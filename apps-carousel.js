(function(){
var root=document.querySelector('[data-acar]');if(!root)return;
var tr=root.querySelector('.apps'),cards=[].slice.call(tr.querySelectorAll('.app')),N=cards.length,
dotsBox=root.querySelector('.ac-dots'),prev=root.querySelector('.ac-prev'),next=root.querySelector('.ac-next'),
rm=window.matchMedia('(prefers-reduced-motion:reduce)'),centers=[],step=1,cur=-1,raf=0,dots=[];
cards.forEach(function(c,i){
  var nm=c.querySelector('h3'),n=nm?nm.textContent:'App '+(i+1);
  c.setAttribute('role','group');c.setAttribute('aria-roledescription','slide');c.setAttribute('aria-label',(i+1)+' of '+N+': '+n);
  var b=document.createElement('button');b.type='button';b.setAttribute('aria-label',n);b.addEventListener('click',function(){go(i)});
  dotsBox.appendChild(b);dots.push(b);
});
function measure(){
  centers=cards.map(function(c){return c.offsetLeft+c.offsetWidth/2});
  step=N>1?Math.max(1,centers[1]-centers[0]):1;
}
function paint(){
  raf=0;
  var mid=tr.scrollLeft+tr.clientWidth/2,best=0,bd=1e9;
  for(var i=0;i<N;i++){
    var d=Math.abs(mid-centers[i]);
    if(d<bd){bd=d;best=i}
    var t=Math.min(1,d/step);
    cards[i].style.transform='scale('+(1-.14*t).toFixed(3)+')';
    cards[i].style.opacity=(1-.5*t).toFixed(3);
  }
  if(best!==cur){
    if(cur>=0){cards[cur].classList.remove('on');dots[cur].removeAttribute('aria-current')}
    cur=best;cards[cur].classList.add('on');dots[cur].setAttribute('aria-current','true');
    if(prev)prev.disabled=cur===0;if(next)next.disabled=cur===N-1;
  }
}
function tick(){if(!raf)raf=requestAnimationFrame(paint)}
function go(i){
  i=Math.max(0,Math.min(N-1,i));
  tr.scrollTo({left:centers[i]-tr.clientWidth/2,behavior:rm.matches?'auto':'smooth'});
}
tr.addEventListener('scroll',tick,{passive:true});
if(prev)prev.addEventListener('click',function(){go(cur-1)});
if(next)next.addEventListener('click',function(){go(cur+1)});
tr.addEventListener('keydown',function(e){
  if(e.target!==tr)return;
  if(e.key==='ArrowRight'){e.preventDefault();go(cur+1)}
  else if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1)}
  else if(e.key==='Home'){e.preventDefault();go(0)}
  else if(e.key==='End'){e.preventDefault();go(N-1)}
});
// Tabbing into a card's link brings that card to the centre.
tr.addEventListener('focusin',function(e){var c=e.target.closest&&e.target.closest('.app');if(c){var i=cards.indexOf(c);if(i>=0&&i!==cur)go(i)}});
function relayout(){measure();tick()}
if(window.ResizeObserver)new ResizeObserver(relayout).observe(tr);else window.addEventListener('resize',relayout);
window.addEventListener('load',relayout);
relayout();
})();
