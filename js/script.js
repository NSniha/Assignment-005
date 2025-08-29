// ================ Heart Count Functionality ============
const HEART_LIKED = new Set();
function heartRender(){ document.getElementById('heart-count').innerText = HEART_LIKED.size; }

document.addEventListener('DOMContentLoaded', function(){
    heartRender();
    var cards = document.getElementById('cards'); if(!cards) return;

    cards.addEventListener('click', function(e){
        var heart = e.target.closest('.card-like');
        var card = e.target.closest('[data-card], .bg-white.rounded-xl.shadow-xl');
        if(!heart || !card) return;

        var name = (card.querySelector('h2')?.textContent || 'Service').trim ();
        if(HEART_LIKED.has(name)){
            HEART_LIKED.delete(name);
            heart.classList.remove('fa-solid','text-red-500'); heart.classList.add('fa-regular');
            console.log('HEART: unliked ->', name);
        }else{
            HEART_LIKED.add(name);
            heart.classList.remove('fa-regular'); heart.classList.add('fa-solid','text-red-500');
            console.log('HEART: liked ->', name);
        }
        heartRender();
    })
})



// ============= Call Functionality ============
const CALL_COST = 20;

document.addEventListener('DOMContentLoaded', function(){
    var cards = document.getElementById('cards'); if(!cards) return;

    cards.addEventListener('click', function(e){
        var btn = e.target.closest('button');
        var card = e.target.closest('[data-card], .bg-white.rounded-xl,shadow-xl');
        if(!btn || !card) return;

        var act = (btn.getAttribute('data-action') || btn.textContent).trim().toLowerCase();
        if(!act.startsWith('call')) return;

        var name = (card.querySelector('h2')?.textContent || 'Service').trim();
        var number = (card.querySelector('h3')?.textContent || 'N/A').trim();
        var coinEl = document.getElementById('coin-count');
        var coins = parseInt(coinEl?.innerText || '0', 10) || 0;

        console.log('CALL: try ->', name, number, 'coins:', coins);
        if(coins < CALL_COST){ alert('Not enough coins (nee' +CALL_COST+').'); 
            console.log('CALL: blocked'); 
            return;
        }

        alert('Calling '+name+' at '+number+'...');
        coinEl.innerText = coins -CALL_COST;
        console.log('CALL: success -> coins now:', coinEl.innerText);

        var detail = { name, number, time: new Date().toLocaleDateString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'}) };
        window.dispatchEvent(new CustomEvent('call:success', { detail }));
    });
});



// ============= Call History ============
document.addEventListener('DOMContentLoaded', function(){
    window.addEventListener('call:success', function(e){
        var d = e.detail;
        var list = document.getElementById('history-list');
        if(!list) return;

        var time = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        var div = document.createElement('div');
        div.className = 'call-history-card flex items-center justify-between gap-1 bg-[#FAFAFA] p-4 rounded-md';
        div.innerHTML =
         '<div>'+
            '<h2 class="history-title font-inter font-bold md:text-[15px] text-base leading-6 text-[#1a1919] md:w-[128px] w-[170px]">'+d.name+'</h2>'+
            '<h3 class="font-hind font-normal md:text-lg text-base pt-1 text-[#5C5C5C]">'+d.number+'</h3>'+
        '</div>'+
        '<div>'+
            '<span class="history-time font-hind font-normal text-base text-[#252525]">'+time+'</span>'+
        '</div>';

        list.prepend(div);

        console.log(`HISTORY: ${d.name}: ${d.number}, ${time}`);
    })

    document.getElementById('history-clear-btn')?.addEventListener('click', function(){
        var list = document.getElementById('history-list');
        if(list) list.innerHTML = '';
        console.log('HISTORY: cleared');
    });
});



// =========== Copy Text Functionality ==========
document.addEventListener('DOMContentLoaded', function(){
  var cards = document.getElementById('cards'); if(!cards) return;

  (function(){
    var el = document.getElementById('copy-count');
    var n  = parseInt((el?.innerText || '0').match(/\d+/) || 0, 10) || 0;
    if(el) el.innerText = n + ' Copy';
  })();

  cards.addEventListener('click', function(e){
    var btn  = e.target.closest('button');
    var card = e.target.closest('[data-card], .bg-white.rounded-xl.shadow-xl');
    if(!btn || !card) return;

    var act = (btn.getAttribute('data-action') || btn.textContent).trim().toLowerCase();
    if(!act.startsWith('copy')) return;

    var name   = (card.querySelector('h2')?.textContent || 'Service').trim();
    var number = (card.querySelector('h3')?.textContent || 'N/A').trim();
    console.log('COPY: try ->', name, number);

    function incCopy(){
      var el = document.getElementById('copy-count');
      var n  = parseInt((el?.innerText || '0').match(/\d+/) || 0, 10) || 0;
      if(el) el.innerText = (n+1) + ' Copy';
      console.log('COPY: success -> total:', n+1);
    }

    if(navigator.clipboard?.writeText){
      navigator.clipboard.writeText(number)
        .then(function(){ alert('Copied '+name+' number: '+number); incCopy(); })
        .catch(function(err){ console.log('COPY: failed ->', err); alert('Copy failed.'); });
    }else{
      var ta = document.createElement('textarea'); ta.value = number; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); alert('Copied '+name+' number: '+number); incCopy(); }
      catch(err){ console.log('COPY: failed ->', err); alert('Copy failed.'); }
      finally { document.body.removeChild(ta); }
    }
  });
});
