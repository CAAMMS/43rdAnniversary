const areas = [
  {id:'entrance',name:'Entrance',type:'Arrival point',copy:'Begin your anniversary journey at the upper-left entrance, beside Registration.',zone:'Upper left',meta:'First arrival',x:13,y:8},
  {id:'registration',name:'Registration',type:'Check-in & departure backdrop',copy:'Complete your boarding pass, submit your raffle stub, claim your event passport, and visit the departure backdrop.',zone:'Upper left',meta:'Check-in & passport',x:29,y:10},
  {id:'stage',name:'Main Stage',type:'Program venue',copy:'The heart of the celebration for the anniversary program, presentations, and featured performances.',zone:'Upper center',meta:'Main program',x:52,y:12},
  {id:'globe',name:'Globe Platform',type:'Centerpiece',copy:'The central landmark of the venue and an easy meeting point at center court.',zone:'Center court',meta:'Meeting point',x:52,y:45},
  {id:'photowall',name:'Photowall',type:'Photo destination',copy:'Capture your anniversary moment at the official photowall along the left side of the court.',zone:'Left court',meta:'Photos & memories',x:22,y:35},
  {id:'japan',name:'Japan Booth',type:'Cultural booth',copy:'Discover the Japan destination, hosted by Purok 1 & 6. Join the activities and collect your passport stamp.',zone:'Lower left',meta:'Purok 1 & 6',x:27,y:69},
  {id:'hawaii',name:'Hawaii Booth',type:'Cultural booth',copy:'Experience the Hawaii destination, hosted by Purok 2 & 9. Join the activities and collect your passport stamp.',zone:'Lower center-left',meta:'Purok 2 & 9',x:42,y:69},
  {id:'china',name:'China Booth',type:'Cultural booth',copy:'Visit the China destination, hosted by Purok 3, 4 & 5. Join the activities and collect your passport stamp.',zone:'Lower center-right',meta:'Purok 3, 4 & 5',x:57,y:69},
  {id:'south-africa',name:'South Africa Booth',type:'Cultural booth',copy:'Explore the South Africa destination, hosted by Purok 7 & 8. Join the activities and collect your passport stamp.',zone:'Lower right',meta:'Purok 7 & 8',x:72,y:69},
  {id:'technical',name:'Technical Committee',type:'Event support',copy:'Visit the technical desk for program, sound, presentation, and equipment assistance.',zone:'Right court',meta:'Program support',x:83,y:38},
  {id:'souvenirs',name:'Souvenirs',type:'Keepsakes & arrival backdrop',copy:'Browse anniversary keepsakes and event memorabilia, and visit the arrival backdrop beside the souvenir area.',zone:'Lower right',meta:'Keepsakes & arrival',x:93,y:68},
  {id:'cr',name:'Comfort Room',type:'Guest facility',copy:'Comfort-room facilities are located at the upper-right corner of the venue.',zone:'Upper right',meta:'Guest facility',x:87,y:9},
  {id:'exit',name:'Exit',type:'Departure point',copy:'Use the designated lower-right exit and follow committee guidance for an orderly departure.',zone:'Lower right',meta:'Final departure',x:86,y:92}
];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const areaButtons=$('#area-buttons'), hotspots=$('#hotspots'), stage=$('#map-stage'), panel=$('#detail-panel');
areas.forEach((a,i)=>{
  const btn=document.createElement('button');btn.className='area-button';btn.dataset.area=a.id;btn.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span><b>${a.name}</b>`;areaButtons.append(btn);
  const pin=document.createElement('button');pin.className='hotspot';pin.dataset.area=a.id;pin.dataset.label=a.name;pin.style.setProperty('--x',`${a.x}%`);pin.style.setProperty('--y',`${a.y}%`);pin.setAttribute('aria-label',`Show details for ${a.name}`);pin.textContent=String(i+1).padStart(2,'0');hotspots.append(pin);
});
function selectArea(id,{scroll=false}={}){
  const i=areas.findIndex(a=>a.id===id); if(i<0)return; const a=areas[i];
  $$('.area-button,.hotspot').forEach(el=>el.classList.toggle('active',el.dataset.area===id));
  stage.classList.add('selected');panel.classList.add('open');
  $('#detail-number').textContent=String(i+1).padStart(2,'0');$('#detail-type').textContent=a.type;$('#detail-title').textContent=a.name;$('#detail-copy').textContent=a.copy;$('#detail-zone').textContent=a.zone;$('#detail-meta').textContent=a.meta;
  if(scroll) $('#floor-plan').scrollIntoView({behavior:'smooth'});
}
document.addEventListener('click',e=>{const target=e.target.closest('[data-area]');if(target){selectArea(target.dataset.area,{scroll:target.closest('.booth-card')!==null});}});
function reset(){stage.classList.remove('selected');panel.classList.remove('open');$$('.area-button,.hotspot').forEach(el=>el.classList.remove('active'));}
$('#reset-view').addEventListener('click',reset);$('#panel-close').addEventListener('click',reset);$('#locate-button').addEventListener('click',()=>{const active=$('.hotspot.active');if(active){active.focus();active.animate([{transform:'translate(-50%,-50%) scale(1.2)'},{transform:'translate(-50%,-50%) scale(1.55)'},{transform:'translate(-50%,-50%) scale(1.2)'}],{duration:500});}});
const menu=$('.menu-toggle'), nav=$('#main-nav');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});nav.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open')});
const sections=$$('main>section[id]');const navLinks=$$('#main-nav a');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));}})},{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>observer.observe(s));
$$('.faq-list details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.faq-list details').filter(x=>x!==d).forEach(x=>x.open=false)}));
selectArea('entrance');
