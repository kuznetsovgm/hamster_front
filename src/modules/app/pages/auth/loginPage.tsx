import { Container } from "@mui/system"
import React, { FC } from "react"
import { Box, Paper } from "@mui/material"
import { Login } from "../../components/auth/login"

interface ILoginProps {}

export const LoginPage: FC<ILoginProps> = (props) => {
  return (
    <Container maxWidth={"xs"}>
      <Paper elevation={3}>
        <Box p={3}>
          <Login />
        </Box>
      </Paper>
    </Container>
  )
}
