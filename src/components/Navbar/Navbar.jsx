import React, { useState } from "react";
import logo from "../../assets/images/logo.jpg";
import Cart from "../Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../features/slices/authSlice";
import { Avatar, Tooltip } from "@material-tailwind/react";
import NavigateButtons from "../NavigateButtons/NavigateButtons";
import { useNavigate } from "react-router-dom"; 

const Navbar = () => {
    
    const navigate = useNavigate();

    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const user = useSelector((state) => state.user.user);
    const { name, image, authUser } = user;
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    // Function to handle sign-in button click
    const handleSignInClick = () => {
        navigate("/login"); 
    };

    // Function to handle Logout
   const handleLogout = () => {
    
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
   
    if (confirmLogout) {
        
        dispatch(Logout());
        
        
        setTimeout(() => {
            window.location.reload(); 
        }, 1000);

        navigate("/");
        
        
        
    }
   };

    return (
        <>
{/* Top Bar */}

            <div className="bg-black p-4 w-full flex justify-center items-center">
                <p className="text-white font-inter text-2xl font-bold">E-Commerce Shopping</p>
            </div>

{/* Navbar */}

            <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white shadow-md pl-6">


{/* Navigation Buttons */}

                       <div className="mt-4 sm:mt-0">
                    <NavigateButtons displayMode="categoriesDropdown" />
                </div>

                
                {/* Logo */}

                <img className="h-12 w-auto sm:h-20 ml-1" src={logo} alt="store logo" />

         
                {/* User Actions */}

                <div className="flex items-center space-x-7 mt-4 sm:mt-1">
                    
                    {/* Shopping Bag */}

                    <div
                        className="flex items-center cursor-pointer mr-1 pl-8  "
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

                    {/* authentication showing */}
                    {authUser ? (
                        // Render Logout button if user is authenticated
                        <div className="flex items-center cursor-pointer px-3">
                            <Tooltip content="logout" placement="bottom">
                                <button onClick={handleLogout} className="btn-signin mr-3 sm:mt-1">Logout</button>
                            </Tooltip>
                        </div>
                    ) : (
                        // Render Sign In button if user is not authenticated
                        <div>
                            <Tooltip content="login" placement="bottom">
                            <button onClick={handleSignInClick} className="btn-signin mr-3 sm:mt-2">Login</button>
                            </Tooltip>
                        </div>
                    )}

                    {/* Render emoji if user is authenticated */}
                    {authUser && (
                        <div className="flex items-center cursor-pointer">
                            {image && <Avatar src={image} alt="user avatar" size="sm" />}
                            {name && <Tooltip content={name} placement="bottom">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            </Tooltip>}
                        </div>
                    )}
                </div>
            </div>

            {/* Marquee Text */}
            
            <div className="bg-black p-2 w-full flex items-center justify-between">
                <p className="text-white font-inter text-base font-medium w-1/3">
                    <marquee behavior="scroll" direction="left" scrollamount="5">50% OFF</marquee>
                </p>
                <p className="text-white font-inter text-base font-medium w-1/3 mx-4">
                    <marquee behavior="scroll" direction="left" scrollamount="5">Free Shipping and Returns</marquee>
                </p>
                <p className="text-white font-inter text-base font-medium w-1/3">
                    <marquee behavior="scroll" direction="left" scrollamount="5">Different Payment Methods</marquee>
                </p>
            </div>
        </>
    );
};

export default Navbar;
