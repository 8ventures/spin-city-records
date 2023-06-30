import { useRouter } from "next/router";
import Layout from "~/components/Layout/Layout";
import { api } from "~/utils/api";

export default function RegisterSeller() {
  const { mutate: createSeller, data }= api.sellers.create.useMutation();
  const router = useRouter()

  const handleClick = async () => {
    createSeller()
    const url = data
    if (url) {
      console.log('here')
      await router.push(url)
    } else {
      console.log('Unable to register')
    }
  }

  return (
    <Layout>
      <div className=' text-white'>We use Stripe to make sure you get paid on time and to keep your personal bank and details secure. Click <strong>Save and continue</strong> to set up your payments on Stripe</div>
      <button className="text-white" onClick={handleClick}>Save and Continue</button>
    </Layout>
  )
}
