import Phone from '@/assets/Site/FirstPage/Phone.png'
import Phonebg from '@/assets/Site/FirstPage/HandWithPhone.svg'
import Gradient from '@/assets/Site/FirstPage/Gradient.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'tailwindcss/tailwind.css'
import LazyVideo from './module/LazyVideo'
import CartUnderVideo from './module/CartUnderVideo'

import { Pagination, Navigation, Autoplay } from 'swiper/modules'

const PhoneComponent = ({ isSecondPage, phoneRef, phoneWRef, sliderData }) => {
  return (
    <div
      ref={phoneRef}
      className={`relative flex ${isSecondPage && 'custom-1100:hidden'}`}
      id="second-page"
    >
      <div
        ref={phoneWRef}
        className={`
              
              isSecondPagePhone relative  flex  bottom-[-120%] justify-between w-full md:left-[-38px] left-[-35px]`}
      >
        <img
          src={Phone}
          alt="Phone"
          draggable="false"
          className="md:w-auto h-auto w-[330px]"
        />
        <img
          src={Phonebg}
          alt="Phone Background"
          className="absolute -z-10 top-[0px] right-[1px] w"
          draggable="false"
        />
        <img
          src={Gradient}
          className="absolute -bottom-10 w-full z-10"
          alt=""
        />
      </div>

      <div
        className={`fixed top-[135%] z-10 md:left-[183px] left-[164px]  transform -translate-x-1/2 w-full max-w-[1240px]`}
      >
        <div
          className={`w-auto slider-container  ${
            isSecondPage && 'custom-1100:hidden'
          }`}
        >
          {isSecondPage ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              centeredSlides={true}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className="mySwiper"
              onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            >
              {sliderData
                .filter((_, index) => index === activeSlide)
                .map((slide, index) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative md:w-[205px] w-[180px]  h-[300px]">
                      <div className="flex items-center justify-center flex-col slide border-0 mx-auto">
                        <LazyVideo src={slide.image} />
                      </div>
                      <div
                        className={`absolute bottom-0 w-full
                      flex items-center justify-center slide
                     
                    `}
                      >
                        <div className={`relative  h-full w-full top-[-60px]`}>
                          <CartUnderVideo slide={slide} />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default PhoneComponent
