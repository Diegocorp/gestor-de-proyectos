import React from "react";
import "./styles.css";
import SuggestionForm from "../../Components/SuggestionsForm";

const Suggestions = () => {
  return (
    <div id="create-container" className="w-100 text-left">
      <div className="container-fluid"></div>
      <div className="d-sm-flex justify-content-between align-items-center">
        <h3 className="text-dark mb-0 pl-3">Sugerencias y comentarios</h3>
      </div>
      <div className="row" />
      <SuggestionForm />
    </div>
  );
};

export default Suggestions;
