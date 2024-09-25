import { Container } from "@mui/system"
import { FC } from "react"
import { Box, Paper, Stack } from "@mui/material"
import { Hamster, HamsterLog } from "../components"
import { LogOut } from "../components/auth/logOut"

interface IProps {}

export const MyHamsterPage: FC<IProps> = (props) => {
  return (
    <Container maxWidth={"sm"} disableGutters>
      <Paper elevation={3}>
        <Stack p={3} spacing={2}>
          <Hamster />
          <HamsterLog />
        </Stack>
        <Box display="flex" justifyContent="center" py={3}>
          <LogOut />
        </Box>
      </Paper>
    </Container>
  )
}
