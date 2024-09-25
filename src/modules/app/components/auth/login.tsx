import { FC, useState } from "react"
import { Box, Button, CircularProgress, Stack } from "@mui/material"
import { Auth } from "./auth"
import { useLoginQuery } from "../../store"
import { t } from "i18next"

interface IProps {}

export const Login: FC<IProps> = (props) => {
  const [needCheckAuth, setNeedCheckAuth] = useState(false)
  const {
    data: loginUrl,
    isFetching: isLoginUrlFetching,
    isError: isLoginUrlError,
  } = useLoginQuery({})

  if (isLoginUrlFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress color="primary" />
      </Box>
    )
  }

  return (
    <Stack>
      <Box display="flex" justifyContent="center">
        <Button
          href={`https://t.me/${loginUrl?.botUsername}?start=${loginUrl?.loginToken}`}
          target="_blank"
          rel="noreferrer"
          color="primary"
          variant="contained"
          onClick={() => setNeedCheckAuth(true)}
        >
          {t("telegramLogin")}
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        {needCheckAuth && <Auth loginToken={loginUrl?.loginToken ?? ""} />}
      </Box>
    </Stack>
  )
}
