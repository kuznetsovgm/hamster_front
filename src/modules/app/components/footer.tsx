import { Box, Container } from "@mui/material"
import { FC } from "react"

interface IProps {}
export const Footer: FC<IProps> = (props) => {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        minHeight: 100,
        display: "flex",
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        marginTop: 2,
        py: 4,
      })}
    >
      <Container maxWidth="xl">
      </Container>
    </Box>
  )
}
