const PageTitle = ({ topTitle, title }) => {
  return (
    <div className="text-center">
      <p className="text-white text-base font-normal">{topTitle}</p>
      <h2
        style={{
          background:
            'linear-gradient(360deg, #FFFFFF 16.15%, rgba(255, 255, 255, 0.3) 140.1%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          letterSpacing: '-0.03em',

          textShadow: '0px 4px 20px rgba(255, 255, 255, 0.25)',
        }}
        className={`text-[35px] md:text-[40px] lg:text-[60px] pt-3 pb-10  custom-845:pb-20 `}
      >
        {title}
      </h2>
    </div>
  )
}

export default PageTitle
