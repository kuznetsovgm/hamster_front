import { FC } from "react"
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  SvgIconOwnProps,
  Theme,
  Typography,
  useTheme,
} from "@mui/material"
import { Hamster } from "../../interfaces/hamster"
import { format } from "date-fns"
import {
  ArrowCircleUp,
  ArrowUpward,
  Circle,
  DownloadDone,
  Key,
  MoreHoriz,
  SportsEsports,
  TaskAlt,
  Tune,
} from "@mui/icons-material"
import { t } from "i18next"
import { DATE_FORMAT } from "../constants/hamster"

interface IProps {
  action: Hamster.Action
  date: string
}

interface ActionParams {
  icon: typeof SvgIcon
  title: string
  description: string
  color?: SvgIconOwnProps["color"]
  bgColor?: string
}

const getBuyUpgradeParams = (
  action: Hamster.BuyUpgradeAction,
  theme: Theme,
): ActionParams => ({
  icon: ArrowUpward,
  title: t(action.method),
  description: t(`${action.method}-description`, {
    title: action.data.upgradeId,
  }),
  color: "action",
  bgColor: "linear-gradient(180deg,#61cb6c,#272a2f)",
})
const getHamsterTapParams = (
  action: Hamster.TapAction,
  theme: Theme,
): ActionParams => ({
  icon: Circle,
  title: t(action.method),
  description: t(`${action.method}-description`, {
    count: action.data.count,
    availableTaps: action.data.availableTaps,
  }),
  color: "action",
  bgColor: "linear-gradient(180deg,#5a60ff,#3b40934f 49.53%,#1c1f24)",
})
const getHamsterUpdateSettingsParams = (
  action: Hamster.UpdateSettingsAction,
  theme: Theme,
): ActionParams => ({
  icon: Tune,
  title: t(action.method),
  description: t(`${action.method}-description`, { ...action.data }),
  color: "secondary",
  bgColor: theme.palette.secondary.dark,
})
const getHamsterClaimDailyCipherParams = (
  action: Hamster.ClaimDailyCipherAction,
  theme: Theme,
): ActionParams => ({
  icon: MoreHoriz,
  title: t(action.method),
  description: t(`${action.method}-description`, {
    cipher: action.data.cipher,
  }),
  color: "action",
  bgColor: "radial-gradient(circle,#ff3737 0,#ff373700 80%)",
})
const getHamsterCheckTaskParams = (
  action: Hamster.CheckTaskAction,
  theme: Theme,
): ActionParams => ({
  icon: TaskAlt,
  title: t(action.method),
  description: t(`${action.method}-description`, { task: action.data.taskId }),
  color: "action",
  bgColor: "#f3ba2f",
})
const getSelectExchangeParams = (
  action: Hamster.SelectExchangeAction,
  theme: Theme,
): ActionParams => ({
  icon: TaskAlt,
  title: t(action.method),
  description: t(`${action.method}-description`, {
    exchange: action.data.exchangeId,
  }),
  color: "action",
  bgColor: theme.palette.secondary.light,
})
const getEnterPromocodeParams = (
  action: Hamster.ApplyPromoAction,
  theme: Theme,
): ActionParams => ({
  icon: Key,
  title: t(action.method),
  description: t(`${action.method}-description`, {
    promoCode: action.data.promoCode,
  }),
  color: "action",
  bgColor: theme.palette.primary.dark,
})
const getMiniGameParams = (
  action: Hamster.ClaimDailyKeysMiniGameAction,
  theme: Theme,
): ActionParams => ({
  icon: SportsEsports,
  title: t(action.method),
  description: t(`${action.method}-description`, {
    miniGameId: action.data.miniGameId,
  }),
  color: "action",
  bgColor: theme.palette.primary.dark,
})
const getBoostParams = (
  action: Hamster.BuyBoostAction,
  theme: Theme,
): ActionParams => ({
  icon: ArrowCircleUp,
  title: t(action.method),
  description: t(`${action.method}-description`, {
    boostId: action.data.boostId,
  }),
  color: "action",
  bgColor: theme.palette.primary.dark,
})
const getDefaultParams = (
  action: Hamster.Action,
  theme: Theme,
): ActionParams => ({
  icon: DownloadDone,
  title: t(action.method),
  description: t(`${action.method}-description`),
  color: "action",
  bgColor: theme.palette.background.paper,
})
export const HamsterAction: FC<IProps> = ({ action, date }) => {
  let params: ActionParams | undefined = undefined
  const theme = useTheme()
  switch (action.method) {
    case "buy-upgrade": {
      params = getBuyUpgradeParams(action, theme)
      break
    }
    case "tap": {
      params = getHamsterTapParams(action, theme)
      break
    }
    case "update-settings": {
      params = getHamsterUpdateSettingsParams(action, theme)
      break
    }
    case "claim-daily-cipher": {
      params = getHamsterClaimDailyCipherParams(action, theme)
      break
    }
    case "check-task": {
      params = getHamsterCheckTaskParams(action, theme)
      break
    }
    case "select-exchange": {
      params = getSelectExchangeParams(action, theme)
      break
    }
    case "claim-daily-keys-minigame": {
      params = getMiniGameParams(action, theme)
      break
    }
    case "apply-promo": {
      params = getEnterPromocodeParams(action, theme)
      break
    }
    case "buy-boost": {
      params = getBoostParams(action, theme)
      break
    }
    default: {
      params = getDefaultParams(action, theme)
      break
    }
  }
  if (!params) {
    return
  }
  const Icon = params?.icon
  return (
    <Box>
      <ListItem alignItems="flex-start" disableGutters disablePadding>
        <ListItemAvatar>
          <Avatar
            sx={{
              background: `${params?.bgColor} !important`,
            }}
          >
            <Icon color={params?.color} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              {params?.title}
              <Typography variant="caption" color="text.disabled">
                {format(new Date(date), DATE_FORMAT)}
              </Typography>
            </Box>
          }
          secondary={params?.description}
        />
      </ListItem>
    </Box>
  )
}
