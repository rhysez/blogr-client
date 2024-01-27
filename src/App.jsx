import { useState, useEffect } from 'react'
import Nav from './components/main/Nav'
import Hero from './components/main/Hero'
import Trending from './components/main/Trending'
import { useLocation } from "react-router-dom";


export default function App(props) {
  const location = useLocation();

  if (!props.apiResponse) {
    return <h1 style={{marginTop: '100px'}}>Loading...</h1>
  }
  
  return (
    <>
      <section className='gradient-box'>
        <Nav />
        <section className='hero-background'>
          <Hero latestPost={props.posts[0]} />
        </section>
      </section>
      <Trending posts={props.posts} />
    </>
  )
}

