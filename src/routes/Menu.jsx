import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";

function Menu() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (!session) {
        navigate("/login");
      }
    });
  }, []);

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
        <h5 className="card-title text-center mb-4">Menú de opciones</h5>
        <div className="card-text">
          <form>
            <div className="mb-3">
              <a href="/company" className="btn btn-primary w-100">
                Sección de empresas
              </a>
            </div>
            <div className="mb-3">
              <a href="/routes" className="btn btn-secondary w-100">
                Sección de rutas
              </a>
            </div>
            <div className="mb-3">
              <button
                className="btn btn-warning w-100"
                onClick={async () => {
                  try {
                    await supabase.auth.signOut();
                    // Navegar a la página de inicio o hacer otras operaciones después del cierre de sesión.
                  } catch (error) {
                    console.error("Error al cerrar sesión:", error.message);
                  }
                }}
              >
                Salir
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Menu;
