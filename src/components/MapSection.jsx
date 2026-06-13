import React from 'react'

export default function MapSection() {
  return (
    <div className="w-full mt-10">
      <div className="h-64 md:h-96 rounded-lg overflow-hidden border border-dark-700">
        <iframe
          title="AD Location"
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8730732303316!2d-73.9851306845934!3d40.7590119793266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25854a7b82c11%3A0x3b6f7c9fbb0e2e2f!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1690000000000"
          style={{ border: 0, filter: 'grayscale(100%) contrast(80%) brightness(60%)' }}
          loading="lazy"
        />
      </div>
    </div>
  )
}
