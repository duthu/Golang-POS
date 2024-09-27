'use client'
import { useEffect } from "react";
import Base from "../../../../base";
import AddSale from "./add_sale";

export default function AddSaleView(){
    
    return(
        <Base pageTitle={"Add Sale"}>
            { AddSale() }
        </Base>
    )
}