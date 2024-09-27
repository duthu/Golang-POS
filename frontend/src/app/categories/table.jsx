import Link from "next/link";
import api_axios from "../../../api_axios";
function deleteCategory(categoryID){
  api_axios
  .delete("/api/categories/delete/" + categoryID, {
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
 

  console.log(data)
   

  return (
    
    <table
      className="table table-bordered table-hover"
      id="dataTable"
      width="100%"
      cellSpacing="0"
    >
      <thead>
        <tr>
        
          <th>ID</th>     
          <th >Name</th>
          <th>Description</th>
         
          <th className="text-center" >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
         {data.map((category, key) => {
            return(
          <tr>
            <td>{category.id}</td>
            
            <td>{category.name}</td>
            <td>{category.description}</td>
            

            

            <td className="text-center">
              <Link href={"/categories/update/" + category.id}>
                <button
                  type="button"
                  className="btn btn-warning btn-sm"
                  data-bs-toggle="tooltip"
                  title="Update category"
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
                    onClick={deleteCategory.bind(
                      this,
                      category.id,
                    )}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </a>

              
            </td>
          </tr>)
        })} 
      </tbody>
    </table>
  );
}
export default Table