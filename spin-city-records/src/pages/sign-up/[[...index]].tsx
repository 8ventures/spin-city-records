import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className='flex items-center justify-center'>
      <div className='container'>
        <div className='flex justify-center items-center h-screen'>
          <SignUp />
        </div>
      </div>
    </div>
  )
}