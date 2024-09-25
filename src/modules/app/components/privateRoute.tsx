import { Navigate, Outlet, Path, To, useLocation } from "react-router-dom"
import { useAuth } from "@app/hooks"
import { ErrorPage } from "@core/pages"
import { App } from "../interfaces"

interface IPrivateRouteProps {
  role: App.UserRole
  exactRole?: boolean
  ifWrongRoleRedirectTo?: To
}
interface IPrivateRouteChildrenProps extends IPrivateRouteProps {
  children?: React.ReactElement
}
interface IPrivateRouteElementProps extends IPrivateRouteProps {
  element?: React.ReactElement
}
type PrivateRouteProps = IPrivateRouteChildrenProps | IPrivateRouteElementProps

export function PrivateRoute({
  ifWrongRoleRedirectTo: redirectTo,
  role = App.UserRole.ANON,
  exactRole = false,
  ...props
}: PrivateRouteProps) {
  const auth = useAuth()

  if (role > auth.role || (exactRole && role !== auth.role)) {
    if (redirectTo) {
      let to: Partial<Path>
      if (typeof redirectTo === "string") {
        to = {
          pathname: redirectTo,
        }
      } else {
        to = {
          ...redirectTo,
        }
      }
      console.log(`navigate to ${to.pathname}`)
      return <Navigate to={to} />
    }
    return (
      <ErrorPage code={403} text="Недостаточно прав для просмотра страницы" />
    )
  }

  const element = ("children" in props && props.children) ||
    ("element" in props && props.element) || <Outlet />
  return element
}
