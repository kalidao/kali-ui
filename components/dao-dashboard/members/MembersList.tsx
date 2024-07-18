import MemberCard from './MemberCard'
import { Member } from './types'

type Props = {
  members: Member[]
  active: Member
  setActive: React.Dispatch<React.SetStateAction<Member>>
}

export default function MembersList({ members, active, setActive }: Props) {
  // TODO: Add search
  return (
    <div className="flex flex-col space-y-2">
      {members.map((member) => (
        <MemberCard
          key={member?.address}
          member={member}
          active={member?.address === active?.address ? true : false}
          setActive={setActive}
        />
      ))}
    </div>
  )
}
