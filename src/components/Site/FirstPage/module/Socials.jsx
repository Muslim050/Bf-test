import { ArrowDownToDot } from 'lucide-react'
import {
  FacebookSvg,
  InstagramSvg,
  YoutubeSvg,
} from '@/assets/Site/site-svg.jsx'
const Socials = ({ socials1, socials2 }) => {
  return (
    <div className="sm:flex hidden   absolute bottom-20 w-full left-0  items-center justify-between px-3">
      <div className=" max-w-[1400px] w-full m-auto flex items-center justify-between">
        <div className="flex items-center gap-2" ref={socials1}>
          <h1
            className=""
            style={{
              background:
                'linear-gradient(360deg, #FFFFFF 16.15%, rgba(255, 255, 255, 0.3) 140.1%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              letterSpacing: '-0.03em',
              lineHeight: '20px',
              textShadow: '0px 4px 20px rgba(255, 255, 255, 0.25)',
            }}
          >
            Соц.сети:
          </h1>
          <FacebookSvg /> <InstagramSvg /> <YoutubeSvg />
        </div>
        <div
          ref={socials2}
          className="flex gap-2 "
          style={{
            background:
              'linear-gradient(360deg, #FFFFFF 16.15%, rgba(255, 255, 255, 0.3) 140.1%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            letterSpacing: '-0.03em',
            lineHeight: '20px',
            textShadow: '0px 4px 20px rgba(255, 255, 255, 0.25)',
          }}
        >
          Исследовать <ArrowDownToDot className="animate-bounce text-white" />
        </div>
      </div>
    </div>
  )
}

export default Socials
