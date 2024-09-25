import { FC } from "react"
import { Box, Typography } from "@mui/material"
import { Hamster } from "../../interfaces/hamster"
import { DATE_FORMAT } from "../constants/hamster"
import { format } from "date-fns"
import { t } from "i18next"
import { AccessTime } from "@mui/icons-material"

interface IProps {
  hamster: Hamster.Hamster
}

export const LastSyncDate: FC<IProps> = ({ hamster }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <AccessTime />
      &nbsp;
      <Typography variant="caption" fontWeight="lighter" color="text.disabled">
        {/* {t("lastSyncUpdate")}
        {": "} */}
        {format(
          new Date((hamster.clickerUser?.lastSyncUpdate ?? 0) * 1000),
          DATE_FORMAT,
        )}
      </Typography>
    </Box>
  )
}
