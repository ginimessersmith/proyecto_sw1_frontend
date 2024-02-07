import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

async function esBlob(url) {
  try {
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

export const OutgoingMessage = ({ mensaje, fecha, hora }) => {
  const [contenido, setContenido] = useState(null);

  console.log("Mensaje Outgoing: ", mensaje);

  useEffect(() => {
    const obtenerContenido = async () => {
      const resultado = await esBlob(mensaje);
      console.log("Resultado Outgoing: ", resultado);
      setContenido(resultado);
    };

    obtenerContenido();
  }, [mensaje]);

  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        {contenido}
        <span className="time_date"> {fecha}| {hora && typeof hora !== 'string' ? hora.toString().substring(0, 5) : hora}
        </span>
      </div>
    </div>
  )
}

OutgoingMessage.propTypes = {
  mensaje: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  hora: PropTypes.string.isRequired,
}
