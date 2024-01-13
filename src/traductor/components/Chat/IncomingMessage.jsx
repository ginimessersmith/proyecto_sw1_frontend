import React, { useEffect, useState }  from 'react'

async function esBlob(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      // Si no hay errores, la URL probablemente representa un Blob
      console.log('Es un Blob:', blob.type);
      console.log(blob.type === "text/html")
      if(blob.type == "audio/webm"){
        return  <audio src={url} controls></audio>;
      }else if(blob.type === "text/html"){
        return <p>{`${url}`}</p>
      }
    } catch (error) {
      // Si hay errores, la URL probablemente no representa un Blob
      console.log('No es un Blob:', error);
      return false;
    }
}

export const IncomingMessage = ({mensaje}) => {
    const [contenido, setContenido] = useState(null);

    useEffect(() => {
        const obtenerContenido = async () => {
          const resultado = await esBlob(mensaje);
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
                    <span className="time_date"> 11:01 AM | June 9</span>
                </div>
            </div>
        </div>
    )
}
