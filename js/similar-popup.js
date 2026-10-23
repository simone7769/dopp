/* ============================================================
   POP-UP ARTICOLI SIMILI
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
  var btns = document.querySelectorAll('.similar');
  var modal = document.getElementById('similarModal');
  var overlay = document.getElementById('similarModalOverlay');
  var closeBtn = document.getElementById('closeSimilarModal');
  var modalGrid = document.getElementById('similarModalGrid');

  if (!modal || !overlay || !modalGrid) return;

  function openModal(e, currentCard) {
    if (e) e.preventDefault();
    modalGrid.innerHTML = '';
    var allCards = Array.from(document.querySelectorAll('.products-grid .product-card'));
    var otherCards = allCards.filter(function(c) { return c !== currentCard; });
    var productsToShow = otherCards.slice(0, 3);

    productsToShow.forEach(function(card) {
      var clone = card.cloneNode(true);
      var simBtn = clone.querySelector('.similar');
      if (simBtn) simBtn.remove();
      var plusBtn = clone.querySelector('.plus');
      if (plusBtn) plusBtn.remove();
      var wishBtn = clone.querySelector('.wish');
      if (wishBtn) wishBtn.remove();
      
      // Mostra solo la still-life (img-hover) nel pop-up
      var imgMain = clone.querySelector('.img-main');
      var imgHover = clone.querySelector('.img-hover');
      if (imgMain && imgHover) {
        imgMain.style.display = 'none';
        imgHover.style.display = 'block';
        imgHover.style.opacity = '1'; // Sovrascrive opacità 0 di default
      }
      
      modalGrid.appendChild(clone);
    });

    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  btns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var currentCard = btn.closest('.product-card');
      openModal(e, currentCard);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
});
