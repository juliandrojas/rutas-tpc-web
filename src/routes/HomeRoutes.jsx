import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

function RoutesPage() {
  const [RouteName, setRouteName] = useState("");
  const [RouteImage, setRouteImage] = useState(null);
  const [RouteMap, setRouteMap] = useState("");
  const [AssociateCompanies, setAssociateCompanies] = useState([]);
  const [SelectedAssociateCompany, setSelectedAssociateCompany] = useState("");
  //Obtenemos las rutas
  const [Rutas, setRutas] = useState([]);
  //UseEffect para recuperar los datos de las rutas u mostrarlos
  useEffect(() => {
    async function fetchRutas() {
      try {
        const { data, error } = await supabase.from("rutas").select();
        if (error) {
          console.log("Error al obtener las rutas");
        } else {
          setRutas(data || []);
        }
      } catch (error) {
        console.log("Error en la solicitud: " + error);
      }
    }
    fetchRutas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(RouteName);
    console.log(RouteImage.name);
    console.log(RouteMap);
    console.log(SelectedAssociateCompany);
    //Subimos el nombre y la imagen a supabase
    try {
      const file_path = RouteImage.name;
      //Subimos al almacenamiento de supabase
      const { data: uploadImage, error: uploadError } = await supabase.storage
        .from("imagenesLetrerosRutas")
        .upload(file_path, RouteImage);
      if (uploadError) {
        console.log("Error al subir la imagen " + uploadError);
      } else {
        console.log("Imagen subida con exito: " + uploadImage.path);
        const baseURL = "https://lgtgipbjjgksrudabmpe.supabase.co";
        console.log(baseURL);
        const imageUrl =
          baseURL +
          "/storage/v1/object/public/imagenesLetrerosRutas/" +
          uploadImage.path;
        console.log("Url de la imagen: " + imageUrl);
        //Insertamos la informacion en la tabla Empresa
        const { error: insertError } = await supabase.from("rutas").insert({
          nombre: RouteName,
          url_image: imageUrl,
          url_mapa: RouteMap,
          empresa_asociada: SelectedAssociateCompany,
        });
        if (insertError) {
          console.log("Error al insertar datos:", insertError);
        } else {
          alert("Datos insertados con éxito, recarga la página");
          console.log("Datos insertados con éxito, recarga la página");
        }
      }
    } catch (error) {
      console.log("Error en clase Routes: " + error);
    }
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data, error } = await supabase
          .from("empresas")
          .select("id, nombre");
        if (error) {
          throw error;
        }
        setAssociateCompanies(data || []);
      } catch (error) {
        console.error("Error al obtener las empresas:", error.message);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyChange = (e) => {
    setSelectedAssociateCompany(e.target.value);
  };

  return (
    <>
      <h1 className="text-center">Sección de Rutas</h1>
      <div className="container text-center">
        <div className="d-flex justify-content-around">
          {/* Button Trigger Modal */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Cargar datos de la ruta
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
                <h5 className="modal-title" id="exampleModalLabel">
                  Cargar datos de la ruta
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="">Nombre de la ruta</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre de la ruta"
                      name="routeName"
                      onChange={(e) => setRouteName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Imagen de la ruta</label>
                    <input
                      type="file"
                      className="form-control"
                      placeholder="Imagen de la ruta"
                      name="routeImage"
                      onChange={(e) => setRouteImage(e.target.files[0])}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">URL del mapa de la ruta</label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://www.ejemplo.com/ruta/ejemplo?parametro=valor#seccion"
                      name="routeMap"
                      onChange={(e) => setRouteMap(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Empresa que cubre la ruta</label>
                    <select
                      className="form-control"
                      name="associateCompany"
                      value={SelectedAssociateCompany}
                      onChange={handleCompanyChange}
                    >
                      <option value="">Selecciona una empresa</option>
                      {AssociateCompanies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Ingresar datos de la ruta
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar Modal
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h2 className="text-center">Tabla de rutas</h2>
        {/* Table */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Imagen</th>
              <th scope="col">URL Mapa</th>
              <th scope="col">Empresa Asociada</th>
            </tr>
          </thead>
          <tbody>
            {Rutas.map((ruta, index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                <th scope="row" style={{ verticalAlign: "middle" }}>
                  {ruta.id}
                </th>
                <td style={{ verticalAlign: "middle" }}>{ruta.nombre}</td>
                <td style={{ verticalAlign: "middle" }}>
                  {/* Asegúrate de incluir la lógica para mostrar la imagen si es necesario */}
                  <img
                    src={`${ruta.url_image}`}
                    className="img-fluid"
                    alt=""
                    style={{
                      maxWidth: "50%",
                      maxHeight: "50%",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <a href={ruta.url_mapa} target="_blank">
                    Ver mapa
                  </a>
                </td>

                <td style={{ verticalAlign: "middle" }}>
                  {
                    AssociateCompanies.find(
                      (company) => company.id === ruta.empresa_asociada
                    )?.nombre
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RoutesPage;