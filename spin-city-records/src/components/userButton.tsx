import { UserButton } from "@clerk/nextjs";

export default function ManageUser() {
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}