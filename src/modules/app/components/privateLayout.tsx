import { Outlet } from "react-router-dom"
import { AppHeader } from "."
import { Box, Container } from "@mui/material"
import { Footer } from "./footer"

export const PrivateLayout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <AppHeader />
      <Container maxWidth={false}>
        <Box display="flex" justifyContent="center" height="100%">
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}
