import { Grid } from '@mui/material';
import '../../../css/chat.css';
import { SidebarChat } from "./SidebarChat";
import { useEffect, useState } from 'react';
import traslateApi from '../../../api/traslateApi';

export const SideBar = ({onChatSelected}) => {
  const [chats, setChats] = useState([]);

  const obtenerChats = async () => {
    const {data} = await traslateApi.get(`/chat/chat_list_uid_usuario/${localStorage.getItem('uid')}`) 
    setChats(data);
    console.log(data);
  }

  useEffect(() => {
    obtenerChats()
  }, [])
  
  const [clicked, setClicked] = useState(null);

  const handleClick = (id) => {
    setClicked(id);
    onChatSelected(id)
  };
  return (
    <Grid className="inbox_chat">

        {
            chats.map( (chat) => (
              <Grid item xs={12} key={chat.uid}>
                  <SidebarChat 
                    chat={chat}
                    handleClick={() => handleClick(chat.uid)}
                    clicked={clicked}
                  />
              </Grid>
            ))
        }


        {/* <!-- Espacio extra para scroll --> */}
        <div className="extra_space"></div>


    </Grid>
  )
}
