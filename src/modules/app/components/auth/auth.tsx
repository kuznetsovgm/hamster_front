import { FC, useEffect } from "react"
import { CircularProgress, Typography } from "@mui/material"
import { useAppDispatch } from "@/modules/app/hooks"
import { setAuth, useAuthQuery } from "../../store"
import { App } from "../../interfaces"
import { t } from "i18next"

interface IProps {
  loginToken: string
}
const CHECK_AUTH_INTERVAL = 5000

export const Auth: FC<IProps> = ({ loginToken }) => {
  const dispatch = useAppDispatch()
  const { data: token, isError: isAuthError } = useAuthQuery(
    { body: { loginToken } },
    { pollingInterval: CHECK_AUTH_INTERVAL },
  )

  useEffect(() => {
    if (!!token) {
      dispatch(setAuth({ token, role: App.UserRole.USER }))
    }
  }, [token])

  if (isAuthError) {
    return <Typography color="error">{t("authorizationError")}</Typography>
  }

  return (
    <>
      <CircularProgress size={22} />
      &nbsp;&nbsp;
      <Typography color="info">{t("waitingForAuthoripation")}</Typography>
    </>
  )
}
