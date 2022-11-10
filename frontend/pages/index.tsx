import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Menu from '../components/Menu'
import Footer from '../components/Footer';
import Image from 'next/image';
import pepe from '../images/wutface.png';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
      <title>MemH - Memes Against Humanity</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <Menu/>
  
        <div className='container' >
          <div className='containerLeft'>
            <div id='shadowBox'>
          <h1 className={styles.title}>
          <b className="gradient-text">MemH</b> <br/>{' '}
          
        </h1>
        <h5 className={styles.title}>
          <b className="gradient-text2">Memes against humanity</b> <br/>{' '}
          
        </h5>
        </div>
        <div className={styles.description}>
        
        </div>
          </div>
          <div className='containerRight p-3'>
          
            <Image
            src={pepe}
            width={300}
            height = {300}
            alt =''
            layout="responsive" 
            id='responsiveImg'
            ></Image>
          </div>
          
        </div>
        <Footer/>
      </main>

     
    </div>
  );
};

export default Home;
