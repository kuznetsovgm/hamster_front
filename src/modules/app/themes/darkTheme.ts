import { createTheme } from "@mui/material"
import { ruRU as pickersRuRU } from "@mui/x-date-pickers/locales"
import { ruRU } from "@mui/material/locale"

export const darkTheme = createTheme(
  {
    palette: {
      mode: "dark",
    },
    typography: {
      fontSize: 14,
    },
  },
  ruRU,
  pickersRuRU,
)
