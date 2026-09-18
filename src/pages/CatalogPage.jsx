import { Link } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

function CatalogPage() {
  const { cart, setCart } = useCart();
  
  function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      const updated = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ]);
    }
  }

  return (
    <>
      <div className="catalog">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.title} />
              </div>
              <h3 className="product-title">{product.title}</h3>
            </Link>
            <div className="product-info">
              <p className="product-price">{product.price} $</p>
              <button onClick={() => addToCart(product)}>В корзину</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}


export default CatalogPage;