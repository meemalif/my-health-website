import React from 'react'
import { testimonials } from '../config/testimonials'


function Testimonials() {
  return (
    <section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Testimonials</h2>
          <p class="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Explore the whole collection of open-source web components and elements built with the utility classes from Tailwind</p>
      </div> 
      <div class="grid mb-8 lg:mb-12 lg:grid-cols-2">
        {testimonials.slice(1,5).map((item)=>(

          <figure class="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
              <blockquote class="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{item.rating} stars rating</h3>
                  <p class="my-4">{item.description}</p>
              </blockquote>
              <figcaption class="flex justify-center items-center space-x-3">
                  <img class="w-9 h-9 rounded-full" src={item.avatar} alt="profile picture"/>
                  <div class="space-y-0.5 font-medium dark:text-white text-left">
                      <div>{item.name}</div>
                      <div class="text-sm font-light text-gray-500 dark:text-gray-400">{item.location}</div>
                  </div>
              </figcaption>    
          </figure>
        ))}
      </div>
      </div>
</section>
  )
}

export default Testimonials