import { Alert, Box, Button, Stack } from "@mui/material"
import { FC, useEffect, useRef, useState } from "react"
import { baseAppApiURL, useLazyGetMiniGameLevelConfigQuery } from "../../store"
import { t } from "i18next"

interface GameMessage {
  method: "StartGame"
  level: string
  number: number
}
interface IProps {}
export const MiniGame: FC<IProps> = (props) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [fetchMiniGameLevelConfig, { data }] =
    useLazyGetMiniGameLevelConfigQuery({
      refetchOnFocus: true,
      refetchOnReconnect: true,
    })
  const [isSceneLoaded, setIsSceneLoaded] = useState(false)
  const [hasGameFinished, setHasGameFinished] = useState(false)
  const [dateStart, setDateStart] = useState<number | undefined>()
  const [dateFinish, setDateFinish] = useState<number | undefined>()
  const [currentTime, setCurrentTime] = useState(new Date())

  const handleMessage = (event: MessageEvent<any>) => {
    try {
      const data =
        typeof event.data === "string" ? JSON.parse(event.data) : event.data
      if (data && data.method === "OnSceneLoaded") {
        setIsSceneLoaded(true)
      }
      if (data && data.method === "OnGameFinished") {
        finishGame()
      }
    } catch (error) {
      console.error("Error parsing message data", error)
    }
  }
  const startGame = () => {
    setHasGameFinished(false)
    setDateStart(undefined)
    setDateFinish(undefined)

    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        method: "StartGame",
        level: data!.levelConfig,
        number: new Date(data!.startDate).getTime() / 1e3,
      } satisfies GameMessage),
    )
    setDateStart(Date.now())
  }

  const finishGame = () => {
    setDateFinish(Date.now())
    setHasGameFinished(true)
  }

  useEffect(() => {
    if (isSceneLoaded && data?.levelConfig) {
      startGame()
    }
  }, [isSceneLoaded, data])

  useEffect(() => {
    window.addEventListener("message", handleMessage, true)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  useEffect(() => {
    fetchMiniGameLevelConfig({})
    // Функция для получения времени до следующего 20:00 UTC
    const getNextUpdateTime = () => {
      const now = new Date()
      const nextUpdate = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          20,
          0,
          30,
          0,
        ),
      )

      // Если текущее время уже после 20:00 UTC, настройка на следующий день
      if (now >= nextUpdate) {
        nextUpdate.setUTCHours(now.getUTCHours() + 1)
      }

      console.log(`Запланировано обновление в ${nextUpdate.toUTCString()}`)

      return nextUpdate.valueOf() - now.valueOf() // Время в миллисекундах до следующего обновления
    }

    // Установка таймера
    const timer = setTimeout(() => {
      setCurrentTime(new Date()) // Обновление состояния для перерисовки компонента
      console.log(`Компонент обновлён в ${new Date().toUTCString()}`)
    }, getNextUpdateTime())

    // Очистка таймера
    return () => clearTimeout(timer)
  }, [currentTime])

  return (
    <>
      <Stack spacing={2} my={4}>
        {hasGameFinished && (
          <Alert>
            {t("miniGameFinished", {
              time: Math.ceil((dateFinish! - dateStart!) / 1e3),
            })}
          </Alert>
        )}
        <Button
          variant="contained"
          onClick={() => startGame()}
          disabled={!isSceneLoaded}
        >
          {t("restartMiniGame")}
        </Button>
      </Stack>
      <Box
        sx={(theme) => ({
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: theme.palette.background.paper,
        })}
      >
        <iframe
          src={`${`${
            baseAppApiURL.endsWith("/") ? baseAppApiURL : baseAppApiURL + "/"
          }`}mini-game`}
          // src="https://hamsterkombatgame.io/games/UnblockPuzzle/?v"
          style={{ width: "100%", height: 400 }}
          ref={iframeRef}
        />
      </Box>
    </>
  )
}
