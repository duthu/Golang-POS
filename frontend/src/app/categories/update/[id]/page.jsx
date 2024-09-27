'use client'
import Base from '../../../../../base';
import UpdateCategory from './update_category';
 

import validateCreds from '../../../validateCreds';
import { useEffect, useState } from 'react';
import api_axios from '../../../../../api_axios';




export default function UpdateCategoryHome({params}) {
  validateCreds()
  const [category, setCategory] = useState("")

  useEffect(() => {
    api_axios.get("/api/categories/" + params.id, {
      withCredentials: true
    }).then((res) => {
      setCategory(res.data)
    }).catch((err) => {
      console.log("error occured")
      console.log(err)
    })
  }, [])
  
    return (
     
      <Base>
          <main >{
              UpdateCategory(category)
              }</main>
      </Base>
       
        
      
    );
  }
  
  