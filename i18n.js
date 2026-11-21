// Language support. Real, committed translations live in i18n/<code>.json (English text -> translated text).
// English is the default and loads nothing extra. The choice is remembered (localStorage) and, on a first visit,
// picked from the browser language. No third-party scripts. Text that has no translation simply stays in English.
(function(){
  var LANGS=[['en','English'],['hi','हिन्दी'],['es','Español'],['fr','Français'],['de','Deutsch'],['pt','Português'],['ru','Русский'],['ar','العربية'],['zh','中文'],['ja','日本語'],['ko','한국어'],['id','Bahasa Indonesia'],['tr','Türkçe'],['it','Italiano'],['bn','বাংলা'],['ta','தமிழ்'],['te','తెలుగు'],['mr','मराठी'],['ur','اردو'],['vi','Tiếng Việt']];
  var RTL={ar:1,ur:1},V='20261260';
  var codes=LANGS.map(function(l){return l[0]});
  function stored(){var v=null;try{v=localStorage.getItem('lang')}catch(e){}return codes.indexOf(v)>-1?v:null}
  function detect(){var a=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'en'];
    for(var i=0;i<a.length;i++){var c=String(a[i]).toLowerCase().split('-')[0];if(c==='nb'||c==='nn')c='no';if(codes.indexOf(c)>-1)return c}return 'en'}
  var lang=stored()||detect();
  var root=document.documentElement;
  root.setAttribute('lang',lang);
  if(RTL[lang])root.setAttribute('dir','rtl');
  window.gcLang=lang;

  var D=null,TP=[];
  function norm(s){return s.replace(/\s+/g,' ').trim()}
  function tr(s){
    if(!D)return null;var k=norm(s);if(k.length<2)return null;
    var t=D[k];if(t!==undefined)return t;
    for(var i=0;i<TP.length;i++){var m=TP[i].re.exec(k);if(m)return TP[i].t.replace(/\{(\d)\}/g,function(_,n){return m[+n]===undefined?'':m[+n]})}
    return null}
  function esc(s){return s.replace(/[.*+?^$()|[\]\\]/g,'\\$&')}
  function build(map){D={};TP=[];
    Object.keys(map).forEach(function(k){var v=map[k];if(typeof v!=='string'||!v||v===k)return;
      if(k.indexOf('{')>-1){var re='^'+esc(k).replace(/\{(\d)\}/g,'(.+?)')+'$';TP.push({re:new RegExp(re),t:v})}else D[k]=v})}
  function skip(el){return el&&el.closest&&el.closest('svg,script,style,noscript,ins,textarea,[translate=no]')}
  var ATTR=['alt','title','aria-label','placeholder'];
  function doText(n){var s=n.nodeValue;if(!s||s.length<2||!/\S/.test(s))return;var t=tr(s);
    if(t!==null){var m=/^(\s*)[\s\S]*?(\s*)$/.exec(s);n.nodeValue=m[1]+t+m[2]}}
  function doEl(e){ATTR.forEach(function(a){var v=e.getAttribute&&e.getAttribute(a);if(v){var t=tr(v);if(t!==null)e.setAttribute(a,t)}})}
  function doHero(h){ // headline made of animated word spans: rebuild from the translated aria-label
    var inner=h.querySelector(':scope>span[aria-hidden]');if(!inner||h.dataset.i18n)return;
    var t=tr(h.getAttribute('aria-label')||'');if(t===null)return;
    h.dataset.i18n=1;h.setAttribute('aria-label',t);
    var ico=inner.querySelector('.wf-ico'),w=inner.querySelector('.wf-w'),cls=w?w.className:'wf-w';
    var words=t.split(' ');if(words.length<2){var c=Array.from(t),h2=Math.ceil(c.length/2);words=[c.slice(0,h2).join(''),c.slice(h2).join('')]}
    var cut=Math.ceil(words.length/2),html='',d=120,sp=function(x){var s=document.createElement('span');s.className=cls;s.style.setProperty('--d',d+'ms');s.textContent=x;d+=70;return s.outerHTML};
    var frag=document.createDocumentFragment();
    words.forEach(function(x,i){if(i===cut&&ico){var e=ico.cloneNode(true);e.style.setProperty('--d',d+'ms');d+=70;frag.appendChild(document.createTextNode(' '));frag.appendChild(e)}
      if(i)frag.appendChild(document.createTextNode(' '));var tmp=document.createElement('div');tmp.innerHTML=sp(x);frag.appendChild(tmp.firstChild)});
    inner.textContent='';inner.appendChild(frag)}
  function run(scope){
    if(!D||!scope)return;
    if(scope.nodeType===3){if(!skip(scope.parentNode))doText(scope);return}
    if(scope.nodeType!==1||skip(scope))return;
    var w=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT,null),n;
    while((n=w.nextNode())){if(!skip(n.parentNode))doText(n)}
    var hs=scope.querySelectorAll('h1[aria-label]');for(var j=0;j<hs.length;j++)doHero(hs[j]);
    if(scope.matches&&scope.matches('[alt],[title],[aria-label],[placeholder]'))doEl(scope);
    var els=scope.querySelectorAll('[alt],[title],[aria-label],[placeholder]');for(var i=0;i<els.length;i++)if(!skip(els[i]))doEl(els[i])}
  function meta(){document.querySelectorAll('meta[name=description],meta[property="og:description"],meta[property="og:title"]').forEach(function(m){var t=tr(m.content||'');if(t!==null)m.content=t});
    var t=tr(document.title);if(t!==null)document.title=t}
  var queue=[],raf=0;
  function flush(){raf=0;var q=queue;queue=[];q.forEach(run)}
  function observe(){if(!window.MutationObserver)return;
    new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1||n.nodeType===3)queue.push(n)})});
      if(queue.length&&!raf)raf=requestAnimationFrame(flush)}).observe(document.body,{childList:true,subtree:true})}

  // Public helper for scripts: translate a string (with {1},{2} placeholders) if a translation is loaded.
  window.gcT=function(s){return tr(s)||s};

  if(lang!=='en'){
    var go=function(){
      fetch('i18n/'+lang+'.json?v='+V).then(function(r){return r.ok?r.json():null}).then(function(j){
        if(!j)return;build(j);run(document.body);meta();observe()}).catch(function(){})};
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
  }

  // ---- Switcher UI: globe button next to the Theme button (desktop) and a Language row in the menu (mobile) ----
  function setLang(c){try{localStorage.setItem('lang',c)}catch(e){}
    if(c===lang)return;location.reload()}
  function grid(){var g=document.createElement('div');g.className='lgrid';g.setAttribute('role','group');g.setAttribute('aria-label','Language');
    LANGS.forEach(function(l){var b=document.createElement('button');b.type='button';b.dataset.v=l[0];b.textContent=l[1];b.setAttribute('translate','no');b.setAttribute('lang',l[0]);b.setAttribute('aria-pressed',l[0]===lang);g.appendChild(b)});
    g.addEventListener('click',function(e){var b=e.target.closest('button');if(b)setLang(b.dataset.v)});return g}
  var cur=LANGS.filter(function(l){return l[0]===lang})[0][1];
  function ui(){
    var bar=document.querySelector('header.top .w');if(!bar)return;
    var tb=document.getElementById('themebtn');
    var ICON='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 3.9 5.7 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.7-3.9-9S9.4 5.7 12 3z"/></svg>';
    var b=document.createElement('button');b.id='langbtn';b.type='button';b.innerHTML=ICON;b.setAttribute('aria-label','Language');b.setAttribute('aria-haspopup','true');b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls','lpop');
    var pop=document.createElement('div');pop.id='lpop';pop.className='tpop lpop';pop.hidden=true;pop.setAttribute('role','dialog');pop.setAttribute('aria-label','Language');
    pop.innerHTML='<span class="tl">Language</span>';pop.appendChild(grid());
    function openPop(o){pop.hidden=!o;b.setAttribute('aria-expanded',o);if(o){var r=b.getBoundingClientRect(),w=Math.min(360,document.documentElement.clientWidth-24);pop.style.width=w+'px';pop.style.top=(r.bottom+10)+'px';pop.style.right='auto';pop.style.left=Math.max(12,Math.min(r.right-w,document.documentElement.clientWidth-w-12))+'px'}}
    b.addEventListener('click',function(e){e.stopPropagation();var t=document.getElementById('tpop');if(t&&!t.hidden)t.hidden=true;openPop(pop.hidden)});
    document.addEventListener('click',function(e){if(!pop.hidden&&!pop.contains(e.target))openPop(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!pop.hidden){openPop(false);b.focus()}});
    window.addEventListener('resize',function(){openPop(false)});
    bar.insertBefore(b,tb||null);document.body.appendChild(pop);
    // theme popup closes when this one opens (and the reverse is handled by its outside-click rule)
    // mobile panel row
    var mp=document.getElementById('mpanel');
    if(mp){var row=document.createElement('div');row.className='mtheme mlang';
      row.innerHTML='<span>Language</span><button type="button" class="btn g mlb" aria-expanded="false" translate="no"></button>';
      var mb=row.querySelector('.mlb');mb.textContent=cur;var g=grid();g.hidden=true;row.appendChild(g);
      mb.addEventListener('click',function(){g.hidden=!g.hidden;mb.setAttribute('aria-expanded',!g.hidden)});
      var th=mp.querySelector('.mtheme');if(th)mp.insertBefore(row,th);else mp.appendChild(row);
      if(lang!=='en'&&D)run(row)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ui);else ui();
})();
