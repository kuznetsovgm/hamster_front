import { FC } from "react"
import { Link } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { t } from "i18next"

interface IProps {}

export const LogOut: FC<IProps> = () => {
  return (
    <Link component={RouterLink} to={"/logout"} color="secondary">
      {t("logout")}
    </Link>
  )
}
