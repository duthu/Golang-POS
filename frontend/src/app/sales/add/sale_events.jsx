'use client'
import $ from "jquery";
import Swal from "sweetalert2";
import {sale, tblProducts, roundTo} from './create_table'
import api_axios from "../../../../api_axios";
import { useRouter } from 'next/navigation'
import TouchSpin from "bootstrap-touchspin";

import { goToSales } from './GoToSales'

export function registerEvents() {
    
  
    

    //Tax percentage touchspin
    $("input[name='tax_percentage']")
      .TouchSpin({
        min: 0,
        max: 100,
        step: 1,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10,
        postfix: "%",
      })
      .on("change", function () {
        sale.calculate_sale();
      });
  
    $("#table_products tbody")
      .on("click", 'a[rel="delete"]', function () {
        // When a product is deleted
  
        // Row variable of the table
        var tr = tblProducts.cell($(this).closest("td, li")).index();
        var product_name = tblProducts.row(tr.row).data().name;
  
        Swal.fire({
          customClass: {
            confirmButton: "ml-3 btn btn-danger",
            cancelButton: "btn btn-info",
          },
          buttonsStyling: false,
          title: "Are you sure you want to delete this product from the sale?",
          text: product_name,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          reverseButtons: true,
        }).then((result) => {
          // Si se confirma
          if (result.isConfirmed) {
            // Delete the product
            sale.items.products.splice(tr.row, 1);
            //List the table again
            sale.list_product();
            Swal.fire("The product was eliminated!", "", "success");
          }
        });
      })
      .on("change keyup", 'input[name="quantity"]', function () {
        // When a product changes is quantity
        var quantity = parseInt($(this).val());
        // Row variable of the table
        var tr = tblProducts.cell($(this).closest("td, li")).index();
        console.log(tr);
        //var data = tblProductos.row(tr.row).node();
        //console.log(data);
        // Update the product quantity in the sale object
        sale.items.products[tr.row].quantity = quantity;
        
        // Calculate the sale with the new quantity
        sale.calculate_sale();
        // Find the row to update the product total
        $("td:eq(5)", tblProducts.row(tr.row).node()).html(
          sale.items.products[tr.row].total_product + " KSh"
        );
      });
  
    $(".deleteAll").on("click", function () {
      // If there are no products doesn't do anything
      if (sale.items.products.length === 0) return false;
      // Alert the user
      Swal.fire({
        customClass: {
          confirmButton: "ml-3 btn btn-danger",
          cancelButton: "btn btn-info",
        },
        buttonsStyling: false,
        title: "Are you sure you want to delete all products from the sale?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete all",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then((result) => {
        // Si se confirma
        if (result.isConfirmed) {
          // Borramos todos los productos del objeto de venta
          sale.items.products = [];
          // Calculamos de vuelta la factura
          sale.list_product();
          Swal.fire("All products were eliminated!", "", "success");
        }
      });
    });
    $('.saleForm').on('submit', function (e) {  
      e.preventDefault()
      // Only allow sending if we have at least one product
      if (sale.items.products.length === 0 ) {
          Swal.fire({
              title: 'The sale must have at least 1 product',
              text: 'Search a product and add it to the sale',
              icon: 'warning',
          });
          return false;
      };
      
      // Only allow sending if the paid amount is equal or greater than the total
      if (parseFloat($('[name="amount_payed"]').val()) <  parseFloat($('[name="grand_total"]').val())) {
          Swal.fire({
              title: 'Payable Amount is lower than the Grand Total',
              icon: 'warning',
          });
          return false;
      }
     
  
      // Agregamos los datos faltantes al objeto sales
      
      sale.items.sub_total = parseFloat($('input[name="sub_total"]').val()); 
      sale.items.grand_total = parseFloat($('input[name="grand_total"]').val());
      sale.items.tax_amount = parseFloat($('input[name="tax_amount"]').val()); 
      sale.items.tax_percentage = parseFloat($('input[name="tax_percentage"]').val());
      sale.items.amount_payed = parseFloat($('input[name="amount_payed"]').val()); 
      sale.items.amount_change = parseFloat(roundTo($('input[name="amount_payed"]').val() - $('input[name="grand_total"]').val(), 2)); 
  
      console.log("Sale:")
      console.log(sale.items)
  

      console.log("sending")
      
      api_axios.post("/api/addSale", sale.items , { withCredentials: true
      
      }).
      then((res) => {
        console.log("successful in posting data")
        goToSales()
      }).catch((err) => {
        console.log("error in sending data"); 
        console.log(err)
        var errMsg = document.getElementById('msgError')
        errMsg.innerText = err.response.data.error
      })
      
      
  });

  }
  