// Edit this list to add gadgets. Each one needs a name; the rest is optional.
// amazon: your affiliate link. instagram: link to the unboxing reel/post. image: path or URL to a photo.
// Amazon Associates India tracking ID. Added to full amazon.in links that have no tag.
// Short links (amzn.to, link.amazon) from SiteStripe are already tagged; they are left unchanged.
var AMAZON_TAG='siddhantsar0a-21';
// YouTube Shorts: add one line per Short. yt = the ID from youtube.com/shorts/<ID>. name, tag and amazon (buy link) are optional.
// Example: {name:"Product name",yt:"AbCdEfGhIjK",tag:"Audio",amazon:"https://amzn.to/xxxx"},
var SHORTS=[
  {name:"Video 1",yt:"ssjguhVwXUA",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 2",yt:"xFsvUNYe-C8",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 3",yt:"ta4SZvrnWoQ",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 4",yt:"pSUtDIlo80k",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 5",yt:"GVP2q_Svido",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 6",yt:"SgH8y4cYIlE",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 7",yt:"f6WOnh-A-Hc",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 8",yt:"bX9g7eUAHgA",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 9",yt:"eQW0qPO9w-E",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 10",yt:"aREaU_HysoU",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 11",yt:"orq0elcMI-M",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 12",yt:"NNkbqzwtjS8",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 13",yt:"OnDMNWAcqFA",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 14",yt:"s7lTVd_SCn8",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 15",yt:"C8AW-R1IMrE",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 16",yt:"T47uqui_P5M",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 17",yt:"UIQg1plXLnU",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 18",yt:"OmwklOhb0ow",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 19",yt:"g_qHAISB5AE",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 20",yt:"uQfeYlyZ-Bc",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 21",yt:"r4mee9F2AZY",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 22",yt:"EnzViP-qazc",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 23",yt:"GQsUzX-Owa4",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 24",yt:"lKcGi3W-eww",tag:"Videos",blurb:"Watch the video for the details."},
  {name:"Video 25",yt:"c9wEX6mBrrk",tag:"Videos",blurb:"Watch the video for the details."},
];
// Earlier Instagram video picks. Not shown on the page; kept here in case they are needed again.
var INSTAGRAM_FALLBACK=[
  {name:"Video pick 1",blurb:"Watch the video for the details.",tag:"Videos",instagram:"https://www.instagram.com/reel/Deo57vwIMkE/"},
  {name:"Video pick 2",blurb:"Watch the video for the details.",tag:"Videos",instagram:"https://www.instagram.com/reel/Dd6bLk7IPWP/"},
  {name:"Video pick 3",blurb:"Watch the video for the details.",tag:"Videos",instagram:"https://www.instagram.com/reel/Ddto8bgo9KX/"},
  {name:"Video pick 4",blurb:"Watch the video for the details.",tag:"Videos",instagram:"https://www.instagram.com/reel/Dc5bpsHxvHP/"},
  {name:"Video pick 5",blurb:"Watch the video for the details.",tag:"Videos",instagram:"https://www.instagram.com/reel/Dcxkq0BMzhQ/"},
  {name:"Video pick 6",blurb:"Watch the video for the details.",tag:"Videos",instagram:"https://www.instagram.com/reel/DcdafrGIUBF/"},
  {name:"Video pick 7",blurb:"Watch the video for the details.",tag:"Videos",instagram:"https://www.instagram.com/reel/DcLiS05Mvqp/"},
  {name:"Video pick 8",blurb:"Watch the video for the details.",tag:"Videos",instagram:"https://www.instagram.com/reel/DbUrlDbR1jX/"},
  {name:"Video pick 9",blurb:"Watch the video for the details.",tag:"Videos",instagram:"https://www.instagram.com/reel/Da0JislslPk/"},
  {name:"Video pick 10",blurb:"Watch the video for the details.",tag:"Videos",instagram:"https://www.instagram.com/reel/DapDRXwMyj8/"},
  {name:"Video pick 11",blurb:"Watch the video for the details.",tag:"Videos",instagram:"https://www.instagram.com/reel/Daj0IfjMmk3/"},
  {name:"Video pick 12",blurb:"Watch the video for the details.",tag:"Videos",instagram:"https://www.instagram.com/reel/Dag90hkIFuH/"},
  {name:"Video pick 13",blurb:"Watch the video for the details.",tag:"Videos",instagram:"https://www.instagram.com/reel/DaZomgLsF38/"},
  {name:"OnePlus Nord Buds 4 Pro",blurb:"Wireless earbuds. Watch the video, then use the tagged product link on Instagram.",tag:"Audio",instagram:"https://www.instagram.com/reel/DedlTDWon_2/",thumb:"img/gad/nordbuds.jpg"},
  {name:"Portronics toolkit",blurb:"A handy toolkit from Portronics. Watch the video for the details.",tag:"Accessories",instagram:"https://www.instagram.com/reel/DeBVr8gortN/",thumb:"img/gad/portronics.jpg"},
  {name:"Flipkart Big Billion Days pick",blurb:"A deal I found during Big Billion Days. Use the tagged product link on Instagram.",tag:"Deals",instagram:"https://www.instagram.com/reel/DeTUEVFos-X/",thumb:"img/gad/flipkart.jpg"},
];
var GADGETS=[
  {name:"Apple gadget pick",blurb:"An Apple accessory I recommend. Buy link below.",tag:"Apple",image:"img/gad/apple.jpg",amazon:"https://link.amazon/B0hd7Pmxg"},
  {name:"Ant Esports KM1610",image:"img/gad/ant-esports-km1610.jpg",tag:"Gaming",amazon:"https://amzn.to/4sbS26X"},
  {name:"Amkette Hush Pro Epic M",image:"img/gad/amkette-hush-pro-epic-m.jpg",tag:"Productivity",amazon:"https://amzn.to/4c56Myy"},
  {name:"Pure Aroma Cute Panda Scent Oil Diffuser Humidifier",tag:"Utility",amazon:"https://amzn.to/4tOLYTp"},
  {name:"PHILIPS 7 in 1 USB",tag:"Utility",amazon:"https://amzn.to/48sPZ7o"},
  {name:"Turtle Cup Holder Coaster",image:"img/gad/turtle-cup-holder-coaster.jpg",tag:"Utility",amazon:"https://amzn.to/4v6DUi1"},
  {name:"TV Remote",image:"img/gad/tv-remote.jpg",tag:"Utility",amazon:"https://amzn.to/4sy5uSQ"},
  {name:"Blix Marble Run 2",image:"img/gad/blix-marble-run-2.jpg",tag:"Toys",amazon:"https://amzn.to/48zslWU"},
  {name:"Smiledrive electric rotating display stand",image:"img/gad/smiledrive-electric-rotating-display-sta.jpg",tag:"Utility",amazon:"https://amzn.to/42pEyKg"},
  {name:"CASON Wireless Door Bell",image:"img/gad/cason-wireless-door-bell.jpg",tag:"Utility",amazon:"https://amzn.to/426yFlr"},
  {name:"Crab Toy For Kids",image:"img/gad/crab-toy-for-kids.jpg",tag:"Utility",amazon:"https://amzn.to/4cXaVWP"},
  {name:"Anchor Door Bell",image:"img/gad/anchor-door-bell.jpg",tag:"Utility",amazon:"https://amzn.to/4sRdYoi"},
  {name:"realme T500 Pro",image:"img/gad/realme-t500-pro.jpg",tag:"Audio",amazon:"https://amzn.to/4vT30kY"},
  {name:"Car mount",image:"img/gad/car-mount.jpg",tag:"Utility",amazon:"https://amzn.to/4uKn8Vb"},
  {name:"Camera Bag",image:"img/gad/camera-bag.jpg",tag:"Utility",amazon:"https://amzn.to/49I7a5B"},
  {name:"Gaming Controller",image:"img/gad/gaming-controller.jpg",tag:"Gaming",amazon:"https://amzn.to/4eXIObE"},
  {name:"Digitek RGB Light",image:"img/gad/digitek-rgb-light.jpg",tag:"Utility",amazon:"https://amzn.to/4nUBnnZ"},
  {name:"TP-Link Tapo H100 IoT Smart Hub with Chime",tag:"Utility",amazon:"https://bitli.in/WTtR88n"},
  {name:"Verilux 240W Type C Cable",image:"img/gad/verilux-240w-type-c-cable.jpg",tag:"Utility",amazon:"https://bitli.in/dltDaBc"},
  {name:"CMF by Nothing Buds 2 Plus",image:"img/gad/cmf-by-nothing-buds-2-plus.png",tag:"Audio",amazon:"https://fktr.in/T4Ztz5f"},
  {name:"Ulanzi Ball Head",image:"img/gad/ulanzi-ball-head.jpg",tag:"Utility",amazon:"https://bitli.in/1M1s4lH"},
  {name:"Amkette XS Series Flow 2 Programmable Wireless Mouse",image:"img/gad/amkette-xs-series-flow-2-programmable-wi.jpg",tag:"Productivity",amazon:"https://bitli.in/HUwd5Bt"},
  {name:"DailyObjects Cover",image:"img/gad/dailyobjects-cover.jpg",tag:"Utility",amazon:"https://amzn.to/4y0kfSB"},
  {name:"DailyObjects Cover 2",tag:"Utility",amazon:"https://amzn.to/4bc1nWL"},
  {name:"DailyObjects Cover 3",tag:"Utility",amazon:"https://amzn.to/4aF0Xbk"},
  // Amazon search links (tagged); swap for exact product or SiteStripe links when available
  {name:"OnePlus Nord Buds 4 Pro",tag:"Audio",amazon:"https://www.amazon.in/s?k=OnePlus+Nord+Buds+4+Pro&tag=siddhantsar0a-21"},
  {name:"Echo Dot",tag:"Audio",amazon:"https://www.amazon.in/s?k=Echo+Dot&tag=siddhantsar0a-21"},
  {name:"Noise Watch",tag:"Utility",amazon:"https://www.amazon.in/s?k=Noise+Watch&tag=siddhantsar0a-21"},
  {name:"CMF by Nothing Headphones",tag:"Audio",amazon:"https://www.amazon.in/s?k=CMF+by+Nothing+Headphones&tag=siddhantsar0a-21"},
  {name:"Macbook Air M5",tag:"Utility",amazon:"https://www.amazon.in/s?k=Macbook+Air+M5&tag=siddhantsar0a-21"},
  {name:"iPhone 17 Pro",tag:"Utility",amazon:"https://www.amazon.in/s?k=iPhone+17+Pro&tag=siddhantsar0a-21"},
  {name:"Camera arm",tag:"Utility",amazon:"https://www.amazon.in/s?k=Camera+arm&tag=siddhantsar0a-21"},
  {name:"Wireless Charging station",tag:"Utility",amazon:"https://www.amazon.in/s?k=Wireless+Charging+station&tag=siddhantsar0a-21"},
  {name:"Kreo Keyboard",tag:"Productivity",amazon:"https://www.amazon.in/s?k=Kreo+Keyboard&tag=siddhantsar0a-21"},
  {name:"FM Radio",tag:"Utility",amazon:"https://www.amazon.in/s?k=FM+Radio&tag=siddhantsar0a-21"},
  {name:"Calculator",tag:"Utility",amazon:"https://www.amazon.in/s?k=Calculator&tag=siddhantsar0a-21"},
  {name:"Infinix Charger",tag:"Utility",amazon:"https://www.amazon.in/s?k=Infinix+Charger&tag=siddhantsar0a-21"},
  {name:"DJI Mic receiver",tag:"Camera Accessories",amazon:"https://www.amazon.in/s?k=DJI+Mic+receiver&tag=siddhantsar0a-21"},
  {name:"Anker USB cable",tag:"Utility",amazon:"https://www.amazon.in/s?k=Anker+USB+cable&tag=siddhantsar0a-21"},
  {name:"Digital USB meter",tag:"Utility",amazon:"https://www.amazon.in/s?k=Digital+USB+meter&tag=siddhantsar0a-21"},
  {name:"AirPods Pro Ear Tips",tag:"Utility",amazon:"https://www.amazon.in/s?k=AirPods+Pro+Ear+Tips&tag=siddhantsar0a-21"},
  {name:"Portronics Extension Board",tag:"Utility",amazon:"https://www.amazon.in/s?k=Portronics+Extension+Board&tag=siddhantsar0a-21"}
];
GADGETS=SHORTS.concat(GADGETS);
var grid=document.getElementById('gadgets'),filters=document.getElementById('filters');
function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function host(u){try{return new URL(u).hostname.replace(/^www\./,'')}catch(e){return ''}}
function amazonUrl(u){var h=host(u);if(/^amazon\.(in|com)$/.test(h)){try{var x=new URL(u);if(!x.searchParams.get('tag'))x.searchParams.set('tag',AMAZON_TAG);return x.toString()}catch(e){}}return u}
function store(u){var h=host(u);if(/(^|\.)(amazon\.[a-z.]+|amzn\.to|link\.amazon)$/.test(h))return 'Amazon';if(/(^|\.)(flipkart\.com|fktr\.in|fkrt\.cc)$/.test(h))return 'Flipkart';return ''}
function render(tag){
  var cards=GADGETS.filter(function(g){return !tag||g.tag===tag}).map(function(g){
    var yt=g.yt?String(g.yt).replace(/[^\w-]/g,''):'';var vthumb=g.thumb||(yt?'https://i.ytimg.com/vi/'+yt+'/hqdefault.jpg':'');var embed=yt?'https://www.youtube-nocookie.com/embed/'+yt+'?autoplay=1&rel=0&playsinline=1':g.instagram?g.instagram.replace(/\/?$/,'/embed/'):'';
    var img=embed?'<button type="button" class="play" data-embed="'+esc(embed)+'" aria-label="Play video: '+esc(g.name)+'">'+(vthumb?'<img class="th" src="'+esc(vthumb)+'" alt="" loading="lazy">':'<span class="ph" aria-hidden="true">'+esc(g.name.charAt(0))+'</span>')+'<i aria-hidden="true"></i></button>':g.image?'<img src="'+esc(g.image)+'" alt="'+esc(g.name)+'" loading="lazy">':'<div class="ph" aria-hidden="true">'+esc(g.name.charAt(0))+'</div>';
    var buy=g.link?'<a class="btn" href="'+esc(g.link)+'" target="_blank" rel="noopener">'+esc(g.linkLabel||'Get it')+'</a>':g.amazon?'<a class="btn" href="'+esc(amazonUrl(g.amazon))+'" target="_blank" rel="sponsored nofollow noopener">'+(store(g.amazon)?'Buy on '+store(g.amazon):'Buy now')+'</a>':'';
    var ig=yt?'<a class="btn g" href="https://www.youtube.com/shorts/'+esc(yt)+'" target="_blank" rel="noopener">Watch on YouTube</a>':g.instagram?'<a class="btn g" href="'+esc(g.instagram)+'" target="_blank" rel="noopener">Open in Instagram</a>':'';
    return '<article class="card gad">'+img+'<div class="b"><span class="badge">'+esc(g.tag)+(g.example?' · example':'')+'</span><h3>'+esc(g.name)+'</h3>'+(g.blurb?'<p>'+esc(g.blurb)+'</p>':'')+''+(g.price?'<p class="price">'+esc(g.price)+'</p>':'')+'<div class="btns">'+buy+ig+'</div></div></article>';
  });
  if(cards.length>6&&window.gcAdHTML&&gcAdHTML('gadgets'))cards.splice(6,0,'<div class="adslot ad-wide" data-ad="gadgets"></div>');
  grid.innerHTML=cards.join('');
  if(window.gcAds)gcAds(grid);
  if(window.gcReveal)gcReveal(grid);
}
var tags=[];GADGETS.forEach(function(g){if(g.tag&&tags.indexOf(g.tag)<0)tags.push(g.tag)});
filters.innerHTML=['All'].concat(tags).map(function(t,i){return '<button type="button" data-tag="'+(i?esc(t):'')+'" aria-pressed="'+(i===0)+'">'+esc(t)+'</button>'}).join('');
filters.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;filters.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});render(b.dataset.tag)});
render('');

grid.addEventListener('click',function(e){var b=e.target.closest('.play');if(!b)return;
  var f=document.createElement('iframe');f.src=b.dataset.embed;f.className='vid';f.setAttribute('allowfullscreen','');f.setAttribute('allow','autoplay; encrypted-media; fullscreen; picture-in-picture');f.setAttribute('title','Video');f.loading='lazy';
  var c=b.closest('.card');if(c)c.classList.add('playing');b.replaceWith(f)});
/* press feedback: ripple + pop, and keep the selected pill in view */
(function(){var f=document.getElementById('filters');if(!f)return;
f.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
var r=b.getBoundingClientRect(),s=Math.max(r.width,r.height)*2,d=document.createElement('span');d.className='rip';
d.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2||r.width/2-s/2)+'px;top:'+(e.clientY-r.top-s/2||r.height/2-s/2)+'px';
b.appendChild(d);setTimeout(function(){d.remove()},600);
b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop');
try{b.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'})}catch(x){}});})();
