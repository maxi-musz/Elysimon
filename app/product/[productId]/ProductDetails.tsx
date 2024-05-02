"use client"

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQUantity from "@/app/components/products/SetQuantity";
import { Rating } from "@mui/material";
import { useCallback, useState } from "react";

interface ProductDetailsProps{
    product: any
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    brand: string,
    selectedImg: selectedImgType,
    quantity: number,
    price: number,
    totalInStock: number,
}

export type selectedImgType = {
    color: string,
    colorCode: string,
    image:string
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2"/>
}

const ProductDetails:React.FC<ProductDetailsProps> = ({product}) => {

    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        brand: product.brand,
        selectedImg: {...product.images[0]},
        quantity: 1,
        price: product.price,
        totalInStock: product.totalInStock
    })

    const productRating = product.reviews.reduce((acc:number, item:any) => item.rating + acc, 0) / product.reviews.length

    const handleColorSelect = useCallback((value:selectedImgType) => {
        setCartProduct((prev) => {
            return {...prev, selectedImg: value}
        })
    },[])

    const handleQtyIncrease = useCallback(() =>  {
        setCartProduct((prev) => {
            // Check if quantity is already at the maximum amount in stock
            if (prev.quantity < prev.totalInStock) {
                return {...prev, quantity: prev.quantity + 1};
            }
            return prev; // Return unchanged state if quantity is already at maximum
        });
    }, []);
    
    const handleQtyDecrease = useCallback(() =>  {
        setCartProduct((prev) => {
            // Check if quantity is greater than 1 (to prevent negative values)
            if (prev.quantity > 1) {
                return {...prev, quantity: prev.quantity - 1};
            }
            return prev; // Return unchanged state if quantity is already 1
        });
    }, []);

    return <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect}/>
        <div className="flex flex-col gap-1 text-slate-500 text-sm">
            <h2 className="text-3xl font-medium text-sky-700">
                {product.name}
            </h2>
            <div className="flex items-center gap-2">
                <Rating value={productRating} readOnly/>
                <div>{product.reviews.length} reviews</div>
            </div>
            <Horizontal/>
            <div className="text-justify">
                {product.description}
            </div>
            <Horizontal/>
            <div>
                <span className="font-semibold pr-2">CATEGORY: </span>
                <span>{product.category}</span>
            </div>
            <div>
                <span className="font-semibold pr-2">BRAND: </span>
                <span>{product.brand}</span>
            </div>
            <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
                {product.inStock ? "In stock" : "Out of stock"}
            </div>
            <div>
                <span className="font-semibold pr-2">TOTAL: </span>
                <span>{product.totalInStock}</span>
            </div>
            <Horizontal/>
            <SetColor
            cartProduct={cartProduct}
            images={product.images}
            handleColorSelect={handleColorSelect}
            />
            <Horizontal/>
            <SetQUantity 
            cartProduct={cartProduct}
            handleQtyDecrease={handleQtyDecrease}
            handleQtyIncrease={handleQtyIncrease}
            />
            <Horizontal/>
            <div className="max-w-[300px]">
                <Button 
                label="Add to Cart"
                onClick={() => {}}
                />
            </div>
        </div>
        
    </div>
}
 
export default ProductDetails;