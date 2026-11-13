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

// Mobile floating bar (Home, Apps, Gadgets, Menu) + bottom sheet opened by Menu
(function(){
  var page=location.pathname.split('/').pop()||'index.html';
  var section={'index.html':'index.html','apps.html':'apps.html','macdock.html':'apps.html','gallery.html':'apps.html','tv.html':'apps.html','gadgets.html':'gadgets.html'}[page]||'index.html';
  var I={'index.html':'<path d="M3 11l9-8 9 8M5.5 9.5V20h13V9.5M10 20v-5h4v5"/>','apps.html':'<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>','macdock.html':'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>','gallery.html':'<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="M20 16l-4.5-4.5L7 20"/>','tv.html':'<rect x="3" y="5" width="18" height="12" rx="2.5"/><path d="M9 21h6M12 17v4"/>','gadgets.html':'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4.5" height="6.5" rx="2"/><rect x="16.5" y="14" width="4.5" height="6.5" rx="2"/>'};
  function a(h,t,sub){return '<a href="'+h+'"'+(h===page?' aria-current="page"':'')+(sub?' class="sub"':'')+'><svg viewBox="0 0 24 24" aria-hidden="true">'+(I[h]||'')+'</svg><span>'+t+'</span></a>'}
  function f(h,t){return '<a href="'+h+'"'+(h===section?' aria-current="page"':'')+'>'+t+'</a>'}
  var ico={home:'<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>'};
  var bar=document.createElement('nav');bar.className='floatbar';bar.setAttribute('aria-label','Main');
  function m(h,t){return '<a href="'+h+'"'+(h===section?' aria-current="page"':'')+'>'+t+'</a>'}
  bar.innerHTML='<a class="glass circle" href="index.html" aria-label="Home"'+(section==='index.html'?' aria-current="page"':'')+'><svg viewBox="0 0 24 24" aria-hidden="true">'+ico.home+'</svg></a>'+
    '<div class="glass mid">'+m('apps.html','Apps')+m('gadgets.html','Gadgets')+'</div>'+
    '<button type="button" class="glass circle menubtn" aria-label="Menu" aria-haspopup="dialog" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true">'+ico.menu+'</svg></button>';
  var scrim=document.createElement('div');scrim.className='scrim';
  var sheet=document.createElement('div');sheet.className='sheet';sheet.setAttribute('role','dialog');sheet.setAttribute('aria-label','Site menu');
  sheet.innerHTML='<div class="grab"></div>'+a('index.html','Home')+a('apps.html','Apps')+'<small>Windows</small>'+a('macdock.html','MacDock',1)+a('gallery.html','Gallery for Windows',1)+'<small>Android TV</small>'+a('tv.html','File Manager TV',1)+a('gadgets.html','Gadgets');
  document.body.appendChild(scrim);document.body.appendChild(sheet);document.body.appendChild(bar);
  var btn=bar.querySelector('.menubtn');
  function open(o){document.body.classList.toggle('menuopen',o);btn.setAttribute('aria-expanded',o);if(o){var x=sheet.querySelector('a');x&&x.focus()}else btn.focus()}
  btn.addEventListener('click',function(){open(!document.body.classList.contains('menuopen'))});
  scrim.addEventListener('click',function(){open(false)});
  sheet.addEventListener('click',function(e){if(e.target.closest('a'))open(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('menuopen'))open(false)});
})();
// Floating bar: hide while scrolling down, show on a deliberate scroll up, near the top or at the bottom.
// Direction changes need ~12px of travel and bounce overscroll is ignored, so it never flickers.
(function(){
  var last=window.scrollY,acc=0,hidden=false,ticking=false,b=document.body;
  function set(h){if(h!==hidden){hidden=h;b.classList.toggle('scrolling',h)}}
  function run(){
    ticking=false;
    var y=window.scrollY,max=document.documentElement.scrollHeight-window.innerHeight;
    if(y<0||y>max){last=Math.min(Math.max(y,0),max);return}
    var d=y-last;last=y;
    if(y<=24||y>=max-24){set(false);acc=0;return}
    if(acc*d<0)acc=0;acc+=d;
    if(acc>12)set(true);else if(acc<-12)set(false);
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(run)}},{passive:true});
})();
