'use client'
import Base from '../../../../base';
import AddProduct from './add_product';

import validateCreds from '../../validateCreds';
import dynamic from 'next/dynamic';




export default function Home() {
    validateCreds()
    return (
     
      <Base>
          <main >{
              AddProduct()
              }</main>
      </Base>
       
        
      
    );
  }

  