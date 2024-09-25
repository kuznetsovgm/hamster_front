import { createTheme } from "@mui/material"
import { ruRU as pickersRuRU } from "@mui/x-date-pickers/locales"
import { ruRU } from "@mui/material/locale"

export const lightTheme = createTheme(
  {
    palette: {
      mode: "light",
    },
  },
  ruRU,
  pickersRuRU,
)
