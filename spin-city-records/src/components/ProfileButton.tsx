import { UserButton } from "@clerk/nextjs";

export default function ProfileButton() {
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}