const CartUnderVideo = ({ slide }) => {
  return (
    <div
      className="w-full  md:p-3 p-1.5 text-start "
      style={{
        background:
          'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), #020308',
        border: '0.5px solid rgba(255, 255, 255, 0.1)',
        boxShadow:
          'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
        borderRadius: '12px',
      }}
    >
      <div className=" leading-3	 text-[8px] text-white">{slide.title}</div>

      <div className="flex gap-1 mt-2 mb-2 justify-between">
        <div
          className="w-full flex justify-center"
          style={{
            background:
              'linear-gradient(180deg, rgba(2, 3, 8, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
            border: '0.5px solid rgba(255, 255, 255, 0.1)',
            boxShadow:
              'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(6px)',
            borderRadius: '500px',
          }}
        >
          <div className="text-[4px] md:text-[6px]  leading-[9px]		 text-white flex items-center gap-1 p-1">
            {slide.view}
          </div>
        </div>

        <div
          className="w-fit "
          style={{
            background:
              'linear-gradient(180deg, rgba(2, 3, 8, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
            border: '0.5px solid rgba(255, 255, 255, 0.1)',
            boxShadow:
              'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(6px)',
            borderRadius: '500px',
          }}
        >
          <div className="text-[4px] md:text-[6px] leading-[9px]		 text-[#ffffff70] flex items-center gap-1 p-1">
            <svg
              width="8"
              height="9"
              viewBox="0 0 8 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M4.29602 2.45996H1.70268C1.13268 2.45996 0.666016 2.92662 0.666016 3.49662V7.28329C0.666016 7.76663 1.01268 7.97329 1.43601 7.73662L2.74601 7.00662C2.88601 6.92996 3.11268 6.92996 3.24935 7.00662L4.55935 7.73662C4.98268 7.97329 5.32935 7.76663 5.32935 7.28329V3.49662C5.33268 2.92662 4.86602 2.45996 4.29602 2.45996Z"
                fill="white"
              />
              <path
                d="M7.33268 2.20365V5.99033C7.33268 6.47366 6.98602 6.67699 6.56268 6.44365L5.33268 5.75699V3.49699C5.33268 2.92699 4.86602 2.46033 4.29602 2.46033H2.66602V2.20365C2.66602 1.63365 3.13268 1.16699 3.70268 1.16699H6.29602C6.86602 1.16699 7.33268 1.63365 7.33268 2.20365Z"
                fill="white"
              />
            </svg>
            Save
          </div>
        </div>

        <div
          className="w-fit "
          style={{
            background:
              'linear-gradient(180deg, rgba(2, 3, 8, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
            border: '0.5px solid rgba(255, 255, 255, 0.1)',
            boxShadow:
              'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(6px)',
            borderRadius: '500px',
          }}
        >
          <div className="text-[4px] md:text-[6px] leading-[9px]		 text-[#ffffff70] flex items-center gap-1 p-1">
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M2.86948 2.48708L5.87615 1.48375C7.22615 1.03375 7.95948 1.77042 7.51281 3.12042L6.50948 6.12708C5.83615 8.15042 4.72948 8.15042 4.05615 6.12708L3.75948 5.23375L2.86615 4.93708C0.846146 4.26708 0.846146 3.16375 2.86948 2.48708Z"
                fill="white"
              />
              <path
                d="M4.53906 4.37685L5.80906 3.10352L4.53906 4.37685Z"
                fill="white"
              />
              <path
                d="M4.54018 4.62699C4.47685 4.62699 4.41352 4.60366 4.36352 4.55366C4.26685 4.45699 4.26685 4.29699 4.36352 4.20033L5.63018 2.92699C5.72685 2.83033 5.88685 2.83033 5.98352 2.92699C6.08018 3.02366 6.08018 3.18366 5.98352 3.28033L4.71685 4.55366C4.66685 4.60033 4.60352 4.62699 4.54018 4.62699Z"
                fill="white"
              />
            </svg>
            Share
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartUnderVideo
