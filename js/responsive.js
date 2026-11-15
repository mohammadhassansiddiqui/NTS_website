(function(){
function init(){
  var nav=document.querySelector('.main-nav'),box=nav&&nav.querySelector('.nav-container'),links=nav&&nav.querySelector('.nav-links');
  if(nav&&box&&links){
    var chev='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
    var t=document.createElement('button');t.type='button';t.className='nav-toggle';t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Toggle navigation menu');
    var burger='<svg class="ic-burger" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    var close='<svg class="ic-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';
    /* icons and labels are swapped by CSS only; the clicked element is never replaced */
    t.innerHTML=burger+close+'<span class="lbl-menu">Menu</span><span class="lbl-close">Close</span>';
    box.insertBefore(t,box.firstChild);
    function setOpen(o){nav.classList.toggle('open',o);t.setAttribute('aria-expanded',o?'true':'false');}
    t.addEventListener('click',function(e){e.stopPropagation();setOpen(!nav.classList.contains('open'));});
    links.querySelectorAll('li.dropdown').forEach(function(li){
      var b=document.createElement('button');b.type='button';b.className='sub-toggle';b.setAttribute('aria-label','Show submenu');b.setAttribute('aria-expanded','false');b.innerHTML=chev;
      b.addEventListener('click',function(e){e.stopPropagation();var o=li.classList.toggle('sub-open');b.setAttribute('aria-expanded',o);});
      var menu=li.querySelector('.dropdown-menu');li.insertBefore(b,menu);
    });
    document.addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false);});
    document.addEventListener('click',function(e){var p=e.composedPath?e.composedPath():[];if(p.indexOf(nav)<0&&!nav.contains(e.target))setOpen(false);});
    links.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(a)setOpen(false);});
    window.addEventListener('resize',function(){if(window.innerWidth>1100)setOpen(false);});
  }
  // card-style tables + scroll wrappers, also for tables created later (lookup results)
  function head(tb){var th=tb.querySelectorAll('thead th');return [].map.call(th,function(h){return h.textContent.trim();});}
  function prep(){
    document.querySelectorAll('table').forEach(function(tb){
      var cardy=tb.matches('.nts-table,.table-custom,.distribution-table')&&!tb.closest('.official-slip-box');
      if(cardy){
        tb.classList.add('rwd-cards');
        var heads=head(tb);
        tb.querySelectorAll('tbody tr').forEach(function(r){[].forEach.call(r.children,function(td,i){if(!td.hasAttribute('data-label')&&heads[i])td.setAttribute('data-label',heads[i]);});});
      }
      if(!tb.closest('.table-responsive,.tbl-scroll')&&!tb.classList.contains('slip-meta-table')){
        var w=document.createElement('div');w.className='tbl-scroll';tb.parentNode.insertBefore(w,tb);w.appendChild(tb);
      }
    });
  }
  prep();
  if(window.MutationObserver){var q=false;new MutationObserver(function(){if(q)return;q=true;requestAnimationFrame(function(){q=false;prep();});}).observe(document.body,{childList:true,subtree:true});}
  // keep search icon inside its own field
  document.querySelectorAll('.search-icon').forEach(function(ic){
    var inp=ic.nextElementSibling;
    if(!inp||inp.tagName!=='INPUT'||ic.parentNode.classList.contains('search-field'))return;
    var w=document.createElement('div');w.className='search-field';
    ic.parentNode.insertBefore(w,ic);w.appendChild(ic);w.appendChild(inp);
  });
  // selected shortcut pill (current page): tapping it again returns to the home page
  document.querySelectorAll('.pill-shortcut').forEach(function(p){
    if((p.getAttribute('style')||'').indexOf('--nts-navy')>-1){p.setAttribute('aria-current','page');p.setAttribute('title','Tap again to return home');}
  });
  document.addEventListener('click',function(e){
    var p=e.target.closest&&e.target.closest('.pill-shortcut[aria-current]');if(!p)return;
    e.preventDefault();e.stopImmediatePropagation();
    if(window.parent!==window&&window.parent.__nav)window.parent.__nav('index.html');else window.location.href='index.html';
  },true);
  // tab pills: reveal the opened panel just below the sticky menu
  document.addEventListener('click',function(e){
    var tb=e.target.closest&&e.target.closest('.tab-trigger');if(!tb)return;
    setTimeout(function(){
      var bar=tb.closest('.section-tabs-bar');
      if(bar&&window.innerWidth<=992)bar.scrollIntoView({behavior:'smooth',block:'start'});
    },60);
  });
  // swipe on hero slider
  var hs=document.getElementById('heroSlider');
  if(hs){
    var x0=null,y0=0;
    hs.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;y0=e.touches[0].clientY;},{passive:true});
    hs.addEventListener('touchend',function(e){
      if(x0===null)return;var dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;
      if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){var b=document.querySelector(dx<0?'.next-btn':'.prev-btn');if(b)b.click();}
    },{passive:true});
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
