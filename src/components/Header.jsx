"use client"
import { useState } from 'react';

export const Headers = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  const [active, setActive] = useState(false);

  const onDeleteProduct = (product) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${product.title}" del carrito?`)) {
      const results = allProducts.filter(item => item.id !== product.id);
      setTotal((prevTotal) => Math.max(0, prevTotal - product.price * product.quantity));
      setCountProducts((prevCount) => Math.max(0, prevCount - product.quantity));
      setAllProducts(results);
    }
  };

  const onCleanCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      setAllProducts([]);
      setTotal(0);
      setCountProducts(0);
    }
  };

  return (
    <header>
      <h1>Tienda de Libros</h1>
      <div className='container-icon'>
        <div 
          className='container-cart-icon'
          onClick={() => setActive(!active)}
          role="button"
          aria-label="Toggle cart view"
        >
          <img
            src="https://e7.pngegg.com/pngimages/833/426/png-clipart-black-shopping-cart-icon-for-free-black-shopping-cart.png" 
            alt="Carrito" 
            className="icon-cart" 
          />
          <div className='count-products'>
            <span id='contador-productos'>{countProducts}</span>
          </div>
        </div>
        <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
          {allProducts.length ? (
            <>
              <div className='row-product'>
                {allProducts.map(product => (
                  <div className='cart-product' key={product.id}>
                    <figure className='cart-product-image'>
                      <img src={product.urlImage} alt={product.title} />
                    </figure>
                    <div className='info-cart-product'>
                      <span className='cantidad-producto-carrito'>{product.quantity}</span>
                      <p className='titulo-producto-carrito'>{product.title}</p>
                      <span className='precio-producto-carrito'>
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                      alt="Eliminar producto"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    />
                  </div>
                ))}
              </div>
              <div className='cart-total'>
                <h3>Total:</h3>
                <span className='total-pagar'>${total.toFixed(2)}</span>
              </div>
              <button className='btn-clear-all' onClick={onCleanCart}>
                Vaciar Carrito
              </button>
            </>
          ) : (
            <p className='cart-empty'>El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};
