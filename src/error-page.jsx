import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="d-flex flex-column align-items-center justify-content-center vh-100"
    >
      <h1 className="mb-3">Oops!</h1>
      <p className="text-center mb-2">
        Lo siento, ha ocurrido un error inesperado.
      </p>
      <p className="text-center">
        <i>{error.statusText || error.message}</i>
      </p>
      <a href="/" className="btn btn-success">
        Ir al inicio
      </a>
    </div>
  );
}
