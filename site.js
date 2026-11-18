// Ads. Paste each AdSense ad unit's data-ad-slot number between the quotes. Empty = that placement stays hidden.
var ADS={client:"ca-pub-1772519761593058",slots:{gadgets:"4352218981",apps:"3070926906",dl:"3070926906"}};
function gcAdHTML(k){var s=ADS.slots[k];if(!s)return"";return'<ins class="adsbygoogle" style="display:block" data-ad-client="'+ADS.client+'" data-ad-slot="'+s+'" data-ad-format="auto" data-full-width-responsive="true"></ins>'}
// Fills the .adslot boxes inside scope (or the whole page) and asks AdSense to serve them. Empty slot number = box stays collapsed.
function gcAds(scope){(scope||document).querySelectorAll('.adslot:not([data-done])').forEach(function(b){
  var h=gcAdHTML(b.dataset.ad);if(!h)return;b.dataset.done=1;
  b.innerHTML='<span class="adl">Advertisement</span>'+h;b.classList.add('on');
  try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(e){}})}
document.addEventListener('DOMContentLoaded',function(){gcAds()});
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

// Theme setting (System / Light / Dark / OLED). Light is the default; the choice is remembered when storage is available.
(function(){
  var root=document.documentElement,bar=document.querySelector('header.top .w');if(!bar)return;
  var mq=window.matchMedia?matchMedia('(prefers-color-scheme: dark)'):null;
  function getPref(){var v=null;try{v=localStorage.getItem('theme')}catch(e){}return v==='system'||v==='dark'||v==='light'||v==='oled'?v:'light'}
  var pref=getPref(),segs=[];
  function apply(){var r=pref==='system'?(mq&&mq.matches?'dark':'light'):pref;root.setAttribute('data-theme',r==='oled'?'dark':r);root.setAttribute('data-pref',pref);
    var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',r==='oled'?'#000000':r==='dark'?'#08121C':'#F3F8FD');
    segs.forEach(function(sg){sg.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x.dataset.v===pref)})})}
  function setPref(v){pref=v;try{localStorage.setItem('theme',v)}catch(e){}apply()}
  if(mq){var ch=function(){if(pref==='system')apply()};mq.addEventListener?mq.addEventListener('change',ch):mq.addListener&&mq.addListener(ch)}
  window.addEventListener('storage',function(e){if(e.key==='theme'){pref=getPref();apply()}});
  function seg(label){var d=document.createElement('div');d.className='seg';d.setAttribute('role','group');d.setAttribute('aria-label',label||'Theme');
    d.innerHTML='<button type="button" data-v="system">System</button><button type="button" data-v="light">Light</button><button type="button" data-v="dark">Dark</button><button type="button" data-v="oled">OLED</button>';
    d.addEventListener('click',function(e){var x=e.target.closest('button');if(x)setPref(x.dataset.v)});segs.push(d);return d}
  var ICON='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var b=document.createElement('button');b.id='themebtn';b.type='button';b.innerHTML=ICON;b.setAttribute('aria-label','Appearance');b.setAttribute('aria-haspopup','true');b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls','tpop');
  var pop=document.createElement('div');pop.id='tpop';pop.className='tpop';pop.hidden=true;pop.setAttribute('role','dialog');pop.setAttribute('aria-label','Appearance');
  pop.innerHTML='<span class="tl">Theme</span>';pop.appendChild(seg('Theme'));
  function openPop(o){pop.hidden=!o;b.setAttribute('aria-expanded',o);if(o){var r=b.getBoundingClientRect();pop.style.top=(r.bottom+10)+'px';pop.style.right=Math.max(12,document.documentElement.clientWidth-r.right)+'px'}}
  b.addEventListener('click',function(e){e.stopPropagation();openPop(pop.hidden)});
  document.addEventListener('click',function(e){if(!pop.hidden&&!pop.contains(e.target))openPop(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!pop.hidden){openPop(false);b.focus()}});
  window.addEventListener('resize',function(){openPop(false)});
  bar.appendChild(b);document.body.appendChild(pop);

  // Mobile menu: round toggle in the top bar opens a rounded panel with the page links and a Theme row.
  var hdr=bar.parentNode,nav=bar.querySelector('nav');if(!nav)return;
  var tog=document.createElement('button');tog.type='button';tog.className='mtog';tog.setAttribute('aria-label','Open menu');tog.setAttribute('aria-expanded','false');tog.setAttribute('aria-controls','mpanel');
  tog.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path class="ham" d="M4 7h16M4 12h16M4 17h16"/><path class="cls" d="M6 6l12 12M18 6L6 18"/></svg>';
  var p=document.createElement('div');p.id='mpanel';p.className='mpanel';p.hidden=true;
  var html='<a href="index.html">Home</a>';
  nav.querySelectorAll('a').forEach(function(a){html+='<a href="'+a.getAttribute('href')+'"'+(a.hasAttribute('aria-current')?' aria-current="page"':'')+'>'+a.textContent+'</a>'});
  var so=document.querySelectorAll('header .hsoc .sbtn');if(so.length){html+='<hr><div class="msoc"><span>Community</span><div>';so.forEach(function(a){html+=a.outerHTML});html+='</div></div>'}
  html+='<hr><div class="mtheme"><span>Theme</span></div>';
  p.innerHTML=html;p.querySelector('.mtheme').appendChild(seg('Theme'));
  function set(o){p.hidden=!o;hdr.classList.toggle('mopen',o);tog.setAttribute('aria-expanded',o);tog.setAttribute('aria-label',o?'Close menu':'Open menu')}
  tog.addEventListener('click',function(){set(p.hidden)});
  p.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
  document.addEventListener('click',function(e){if(!p.hidden&&!hdr.contains(e.target))set(false)});
  bar.appendChild(tog);hdr.appendChild(p);apply();
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
    var CARDS='.six a,.more div,.steps3 div,.cats>*,.apps>*,.fx>div,.dc>div,.grid>.card';
    var PLAIN='.sec-h,.block>*,.faq,.cta,.ap-h,.ft-shot,.av>div,.ap-vid,.ap-install';
    // one batch = the elements that enter together; they stagger left-to-right / top-to-bottom, once
    var io=new IntersectionObserver(function(es){
      var hit=es.filter(function(e){return e.isIntersecting}).map(function(e){return e.target});
      hit.sort(function(a,b){var p=a.compareDocumentPosition(b);return p&4?-1:p&2?1:0});
      hit.forEach(function(el,i){
        io.unobserve(el);el.style.setProperty('--d',Math.min(i,7)*70+'ms');
        requestAnimationFrame(function(){el.classList.add('in')});
        // drop the reveal styles afterwards so hover transitions are not delayed
        var done=function(ev){if(ev&&ev.target!==el)return;el.removeEventListener('transitionend',done);el.classList.remove('rv','rv-card','in');el.style.removeProperty('--d')};
        el.addEventListener('transitionend',done);setTimeout(done,1600);
      });
    },{rootMargin:'0px 0px -6% 0px',threshold:.06});
    window.gcReveal=function(scope){
      (scope||document).querySelectorAll(CARDS+','+PLAIN).forEach(function(el){
        if(el.classList.contains('rv')||el.dataset.rvd)return;el.dataset.rvd=1;
        el.classList.add('rv');if(el.matches(CARDS))el.classList.add('rv-card');io.observe(el)});
      // safety net: never leave content hidden
      setTimeout(function(){(scope||document).querySelectorAll('.rv:not(.in)').forEach(function(el){var r=el.getBoundingClientRect();if(r.top<innerHeight)el.classList.add('in')})},1400);
    };
    window.gcReveal();
  }else window.gcReveal=function(){};
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

