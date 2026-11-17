// Edit this list to add gadgets. Each one needs a name; the rest is optional.
// amazon: your affiliate link. instagram: link to the unboxing reel/post. image: path or URL to a photo.
// Amazon Associates India tracking ID. Added to full amazon.in links that have no tag.
// Short links (amzn.to, link.amazon) from SiteStripe are already tagged; they are left unchanged.
var AMAZON_TAG='siddhantsar0a-21';
var GADGETS=[
  {name:"OnePlus Nord Buds 4 Pro",blurb:"Wireless earbuds. Watch the video, then use the tagged product link on Instagram.",tag:"Audio",instagram:"https://www.instagram.com/reel/DedlTDWon_2/",thumb:"img/gad/nordbuds.jpg"},
  {name:"Apple gadget pick",blurb:"An Apple accessory I recommend. Buy link below.",tag:"Apple",instagram:"https://www.instagram.com/reel/Ddf-Xzgocvg/",thumb:"img/gad/apple.jpg",amazon:"https://link.amazon/B0hd7Pmxg"},
  {name:"Portronics toolkit",blurb:"A handy toolkit from Portronics. Watch the video for the details.",tag:"Accessories",instagram:"https://www.instagram.com/reel/DeBVr8gortN/",thumb:"img/gad/portronics.jpg"},
  {name:"Flipkart Big Billion Days pick",blurb:"A deal I found during Big Billion Days. Use the tagged product link on Instagram.",tag:"Deals",instagram:"https://www.instagram.com/reel/DeTUEVFos-X/",thumb:"img/gad/flipkart.jpg"}
,
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
  {name:"DailyObjects Cover",image:"img/gad/dailyobjects-cover.jpg",tag:"Utility",amazon:"https://amzn.to/4y0kfSB"}
];
var grid=document.getElementById('gadgets'),filters=document.getElementById('filters');
function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function host(u){try{return new URL(u).hostname.replace(/^www\./,'')}catch(e){return ''}}
function amazonUrl(u){var h=host(u);if(/^amazon\.(in|com)$/.test(h)){try{var x=new URL(u);if(!x.searchParams.get('tag'))x.searchParams.set('tag',AMAZON_TAG);return x.toString()}catch(e){}}return u}
function store(u){var h=host(u);if(/(^|\.)(amazon\.[a-z.]+|amzn\.to|link\.amazon)$/.test(h))return 'Amazon';if(/(^|\.)(flipkart\.com|fktr\.in|fkrt\.cc)$/.test(h))return 'Flipkart';return ''}
function render(tag){
  grid.innerHTML=GADGETS.filter(function(g){return !tag||g.tag===tag}).map(function(g){
    var img=g.instagram?'<button type="button" class="play" data-embed="'+esc(g.instagram.replace(/\/?$/,'/embed/'))+'" aria-label="Play video: '+esc(g.name)+'">'+(g.thumb?'<img class="th" src="'+esc(g.thumb)+'" alt="" loading="lazy">':'<span class="ph" aria-hidden="true">'+esc(g.name.charAt(0))+'</span>')+'<i aria-hidden="true"></i></button>':g.image?'<img src="'+esc(g.image)+'" alt="'+esc(g.name)+'" loading="lazy">':'<div class="ph" aria-hidden="true">'+esc(g.name.charAt(0))+'</div>';
    var buy=g.link?'<a class="btn" href="'+esc(g.link)+'" target="_blank" rel="noopener">'+esc(g.linkLabel||'Get it')+'</a>':g.amazon?'<a class="btn" href="'+esc(amazonUrl(g.amazon))+'" target="_blank" rel="sponsored nofollow noopener">'+(store(g.amazon)?'Buy on '+store(g.amazon):'Buy now')+'</a>':'';
    var ig=g.instagram?'<a class="btn g" href="'+esc(g.instagram)+'" target="_blank" rel="noopener">Open in Instagram</a>':'';
    return '<article class="card gad">'+img+'<div class="b"><span class="badge">'+esc(g.tag)+(g.example?' · example':'')+'</span><h3>'+esc(g.name)+'</h3>'+(g.blurb?'<p>'+esc(g.blurb)+'</p>':'')+''+(g.price?'<p class="price">'+esc(g.price)+'</p>':'')+'<div class="btns">'+buy+ig+'</div></div></article>';
  }).join('');
}
var tags=[];GADGETS.forEach(function(g){if(g.tag&&tags.indexOf(g.tag)<0)tags.push(g.tag)});
filters.innerHTML=['All'].concat(tags).map(function(t,i){return '<button type="button" data-tag="'+(i?esc(t):'')+'" aria-pressed="'+(i===0)+'">'+esc(t)+'</button>'}).join('');
filters.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;filters.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});render(b.dataset.tag)});
render('');

grid.addEventListener('click',function(e){var b=e.target.closest('.play');if(!b)return;
  var f=document.createElement('iframe');f.src=b.dataset.embed;f.className='vid';f.setAttribute('allowfullscreen','');f.setAttribute('allow','autoplay; encrypted-media; fullscreen');f.setAttribute('title','Video');f.loading='lazy';
  b.replaceWith(f)});
