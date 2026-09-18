import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
    const navigate = useNavigate();
    const { cart, setCart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    function removeFromCart(id) {
        const updated = cart.filter(item => item.id !== id);
        setCart(updated);
    }
    
    if (cart.length === 0) {
        return <h2>Корзина пуста</h2>
    }

    return (
        <>
            {cart.map((item) => (
                <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} />
                    <h2>{item.title}</h2>
                    <p>{item.price}</p>
                    <p>Количество: {item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                </div>
            ))}
            <p>Итого: {total}</p>
            <button onClick={() => {
                setCart([]);
                navigate('/success')
            }}>Оформить заказ</button>
        </>
    )
}

export default CartPage;