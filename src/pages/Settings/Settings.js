import React from 'react';
import './Settings.scss';
export default function Settings() {
    const[showConfig,setShowConfig] = React.useState(false);

    document.querySelector('.btn').addEventListener('click',()=>{
        setShowConfig(!showConfig);
    });
    
  return (
    <div className="container-fluid bg-secondary vh-100 p-4">
        <div className='row bg-light rounded-2 p-4 mb-4'>
            <h1>Datos personales</h1>
            <div className='d-flex flex-row'>
                <div className='foto-container'>
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Foto de perfil" className='w-100 h-100'/>
                </div>
                <div className='d-flex flex-column justify-content-center ms-4'>
                    <h2>Roberto Gomez</h2>
                    <p>roberto.gomez@example.com</p>
                    <p>30 años</p>
                </div>
            </div>
            <div>
                <button className='btn btn-primary mt-3' >Editar perfil</button>
            </div>
        </div>
        {showConfig && (
            <div className='row config-data-user text-light bg-black rounded-3 opacity-75'> 
                <h2>Configuración de la cuenta</h2>
                <form className='form d-flex flex-column column-gap-2 p-3'>
                    <div>
                        <label>
                            Nombre de usuario:
                            <input className=' form-control'></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            Nombre de usuario:
                            <input className=' form-control'></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            Nombre de usuario:
                            <input className=' form-control'></input>
                        </label>
                    </div>
                </form>
            </div>
        )}
        
            
        
    </div>
    
  );
}