/* laptop frames follow the real screenshot ratio */

/* Apps page: platform jump pill with scroll-spy */
(function(){
  var bar=document.querySelector('.osp');if(!bar)return;
  var links=[].slice.call(bar.querySelectorAll('a')),blob=bar.querySelector('.osb'),cur=null;
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function fit(){bar.classList.remove('scroll');if(bar.scrollWidth>bar.clientWidth+1)bar.classList.add('scroll')}
  function mark(l){fit();
    if(!l)return;cur=l;
    links.forEach(function(a){var on=a===l;a.classList.toggle('on',on);on?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current')});
    blob.style.width=l.offsetWidth+'px';blob.style.transform='translateX('+l.offsetLeft+'px)';bar.classList.add('ready');
    if(bar.scrollWidth>bar.clientWidth)bar.scrollLeft=l.offsetLeft-(bar.clientWidth-l.offsetWidth)/2;
  }
  var tg=links.map(function(a){return document.getElementById(a.getAttribute('href').slice(1))});
  function spy(){
    var line=window.innerHeight*.35,best=links[0];
    tg.forEach(function(h,i){if(h&&h.getBoundingClientRect().top<=line)best=links[i]});
    if(best!==cur)mark(best);
  }
  links.forEach(function(a,i){a.addEventListener('click',function(e){
    var h=tg[i];if(!h)return;e.preventDefault();mark(a);
    h.scrollIntoView({behavior:rm?'auto':'smooth',block:'start'});
    if(history.replaceState)history.replaceState(null,'','#'+h.id);
  })});
  var t=0;window.addEventListener('scroll',function(){if(!t){t=requestAnimationFrame(function(){t=0;spy()})}},{passive:true});
  window.addEventListener('resize',function(){var c=cur;cur=null;mark(c||links[0])});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){var c=cur;cur=null;mark(c||links[0])});
  spy();
})();

