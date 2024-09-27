'use client'
import Base from '../../../../base';
import AddCategory from './add_category';
 
import dynamic from 'next/dynamic';
import validateCreds from '../../validateCreds';




export default function AddCategoryView() {
   validateCreds()
    return (
     
      <Base>
          <main >{
              AddCategory()
              }</main>
      </Base>
       
        
      
    );
  }
 
  