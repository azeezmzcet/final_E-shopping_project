import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams , useNavigate } from "react-router-dom";
import { Tooltip, Button } from "@material-tailwind/react";
import { addToCart } from "../../features/slices/cartSlice";

import logo from "../../assets/images/logo.jpg";
import Cart from "../Cart/Cart";




const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const product = useSelector((state) => state.products.singleProduct || []);
    const productDetails = product.find((item) => item.id === id);

    
    const user = useSelector((state) => state.user.user);
    const { authUser } = user;

    
    const [size, setSize] = useState(productDetails?.size?.[0] || "");
    const [color, setColor] = useState(productDetails?.color?.[0] || "");


    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const [open, setOpen] = useState(false);

   
    const handleAddToCart = () => {
        if (authUser) {
            
            dispatch(
                addToCart({
                    id: productDetails.id,
                    name: productDetails.name,
                    img: productDetails.img,
                    text: productDetails.text,
                    size,
                    color,
                    price: productDetails.price,
                    amount: 1,
                    totalPrice: productDetails.price,
                })
            );
        }
    };



    const handleGoBack = () => {
        navigate(-1); // Navigate to the previous page
    };


    const handleOpen = () => {
        setOpen(true);
    };


    return (
        
        <div className="container mx-auto px-4 ">
            

              {/* Top Bar */}

              <div className="bg-black h-12 w-full flex justify-center items-center">

              <img className="h-12 w-auto   sm:h-20 ml-1 py-5 mr-5" src={logo} alt="store logo" />
                <p className="text-white font-inter text-2xl font-bold">E-Commerce Shopping</p>
                  {/* Logo */}
               
            </div>

                 {/* Shopping Bag */}
                 <div
                        className="flex items-center cursor-pointer ml-5 py-2  absolute top-16 right-20"
                        onClick={handleOpen}
                    >
                        {totalAmount > 0 ? (
                            <span className="rounded-full bg-gray-300 px-2 font-inter text-sm mr-1">
                                {totalAmount}
                            </span>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="#000"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                            </svg>
                        )}
                        <p className="ml-2">Shopping Bag</p>
                        {open && <Cart openModal={open} setOpen={setOpen} />}
                    </div>

            
            
            {productDetails && (
                <div className="flex flex-col md:flex-row items-center py-9">
                    <div className="md:w-1/2 w-full mb-8 md:mb-0 flex justify-center">
                        <img
                            className="h-auto w-full  mt-10 sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[700px]"
                            src={productDetails.img}
                            alt={productDetails.name}
                        />
                    </div>
                    <div className="md:w-1/2 w-full px-4">
                        <div className="max-w-lg">

                       <Tooltip content="Back" placement="bottom" > 
                        <button className="absolute top-2 left-4 bg-gray-200 rounded-full p-2 mt-14" onClick={handleGoBack}>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                         <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
                         </svg> 


                            </button> 
                            </Tooltip>
                            

                  


                            <h5 className="text-2xl font-bold">{productDetails.name}</h5>
                            <p className="text-orange-700 text-xl font-bold">15% OFF</p>
                            <p className="text-gray-600 text-xl">{productDetails.text}</p>

                            <div className="mt-4">
                                <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900">
                                    Pick a size
                                </label>
                                <select
                                    id="size"
                                    name="size"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                >
                                    {productDetails.size.map((sizeOption, index) => (
                                        <option key={index} value={sizeOption}>
                                            {sizeOption}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900">
                                    Pick a color
                                </label>
                                <select
                                    id="color"
                                    name="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                >
                                    {productDetails.color.map((colorOption, index) => (
                                        <option key={index} value={colorOption}>
                                            {colorOption}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Tooltip
                                content={authUser ? "Add to Cart" : "Please log in to add to cart"}
                                placement="bottom"
                            >
                                <span className="flex flex-col">
                                    <Button
                                        color="gray"
                                        size="lg"
                                        variant="outlined"
                                        ripple={true}
                                        className="w-full mt-4"
                                        onClick={handleAddToCart}
                                        disabled={!authUser} 
                                    >
                                        Add to Cart
                                    </Button>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleProduct;
