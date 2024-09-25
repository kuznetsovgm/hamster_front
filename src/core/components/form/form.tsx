import { Stack, Divider, Button, StackProps } from "@mui/material"
import React, { MutableRefObject, useEffect } from "react"
import {
  FieldValues,
  FormContainer,
  FormContainerProps,
  UseFormProps,
  UseFormReturn,
  useForm,
} from "react-hook-form-mui"

export type FormAction = React.ReactElement<typeof Button>

export interface IFormProps<
  T extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> extends Omit<FormContainerProps<T>, "formContext"> {
  actions?: FormAction[]
  onSubmit: (
    data: TTransformedValues extends T ? TTransformedValues : T,
    event?: React.BaseSyntheticEvent,
    formContext?: UseFormReturn<T>,
  ) => unknown | Promise<unknown>
  formContextParams?: UseFormProps<T>
  formStackProps?: StackProps
  setFormContext?: (ctx: UseFormReturn<T>) => void
}

const defaultFormStackProps: StackProps = {
  direction: "column",
  spacing: 2,
  sx: { marginY: 1 },
}

export const Form = <
  T extends FieldValues = FieldValues,
  // TContext = any,
  // TTransformedValues extends FieldValues | undefined = undefined
>({
  children,
  actions,
  formContextParams: formContextProps,
  formStackProps,
  onSubmit,
  setFormContext,
  ...formContainerProps
}: IFormProps<T>) => {
  const formContext = useForm<T>({
    ...formContextProps,
  })

  useEffect(() => {
    setFormContext && setFormContext(formContext)
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    formContext.handleSubmit((data, event) =>
      onSubmit(data as any, event, formContext),
    )()
  }

  return (
    <>
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit}
        {...formContainerProps}
      >
        <Stack {...defaultFormStackProps} {...formStackProps}>
          {children}
        </Stack>
        {actions && (
          <>
            <Divider light sx={{ marginY: 2 }} />
            <Stack direction={"row"} spacing={2} sx={{ justifyContent: "end" }}>
              {...actions}
            </Stack>
          </>
        )}
      </FormContainer>
    </>
  )
}
