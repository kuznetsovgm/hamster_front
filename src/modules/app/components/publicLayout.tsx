import { Outlet } from "react-router-dom"
import { AppHeader } from "."
import { Box } from "@mui/material"
import { Footer } from "./footer"

export const PublicLayout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="start"
      minHeight="100vh"
    >
      <AppHeader />
      <Outlet />
      <Footer />
    </Box>
  )
}
