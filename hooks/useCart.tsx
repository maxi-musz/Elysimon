import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null
    handleAddProductToCart: (product: CartProductType) => void
    removeFromCart: (product: CartProductType) => void
    handleCartQtyIncrease: (product: CartProductType) => void
    handleCartQtyDecrease: (product: CartProductType) => void
}

export const CartContext = createContext<CartContextType | null> (null)

interface Props{
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    

    useEffect(() =>{
        const cartItems: any = localStorage.getItem("eshopCartItems")
        const cartProducts: CartProductType[] | null = JSON.parse(cartItems)

        setCartProducts(cartProducts)
    }, []);

    const [cartTotalAmount, setCartTotalAmount] = useState({ total: 0, qty: 0 });

    useEffect(() => {
      const getTotals = () => {
        if (!cartProducts) {
          // Handle the case where cartProducts is null or undefined
          setCartTotalAmount({ total: 0, qty: 0 });
          return;
        }
  
        const totals = cartProducts.reduce((acc, item) => {
          const itemTotal = item.price * item.quantity;
  
          acc.total += itemTotal;
          acc.qty += item.quantity;
  
          return acc;
        }, {
          total: 0,
          qty: 0
        });
  
        setCartTotalAmount(totals);
      };
  
      getTotals();
    }, [cartProducts]);

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if(prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }


            toast.success("Product Successfully added to cart")
            localStorage.setItem("eshopCartItems", JSON.stringify(updatedCart))
            return updatedCart;
        })
    }, []);

    const removeFromCart = useCallback((
        product: CartProductType
    ) => {
        if(cartProducts) {
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            setCartProducts(filteredProducts)
            localStorage.setItem("eshopCartItems", JSON.stringify(filteredProducts))
            toast.success("Product Successfully removed from cart")
        }
    }, [cartProducts])

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        console.log("handleCartQtyIncrease called with product:", product);
    
        if (product.quantity === 99) {
            return toast.error("Oooops! maximum reached");
        }
    
        if (cartProducts) {
            const updatedCart = [...cartProducts];
            const existingIndex = updatedCart.findIndex((item) => item.id === product.id);
    
            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity += 1;
                console.log("Product quantity updated:", updatedCart[existingIndex]);
    
                setCartProducts(updatedCart);
                localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
            } else {
                console.error("Product not found in cart:", product);
            }
        } else {
            console.error("cartProducts is null or undefined");
        }
    }, [cartProducts, setCartProducts]);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        console.log("handleCartQtyDecrease called with product:", product);
    
        // Check if the product quantity is already at the minimum limit
        if (product.quantity === 1) {
            return toast.error("Oooops! minimum reached");
        }
    
        if (cartProducts) {
            const updatedCart = [...cartProducts];
            const existingIndex = updatedCart.findIndex((item) => item.id === product.id);
    
            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity -= 1;
                console.log("Product quantity updated:", updatedCart[existingIndex]);
    
                setCartProducts(updatedCart);
                localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
            } else {
                console.error("Product not found in cart:", product);
            }
        } else {
            console.error("cartProducts is null or undefined");
        }
    }, [cartProducts, setCartProducts]);
    

 const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        removeFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease

    }
    
    return <CartContext.Provider value={value} {...props}/>
};

export const useCart = () => {
    const context = useContext(CartContext);

    if(context === null) {
        throw new Error("useCart must be used within a cartContextPropvider")
    }

    return context;
};