// Put each video's YouTube ID here (the part after v= in the URL). Empty = shows "coming soon".
var VIDEOS={macdock:"",gallery:"",tv:""};
var CHANNEL="https://www.youtube.com/channel/UC-5tnuqQOovxDPligynrg6Q";
document.querySelectorAll('.yt').forEach(function(box){
  var id=VIDEOS[box.dataset.app]||"";
  var link=document.querySelector('[data-watch="'+box.dataset.app+'"]');
  if(link)link.href=id?"https://www.youtube.com/watch?v="+id:CHANNEL;
  if(!id){box.classList.add('off');box.insertAdjacentHTML('beforeend','<span class="tag">Video coming soon</span>');return}
  function play(t){box.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0'+(t?'&start='+t:'')+'" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="Video"></iframe>'}
  box.addEventListener('click',function(){play(0)});
  document.querySelectorAll('.chips button').forEach(function(b){b.addEventListener('click',function(){play(+b.dataset.t);box.scrollIntoView({behavior:'smooth',block:'center'})})});
});

// Dark / light toggle in the header. Remembers the choice when storage is available.
(function(){
  var root=document.documentElement,bar=document.querySelector('header.top .w');if(!bar)return;
  function saved(){try{return localStorage.getItem('theme')}catch(e){return null}}
  function isDark(){var t=root.getAttribute('data-theme');if(t)return t==='dark';return !(window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches)}
  var b=document.createElement('button');b.id='themebtn';b.type='button';
  function label(){var d=isDark();b.textContent=d?'\u2600 Light':'\u263E Dark';b.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode')}
  var s=saved();if(s)root.setAttribute('data-theme',s);
  b.addEventListener('click',function(){var n=isDark()?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}label()});
  bar.appendChild(b);label();
})();

// Mobile bottom pill: site navigation (pages without their own section dock)
(function(){
  if(document.querySelector('.dockmenu'))return;
  var links=document.querySelectorAll('header.top nav a');if(!links.length)return;
  var n=document.createElement('nav');n.className='dockmenu pill';n.setAttribute('aria-label','Site pages');
  var home=location.pathname.split('/').pop()||'index.html';
  n.innerHTML='<a href="index.html"'+(home==='index.html'||home===''?' aria-current="page"':'')+'>Home</a>';
  links.forEach(function(a){var c=a.cloneNode(true);c.textContent=a.textContent==='File Manager TV'?'TV':a.textContent;n.appendChild(c)});
  document.body.appendChild(n);
})();
// Upgrade the bottom pill to real liquid glass (refracts the page behind it in Chrome/Edge, frosted glass elsewhere).
(function(){
  if(!document.querySelector('.dockmenu'))return;
  var s=document.createElement('script');s.src='glass-pill.js';
  s.onload=function(){try{window.mountGlassPill&&window.mountGlassPill()}catch(e){}};
  document.head.appendChild(s);
})();
