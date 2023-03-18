import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Home({ sdatas }) {
  const { data: session } = useSession();

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
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem;
          }
        `}</style>
      </Head>
      <div className="container">
        <h1>Supplier </h1>
        <p style={{ margin: '0.4rem' }}>
          <Link href="/sdatas/add">+ New Supplier</Link>
        </p>
        <table>
          <thead>
            <tr>
              <th style={{ width: '10rem' }}>Supplier</th>
              <th style={{ width: '25rem' }}>Address</th>
              <th style={{ width: '7rem' }}>Phone</th>
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
  const res = await fetch('https://stock-final-6328420.vercel.app/api/sdatas/suppliers/');
  const sdatas = await res.json();
  return { props: { sdatas } };
}
