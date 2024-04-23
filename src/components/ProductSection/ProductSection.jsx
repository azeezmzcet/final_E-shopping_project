import React, { useState } from "react";
import { storeData } from "../../assets/data/dummyData";
import ProductSectionItem from "./ProductSectionItem";


const ProductSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
 
  const itemsPerPage = 9; // Number of items to display per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(storeData.length / itemsPerPage);

  // Calculate the index range of items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Function to handle next page
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Function to handle previous page
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };



  


  return (
    <div>
      <div className="bg-black p-2 w-11/12 md:w-3/4 lg:w-1/2 mx-auto rounded-md">
        <h2 className="text-red-600 text-center text-lg font-inter font-bold tracking-normal leading-none">
          Today's SALE FLAT 30%
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-items-center py-8 gap-4 mx-auto max-w-7xl">
        {storeData.slice(startIndex, endIndex).map((product, index) => (
          <div key={index}>
            <ProductSectionItem
              id={product.id}
              name={product.name}
              img={product.img}
              text={product.text}
              price={product.price}
              totalPrice={product.totalPrice}
              color={product.color}
              size={product.size}
            />
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 "
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
