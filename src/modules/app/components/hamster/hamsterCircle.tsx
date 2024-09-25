import { FC } from "react"
import { Box } from "@mui/material"
import { Hamster } from "../../interfaces/hamster"

interface IProps {
  hamster: Hamster.Hamster
}

export const HamsterCircle: FC<IProps> = ({ hamster }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #5a60ff, #3b40934f 49.53%, #1c1f24)",
          borderRadius: "50%",
          position: "relative",
          height: 200,
          width: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            // background: "#272a2f",
            border: "1px solid rgba(39, 39, 39, 0)",
            borderRadius: "50%",
            boxShadow: "0 0 15px #304669",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component={"picture"}
            sx={
              {
                // height: 200,
              }
            }
          >
            <Box
              component={"source"}
              srcSet={`https://hamsterkombat.io/images/hamsters/${hamster.clickerUser?.level}.avif`}
              type="image/avif"
              sx={{
                maxHeight: "100%",
                maxWidth: "100%",
                height: "100%",
                width: "auto",
              }}
            />
            <Box
              component={"source"}
              srcSet={`https://hamsterkombat.io/images/hamsters/${hamster.clickerUser?.level}.webp`}
              type="image/webp"
            />
            <Box
              component={"img"}
              src={`https://hamsterkombat.io/images/hamsters/${hamster.clickerUser?.level}.png`}
              alt="Hamster Kombat"
              sx={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
