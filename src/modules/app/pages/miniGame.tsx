import { Container } from "@mui/system"
import { FC } from "react"
import { Paper, Stack } from "@mui/material"
import { HamsterRegistration } from "../components/hamster/addHamster"
import { MiniGame } from "../components/miniGame/mini-game"

interface IProps {}

export const MiniGamePage: FC<IProps> = (props) => {
  return (
    <Container maxWidth={"lg"} disableGutters>
      <Paper elevation={3} sx={{ height: "100%" }}>
        <MiniGame />
      </Paper>
    </Container>
  )
}
