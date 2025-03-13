import React from 'react'
import banner from '../assets/banners.jpg'

const Header = () => {
  return (
    <section className="max-container padding-x py-4  relative">
        <div className="w-full h-[300px] overflow-hidden rounded-lg">
            <img src={banner} className="w-full h-full object-cover rounded-lg"/>
        </div>
    </section>
  )
}

export default Header