'use client'
import Swal from "sweetalert2";
import Base from "../../../base";
import validateCreds from "../validateCreds";

import Sales from "./sales";
export default function SalesView(){
    validateCreds()
    
    return(
        <Base pageTitle={"Sales"}>
        
        { Sales() }
        
        
        </Base>
    )
}