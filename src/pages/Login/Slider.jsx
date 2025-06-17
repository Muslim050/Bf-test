import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel.jsx'
import { sliderData } from '@/pages/Login/sliderData.js'
import { Card, CardContent } from '@/components/ui/card.jsx'
import React from 'react'
import Autoplay from 'embla-carousel-autoplay'

const Slider = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  )
  return (
    <Carousel
      opts={{ loop: true }} // <--- добавьте эту строку!
      plugins={[plugin.current]}
      className="w-full "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {sliderData.map((item, index) => (
          <CarouselItem
            key={index}
            className="pl-1 basis-1/3 rounded-2xl bg-transparent"
          >
            <Card>
              <CardContent className="flex h-auto items-center bg-transparent justify-center p-0 rounded-2xl">
                <video
                  src={item.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-auto rounded-2xl"
                ></video>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default Slider
