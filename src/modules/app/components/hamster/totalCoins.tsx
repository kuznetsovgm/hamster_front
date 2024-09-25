import { FC } from "react"
import { Box, Typography } from "@mui/material"
import { Hamster } from "../../interfaces/hamster"
import { t } from "i18next"
import { formatNumber } from "../../utils/number"

interface IProps {
  hamster: Hamster.Hamster
}

export const TotalCoins: FC<IProps> = ({ hamster }) => {
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
      <Typography variant="caption" fontWeight="lighter">
        {t("totalCoins")}:
      </Typography>
      <Typography variant="body2">
        {formatNumber(Math.round(hamster.clickerUser?.totalCoins ?? 0))}
      </Typography>
    </Box>
  )
}
