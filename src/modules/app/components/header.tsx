import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { FC } from "react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "."

interface IAppHeaderProps {}

export const AppHeader: FC<IAppHeaderProps> = (props) => {
  return (
    <>
      <AppBar position="sticky" sx={{ zIndex: 1300, mb: 2 }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              flexGrow: 2,
              alignItems: "center",
            }}
          >
            <Typography
              component={Link}
              to="/"
              variant="subtitle1"
              sx={(theme) => ({
                mr: 2,
                fontFamily: "cursive",
                fontWeight: 700,
                letterSpacing: ".2rem",
                textDecoration: "none",
                color: theme.palette.text.primary,
              })}
            >
              Hamster's Barber
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexGrow: 0,
            }}
          >
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}
