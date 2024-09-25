import { FC } from "react"
import { Box, Typography } from "@mui/material"
import { Hamster } from "../../interfaces/hamster"
import { COIN_IMAGE } from "../constants/hamster"
import { formatNumber } from "../../utils/number"

interface IProps {
  hamster: Hamster.Hamster
}

export const EarnPerHour: FC<IProps> = ({ hamster }) => {
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
      <Box component={"img"} src={COIN_IMAGE} sx={{ height: "1.3rem" }} />
      <Typography variant="body1" fontWeight="bold">
        +
        {formatNumber(Math.round(hamster.clickerUser?.earnPassivePerHour ?? 0))}
      </Typography>
    </Box>
  )
}
