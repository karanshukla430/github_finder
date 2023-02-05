import React from 'react'

function About() {
  return (
    <div>
       <h1 className="text-6xl mb-4">Github Finder</h1>
      <p className='mb-4 text-2xl font-light'>
        A React app to search GitHub profiles and see profile details. This
        project is part of the React Front To Back.
      </p>
      <p className='text-lg text-white-400'>
        Version:  <span className='text-white-400'>1.0.0</span>
      </p>
      <p className='text-lg text-white-400'>
        Layout By: <a className='text-gray-200' href='https://linkedin.com/in/karan-shukla-b38395230
'> 
           Karan Shukla
        </a>
      </p>
    </div>
  )
}

export default About
