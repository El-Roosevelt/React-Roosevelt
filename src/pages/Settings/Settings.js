import React from 'react';
import './Settings.scss';
export default function Settings() {
    const [nameEdit, setNameEdit] = React.useState('Roberto Gomez');
    const [emailEdit, setEmailEdit] = React.useState('roberto.gomez@example.com');
    const [birthEdit, setBirthEdit] = React.useState('');
    const [showConfig, setShowConfig] = React.useState(false);

    const OnClickConfigUser = () => {
        setShowConfig(!showConfig);
    };

    const BirthToAge = (birthDate) => {

    }


    const today = new Date();
    const maxDate = new Date(
        today.getFullYear() - 20,
        today.getMonth(),
        today.getDate()
    ).toISOString().split('T')[0];

    const minDate = new Date(
        today.getFullYear() - 100,
        today.getMonth(),
        today.getDate()
    ).toISOString().split('T')[0];

    return (
        <div className="container-fluid bg-secondary vh-100 p-4">
            <div className='row bg-light rounded-2 p-4 mb-4'>
                <div className='col-6 container-private-info'>
                    <h2>Datos personales</h2>
                    <div className='d-flex flex-row mt-2 p-2'>
                        <div className='foto-container'>
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Foto de perfil" className='foto' />
                        </div>
                        <div className='d-flex flex-column justify-content-center ms-4'>
                            <h2>Roberto Gomez</h2>
                            <p>roberto.gomez@example.com</p>
                            <p>30 años</p>
                        </div>
                    </div>
                    <div>
                        <button className='btn btn-primary mt-3' onClick={OnClickConfigUser} >Editar perfil</button>
                    </div>
                </div>
                <div className='user-goals col-6 rounded-2 p-3 d-flex flex-column justify-content-center align-items-center'>
                    <h2 className=' status-title '>Datos Interesantes</h2>
                    <table className=' table-striped table-bordered mt-3 w-100'>
                        <tr>
                            <td className='fw-bold'>Metros Recorridos <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-walking" viewBox="0 0 16 16">
  <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.8 1.8 0 0 1-.088.395l-.318.906.213.242a.8.8 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z"/>
  <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.8.8 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843.006-.067 1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z"/>
</svg></td>
                            <td>5km</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Ruta recurrente <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
  <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
  <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
</svg></td> 
                            <td>Parque Central</td>  
                        </tr>
                        <tr>
                            <td className='fw-bold'>Medio de movilidad recurrente <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="bi bi-universal-access-circle" viewBox="0 0 16 16" id="Universal-Access-Circle--Streamline-Bootstrap" height="20" width="20">
  <desc>
    Universal Access Circle Streamline Icon: https://streamlinehq.com
  </desc>
  <path d="M8 4.143A1.071 1.071 0 1 0 8 2a1.071 1.071 0 0 0 0 2.143m-4.668 1.47 3.24 0.316v2.5l-0.323 4.585A0.383 0.383 0 0 0 7 13.14l0.826 -4.017c0.045 -0.18 0.301 -0.18 0.346 0L9 13.139a0.383 0.383 0 0 0 0.752 -0.125L9.43 8.43v-2.5l3.239 -0.316a0.38 0.38 0 0 0 -0.047 -0.756H3.379a0.38 0.38 0 0 0 -0.047 0.756Z" stroke-width="1"></path>
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8" stroke-width="1"></path>
</svg></td> 
                            <td>Ascensor</td>  
                        </tr>
                    </table>    
                </div>

            </div>
            <div className={` config-data-user ${showConfig ? 'show' : ''} text-light rounded-3 w-50`}>
                <h2 className='m-2'>Edicion de datos personales</h2>
                <form className='form d-flex flex-column gap-2 p-3'>
                    <div>
                        <label>
                            Nombre de usuario:
                            <input className=' form-control' value={nameEdit} onChange={(e)=>setNameEdit(e.target.value)}></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            Correo de usuario:
                            <input className=' form-control' value={emailEdit} onChange={(e)=>setEmailEdit(e.target.value)}></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            Edad del usuario:
                            <input className='form-control form-control' type='date' min={minDate} max={maxDate} value={birthEdit} onChange={(e)=>setBirthEdit(e.target.value)}></input>
                        </label>
                    </div>
                    <div>
                        <button className='btn btn-success mt-3' type='submit'>Guardar cambios</button>
                    </div>
                </form>
            </div>
            <div>
                a
            </div>




        </div>

    );
}