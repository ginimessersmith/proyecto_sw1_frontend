import { Searchbox } from "./Searchbox"
import { SideBar } from "./SideBar"

export const InboxPeople = ({onChatSelect}) => {
    return (
        <div className="inbox_people">

            <Searchbox />

            <SideBar onChatSelected={onChatSelect}/>

        </div>
    )
}