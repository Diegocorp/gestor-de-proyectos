import React from "react";
import { useForm } from "@formspree/react";

function SuggestionsForm() {
  const [state, handleSubmit] = useForm("xwkalorj");
  if (state.succeeded) {
    return <p>Gracias por su comentario!</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="col-xl-12 offset-xl-0">
        <div className="card shadow mb-3">
          <div className="card-header py-3">
            <p className="text-primary m-0 font-weight-bold">
              Se agradece cualquier sugerencia o comentario acerca de la
              plataforma
            </p>
          </div>
          <div className="card-body">
            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="city">
                      <strong>Comentarios u Observaciones</strong>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required={true}
                      className="border rounded form-control"
                      style={{
                        padding: "6px 12px",
                        color: "rgb(110, 112, 126)",
                        height: "100px",
                      }}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary text-capitalize font-weight-bold"
                      disabled={state.submitting}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function App() {
  return <SuggestionsForm />;
}
export default App;
