import { Avatar, AvatarImage, AvatarFallback } from "../../../styles/Avatar"

export default function AvatarComponent({ ensAvatar }) {
  return (
    <Avatar>
        <AvatarImage src={ensAvatar?.image} alt="ENS Avatar" />
        <AvatarFallback delayMs={600}>K</AvatarFallback>
    </Avatar>
  )
}
