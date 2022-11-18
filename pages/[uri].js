import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
import { getPostByUri } from '../lib/test-data';
import { client } from '../lib/apollo';
import { gql } from '@apollo/client';
import Image from 'next/image';


export default function SlugPage({ post }) {

  return (
    <div>
      <Head>
        <title>Dinamalar News Detail</title>
        <link rel="icon" href="favicon.ico"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>

      <main>
        <div>
          <p>{post.content}</p>
        </div>  
      </main>

      <Footer />

    </div>
  )
}


export async function getStaticProps({ params }){
  const GET_POSTS_BY_URI = gql`
  query GetPostByURI($id: ID!) {
    post(id: $id, idType: URI) {
      title
      content
      date
      uri
      featuredImage {
        node {
          id
          sourceUrl
        }
      }
      author {
        node {
          firstName
        }
      }
      
    }
  
  }
  `
  const response = await client.query({
    query: GET_POSTS_BY_URI,
    variables: {
      id: params.uri
    }
  })

  const post = response?.data?.post
  return {
    props: {
      post
    }
  }
}



export async function getStaticPaths(){
    const paths = []
    return {
        paths,
        fallback: 'blocking'
    }
}
