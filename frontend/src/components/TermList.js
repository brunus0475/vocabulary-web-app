// /client/src/components/TermList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
//import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import AddTermPage from "./AddTermPage";
const apiUrl = process.env.REACT_APP_API_URL;

function TermList() {
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get(apiUrl + "/api/terms");
        setTerms(response.data);
      } catch (error) {
        console.error("Error fetching terms: ", error);
      }
    };

    fetchTerms();
  }, []);

  const handleFileUpload = async event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async evt => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      let importedCount = 0;
      let skippedCount = 0;

      for (let i = 1; i < data.length; i++) {
        // Start from 1 to skip the header row
        const row = data[i];
        const term = row[0];
        const definition = row[1];
        const category = row[2];

        try {
          const response = await axios.post(apiUrl + "/api/terms/add", {
            term,
            definition,
            category
          });
          if (response.data === "The term is already present.") {
            skippedCount++;
            console.log(skippedCount);
            continue;
          }
          importedCount++;
          console.log(skippedCount);
        } catch (error) {
          console.error("Error importing term: ", error);
        }
      }

      alert(
        `Import completed. Imported ${importedCount} rows. Skipped ${skippedCount} existing rows.`
      );
      window.location.reload();
    };

    reader.readAsBinaryString(file);
  };
  
  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">My Vocabulary App</h1>
          <p className="lead">
            Welcome to my vocabulary app. Here you can manage your vocabulary.
          </p>
          <p className="lead">
            Per caricare un file Excel è necessario avere tre colonne con "l'intestazione"): Termine (campo obbligatorio), Definizione (campo obbligatorio), Categoria (campo mon obbligatorio). 
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 d-flex flex-column align-items-start common-background">
          <div className="mt-5">
            <AddTermPage />
          </div>
        </div>
        <div className="col-md-8 common-background">
          <div className="container mt-5">
            <table className="table table-striped shadow-lg">
              <thead>
                <tr>
                  <th scope="col">Term</th>
                  <th scope="col">Definition</th>
                  <th scope="col">Category</th>
                </tr>
              </thead>
              <tbody>
                {terms.map((term, index) =>
                  <tr key={index}>
                    <td>
                      {term.term}
                    </td>
                    <td>
                      {term.definition}
                    </td>
                    <td>
                      {term.category}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="d-flex justify-content-between mt-3">
              <button
                onClick={handleExport}
                className="btn btn-success shadow-lg"
              >
                Export to Excel
              </button>
              <div>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  hidden
                  id="excel-upload"
                />
                <button
                  onClick={() =>
                    document.getElementById("excel-upload").click()}
                  className="btn btn-warning shadow-lg"
                >
                  Import from Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermList;
