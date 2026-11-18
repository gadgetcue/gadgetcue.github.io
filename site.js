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

  // Mobile menu: round toggle in the top bar opens a rounded panel with the page links and a Theme row.
  var hdr=bar.parentNode,nav=bar.querySelector('nav');if(!nav)return;
  var tog=document.createElement('button');tog.type='button';tog.className='mtog';tog.setAttribute('aria-label','Open menu');tog.setAttribute('aria-expanded','false');tog.setAttribute('aria-controls','mpanel');
  tog.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path class="ham" d="M4 7h16M4 12h16M4 17h16"/><path class="cls" d="M6 6l12 12M18 6L6 18"/></svg>';
  var p=document.createElement('div');p.id='mpanel';p.className='mpanel';p.hidden=true;
  var html='<a href="index.html">Home</a>';
  nav.querySelectorAll('a').forEach(function(a){html+='<a href="'+a.getAttribute('href')+'"'+(a.hasAttribute('aria-current')?' aria-current="page"':'')+'>'+a.textContent+'</a>'});
  html+='<hr><div class="mtheme"><span>Theme</span><button type="button" class="mthemebtn"></button></div>';
  p.innerHTML=html;
  var tb=p.querySelector('.mthemebtn');
  function ticon(){var d=isDark();tb.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode');tb.innerHTML=d?'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>':'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'}
  tb.addEventListener('click',function(){b.click();ticon()});
  function set(o){p.hidden=!o;hdr.classList.toggle('mopen',o);tog.setAttribute('aria-expanded',o);tog.setAttribute('aria-label',o?'Close menu':'Open menu')}
  tog.addEventListener('click',function(){set(p.hidden)});
  p.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
  document.addEventListener('click',function(e){if(!p.hidden&&!hdr.contains(e.target))set(false)});
  bar.appendChild(tog);hdr.appendChild(p);ticon();
})();

// Direct downloads: each button already links to the current installer. If a newer release exists, point it at that file instead.
document.querySelectorAll('a[data-repo]').forEach(function(a){
  if(!window.fetch)return;
  fetch('https://api.github.com/repos/'+a.dataset.repo+'/releases/latest').then(function(r){return r.ok?r.json():null}).then(function(d){
    if(!d||!d.assets)return;
    for(var i=0;i<d.assets.length;i++){var s=d.assets[i];if(s.name.toLowerCase().slice(-a.dataset.ext.length)===a.dataset.ext){a.href=s.browser_download_url;return}}
  }).catch(function(){});
});

// Polish: scroll reveal + pointer spotlight (both skipped for reduced motion / touch)
(function(){
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!rm&&'IntersectionObserver' in window){
    var root=document.documentElement;root.classList.add('js');
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
    document.querySelectorAll('.sec-h,.six a,.block>*,.more div,.steps3 div,.faq,.cta,.cats>*,.apps>*').forEach(function(el,i){
      el.classList.add('rv');el.style.setProperty('--d',(i%4)*60+'ms');io.observe(el)});
    // safety net: never leave content hidden
    setTimeout(function(){document.querySelectorAll('.rv:not(.in)').forEach(function(el){var r=el.getBoundingClientRect();if(r.top<innerHeight)el.classList.add('in')})},1200);
  }
  if(window.matchMedia&&matchMedia('(hover:hover)').matches){
    var raf=0,t=null,x=0,y=0;
    document.addEventListener('pointermove',function(e){
      var c=e.target.closest&&e.target.closest('.six a,.card,.app,.cat');if(!c)return;
      t=c;x=e.clientX;y=e.clientY;if(raf)return;
      raf=requestAnimationFrame(function(){raf=0;var r=t.getBoundingClientRect();t.style.setProperty('--mx',(x-r.left)+'px');t.style.setProperty('--my',(y-r.top)+'px')});
    },{passive:true});
  }
})();

// Top bar: slide away when scrolling down, come back on scroll up / at the top / while the menu is open.
(function(){
  var h=document.querySelector('header.top');if(!h)return;
  var last=window.pageYOffset||0,tick=false;
  function upd(){
    tick=false;var y=Math.max(0,window.pageYOffset||0),d=y-last;
    if(y<=10||h.classList.contains('mopen'))h.classList.remove('nav-hide');
    else if(d>6&&y>80)h.classList.add('nav-hide');
    else if(d<-4)h.classList.remove('nav-hide');
    if(Math.abs(d)>4||y<=10)last=y;
  }
  window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
  h.addEventListener('focusin',function(){h.classList.remove('nav-hide')});
})();
