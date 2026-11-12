// Edit this list to add gadgets. Each one needs a name; the rest is optional.
// amazon: your affiliate link. instagram: link to the unboxing reel/post. image: path or URL to a photo.
var GADGETS=[
  {name:"Example gadget one",blurb:"Replace this with a one-line verdict.",price:"₹1,999",tag:"Audio",amazon:"",instagram:"",image:"",example:true},
  {name:"Example gadget two",blurb:"Short reason it's worth buying.",price:"₹3,499",tag:"Smart home",amazon:"",instagram:"",image:"",example:true},
  {name:"Example gadget three",blurb:"What you liked after a week of use.",price:"₹899",tag:"Accessories",amazon:"",instagram:"",image:"",example:true}
];
var grid=document.getElementById('gadgets'),filters=document.getElementById('filters');
function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function render(tag){
  grid.innerHTML=GADGETS.filter(function(g){return !tag||g.tag===tag}).map(function(g){
    var img=g.image?'<img src="'+esc(g.image)+'" alt="'+esc(g.name)+'" loading="lazy">':'<div class="ph" aria-hidden="true">'+esc(g.name.charAt(0))+'</div>';
    var buy=g.amazon?'<a class="btn" href="'+esc(g.amazon)+'" target="_blank" rel="sponsored nofollow noopener">Buy on Amazon</a>':'<span class="btn off">Link coming soon</span>';
    var ig=g.instagram?'<a class="btn g" href="'+esc(g.instagram)+'" target="_blank" rel="noopener">Unboxing on Instagram</a>':'';
    return '<article class="card gad">'+img+'<div class="b"><span class="badge">'+esc(g.tag)+(g.example?' · example':'')+'</span><h3>'+esc(g.name)+'</h3><p>'+esc(g.blurb)+'</p>'+(g.price?'<p class="price">'+esc(g.price)+'</p>':'')+'<div class="btns">'+buy+ig+'</div></div></article>';
  }).join('');
}
var tags=[];GADGETS.forEach(function(g){if(g.tag&&tags.indexOf(g.tag)<0)tags.push(g.tag)});
filters.innerHTML=['All'].concat(tags).map(function(t,i){return '<button type="button" data-tag="'+(i?esc(t):'')+'" aria-pressed="'+(i===0)+'">'+esc(t)+'</button>'}).join('');
filters.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;filters.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});render(b.dataset.tag)});
render('');
