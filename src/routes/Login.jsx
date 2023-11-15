import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (!session) {
        navigate("/login");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Puedes cerrar esta ventana y luego revisar tu correo para iniciar sesión en la aplicación.");
    try {
      await supabase.auth.signInWithOtp({
        email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: `url('FondoMenu.jpeg')`, // Reemplaza 'ruta-de-tu-imagen' con la ruta correcta de tu imagen
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card p-3">
        <h5 className="card-title text-center mb-4">Ingresa al aplicativo</h5>
        <div className="card-text">
          <form>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
