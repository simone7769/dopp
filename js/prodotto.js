
    document.querySelectorAll('.pdp-sizes button:not(.disabled)').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pdp-sizes button').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    document.querySelectorAll('.pdp-colors button').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pdp-colors button').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    const pdpAddCart = document.querySelector('.pdp-add-cart');
    if (pdpAddCart) {
      const originalLabel = pdpAddCart.textContent;
      pdpAddCart.addEventListener('click', () => {
        if (window.CartCounter) window.CartCounter.add(1);
        pdpAddCart.textContent = 'Aggiunto ✓';
        pdpAddCart.disabled = true;
        setTimeout(() => {
          pdpAddCart.textContent = originalLabel;
          pdpAddCart.disabled = false;
        }, 1600);
      });
    }
  