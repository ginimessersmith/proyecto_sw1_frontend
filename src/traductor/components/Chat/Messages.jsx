import React, { useEffect, useState } from 'react'
import { SendMessage, IncomingMessage, OutgoingMessage } from './'
import { useAuthStore } from '../../../hook/useAuthStore';
import traslateApi from '../../../api/traslateApi';

export const Messages = ({ selectedChat }) => {

    // console.log(selectedChat);
    const uid = localStorage.getItem('uid')
    const { user } = useAuthStore();
    const [userId] = useState(user.id);
    const [mensaje, setMensaje] = useState([]);
    const [mensajeEnviado, setMensajeEnviado] = useState('');
    console.log('Me ejecute otra vez')
    console.log(selectedChat)
    console.log("User: ", userId);

    const obtenerChats = async () => {
        //* cambios:
        const { data } = await traslateApi.post('/chat/mensajes_de_un_chat/', {
            uid_chat: selectedChat,
            uid_usuario: uid,
        });
        setMensaje(data.listaMensajes)
        console.log("Mensajes: ", data.listaMensajes);
    }
    useEffect(() => {

        obtenerChats();
        console.log(selectedChat)

    }, [mensajeEnviado])

    // const msgs = {
    //     listaChatEmisor: [
    //         {
    //             uid:'893yhfn398h83u2f1',
    //             emisor: {
    //                 uid: '084cc118-2a30-4ad9-ba13-e07b26e50cc3',
    //                 fullname: 'Ginno Baptista',
    //                 correo_electronico: 'gino@correo',
    //                 mensaje: 'holi',
    //             },
    //         },
    //         {
    //             uid:'893yhfn39dfeg3u2f',
    //             emisor: {
    //                 uid: '084cc118-2a30-4ad9-ba13-e07b26e50cc4',
    //                 fullname: 'Gabriel Diaz',
    //                 correo_electronico: 'gino@correo',
    //                 mensaje: 'holi',
    //             },
    //         },
    //         {
    //             uid:'893yhfnh443u2f3',
    //             emisor: {
    //                 uid: '084cc118-2a30-4ad9-ba13-e07b26e50cc5',
    //                 fullname: 'Ginno Baptista',
    //                 correo_electronico: 'gino@correo',
    //                 mensaje: 'como estas?',
    //             },
    //         }
    //     ]
    // };
    async function esBlob(url) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            // Si no hay errores, la URL probablemente representa un Blob
            console.log('Es un Blob:', blob.type);
            console.log(blob.type === "text/html")
            if (blob.type == "audio/webm") {
                return 'audio';
            } else if (blob.type === "text/html") {
                return 'texto'
            }
        } catch (error) {
            // Si hay errores, la URL probablemente no representa un Blob
            console.log('No es un Blob:', error);
            return false;
        }
    }

    const handleSend = async (mensaje) => {
        // Lógica para manejar el envío del mensaje
        // Puedes almacenar el mensaje en el estado o hacer cualquier otra lógica necesaria
        if (mensaje.type !== undefined) {
            const url = URL.createObjectURL(mensaje);
            setMensajeEnviado(url);
            const formData = new FormData();
            formData.append('archivo', mensaje, `audio${uid}.webm`);
            formData.append('mensaje', '');  // Puedes ajustar esto según tus necesidades
            formData.append('uid_chat', selectedChat);
            formData.append('uid_usuario', uid);
            await traslateApi.post(`/chat/enviar_audio_chat`, formData, {
                headers: {
                    'x-token': localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data',
                    // Otros encabezados según sea necesario
                },
            })

        } else if (mensaje.type === undefined) {
            setMensajeEnviado(mensaje);
            await traslateApi.post(`/chat/crear_mensaje_agregar_al_chat`, {
                mensaje: mensaje,
                uid_chat: selectedChat,
                uid_usuario: uid,
            }, {
                headers: {
                    'x-token': localStorage.getItem('token'),
                    // Otros encabezados según sea necesario
                },
            })
        }
        // const resultado = await esBlob(mensaje);
        // console.log(resultado)
        // if(resultado === 'audio'){
        //     // const url = URL.createObjectURL(mensaje);
        //     // setMensajeEnviado(url);
        //     // await traslateApi.post(`/chat/enviar_audio_chat`,{
        //     //     mensaje: '',
        //     //     uid_chat: selectedChat,
        //     //     uid_usuario: uid,
        //     // },{
        //     //     headers: {
        //     //         'x-token': localStorage.getItem('token'),
        //     //         // Otros encabezados según sea necesario
        //     //     },
        //     // })
        // }else if(resultado === 'texto'){
        //     setMensajeEnviado(mensaje);
        //     await traslateApi.post(`/chat/crear_mensaje_agregar_al_chat`,{
        //         mensaje: mensaje,
        //         uid_chat: selectedChat,
        //         uid_usuario: uid,
        //     },{
        //         headers: {
        //             'x-token': localStorage.getItem('token'),
        //             // Otros encabezados según sea necesario
        //         },
        //     })
        // }

    };

    return (
        <div className="mesgs">

            {/* <!-- Historia inicio --> */}
            <div className="msg_history">
                {
                    mensaje.map((msg, index) => (
                        <React.Fragment key={msg.uid_mensaje}>
                            {(msg.uid_usuario === uid) ? (
                                /* console.log("Outgoing: ", msg.mensaje), */
                                console.log("Fecha: ", msg.fecha, "Hora: ", msg.hora),
                                <OutgoingMessage mensaje={msg.mensaje} fecha={msg.fecha} hora={msg.hora}/>
                            ) : (
                                /* console.log("Incoming: ", msg.mensaje), */
                                <IncomingMessage mensaje={msg.mensaje} fecha={msg.fecha} hora={msg.hora} />
                            )}
                        </React.Fragment>
                    ))
                }

                {mensajeEnviado != '' ? <OutgoingMessage key={5} mensaje={mensajeEnviado} /> : ''}

            </div>
            {/* <!-- Historia Fin --> */}

            <SendMessage onSend={handleSend} />

        </div>


    )
}
