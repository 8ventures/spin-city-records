import { UserButton } from "@clerk/nextjs";

export default function ManageUser() {
  return (
    <div>
      Another Test
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}