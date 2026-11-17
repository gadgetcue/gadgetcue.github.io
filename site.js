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
