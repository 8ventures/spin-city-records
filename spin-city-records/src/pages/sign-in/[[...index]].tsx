import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className='flex items-center justify-center'>
      <div className='container'>
        <div className='flex justify-center items-center h-screen'>
          <SignIn redirectUrl={'/'} />
        </div>
      </div>
    </div>
  );

export default SignInPage;