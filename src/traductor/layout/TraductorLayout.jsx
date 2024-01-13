import React, { useState } from "react";
import { ChatSelect } from "../components/ChatSelect";
import { InboxPeople } from "../components/SideInbox/InboxPeople";

export const TraductorLayout = ({children}) => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chatInfo) => {
    setSelectedChat(chatInfo);
  };

  return (
    <div className="messaging">
      <div className="inbox_msg">
          <InboxPeople onChatSelect={handleChatSelect}/>
          {
            selectedChat === null
            ? (<ChatSelect/>)
            : (React.cloneElement(children, { selectedChat }))
          }
      </div>
    </div>
  )
}
