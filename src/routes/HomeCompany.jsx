import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";

function HomeCompany() {
  const [nombre, setNombre] = useState("");
  const [imagenEmpresa, setImagenEmpresa] = useState("");
  //useState para renderizar las empresas
  const [empresas, setEmpresas] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Subir la imagen al bucket de Supabase
      const { data: fileData, error: fileError } = await supabase.storage
        .from("imagenesLogosEmpresas")
        .upload(`${imagenEmpresa[0].name}`, imagenEmpresa[0]);
      const path = fileData.path;
      console.log("Nombre de la imagen: " + path);
      //console.log("Respuesta de la carga de la imagen:", path);

      if (fileError) {
        console.error("Error al subir la imagen:", fileError.message);
        return;
      }
      //console.log("Respuesta de la carga de la imagen:", fileData);
      // Obtener la URL de la imagen subida
      console.log("Supabase storage: ", supabase.storageUrl);
      console.log("Path: ", path);
      const imageUrl = `${supabase.storageUrl}/object/public/imagenesLogosEmpresas/${path}`;
      console.log("URL de la imagen subida:", imageUrl);

      // Insertar la empresa en la tabla "empresas" de Supabase
      const { data: insertData, error: insertError } = await supabase
        .from("empresas")
        .insert([{ nombre, url_image: imageUrl }]);

      if (insertError) {
        console.error("Error al insertar la empresa:", insertError.message);
        return;
      }
      console.log("Empresa insertada con éxito:");
      // Recargar datos después de insertar
      chargeData();
    } catch (error) {
      console.error("Error general:", error.message);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (!session) {
        navigate("/login");
      }
    });
  }, []);
  useEffect(() => {
    //Cargar datos de Supabase al montar el componente
    return () => {
      chargeData();
    };
  }, []); // El segundo argumento es un array vacío, lo que significa que solo se ejecuta una vez al montar el componente
  const chargeData = async () => {
    try {
      // Obtener datos de la tabla "empresas" en Supabase
      const { data, error } = await supabase.from("empresas").select();
      if (error) {
        console.error("Error al cargar datos:", error.message);
        return;
      }
      // Actualizar el estado con los datos de las empresas
      setEmpresas(data);
    } catch (error) {
      console.error("Error general:", error.message);
    }
  };
  return (
    <>
      <h1 className="text-center">Sección de empresas</h1>
      <div className="container text-center">
        <div className="d-flex justify-content-around">
          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Añadir empresa
          </button>

          <a href="/" className="btn btn-secondary">
            Ir atrás
          </a>
        </div>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Añadir empresa
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="card p-3">
                  <h5 className="card-title text-center">
                    Completa los campos
                  </h5>
                  <hr />
                  <div className="card-text">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">
                          Nombre de la empresa
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nombre"
                          placeholder="Digita el nombre de la empresa"
                          required
                          onChange={(e) => setNombre(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Imagen de la empresa
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="nombre"
                          placeholder="Ingresa la imagen de la empresa"
                          required
                          onChange={(e) => setImagenEmpresa(e.target.files)}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={handleSubmit}
                      >
                        Registrar empresa
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h2 className="text-center">Tabla de empresas</h2>
        {/* Table */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Imagen</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa) => (
              <tr key={empresa.id}>
                <th scope="row">{empresa.id}</th>
                <td>{empresa.nombre}</td>
                <td>
                  <img
                    className="img-thumbnail"
                    src={empresa.url_image}
                    alt=""
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HomeCompany;
