// Edit this list to add gadgets. Each one needs a name; the rest is optional.
// amazon: your affiliate link. instagram: link to the unboxing reel/post. image: path or URL to a photo.
var GADGETS=[
  {name:"OnePlus Nord Buds 4 Pro",blurb:"Wireless earbuds. Watch the video, then use the tagged product link on Instagram.",tag:"Audio",instagram:"https://www.instagram.com/reel/DedlTDWon_2/",thumb:"img/gad/nordbuds.jpg"},
  {name:"Apple gadget pick",blurb:"An Apple accessory I recommend. Buy link below.",tag:"Apple",instagram:"https://www.instagram.com/reel/Ddf-Xzgocvg/",thumb:"img/gad/apple.jpg",amazon:"https://link.amazon/B0hd7Pmxg"},
  {name:"Portronics toolkit",blurb:"A handy toolkit from Portronics. Watch the video for the details.",tag:"Accessories",instagram:"https://www.instagram.com/reel/DeBVr8gortN/",thumb:"img/gad/portronics.jpg"},
  {name:"Flipkart Big Billion Days pick",blurb:"A deal I found during Big Billion Days. Use the tagged product link on Instagram.",tag:"Deals",instagram:"https://www.instagram.com/reel/DeTUEVFos-X/",thumb:"img/gad/flipkart.jpg"},
  {name:"Ant Esports KM1610",tag:"Gaming",amazon:"https://amzn.to/4sbS26X"},
  {name:"Amkette Hush Pro Epic M",tag:"Productivity",amazon:"https://amzn.to/4c56Myy"},
  {name:"Pure Aroma Cute Panda Scent Oil Diffuser Humidifier",tag:"Utility",amazon:"https://amzn.to/4tOLYTp"},
  {name:"PHILIPS 7 in 1 USB",tag:"Utility",amazon:"https://amzn.to/48sPZ7o"},
  {name:"Turtle Cup Holder Coaster",tag:"Utility",amazon:"https://amzn.to/4v6DUi1"},
  {name:"TV Remote",tag:"Utility",amazon:"https://amzn.to/4sy5uSQ"},
  {name:"Blix Marble Run 2",tag:"Toys",amazon:"https://amzn.to/48zslWU"},
  {name:"Smiledrive electric rotating display stand",tag:"Utility",amazon:"https://amzn.to/42pEyKg"},
  {name:"CASON Wireless Door Bell",tag:"Utility",amazon:"https://amzn.to/426yFlr"},
  {name:"Crab Toy For Kids",tag:"Utility",amazon:"https://amzn.to/4cXaVWP"},
  {name:"Anchor Door Bell",tag:"Utility",amazon:"https://amzn.to/4sRdYoi"},
  {name:"realme T500 Pro",tag:"Audio",amazon:"https://amzn.to/4vT30kY"},
  {name:"Car mount",tag:"Utility",amazon:"https://amzn.to/4uKn8Vb"},
  {name:"Camera Bag",tag:"Utility",amazon:"https://amzn.to/49I7a5B"},
  {name:"Gaming Controller",tag:"Gaming",amazon:"https://amzn.to/4eXIObE"},
  {name:"Digitek RGB Light",tag:"Utility",amazon:"https://amzn.to/4nUBnnZ"},
  {name:"TP-Link Tapo H100 IoT Smart Hub with Chime",tag:"Utility",amazon:"https://bitli.in/WTtR88n"},
  {name:"Verilux 240W Type C Cable",tag:"Utility",amazon:"https://bitli.in/dltDaBc"},
  {name:"CMF by Nothing Buds 2 Plus",tag:"Audio",amazon:"https://fktr.in/T4Ztz5f"},
  {name:"Ulanzi Ball Head",tag:"Utility",amazon:"https://bitli.in/1M1s4lH"},
  {name:"Amkette XS Series Flow 2 Programmable Wireless Mouse",tag:"Productivity",amazon:"https://bitli.in/HUwd5Bt"},
  {name:"DailyObjects Cover",tag:"Utility",amazon:"https://amzn.to/4y0kfSB"}
];
var grid=document.getElementById('gadgets'),filters=document.getElementById('filters');
function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function render(tag){
  grid.innerHTML=GADGETS.filter(function(g){return !tag||g.tag===tag}).map(function(g){
    var img=g.instagram?'<button type="button" class="play" data-embed="'+esc(g.instagram.replace(/\/?$/,'/embed/'))+'" aria-label="Play video: '+esc(g.name)+'">'+(g.thumb?'<img class="th" src="'+esc(g.thumb)+'" alt="" loading="lazy">':'<span class="ph" aria-hidden="true">'+esc(g.name.charAt(0))+'</span>')+'<i aria-hidden="true"></i></button>':g.image?'<img src="'+esc(g.image)+'" alt="'+esc(g.name)+'" loading="lazy">':'<div class="ph" aria-hidden="true">'+esc(g.name.charAt(0))+'</div>';
    var buy=g.link?'<a class="btn" href="'+esc(g.link)+'" target="_blank" rel="noopener">'+esc(g.linkLabel||'Get it')+'</a>':g.amazon?'<a class="btn" href="'+esc(g.amazon)+'" target="_blank" rel="sponsored nofollow noopener">Buy on Amazon</a>':'';
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
