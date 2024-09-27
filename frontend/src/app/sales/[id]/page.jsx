'use client'
import Swal from "sweetalert2";
import Base from "../../../../base";
import validateCreds from "../../validateCreds";
import { useEffect, useState } from "react";
import api_axios from "../../../../api_axios";
import SaleDetail from "./sale_detail"

export default function SalesView({params}){
    validateCreds()
    
    const [sale, setSale] = useState("")
    const [details, setDetails] = useState([])

    useEffect(() => {
        api_axios.get("/api/sales/" + params.id, {
            withCredentials: true
        }).then((res) => {
            setSale(res.data.sale)
            setDetails(res.data.details)
        }).catch((err) => {
            console.log("error occurred")
            console.log(err)
        })
    }, [])

    return(
        <Base pageTitle={"Sale Details"}>
        
        { SaleDetail(sale, details) }
        
        
        </Base>
    )
}