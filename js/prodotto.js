
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
      pdpAddCart.addEventListener('click', () => alert('Prodotto aggiunto al carrello (demo)'));
    }
  