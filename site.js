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

// Mobile bottom tab bar: Home, Apps, Gadgets
(function(){
  var items=[['index.html','Home','<path d="M3 11l9-8 9 8M5 10v10h14V10"/>'],['apps.html','Apps','<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'],['gadgets.html','Gadgets','<path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/>']];
  var cur=document.querySelector('header.top nav a[aria-current]');var here=cur?cur.getAttribute('href'):'index.html';
  var n=document.createElement('nav');n.className='tabbar';n.setAttribute('aria-label','Main');
  n.innerHTML=items.map(function(i){return '<a href="'+i[0]+'"'+(i[0]===here?' aria-current="page"':'')+'><svg viewBox="0 0 24 24" aria-hidden="true">'+i[2]+'</svg>'+i[1]+'</a>'}).join('');
  document.body.appendChild(n);
})();
