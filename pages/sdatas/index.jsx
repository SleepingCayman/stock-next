import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Home({ sdatas }) {
  const { data: session } = useSession();

  function deleteSdata(id) {
    fetch(`/api/sdatas/suppliers/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload(false);
      });
  }

  return (
    <>
      <Head>
        <title>Supplier</title>
        <style jsx global>{`
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f2f5;
            margin: 0;
            padding: 0;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            background-color: white;
            margin-bottom: 1rem;
          }
          th,
          td {
            padding: 0.5rem;
            border: 1px solid #ddd;
          }
          th {
            background-color: #f7f7f7;
            font-weight: bold;
          }
          a {
            color: #0070f3;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          button {
            background-color: #f44336;
            border: none;
            color: white;
            padding: 0.5rem 1rem;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 14px;
            margin: 0 2px;
            cursor: pointer;
            border-radius: 4px;
          }
          button:hover {
            background-color: #e62e00;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem;
          }
        `}</style>
      </Head>
      <div className="container">
        <h1>Supplier Management</h1>
        <p style={{ margin: '0.4rem' }}>
          <Link href="/sdatas/add">+ New Supplier</Link>
        </p>
        <table>
          <thead>
            <tr>
              <th style={{ width: '10rem' }}>Supplier</th>
              <th style={{ width: '25rem' }}>Address</th>
              <th style={{ width: '7rem' }}>Phone</th>
              <th style={{ width: '15rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sdatas.map((sdata) => {
              return (
                <tr key={sdata._id}>
                  <td>
                    <Link href={`/sdatas/${sdata._id}`}>{sdata.supplier}</Link>
                  </td>
                  <td style={{ textAlign: 'center' }}>{sdata.address}</td>
                  <td>{sdata.phone}</td>
                  <td style={{ textAlign: 'right' }}>
                    <>
                      <Link href={`/sdatas/update/${sdata._id}`}>Update</Link>
                      &nbsp;&nbsp;&nbsp;
                      <button onClick={() => deleteSdata(sdata._id)}>Delete</button>
                    </>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr />
        <Link href="/">Home</Link>
        <p></p>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://stock-next-kappa.vercel.app/api/sdatas/suppliers/');
  const sdatas = await res.json();
  return { props: { sdatas } };
}



