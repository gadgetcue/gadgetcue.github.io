// Edit this list to add gadgets. Each one needs a name; the rest is optional.
// amazon: your affiliate link. instagram: link to the unboxing reel/post. image: path or URL to a photo.
var GADGETS=[
  {name:"Safari on Windows",blurb:"A first look at the browser I'm building for Windows.",tag:"Software",instagram:"https://www.instagram.com/gadgetcue/p/DfrYHQMiFLl/"},
  {name:"MacDock",blurb:"A Mac-style dock, menu bar and Launchpad for Windows 11.",tag:"Software",instagram:"https://www.instagram.com/gadgetcue/p/Dfd_XnbCDnO/",link:"https://github.com/gadgetcue/MacDock/releases/latest",linkLabel:"Download MacDock"},
  {name:"Gallery for Windows",blurb:"A fast, private photo viewer with a built-in editor.",tag:"Software",instagram:"https://www.instagram.com/gadgetcue/p/Dfgz5WriCg5/",link:"https://github.com/gadgetcue/Gallery-Windows/releases/latest",linkLabel:"Download Gallery"},
  {name:"File Manager TV",blurb:"Manage files and clean storage on Android TV with your remote.",tag:"Android TV",instagram:"https://www.instagram.com/gadgetcue/p/DfQ5lS5iJb_/",link:"https://github.com/gadgetcue/modern-file-manager-tv/releases/latest",linkLabel:"Download APK"},
  {name:"tvOS Launcher",blurb:"An Apple TV-style home screen for Android TV and Google TV.",tag:"Android TV",instagram:"https://www.instagram.com/gadgetcue/p/DfMUyPJIpyl/",link:"https://github.com/gadgetcue/tvos-launcher-releases/releases/latest",linkLabel:"Download APK"}
];
var grid=document.getElementById('gadgets'),filters=document.getElementById('filters');
function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function render(tag){
  grid.innerHTML=GADGETS.filter(function(g){return !tag||g.tag===tag}).map(function(g){
    var img=g.image?'<img src="'+esc(g.image)+'" alt="'+esc(g.name)+'" loading="lazy">':'<div class="ph" aria-hidden="true">'+esc(g.name.charAt(0))+'</div>';
    var buy=g.link?'<a class="btn" href="'+esc(g.link)+'" target="_blank" rel="noopener">'+esc(g.linkLabel||'Get it')+'</a>':g.amazon?'<a class="btn" href="'+esc(g.amazon)+'" target="_blank" rel="sponsored nofollow noopener">Buy on Amazon</a>':'';
    var ig=g.instagram?'<a class="btn g" href="'+esc(g.instagram)+'" target="_blank" rel="noopener">Unboxing on Instagram</a>':'';
    return '<article class="card gad">'+img+'<div class="b"><span class="badge">'+esc(g.tag)+(g.example?' · example':'')+'</span><h3>'+esc(g.name)+'</h3><p>'+esc(g.blurb)+'</p>'+(g.price?'<p class="price">'+esc(g.price)+'</p>':'')+'<div class="btns">'+buy+ig+'</div></div></article>';
  }).join('');
}
var tags=[];GADGETS.forEach(function(g){if(g.tag&&tags.indexOf(g.tag)<0)tags.push(g.tag)});
filters.innerHTML=['All'].concat(tags).map(function(t,i){return '<button type="button" data-tag="'+(i?esc(t):'')+'" aria-pressed="'+(i===0)+'">'+esc(t)+'</button>'}).join('');
filters.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;filters.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});render(b.dataset.tag)});
render('');
