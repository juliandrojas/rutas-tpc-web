import React, { useState } from "react";
import { supabase } from '../supabase/supabase';
function Login() {
  const [ email, setEmail ] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    supabase.auth.signInWithOtp({
      email,
    });
  }
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
       <div className="card">
         {/* <img src="..." className="card-img-top" alt="..." /> */}
         <div className="card-body">
           <h5 className="card-title text-center">Ingresa al aplicativo</h5>
           <div className="card-text">
             <form>
               <div className="mb-3">
                 <label className="form-label">
                   Correo electrónico
                 </label>
                 <input
                   type="email"
                   className="form-control"
                   id="exampleInputEmail1"
                   onChange={e => setEmail(e.target.value)}
                 />
               </div>
               <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                 Submit
               </button>
             </form>
           </div>
         </div>
       </div>
     </div>
  )
}

export default Login;