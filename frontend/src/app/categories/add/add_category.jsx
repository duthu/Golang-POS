import { useState } from "react";
import {  useRouter } from 'next/navigation'
import AddCategorySubmit from "./submit_form"
function AddCategory() {
  const router = useRouter()
  const [categoryName, setCategoryName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    var jsoned_body = {
      "name": categoryName,
      "description": description
    }
    const submitAttempt = await AddCategorySubmit(jsoned_body)
    if(submitAttempt == true){
      router.push("/categories")
    } else if (submitAttempt == undefined) {
      document.getElementById('formError').innerText = "An error occurred"
    } 
    else {
      document.getElementById('formError').innerText = submitAttempt
    }
  }

    return (
      <div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Add Category</h1>
        </div>
  
        <div className="row ml-0 mb-3">
          <a href="{% url 'products_list' %}">
            <button type="button" className="btn btn-info font-weight-bold">
              <i className="fas fa-long-arrow-alt-left mr-2"></i>
              Go back
            </button>
          </a>
        </div>
        <div className="row ml-0 mb-3">
          <h3 style={{ color: "red" }} id="formError"></h3>
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
                      required
                      className="form-control"
                      onChange={e => setCategoryName(e.target.value)}
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
                      maxLength={256}
                      className="form-control"
                      onChange={e => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-success font-weight-bold">
                  Create Category
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default AddCategory;
  