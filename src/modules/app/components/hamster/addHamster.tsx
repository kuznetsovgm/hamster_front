import { FC } from "react"
import { Alert, Box, CircularProgress, Grid } from "@mui/material"
import { useGetHamsterQuery } from "../../store"
import { Navigate } from "react-router-dom"
import { t } from "i18next"

interface IProps {}

export const HamsterRegistration: FC<IProps> = (props) => {
  const { data, isFetching } = useGetHamsterQuery({})

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (data) {
    return <Navigate to={"/hamster"} />
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        {/* <RtkHookForm
          mutationHook={useCreateHamsterMutation}
          actions={[{type: 'submit', text: t("submitHamsterButton")}]}
        >
          <TextFieldElement name="src" label="Url" required/>
        </RtkHookForm> */}
        <Alert variant="standard" color="warning">
          {t("registrationInManualModeAlert")}
        </Alert>
      </Grid>
    </Grid>
  )
}
