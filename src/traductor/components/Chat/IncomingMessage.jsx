import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

async function esBlob(url) {
  try {
    console.log("URL: ", url);
    const response = await fetch(url);
    const blob = await response.blob();
    // Si no hay errores, la URL probablemente representa un Blob
    console.log('Es un Blob:', blob.type);
    console.log(blob.type === "text/html")
    if (blob.type == "audio/webm") {
      return <audio src={url} controls></audio>;
    } else if (blob.type === "text/html") {
      return <p>{`${url}`}</p>
    }
  } catch (error) {
    // Si hay errores, la URL probablemente no representa un Blob
    console.log('No es un Blob:', error);
    return false;
  }
}

export const IncomingMessage = ({ mensaje, fecha, hora }) => {
  const [contenido, setContenido] = useState(null);

  /* console.log("Mensaje Incoming: ", mensaje);
  console.log("Fecha Incoming: ", fecha); */

  useEffect(() => {
    const obtenerContenido = async () => {
      /* console.log("Mensaje: ", mensaje); */
      const resultado = await esBlob(mensaje);
      console.log("Resultado Incommig: ", resultado);
      setContenido(resultado);
    };

    obtenerContenido();
  }, [mensaje]);


  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          {contenido}
          <span className="time_date"> {fecha}| {hora && typeof hora !== 'string' ? hora.toString().substring(0, 5) : hora}
          </span>
        </div>
      </div>
    </div>
  )
}
IncomingMessage.propTypes = {
  mensaje: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  hora: PropTypes.string.isRequired,
}
