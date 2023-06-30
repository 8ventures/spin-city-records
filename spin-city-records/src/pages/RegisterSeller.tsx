import { useRouter } from "next/router";
import Layout from "~/components/Layout/Layout";
import { api } from "~/utils/api";

export default function RegisterSeller() {
  const { mutate: createSeller, data: url, isSuccess }= api.sellers.create.useMutation();
  const router = useRouter()

  const handleClick = () => {
    createSeller()
    if (isSuccess && url) {
      console.log('here')
      router.push(url).catch((e) => console.log(e))
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
