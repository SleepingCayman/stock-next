import Head from "next/head"
import Link from "next/link"

// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Sdata({ sdata }) {
    console.log('sdata 2', sdata)
    if (!sdata) return (
      <div>
        <p>Sdata not found</p>
        <Link href="/sdatas">Back</Link>
        </div>
    );
  
    return (
      <>
        <Head>
          <title>{sdata.supplier}</title>
        </Head>
        <h1>{sdata.supplier}</h1>
        <p>{sdata.address}</p>
        <p>{sdata.phone}</p>
        <Link href="/sdatas">Back</Link>
      </>
    )
  }
  
  // STEP 1: This function will be executed at the server before loading the page.
  export async function getServerSideProps({ params }) {
    console.debug('params', params)
    const res = await fetch(`https://stock-final-6328420.vercel.app/api/sdatas/suppliers/${params.id}`)
    const sdata = await res.json()
    console.debug('sdata 1', sdata)
    return { props: { sdata } }
  }