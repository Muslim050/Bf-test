import {cn} from "@/lib/utils.js";
import {ButtonSvg, LogoutSvg} from "@/assets/SidebarsIcons-ui.jsx";
import {ArrowRight, Palette} from "lucide-react";
import Logo from "@/assets/Sidebarcopy/logo.png";
import Nav from "@/components/module/Sidebar/Nav.jsx";
import {menuItems} from "@/components/module/Sidebar/MenuItems.js";
import {Separator} from "@/components/ui/separator.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {CirclePicker} from "react-color";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.jsx";
import {Tooltip, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import React from "react";
import {ThemeContext} from "@/utils/ThemeContext.jsx";
import {logout} from "@/redux/auth/authSlice.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const SidebarNew = ({isCollapsed,setIsCollapsed}) => {
  const { bgColor, setBgColor, textColor } = React.useContext(ThemeContext)
  const navigate = useNavigate()
  const colors = [
    '#172841',
    '#090E35',
    '#353535',
    '#417878',
    '#61936F',
    '#A5A0CF',
  ]
  const handleColorChange = (color) => {
    setBgColor(color.hex)
  }
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }


  return (
    <div
      className={cn(
        'border_container glass-background rounded-[22px] transition-all duration-300 ease-in-out w-auto h-full',
        isCollapsed ? 'sidebar-container' : ' sidebar-container-open',
        'relative sm:h-[100%] sidebar-container' // Добавлено для мобильного отображения
      )}
    >
        <div
          onClick={() => setIsCollapsed (!isCollapsed)}
          className={`flex absolute z-40 cursor-pointer  w-7 text-white 
            rounded-full  ${
            isCollapsed ? 'right-[-25.5px] top-4 ' : '-right-[3.5px] top-4'
          }`}
        >
          <ButtonSvg
            className={` top-0 left-0 text-white absolute h-[90px] ${
              isCollapsed
                ? 'right-[20px] -top-8 rotate-180'
                : 'right-[25px] -top-8 rotate-0'
            }`}
          />
          <ArrowRight
            style={{color: textColor}}
            className={` top-0 left-0 text-white absolute w-5 ${
              isCollapsed
                ? 'ml-0.5 top-9 rotate-0'
                : 'ml-0.5 top-8 rotate-180'
            }`}
          />
        </div>
        <div className='flex flex-col justify-between h-full  '>
          <div>
            <div className="gap-x-4  items-center p-2 flex ">
              <div className="flex items-center">
                <div
                  className={`${!isCollapsed ? 'w-[56px] h-[56px]' : ' w-[48px] h-[48px]'} relative  rounded-full bg-[var(--bg-color)]`}></div>
                <img
                  loading="lazy"
                  src={Logo}
                  className={`absolute ${!isCollapsed ? ' left-[14px]' : ' left-[10px]'}`}
                  alt="adsad"
                  width={49}
                  height={49}
                />
              </div>

              {!isCollapsed && (
                <div
                  className={`font-bold text-[16px]  transition-opacity duration-300 ${
                    !isCollapsed ? 'opacity-100 pr-6' : 'opacity-0'
                  }`}
                >
                  Brandformance
                </div>
              )}
            </div>
            <Nav isCollapsed={isCollapsed} links={menuItems} handleLogout={handleLogout}/>

            <Separator className='hidden sm:flex '/>

          </div>


          <div className='pb-3 hidden sm:flex  flex-col gap-0.5'>
            <div className='flex  flex-col justify-center  px-2'>
              <Popover>
                <PopoverTrigger
                  asChild
                  className='group hover:random-bg  rounded-[12px] hover:scale-105 transition-all h-[50px] cursor-pointer'
                >
                  <div
                    className={`flex items-center  relative hover px-2 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>

                    <Palette style={{color: textColor}} className='text-center'/>
                    {!isCollapsed ? (
                      <span
                        className={`ml-2.5 transition-opacity duration-500 ease-in-out  ${
                          !isCollapsed ? 'opacity-100 visible' : 'opacity-0 invisible '
                        }`}
                        style={{
                          transitionDelay: !isCollapsed ? '0.3s' : '0s',
                          color: textColor,
                        }}
                      >
                      Сменить тему
                    </span>
                    ) : null}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 rounded-[22px] bg-white bg-opacity-30 backdrop-blur-md">
                  <h4
                    style={{color: textColor}}
                    className={`pb-4 font-medium leading-none  border-b-[#F9F9F926] border-b`}
                  >
                    Сменить тему
                  </h4>{' '}
                  <div className="relative">
                    <CirclePicker
                      colors={colors}
                      onChangeComplete={handleColorChange}
                      circleSize={30}
                      circleSpacing={10}
                      width="240px"
                      color={bgColor} // Пропс для выделения выбранного цвета
                      className="pt-4 relative"
                    />
                  </div>
                </PopoverContent>
              </Popover>{' '}
            </div>
            {/*Выход*/}
            <div className='flex flex-col justify-end px-2 min-h-[50px]'>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div
                    className=' group py-3 px-3 bg-red-600  hover:bg-red-400 rounded-[12px] hover:scale-105 transition-all h-full cursor-pointer'

                    // className={`hover:scale-105 transition-all ${baseStyles} hover:${inactiveStyles} group hover:text-red-500 hover:bg-red-200 cursor-pointer`}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center relative ">
                          <LogoutSvg className="w-[26px] h-[26px] text-white"/>
                          {!isCollapsed ? (
                            <span
                              className={`ml-1.5 transition-opacity duration-500 ease-in-out text-white  ${
                                !isCollapsed
                                  ? 'opacity-100 visible'
                                  : 'opacity-0 invisible'
                              }`}
                              style={{
                                transitionDelay: !isCollapsed ? '0.3s' : '0s',
                              }}
                            >
                            Выход
                          </span>
                          ) : null}
                        </div>
                      </TooltipTrigger>

                    </Tooltip>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">
                      Выйти из системы Brandformance
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-white">
                      Вы точно хотите выйти?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-white w-[100px]">
                      Нет
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-400 w-[100px]"
                    >
                      Да
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            {/*Выход*/}
          </div>
        </div>

    </div>
  )

}


export default SidebarNew