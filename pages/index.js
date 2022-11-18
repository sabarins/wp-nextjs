import Head from 'next/head';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import { getAllPosts } from '../lib/test-data';
import { client } from "../lib/apollo";
import { gql } from "@apollo/client"
import Image from 'next/image'
import { useRouter } from 'next/router'

import Link from 'next/link'



export default function Home({ posts }) {

  const router = useRouter();
  
  return (
    <div className="containerr">
        
      <Head>
        <title>Dinamalar</title>
        <link rel="icon" href="favicon.ico"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Mukta Malar" />

      </Head>
      
      <mainn>

      <Image style={{ cursor: "pointer" }} src="https://img-dinamalar.gumlet.io/images/dmrenglishlogonew.png" alt="DMR Logo" width={200} height={51} />
        
        
    
        <div className="gridd">
          {
            posts.map((el)=>
            {
              console.log(el.uri);
              return(
                <div className='box'>
                  <div className='image'>
                    <Image src={"https://w.dinamalar.com"+el.featuredImage.node.sourceUrl} width="300px" height="150px" alt='storyimage' />
                  </div>
                  <div className='content'>
                    {/* <p onClick={()=>{router.push(`/${el.id}`)}}>{el.title}</p> */}
                    <Link href={el.uri}>{el.title}</Link>
                  </div>
                </div>
              )
            })           
           
          }
        </div>
        
      </mainn>
      
      <Footer></Footer>
    </div>
  )
}

export async function getStaticProps()
{
  const GET_POSTS =gql
  `
  query GetAllPosts {
    posts(first: 50, where: { orderby: { field: DATE, order: DESC } }) {      nodes {
        title
        content
        uri
        id
        link
        featuredImage {
          node {
            sourceUrl
          }
        }
        date
      }
    }
  }
  `
  
  const response = await client.query(
  {
    query : GET_POSTS
    
  })
 

  const posts = response?.data?.posts?.nodes


  return {
    props: {
      posts
    },
    revalidate: 1, 
    
  }
  
}
