import { FC, useState } from "react"
import { Grid } from "@mui/material"
import { useUpdateHamsterMutation } from "../../store"
import { RtkHookForm } from "@/core/components"
import {
  CheckboxElement,
  SwitchElement,
  TextFieldElement,
  UseFormReturn,
  useWatch,
} from "react-hook-form-mui"
import { Hamster } from "../../interfaces/hamster"
import { t } from "i18next"

interface IProps {
  settings: Hamster.Hamster["settings"]
  isActive: Hamster.Hamster["isActive"]
}

const HamsterSettingsCheckboxes = ({
  settings: { minimumBalanceCoins, ...booleanSettings },
}: IProps) => {
  const isActive = useWatch<IProps>().isActive
  return Object.keys(booleanSettings).map((key) => (
    <CheckboxElement name={key} label={t(key)} key={key} disabled={!isActive} />
  ))
}

const HamsterSettingsMinimumBalance = ({
  settings: { minimumBalanceCoins, ...booleanSettings },
}: IProps) => {
  const isActive = useWatch<IProps>().isActive
  return (
    <TextFieldElement
      label={t("minimumBalanceCoins")}
      name={"minimumBalanceCoins"}
      type={"number"}
      disabled={!isActive}
    />
  )
}

export const UpdateHamster: FC<IProps> = ({
  settings: { minimumBalanceCoins, ...booleanSettings },
  isActive,
}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <RtkHookForm<
          Hamster.HamsterSettings & { isActive: boolean },
          Hamster.UpdateHamsterRes,
          typeof useUpdateHamsterMutation
        >
          mutationHook={useUpdateHamsterMutation}
          actions={[
            { type: "submit", text: t("updateHamster"), variant: "contained" },
          ]}
          formContextParams={{
            defaultValues: {
              ...booleanSettings,
              minimumBalanceCoins,
              isActive,
            },
          }}
        >
          <SwitchElement label={t("active")} name="isActive" />
          <HamsterSettingsCheckboxes
            settings={{ minimumBalanceCoins, ...booleanSettings }}
            isActive={isActive}
          />
          <HamsterSettingsMinimumBalance
            settings={{ minimumBalanceCoins, ...booleanSettings }}
            isActive={isActive}
          />
        </RtkHookForm>
      </Grid>
    </Grid>
  )
}
