import { FC } from "react"
import { Grid } from "@mui/material"
import { useCreateHamsterAdminMutation } from "../../store"
import { t } from "i18next"
import { RtkHookForm } from "@/core/components"
import { TextFieldElement } from "react-hook-form-mui"

interface IProps {}

export const HamsterRegistration: FC<IProps> = (props) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <RtkHookForm
          mutationHook={useCreateHamsterAdminMutation}
          actions={[{ type: "submit", text: t("submitHamsterButton") }]}
        >
          <TextFieldElement name="src" label="Url" required />
        </RtkHookForm>
      </Grid>
    </Grid>
  )
}
