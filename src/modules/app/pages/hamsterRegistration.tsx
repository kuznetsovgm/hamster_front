import { Container } from "@mui/system"
import { FC } from "react"
import { Paper, Stack } from "@mui/material"
import { HamsterRegistration } from "../components/hamster/addHamster"

interface IProps {}

export const HamsterRegistrationPage: FC<IProps> = (props) => {
  return (
    <Container maxWidth={"sm"} disableGutters>
      <Paper elevation={3}>
        <Stack p={3}>
          <HamsterRegistration />
        </Stack>
      </Paper>
    </Container>
  )
}
