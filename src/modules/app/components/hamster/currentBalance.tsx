import { FC } from "react"
import { Box, Typography } from "@mui/material"
import { Hamster } from "../../interfaces/hamster"
import { COIN_IMAGE } from "../constants/hamster"

interface IProps {
  hamster: Hamster.Hamster
}

export const CurrentBalance: FC<IProps> = ({ hamster }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 1,
      }}
    >
      <Box component={"img"} src={COIN_IMAGE} sx={{ height: "2rem" }} />
      <Typography variant="body1" fontWeight="bold">
        {Math.round(hamster.clickerUser?.balanceCoins ?? 0).toLocaleString()}
      </Typography>
    </Box>
  )
}
