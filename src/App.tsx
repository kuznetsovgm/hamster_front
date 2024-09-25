import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import { PublicLayout, PrivateLayout, PrivateRoute } from "@app/components"
import { ErrorBoundary } from "@core/components"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { LoginPage, LogoutPage, MyHamsterPage } from "@app/pages"
import { useAppSelector, useAppTheme, useDefaultAppThemeName } from "@app/hooks"
import { getAppThemeName } from "@app/store"
import { App as AppInterface } from "@app/interfaces"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { ErrorPage } from "@core/pages"
import { HamsterRegistrationPage } from "./modules/app/pages/hamsterRegistration"
import { HamsterRegistrationAdminPage } from "./modules/app/pages/hamsterRegistrationAdmin"
import { MiniGamePage } from "./modules/app/pages/miniGame"

const getRouter = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<PublicLayout />}>
          {/* any */}
          <Route>
            <Route path="mini-game" element={<MiniGamePage />} />
          </Route>

          {/* only anonimous */}
          <Route
            element={
              <PrivateRoute
                role={AppInterface.UserRole.ANON}
                exactRole
                ifWrongRoleRedirectTo={"/"}
              />
            }
          >
            <Route
              path="login"
              element={
                <PrivateRoute
                  element={<LoginPage />}
                  role={AppInterface.UserRole.ANON}
                  exactRole
                  ifWrongRoleRedirectTo={"/"}
                />
              }
            />
          </Route>
        </Route>
        <Route path="/" element={<PrivateLayout />}>
          {/* user */}
          <Route
            path="logout"
            element={
              <PrivateRoute
                element={<LogoutPage />}
                role={AppInterface.UserRole.USER}
                ifWrongRoleRedirectTo={"/login"}
              />
            }
          />
          <Route
            element={
              <PrivateRoute
                role={AppInterface.UserRole.USER}
                ifWrongRoleRedirectTo={"/login"}
              />
            }
          >
            <Route index element={<Navigate to={"hamster"} replace />} />
            <Route path="hamster" element={<MyHamsterPage />} />
            <Route path="hamster/add" element={<HamsterRegistrationPage />} />
          </Route>
          <Route
            element={
              <PrivateRoute
                role={AppInterface.UserRole.ADMIN}
                ifWrongRoleRedirectTo={"/login"}
              />
            }
          >
            <Route
              path="admin/create-hamster"
              element={<HamsterRegistrationAdminPage />}
            />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <ErrorPage
              code={404}
              text={"Запрашиваемой страницы не существует"}
            />
          }
        />
      </>,
    ),
  )

function App() {
  const themeName = useAppSelector(getAppThemeName)
  const defaultThemeName = useDefaultAppThemeName()
  const theme = useAppTheme(themeName ?? defaultThemeName)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ErrorBoundary>
          <RouterProvider router={getRouter()} />
        </ErrorBoundary>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
