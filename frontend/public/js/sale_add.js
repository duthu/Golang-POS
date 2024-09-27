

    function roundTo(n, digits) {
        if (digits === undefined) {
            digits = 0;
        }

        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        return Math.round(n) / multiplicator;
    }
    function table__(){

    
    //Variable for product number in table
    var number = 1;

    //Variable to store sale details and products
    var sale = {
        items: {
            customer : 0, 
            sub_total : 0.00, 
            grand_total : 0.00, 
            tax_amount : 0.00, 
            tax_percentage : 0.00, 
            amount_payed : 0.00, 
            amount_change : 0.00,
            products: [

            ]
        },
        calculate_sale: function (){
            // Subtotal of all products added
            var sub_total = 0.00

            var tax_percentage = $('input[name="tax_percentage"]').val();

            // Calculates the total for each product
            $.each(this.items.products, function(pos, dict){
                dict.pos = pos;  
                dict.total_product = roundTo(dict.quantity * dict.price, 2);
                // Add the product total to the sale subtotal
                sub_total += roundTo(dict.total_product, 2);
            });

            //Update the sale subtotal, grand total, and tax amount
            this.items.sub_total = roundTo(sub_total, 2);
            this.items.grand_total = roundTo(this.items.sub_total, 2);
            this.items.tax_amount = roundTo(this.items.sub_total * (tax_percentage / 100), 2);
    
            $('input[name="sub_total"]').val(this.items.sub_total);
            $('input[name="tax_amount"]').val(this.items.tax_amount);
            $('input[name="grand_total"]').val(this.items.grand_total);
        },
        // Adds a product to the sale object
        add_product: function (item) {
            this.items.products.push(item);
            this.list_product();
        },
        // Shows the selected product in the table
        list_product: function () {
            // Calculate the sale 
            this.calculate_sale();

            tblProducts = $("#table_products").DataTable({
                destroy: true,
                data: this.items.products,
                columns: [
                    {"data": "number"}, 
                    {"data": "name"},
                    {"data": "price"},
                    {"data": "quantity"},
                    {"data": "quantityInStock"},
                    {"data": "total_product"},
                    {"data": "id"},
                ],
                columnDefs: [
                    {
                        // Quantity
                        class: 'text-center',
                        targets: [3], 
                        render: function (data, type, row){
                            return '<input name="quantity" type="text" className="form-control form-control-xs text-center input-sm" autocomplete="off" value="'+row.quantity+'">';
                        },                      
                    },
                    {
                        //Product price an total
                        class: 'text-right',
                        targets: [2,5],
                        render: function (data, type, row){
                            return parseFloat(data).toFixed(2) + ' KSh';
                        },
                    },
                    {
                        //Delete button
                        class: 'text-center',
                        targets: [-1],
                        orderable: false,
                        render: function (data, type, row){
                            return '<a rel="delete" type="button" className="btn btn-sm btn-danger" data-bs-toggle="tooltip" title="Delete product"> <i className="fas fa-trash-alt fa-xs"></i> </a>';
                        },
                    },

                ],
                rowCallback(row, data, displayNun, displayIndex, dataIndex){
                    console.log("stock: " + data.quantityInStock)
                    $(row).find(("input[name='quantity']")).TouchSpin({
                        min: 1,
                        max: data.quantityInStock, //Máximo de acuerdo al stock de cada producto
                        step: 1,
                        decimals: 0,
                        boostat: 1,
                        maxboostedstep: 3,
                        postfix: ''
                    });
                },
            })
            
            // IDs de productos ya seleccionados para exlcuir en la busqueda
            //console.log("this.traer_ids()");
            //console.log(this.traer_ids());
            
        },
    };

    $(document).ready(function() {

        //Tax percentage touchspin
        $("input[name='tax_percentage']").TouchSpin({
            min: 0,
            max: 100,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            postfix: '%'
        }).on('change', function(){
            sale.calculate_sale();
        });


        //Select2 customers
        $('#searchbox_customers').select2({
            placeholder: "Select a customer",
            allowClear: true,
        });

        // Tables Events
        $('#table_products tbody').on('click', 'a[rel="delete"]', function () {
                // When a product is deleted
                
                // Row variable of the table
                var tr = tblProducts.cell($(this).closest('td, li')).index();
                product_name = (tblProducts.row(tr.row).data().name)

                Swal.fire({
                    customClass: {
                        confirmButton: 'ml-3 btn btn-danger',
                        cancelButton: 'btn btn-info'
                    },
                    buttonsStyling: false,
                    title: "Are you sure you want to delete this product from the sale?",
                    text: product_name,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel',
                    reverseButtons: true,

                }).then((result) => {
                    // Si se confirma
                    if (result.isConfirmed) {
                        
                        // Delete the product
                        sale.items.products.splice(tr.row, 1);
                        //List the table again
                        sale.list_product();
                        Swal.fire('The product was eliminated!', '', 'success')
                    };
                })



            }).on('change keyup', 'input[name="quantity"]', function(){
                // When a product changes is quantity
                var quantity = parseInt($(this).val());
                console.log("sale is: " + sale)
                //console.log("quantity is this: " + quantity)
                //console.log(quantity);
                // Row variable of the table
                var tr = tblProducts.cell($(this).closest('td, li')).index();
                console.log(tr);
                //var data = tblProductos.row(tr.row).node();
                //console.log(data);
                // Update the product quantity in the sale object
                sale.items.products[tr.row].quantity = quantity;
                console.log(sale.items.products);
                // Calculate the sale with the new quantity
                sale.calculate_sale();
                // Find the row to update the product total
                $('td:eq(5)', tblProducts.row(tr.row).node()).html(sale.items.products[tr.row].total_product + ' KSh');
        });

        // Delete all products
        $('.deleteAll').on('click', function(){
            // If there are no products doesn't do anything
            if(sale.items.products.length === 0 ) return false;
            // Alert the user
            Swal.fire({
                customClass: {
                    confirmButton: 'ml-3 btn btn-danger',
                    cancelButton: 'btn btn-info'
                },
                buttonsStyling: false,
                title: "Are you sure you want to delete all products from the sale?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Delete all',
                cancelButtonText: 'Cancel',
                reverseButtons: true,

            }).then((result) => {
                // Si se confirma
                if (result.isConfirmed) {
                    // Borramos todos los productos del objeto de venta
                    sale.items.products = [];
                    // Calculamos de vuelta la factura
                    sale.list_product();
                    Swal.fire('All products were eliminated!', '', 'success')
                };
            })
        });

        //Select2 products searchbox
        // Validate the csrf_token
        var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }
        // To avoid error 403 Fordbidden
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });

        $('#searchbox_products').select2({
            delay: 250,
            placeholder: 'Search a product',
            minimumInputLength: 1,
            allowClear: true,
            templateResult: template_product_searchbox,
            ajax:{ 
                url: "{% url 'get_products' %}",
                type: 'POST',
                data: function (params) {
                    console.log("params: " + params)
                var queryParameters = {
                    term: params.term,
                    //excluir_prod_seleccionados: JSON.stringify(venta.traer_ids())
                }
                return queryParameters;
                },
                processResults: function (data) {
                    console.log(data)
                    return {
                        results: data
                    };
                },
            }
            }).on('select2:select', function (e) {
                //When a product is selected from the searchbox
                var data = e.params.data;
                //Add number, subtotal and quantity of the product to the dictionary
                data.number = number;
                number++; //Increase the product number in the table
                //data.sub_total = 0;
                //data.quantity = 1;
                //Add the product to the sale object
                sale.add_product(data);
                console.log("Sale items");      
                console.log(sale.items);      
                //Clean the searchbox after the product is selected
                $(this).val('').trigger('change.select2');; 
            });
    
            // Products datatable
            
            tblProducts = $('#table_products').DataTable({
                columnDefs: [
                    {
                        targets: [-1], // column index (start from 0)
                        orderable: false, // set orderable false for selected columns
                    }
                ],
            });
            

        });

        // Product searchbox templateResult
        function template_product_searchbox(repo) {
            if (repo.loading) {
                return repo.text;
            }
        
            var option = $(
                '<div className="wrapper container">'+
                ' <div className="row">' +
                    '<div className="col-lg-11 text-left shadow-sm">' +
                      //'<br>' +
                      '<p style="margin-bottom: 5px;">' +
                      '<b>Name:</b> ' + repo.text + " | Category: " + "<span className='btn-info px-2'>" + repo.category + '</span> <br>' +
                      '<b>Price:</b> <span className="btn-success px-2">'+repo.price+' (KSh). </span>'+
                      '</p>' +
                    '</div>' +
                  '</div>' +
                '</div>');
        
            return option;
        }

        // Send the sale via ajax
        
        $('.saleForm').on('submit', function (e) {  
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
            if ($('[name="amount_payed"]').val() < $('[name="grand_total"]').val()) {
                Swal.fire({
                    title: 'Payable Amount is lower than the Grand Total',
                    icon: 'warning',
                });
                return false;
            }
           

            // Agregamos los datos faltantes al objeto sales
            sale.items.customer = $('select[name="customer"]').val();
            console.log("Customer: " + sale.items.customer)
            sale.items.sub_total = $('input[name="sub_total"]').val(); 
            sale.items.grand_total = $('input[name="grand_total"]').val();
            sale.items.tax_amount = $('input[name="tax_amount"]').val(); 
            sale.items.tax_percentage = $('input[name="tax_percentage"]').val();
            sale.items.amount_payed = $('input[name="amount_payed"]').val(); 
            sale.items.amount_change = roundTo($('input[name="amount_payed"]').val() - $('input[name="grand_total"]').val(), 2); 

            console.log("Sale:")
            console.log(sale.items)

            // Validate the csrf_token
            var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

            function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
            }
            $.ajaxSetup({
                beforeSend: function (xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                }
            });
            $.ajax({
                url: "{% url 'sales_add' %}",
                type: "POST",
                // We need to convert the JS object sale to string
                data: JSON.stringify(sale.items), 
                datatype: "json",
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log("Ajax OK")
                },
                error: function (error) {
                    console.log("Ajax error");
                    console.log(error);
                },
            }).done(function (data){
                console.log ("Ajax Done");
            }).fail(function (data, jqXHR, textStatus, errorThrown){
                console.log ("Ajax Fail");
                alert(textStatus + ':' + errorThrown);
            });
            
        });
    }
   
