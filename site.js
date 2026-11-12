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

// Mobile bottom sheet menu
(function(){
  var cur=document.querySelector('header.top nav a[aria-current]');var here=cur?cur.getAttribute('href'):'index.html';
  var page=location.pathname.split('/').pop()||'index.html';
  function a(h,t,sub){return '<a href="'+h+'"'+(h===page?' aria-current="page"':'')+(sub?' class="sub"':'')+'>'+t+'</a>'}
  var fab=document.createElement('button');fab.className='menufab';fab.type='button';fab.setAttribute('aria-haspopup','dialog');fab.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>Menu';
  var scrim=document.createElement('div');scrim.className='scrim';
  var sheet=document.createElement('div');sheet.className='sheet';sheet.setAttribute('role','dialog');sheet.setAttribute('aria-label','Site menu');sheet.hidden=false;
  sheet.innerHTML='<div class="grab"></div>'+a('index.html','Home')+a('apps.html','Apps')+'<small>Windows</small>'+a('macdock.html','MacDock',1)+a('gallery.html','Gallery for Windows',1)+'<small>Android TV</small>'+a('tv.html','File Manager TV',1)+a('gadgets.html','Gadgets');
  document.body.appendChild(scrim);document.body.appendChild(sheet);document.body.appendChild(fab);
  function open(o){document.body.classList.toggle('menuopen',o);fab.setAttribute('aria-expanded',o);if(o){var f=sheet.querySelector('a');f&&f.focus()}else fab.focus()}
  fab.addEventListener('click',function(){open(!document.body.classList.contains('menuopen'))});
  scrim.addEventListener('click',function(){open(false)});
  sheet.addEventListener('click',function(e){if(e.target.closest('a'))open(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('menuopen'))open(false)});
})();
