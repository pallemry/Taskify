import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getHeightBetweenNavbarAndScreenBottom, uuidv4 } from '../../../utils/utils';
import Headings from '../Headings/Headings';
import Login from '../../Login/MainComponent/Login';
import './Home.css'
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import { motion } from 'framer-motion'

type Props = {}

export default function Home({ }: Props) {
  const [ref, titlesRef] = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useLayoutEffect(() => {
    function updateHeight() {
      (titlesRef.current as HTMLElement).style.height = getHeightBetweenNavbarAndScreenBottom(20, 550) + 'px';
    }
    updateHeight();
    window.onresize = () => {
      updateHeight();

    }
  })

  return (
    <motion.div
      id='home'
      className='whitebg'
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div id='titles' ref={titlesRef}>
        <Headings
          labels={['Build.', 'Develop.', 'Deploy.']}
          className='headings'
        />
      </div>

      <Login />
    </motion.div>
  )
}