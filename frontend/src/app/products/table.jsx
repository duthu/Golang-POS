import Link from "next/link";
import api_axios from "../../../api_axios";
function deleteProduct(id) {
  api_axios
    .delete("/api/products/delete/" + id, {
      withCredentials: true,
    })
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

 
function Table(data) {
 

  return (
    <table
      className="table table-bordered table-hover"
      id="dataTable"
      width="100%"
      cellSpacing="0"
    >
      <thead>
        <tr>
          <th style={{height: "5%"}}>ID</th>
          <th style={{height: "20%"}}>Name</th>
          <th style={{height: "30%"}}>Description</th>
          <th style={{height: "15%"}}>Category</th>
          <th style={{height: "10%"}}>Quantity in Stock</th>
          <th style={{height: "10%"}} className="text-center">Price (KSh)</th>
          <th style={{height: "10%"}} className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product, key) => {
          return (
            <tr>
              <td>{product.id}</td>

              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.ComponentsCategory.name}</td>
              <td>{product.quantityInStock}</td>
              <td className="text-right">{product.price} </td>

              <td className="text-center">
               <Link
                  href={"/products/update/" + product.id}
                  className="text-decoration-none"
                >
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    data-bs-toggle="tooltip"
                    title="Update product"
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                </Link>

                <a className="text-decoration-none">
                  <button
                    rel="delete"
                    type="button"
                    className="btn btn-danger btn-sm"
                    // data-toggle="modal"
                    // data-target="#exampleModal"
                    onClick={deleteProduct.bind(
                      this,
                      product.id,
                    )}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </a>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
