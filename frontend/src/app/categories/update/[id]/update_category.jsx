import { useEffect, useState } from "react";
import api_axios from "../../../../../api_axios";
import { useRouter } from "next/navigation";

function UpdateCategory(category) {
  const router = useRouter()
  const [categoryName, setCategoryName] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")

  
  useEffect(() => {
   
    setCategoryName(category.name)
    setCategoryDescription(category.description)
  }, [category])

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    var jsonData = {
      "id": category.id,
      "name": categoryName,
      "description": categoryDescription
    }
    api_axios.patch("/api/categories/update/" + category.id, jsonData, {
      withCredentials: true
    }).then((res) => {
        router.push("/categories")
    }).catch((err) => {
      console.log("error occurred")
      console.log(err)
    })
  }

    return (
      <div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Update Category</h1>
        </div>
  
        <div className="row ml-0 mb-3">
          <a href="/categories">
            <button type="button" className="btn btn-info font-weight-bold">
              <i className="fas fa-long-arrow-alt-left mr-2"></i>
              Go back
            </button>
          </a>
        </div>
  
        <div className="row">
          <div className="card col-md-8">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-8">
                    <b>Name</b>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={category.name}
                      onChange={e => setCategoryName(e.target.value)}
                      required
                      className="form-control"
                    ></input>
                  </div>
                 
                </div>
                <div className="form-row">
                  <div className="form-group col-md-8">
                    <b>Description</b>
                    <textarea
                      name="description"
                      cols={40}
                      rows={10}
                      defaultValue={category.description}
                      maxLength={256}
                      onChange={e => setCategoryDescription(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-success font-weight-bold">
                  Update Category
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default UpdateCategory;
  