/* tvOS Launcher: load the YouTube playlist only after a click */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.ytv-go');if(!b)return;var h=b.parentNode,l=h.getAttribute('data-list'),v=h.getAttribute('data-vid');if(!l&&!v)return;var f=document.createElement('iframe');f.src=v?'https://www.youtube-nocookie.com/embed/'+encodeURIComponent(v)+'?autoplay=1&rel=0':'https://www.youtube-nocookie.com/embed/videoseries?list='+encodeURIComponent(l)+'&autoplay=1';f.title=v?'Guide To Install & Set As Default tvOS Launcher in Android/ Google TV':'tvOS Launcher on YouTube';f.allow='accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';f.allowFullscreen=true;f.referrerPolicy='strict-origin-when-cross-origin';h.replaceChild(f,b)});

// Download interstitial: a plain click on a real download button shows a labelled ad, counts down, then starts the file.
// Never blocks the download: if the ad fails or is blocked, the countdown still ends and the file starts. Esc / Skip / Download now start it right away.
(function(){
  var SECS=15,links=document.querySelectorAll('a.btn[download],a[data-repo]');if(!links.length)return;
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ov=document.createElement('div');ov.className='dlov';ov.hidden=true;
  ov.innerHTML='<div class="dlm" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="dlt" aria-describedby="dlc"><h2 id="dlt">Your download is almost ready</h2><div class="dlad"></div><p id="dlc" class="dlc" aria-live="polite"></p><div class="dlbar" aria-hidden="true"><i></i></div><div class="dlb"><button type="button" class="btn dlgo">Download now</button><button type="button" class="btn g dlx">Close</button></div><div class="dq"><p class="dqh">Enjoying the apps? Chip in \u2764</p><p class="dqs">Totally optional \u2014 your download starts either way. Any small amount from \u20b95 helps keep this website running and the apps free.</p><div class="dqc" role="group" aria-label="Choose an amount in rupees"><button type="button" class="btn g" data-a="5">\u20b95</button><button type="button" class="btn g" data-a="10">\u20b910</button><button type="button" class="btn g" data-a="20">\u20b920</button><button type="button" class="btn g" data-a="50">\u20b950</button><button type="button" class="btn g" data-a="100">\u20b9100</button></div><form class="dqf" novalidate><label for="dqa" class="dqv">Custom amount in rupees</label><span aria-hidden="true">\u20b9</span><input id="dqa" type="number" inputmode="numeric" min="5" step="1" placeholder="Other (min 5)" autocomplete="off"><button type="submit" class="btn g dqp">Donate</button></form><p class="dqe" role="status" aria-live="polite"></p><div class="dqr" hidden><img src="img/upi-qr.png" width="160" height="160" alt="UPI QR code to donate" loading="lazy"><p class="dqrt">Scan with any UPI app to pay.</p></div><div class="dqa" hidden><p class="dqat"></p><div class="dqab"><a class="btn g" data-p="gpay">Google Pay</a><a class="btn g" data-p="phonepe">PhonePe</a><a class="btn g" data-p="paytm">Paytm</a><a class="btn g" data-p="bhim">BHIM</a><a class="btn g" data-p="other">Other UPI app</a></div></div><div class="dqm"><button type="button" class="btn g dqy">Copy UPI ID</button><button type="button" class="btn g dqt" aria-expanded="false">Show QR</button></div></div><p class="dln">Ads help keep these apps free.</p></div>';
  document.body.appendChild(ov);
  var m=ov.querySelector('.dlm'),adbox=ov.querySelector('.dlad'),msg=ov.querySelector('.dlc'),bar=ov.querySelector('.dlbar i'),go=ov.querySelector('.dlgo'),x=ov.querySelector('.dlx');
  var cur=null,timer=null,left=0,from=null,done=false,used=false;
  var VPA='9923081936@kotakbank',PN='SIDDHANT RAMESH TAMGADGE',AND=/Android/i.test(navigator.userAgent),MOB=AND||/iPhone|iPad|iPod/i.test(navigator.userAgent)||(/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints>1);
  var dq=ov.querySelector('.dq'),dqe=dq.querySelector('.dqe'),dqr=dq.querySelector('.dqr'),dqrt=dq.querySelector('.dqrt'),dqa=dq.querySelector('#dqa'),dqt=dq.querySelector('.dqt'),dqy=dq.querySelector('.dqy');
  function upi(n){return'upi://pay?pa='+encodeURIComponent(VPA).replace('%40','@')+'&pn='+encodeURIComponent(PN)+'&am='+n+'&cu=INR&tn='+encodeURIComponent('GadgetCue support')}
  function showQR(on,txt){dqr.hidden=!on;dqt.textContent=on?'Hide QR':'Show QR';dqt.setAttribute('aria-expanded',on?'true':'false');if(txt)dqrt.textContent=txt}
  var dqa2=dq.querySelector('.dqa'),dqat=dq.querySelector('.dqat');
  var PK={gpay:'com.google.android.apps.nbu.paisa.user',phonepe:'com.phonepe.app',paytm:'net.one97.paytm',bhim:'in.org.npci.upiapp'},IOS={gpay:'gpay://upi/pay?',phonepe:'phonepe://pay?',paytm:'paytmmp://pay?',bhim:'upi://pay?',other:'upi://pay?'};
  function setApps(n){
    var qs=upi(n).split('?')[1];dqat.textContent='Pay \u20b9'+n+' with:';dqa2.hidden=false;
    dqa2.querySelectorAll('a[data-p]').forEach(function(a){var k=a.getAttribute('data-p');
      a.href=AND?'intent://pay?'+qs+'#Intent;scheme=upi;'+(PK[k]?'package='+PK[k]+';':'')+'end':IOS[k]+qs;a.rel='noopener'});
  }
  dqa2.addEventListener('click',function(e){if(e.target.closest('a[data-p]')){used=true;dqe.textContent='Opening your UPI app\u2026 thank you!'}});
  function pay(n){
    n=Math.floor(Number(n));used=true;
    if(!(n>=5)){dqe.textContent='Please enter at least \u20b95.';dqa.focus();return}
    dqe.textContent='';
    if(MOB){showQR(false);setApps(n)}
    else{showQR(true,'UPI links open on phones. Scan this with any UPI app to pay \u20b9'+n+'.')}
  }
  dq.querySelector('.dqc').addEventListener('click',function(e){var b=e.target.closest('button[data-a]');if(b)pay(b.getAttribute('data-a'))});
  dq.querySelector('.dqf').addEventListener('submit',function(e){e.preventDefault();pay(dqa.value)});
  dqt.addEventListener('click',function(){used=true;showQR(dqr.hidden,'Scan with any UPI app to pay.')});
  dqy.addEventListener('click',function(){used=true;var ok=function(){dqy.textContent='Copied!';setTimeout(function(){dqy.textContent='Copy UPI ID'},1800)};
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(VPA).then(ok,function(){dqe.textContent='UPI ID: '+VPA});else dqe.textContent='UPI ID: '+VPA});
  function start(){if(done||!cur)return;done=true;var a=document.createElement('a');a.href=cur.href;if(cur.hasAttribute('download'))a.setAttribute('download','');a.style.display='none';document.body.appendChild(a);a.click();a.remove();msg.textContent='Your download has started.';bar.style.width='100%';clearInterval(timer)}
  function close(){clearInterval(timer);ov.hidden=true;document.documentElement.classList.remove('dlopen');adbox.innerHTML='';if(from&&from.focus)from.focus()}
  function tick(){left--;if(left<=0){clearInterval(timer);start();if(!used)setTimeout(close,1200);else msg.textContent='Your download has started. Thank you for the support!';return}msg.textContent='Download starts in '+left+' second'+(left===1?'':'s')+'.';bar.style.width=((SECS-left)/SECS*100)+'%'}
  function open(a){
    cur=a;from=a;done=false;left=SECS;used=false;dqe.textContent='';dqa.value='';showQR(false);dqa2.hidden=true;
    adbox.innerHTML='<div class="adslot" data-ad="dl"></div>';gcAds(adbox);
    msg.textContent='Download starts in '+left+' seconds.';bar.style.width='0%';
    ov.hidden=false;document.documentElement.classList.add('dlopen');m.focus({preventScroll:true});
    clearInterval(timer);timer=setInterval(tick,1000);
  }
  go.addEventListener('click',function(){start();if(used){msg.textContent='Your download has started. Thank you for the support!'}else close()});
  x.addEventListener('click',function(){done=true;close()});
  ov.addEventListener('click',function(e){if(e.target===ov){done=true;close()}});
  document.addEventListener('keydown',function(e){
    if(ov.hidden)return;
    if(e.key==='Escape'){done=true;close();return}
    if(e.key==='Tab'){var f=m.querySelectorAll('button,input'),a=f[0],z=f[f.length-1];
      if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}else if(!m.contains(document.activeElement)){e.preventDefault();a.focus()}}});
  links.forEach(function(a){a.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.classList.contains('off'))return;
    e.preventDefault();open(a)})});
})();
