import React, { useState } from 'react';
import image1 from '../utils/charity5.webp';
import image2 from '../utils/charity2.jpg';
import image3 from '../utils/charity6.jpg';
import image4 from '../utils/charity10.webp';
const images = [image1, image2, image3,image4];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className='w-full max-w-[800px] h-full mx-auto p-4 flex flex-col items-center justify-center gap-2'>
      <div className='h-[400px] w-full my-2 overflow-hidden rounded-lg'>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className='w-full h-full object-cover transition-all duration-500'
        />
        <button
          onClick={goToPrevious}
          className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200 transition'
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200 transition'
        >
          ›
        </button>
      </div>
      <div className='flex justify-center mt-4'>
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 mx-1 rounded-full transition-all duration-500 ${currentIndex === index ? 'bg-black' : 'bg-gray-400'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      <span className='text-[16px] font-semibold'>"No one has ever become poor by giving." — Anne Frank</span>
    </div>
  );
};

export default Carousel;
