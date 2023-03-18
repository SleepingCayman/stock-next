import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home({ sdatas }) {

  function deleteSdata(id) {
    fetch(`https://stock-final-6328420.vercel.app/api/sdatas/suppliers/${id}`,
      {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        // alert("Deleting " + id)
        window.location.reload(false);
      })

  }

  return (
    <>
      <Head>
        <title>Sdatas</title>
      </Head>
      <h1>Bdatas</h1>
      <table><tbody>
        {
          sdatas.map(sdata => {
            return (
              <tr key={sdata._id}>
                <td>
                  <Link href={`/sdatas/${sdata._id}`}>
                    {sdata.code}
                  </Link>
                </td>
                <td>
                  <button onClick={() => deleteSdata(sdata._id)}>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
      <p>
      </p>

    </>
  )
}
export async function getServerSideProps() {
  const res = await fetch(`https://stock-final-6328420.vercel.app/api/sdatas/suppliers/`)
  const sdatas = await res.json()
  // console.debug('stock 1', stock)
  return { props: { sdatas } }
}