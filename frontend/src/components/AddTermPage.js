import React, { useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function AddTermPage() {
  const [termData, setTermData] = useState({
    term: "",
    definition: "",
    category: ""
  });

  const handleChange = event => {
    setTermData({ ...termData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("Entrato");
    // Basic validation
    if (!termData.term.trim()) {
      alert("Term cannot be empty.");
      return;
    }

    if (!termData.definition.trim()) {
      alert("Definition cannot be empty.");
      return;
    }

    if (!termData.category.trim()) {
      alert("Category cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(apiUrl + "/api/terms/add", termData);
      if (response.status >= 300) {
        const error = new Error(response.data);
        if (error.message === "The term is already present in the vocabulary") {
          alert("This term is already present in the vocabulary.");
        } else {
          alert("An error occurred while saving the term.");
        }
      }
      if (response.status === 400) {
        const error = new Error(response.data);
        if (error.message === "The term is already present in the vocabulary") {
          alert("This term is already present in the vocabulary.");
        } else {
          alert("An error occurred while saving the term.");
        }
      }
      window.location.reload();
    } catch (error) {
      console.error("Error saving term: ", error);
    }
  };

  return (
    <form className="p-5 bg-white rounded shadow" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="term" className="form-label">
          Term
        </label>
        <input
          id="term"
          name="term"
          type="text"
          value={termData.term}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="definition" className="form-label">
          Definition
        </label>
        <textarea
          id="definition"
          name="definition"
          value={termData.definition}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          value={termData.category}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default AddTermPage;
