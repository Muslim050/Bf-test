import React from 'react'
import { TooltipContent } from '@/components/ui/tooltip'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { hasRole } from '../../../utils/roleUtils'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

const NavItem = ({ item, open, setOpen }) => {
  const location = useLocation()
  const pathname = location.pathname
  const isActive = pathname === item.to
  const { textColor } = React.useContext(ThemeContext)

  const baseStyles =
    'flex items-center text-[#838383] text-base font-medium rounded-[14px] p-3.5 text-white '
  const activeStyles =
    'bg-[var(--bg-color)] border-[1px] border-[var(--bg-color)] '
  const inactiveStyles = 'hover:bg-[#FFFFFF0D] bg-transparent'

  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false)

  const toggleSubMenu = () => {
    // Только если sidebar открыт, позволяем открывать аккордеон
    if (open) {
      setIsSubMenuOpen(!isSubMenuOpen)
    }
  }

  const hasSubMenuAccess = item.subMenu?.some((subItem) =>
    hasRole(subItem.roles),
  )

  return (
    <div>
      {item.to ? (
        <Link
          to={item.to}
          className={`justify-between hover:scale-105 transition-all ${baseStyles} ${
            isActive ? activeStyles : inactiveStyles
          }`}
          onClick={item.accordion ? toggleSubMenu : null}
        >
          <div className="flex items-center relative ">
            {/*<item.icon className="text-white w-[26px] h-[26px]" />*/}
            <item.icon
              style={{ color: textColor }}
              className={` w-[26px] h-[26px]`}
            />

            {open ? (
              <span
                className={` ml-3.5 transition-opacity duration-500 ease-in-out ${
                  open ? 'opacity-100 visible' : 'opacity-0 invisible '
                }`}
                style={{
                  transitionDelay: open ? '0.3s' : '0s',
                  color: textColor,
                }}
              >
                {item.label}
              </span>
            ) : null}
          </div>
          {item.accordion &&
            (isSubMenuOpen ? (
              <ChevronUp style={{ color: textColor }} />
            ) : (
              <ChevronDown style={{ color: textColor }} />
            ))}

          {!open && (
            <TooltipContent side={'right'} className="ml-2" sideOffset={0}>
              <p className={`text-${textColor}`}>{item.label}</p>
            </TooltipContent>
          )}
        </Link>
      ) : (
        <div
          className={`justify-between hover:scale-105 transition-all ${baseStyles} ${
            isActive ? activeStyles : inactiveStyles
          }`}
          onClick={item.accordion ? toggleSubMenu : null}
        >
          <div className="flex items-center relative ">
            {/*<item.icon className="text-white w-[26px] h-[26px]" />*/}
            <item.icon
              style={{ color: textColor }}
              className={` w-[26px] h-[26px]`}
            />

            {open ? (
              <span
                className={` ml-3.5 transition-opacity duration-500 ease-in-out ${
                  open ? 'opacity-100 visible' : 'opacity-0 invisible '
                }`}
                style={{
                  transitionDelay: open ? '0.3s' : '0s',
                  color: textColor,
                }}
              >
                {item.label}
              </span>
            ) : null}
          </div>
          {item.accordion &&
            (isSubMenuOpen ? (
              <ChevronUp style={{ color: textColor }} />
            ) : (
              <ChevronDown style={{ color: textColor }} />
            ))}

          {!open && (
            <TooltipContent side={'right'} className="ml-2" sideOffset={0}>
              <p className={`text-${textColor}`}>{item.label}</p>
            </TooltipContent>
          )}
        </div>
      )}

      {item.accordion && isSubMenuOpen && open && hasSubMenuAccess && (
        <div className="ml-8 mt-2">
          {item.subMenu &&
            item.subMenu.map((subItem, index) => {
              const subItemHasAccess = hasRole(subItem.roles)
              return subItemHasAccess ? (
                <Link
                  key={index}
                  to={subItem.to}
                  className={`justify-between ${baseStyles} ${
                    isActive ? activeStyles : inactiveStyles
                  }`}
                >
                  {open ? (
                    <span
                      className={`transition-opacity duration-500 ease-in-out ${
                        open ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                      style={{
                        transitionDelay: open ? '0.3s' : '0s',
                        color: textColor,
                      }}
                    >
                      {subItem.label}
                    </span>
                  ) : null}
                </Link>
              ) : null
            })}
        </div>
      )}

      {/* )} */}
    </div>
  )
}

export default NavItem
