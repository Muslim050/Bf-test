import Cookies from 'js-cookie'

export const hasRole = (requiredRoles) => {
  const role = Cookies.get('role')
  return requiredRoles.includes(role)
}
