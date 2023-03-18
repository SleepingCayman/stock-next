import Head from "next/head"
import Link from "next/link"

import { useState } from "react";
import { useForm } from "react-hook-form";



// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Sdata({ sdata }) {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");


  const updateSdata = async (data) => {
    const response = await fetch(`/api/sdatas/suppliers/${sdata._id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // serialisation
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const result = await response.json();   // deserialise
    if (result.error) {
      alert("Error: " + result.error)
    } else {
      alert("Sdata updated")
      window.location.href = "/sdatas"
    }
    console.log(result)
    setData(JSON.stringify(data))
  }

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
        <title>Update {sdata.supplier}</title>
      </Head>

      <div style={{ margin: '1rem' }}>
        <form onSubmit={handleSubmit(updateSdata)}>
          <h1>Update Sdata</h1>
          <label htmlFor="supplier">Supplier</label><br />
          <input id="supplier" {...register("supplier", { required: true })} 
          placeholder="Sdata supplier" 
          defaultValue={data.supplier}
          /><br />

          <label htmlFor="address">Address</label><br />
          <textarea id="address" {...register("address")} placeholder="address" 
          defaultValue={sdata.address}/><br />

          <label htmlFor="phone">Phone</label><br />
          <textarea id="phone" {...register("phone")} placeholder="PHONE NUMBER" 
          defaultValue={sdata.phone}/><br />
          <input type="submit" />
          <p>{data}</p><br />
        </form>
      </div>

      <Link href="/sdatas">Back</Link>
    </>
  )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res = await fetch(`https://stock-next-kappa.vercel.app/api/sdatas/suppliers/${params.id}`)
  const sdata = await res.json()
  console.debug('sdata 1', sdata)
  return { props: { sdata } }
}