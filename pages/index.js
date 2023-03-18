import Head from "next/head";
import Link from "next/link";
import LoginButton from "../components/login-btn";

export default function Home() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#00f',
    marginRight: '1rem',
    marginLeft: '1rem',
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>HONGZHEN CHEN Page</title>
      </Head>
      <h1>HONGZHEN CHEN Page</h1>
      <div>
        <LoginButton />
      </div>
      <p>This is sipplier page choice.</p>

      <div>
        <Link href="/about" passHref>
          <span style={linkStyle}>Supplier</span>
        </Link> |
        <Link href="/sdatas" passHref>
          <span style={linkStyle}>Supplier Management</span>
        </Link>
      </div>
    </div>
  );
}
