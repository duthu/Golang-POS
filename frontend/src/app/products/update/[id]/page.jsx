'use client'
import Base from '../../../../../base';

 
import UpdateProduct from './update_product';
import validateCreds from '../../../validateCreds';
import { useEffect, useState } from 'react';

import api_axios from '../../../../../api_axios';

export default function UpdateProductHome({params}) {
   validateCreds()
   const [product, setProduct] = useState("")

  useEffect(() => {
    api_axios.get("/api/products/" + params.id, {
      withCredentials: true
    }).then((res) => {
      setProduct(res.data.product)
    }).catch((err) => {
      console.log("error occured")
      console.log(err)
    })
  }, [])
    return (
     
      <Base>
          <main >{
              UpdateProduct(product)
              }</main>
      </Base>
       
        
      
    );
  }
