import React, { useEffect, useState } from "react";
import Base from "./Base/Base";
import { productApi } from "../../../CommonBackendLinks";
import { useDispatch, useSelector } from "react-redux";
import {
  productFetchedSuccessfully,
  productRequest,
  productRequestFailed,
} from "../../../STATEMANAGEMENT/CommonSlice/ProductSlice";
import BodyLoading from "../../LoadingComponents/BodyLoding";
import OverallLoading from "../../LoadingComponents/OverAllLoading";

const Body = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);

  // Get products
  const productFetchMethod = async () => {
    try {
      dispatch(productRequest()); // Dispatch the product request
      const response = await fetch(productApi, {
        method: "get",
      }); // fetch product from backend

      const data = await response.json(); // define data

      // define product data
      const productdata = data.map((product) => {
        // Convert buffer data to url
        const ProductImage = product.ProductImage.map((bufferData) => {
         console.log(bufferData)
         
          return {
            data: URL.createObjectURL(new Blob([bufferData.data],{type:bufferData.contentType})),
            contentType: bufferData.contentType,
            _id: bufferData._id,
          };
        });

        // Define product detail with converted product image
        const productDetails = {
          ...product,
          ProductImage,
          
        };

        return productDetails;
      });
      // Dispatch product success if all process done successfully
      dispatch(productFetchedSuccessfully(productdata));
    } catch (error) {
      // dispatch the product request faile if any problem in fetching
      console.log(error);
      dispatch(productRequestFailed());
    }
  };

  useEffect(() => {
    productFetchMethod();
    
  }, []);

  
  return (
    <div>
      {loading ? (
        <div>
          <BodyLoading />
          <OverallLoading />
        </div>
      ) : (
        <Base>
          {
           products && products.map((product)=>{
              return(
                <div key={product._id}>
                  <span>{product.ProductName}</span>
                  {
                  product.ProductImage &&  product.ProductImage.map((image)=>{
                      return(
                        <img key={image._id} src={image.data} alt={product.ProductName} />
                      )
                    })
                  }
                </div>
              )
            })
          }
      
          
        </Base>
      )}
    </div>
  );
};

export default Body;
