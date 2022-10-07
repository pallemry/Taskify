import React, { useEffect, useRef, useState } from 'react'
import { uuidv4 } from '../../../utils/utils';
import Headings from '../Headings/Headings';
import './Home.css'

type Props = {}

export default function Home({ }: Props) {


  
  return (
    <div id='home' className='whitebg'>
      <Headings 
        headers={['Build.', 'Develop.', 'Think again.']}
      />
    </div>
  )
}