import { FC, useState } from "react"
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
} from "@mui/material"
import { useGetHamsterQuery } from "../../store"
import { Navigate } from "react-router-dom"
import { UpdateHamster } from "./updateHamster"
import { Settings } from "@mui/icons-material"
import { HamsterCircle } from "./hamsterCircle"
import { CurrentBalance } from "./currentBalance"
import { TotalCoins } from "./totalCoins"
import { LastSyncDate } from "./lastSyncDate"
import { EarnPerHour } from "./earnPerHour"

interface IProps {}

export const Hamster: FC<IProps> = (props) => {
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const { data, isFetching, isError } = useGetHamsterQuery(
    {},
    {
      pollingInterval: 300000,
    },
  )

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (isError) {
    return <Navigate to={"/logout"} />
  }

  if (!data) {
    return <Navigate to={"/hamster/add"} />
  }

  return (
    <Grid container gap={1}>
      <Grid item xs={12}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <LastSyncDate hamster={data} />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            sx={(theme) => ({
              backgroundColor: "#ffffff26",
              px: 2,
              borderRadius: 5,
            })}
          >
            <EarnPerHour hamster={data} />
            <Divider orientation="vertical" sx={{ ml: 2, mr: 1 }} />
            <IconButton onClick={() => setShowSettings(!showSettings)}>
              <Settings />
            </IconButton>
          </Box>
        </Box>
        {showSettings && (
          <Box mb={2}>
            <UpdateHamster settings={data.settings} isActive={data.isActive} />
          </Box>
        )}
      </Grid>
      {data?.clickerUser && (
        <>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <HamsterCircle hamster={data} />
              <CurrentBalance hamster={data} />
              <TotalCoins hamster={data} />
            </Stack>
          </Grid>
        </>
      )}
    </Grid>
  )
}
