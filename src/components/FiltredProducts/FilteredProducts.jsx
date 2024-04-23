import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useSelector  } from "react-redux";
import ProductCard from "./ProductCard";
import Error from "../Error/Error";
import { Tooltip } from "@material-tailwind/react";

import logo from "../../assets/images/logo.jpg";
import Cart from "../Cart/Cart";

const FilteredProducts = () => {
  const { type } = useParams(); 
  const products = useSelector((state) => state.products.filteredProducts);
  const error = useSelector((state) => state.products.error);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; 

  const filteredProducts = products.filter((product) => product.type === type);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
};

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };



  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
};

  return (
    
    <div className="filtered-products-container mx-6">

      {/* Top Bar */}

      <div className="bg-black h-12 w-full flex justify-center items-center">

          <img className="h-12 w-auto sm:h-20 ml-1 py-5 mr-5" src={logo} alt="store logo" />
             <p className="text-white font-inter text-2xl font-bold">E-Commerce Shopping</p>
        {/* Logo */}
      </div>

         <Tooltip content="Back" placement="bottom" > 
                        <button className="absolute top-16 left-4 bg-gray-200 rounded-full p-2" onClick={handleGoBack}>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                         <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
                         </svg> 


                            </button> 
                            </Tooltip>

             {/* Shopping Bag */}
             <div
                        className="flex items-center cursor-pointer ml-4 py-2  absolute top-13 right-20"
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



      <h1 className="text-gray-600 text-4xl md:text-3xl lg:text-4xl font-bold tracking-normal leading-none mt-20">
        {type}:
      </h1>


      
      {error ? (
        <Error />
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center py-8 gap-10">
            {currentProducts.map((product, index) => (
              <ProductCard
                key={index}
                id={product.id}
                name={product.name}
                text={product.text}
                img={product.img}
                price={product.price}
                colors={product.color}
              />
            ))}
          </div>

          <div className="pagination-controls flex justify-center py-4">
            <button
              className="btn-prev mx-2 px-4 py-2 bg-gray-300 text-gray-800 rounded md:text-sm lg:text-base"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-2 text-sm md:text-sm lg:text-base">Page {currentPage} of {totalPages}</span>
            <button
              className="btn-next mx-2 px-4 py-2 bg-gray-300 text-gray-800 rounded md:text-sm lg:text-base"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilteredProducts;
