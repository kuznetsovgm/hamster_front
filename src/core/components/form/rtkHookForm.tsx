import { ReactElement, useEffect, useState } from "react"
import { DefaultValues, FieldValues, UseFormReturn } from "react-hook-form-mui"
import { Form, IFormProps, SnackbarAlert } from ".."
import {
  LinearProgress,
  Button,
  CircularProgress,
  ButtonProps,
} from "@mui/material"
import {
  TypedUseQueryHookResult,
  UseMutation,
  UseQuery,
} from "@reduxjs/toolkit/dist/query/react/buildHooks"
import { MutationDefinition, QueryDefinition } from "@reduxjs/toolkit/query"
import { getNotEmptyObjectOrUndefined } from "@/core/utils"

export namespace RtkHF {
  export type FormAction = ButtonProps & {
    text: string
  }
  export interface RtkHookFormProps<
    F extends FieldValues,
    MDRT,
    Submit extends UseMutation<MutationDefinition<any, any, any, MDRT>>,
    QDRT,
    Init extends UseQuery<QueryDefinition<any, any, any, QDRT>>,
  > extends Omit<IFormProps<F>, "actions" | "onSubmit"> {
    actions: FormAction[]
    mutationHook: Submit
    mutationHookParams?: Parameters<Submit>[0]
    getSubmitHandlerParams?: (
      body: F,
    ) => Partial<Parameters<ReturnType<Submit>[0]>[0]>
    initialHook?: Init
    initialHookParams?: Parameters<Init>
    getDefaultValues?: (
      data: TypedUseQueryHookResult<QDRT, any, any>["data"],
    ) => DefaultValues<F>
    getBodyValues?: (data: F) => Parameters<ReturnType<Submit>[0]>
    afterSubmit?: (res: any) => void
    successMessage?: string
    setFormContext?: (ctx: UseFormReturn<F>) => void
  }

  export interface InitialFormState {
    isPreloading: boolean
    isPreloadingError: boolean
    isPreloadingSuccess: boolean
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    errorMessage: string | undefined
  }
}
const initialFormState: RtkHF.InitialFormState = {
  isPreloading: false,
  isPreloadingError: false,
  isPreloadingSuccess: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: undefined,
}
export const RtkHookForm = <
  F extends FieldValues,
  MDRT = any,
  Submit extends UseMutation<
    MutationDefinition<any, any, any, MDRT>
  > = UseMutation<MutationDefinition<any, any, any, MDRT>>,
  QDRT = any,
  Init extends UseQuery<QueryDefinition<any, any, any, QDRT>> = UseQuery<
    QueryDefinition<any, any, any, QDRT>
  >,
>({
  initialHook: useInitialHook,
  initialHookParams,
  mutationHook: useMutationHook,
  mutationHookParams,
  getSubmitHandlerParams,
  actions,
  formContextParams = {},
  getDefaultValues,
  getBodyValues,
  afterSubmit,
  successMessage,
  setFormContext: setFormContextFromProps,
  ...props
}: RtkHF.RtkHookFormProps<F, MDRT, Submit, QDRT, Init>): ReactElement<
  RtkHF.RtkHookFormProps<F, MDRT, Submit, QDRT, Init>
> => {
  const [formContext, setFormContext] = useState<UseFormReturn<F>>()
  const [formState, setFormState] = useState(initialFormState)
  const {
    isPreloading,
    isPreloadingError,
    isPreloadingSuccess,
    isLoading,
    isError,
    isSuccess,
    errorMessage,
  } = formState
  const [hFormContextParams, setHFormContextParams] =
    useState(formContextParams)
  const [submitHandler, submitState] = useMutationHook(mutationHookParams)
  const initialData =
    useInitialHook && useInitialHook.apply(this, initialHookParams ?? [{}])

  const [isInitialized, setIsInitialized] = useState(!useInitialHook)
  const [isSnackbarOpen, setSnackbarOpen] = useState(isError)
  useEffect(() => {
    setSnackbarOpen(isError || isSuccess || isPreloadingError)
  }, [isError, isSuccess])

  useEffect(() => {
    setFormState({
      ...formState,
      isLoading: submitState.isLoading,
      isError: submitState.isError,
      isSuccess: submitState.isSuccess,
    })
  }, [submitState])

  useEffect(() => {
    if (!initialData) {
      return
    }
    if (initialData.data) {
      setHFormContextParams({
        ...hFormContextParams,
        defaultValues: getNotEmptyObjectOrUndefined({
          ...(getDefaultValues && typeof getDefaultValues === "function"
            ? getDefaultValues(initialData.data)
            : initialData.data),
        }),
      })
    }
    setFormState({
      ...formState,
      isPreloading: initialData.isLoading,
      isPreloadingError: initialData.isError,
      isPreloadingSuccess: initialData.isSuccess,
    })
    setIsInitialized(true)
  }, [initialData])

  useEffect(() => {
    if (!formContext) {
      return
    }
    setFormContextFromProps && setFormContextFromProps(formContext)
  }, [formContext])

  if (isPreloading || !isInitialized) {
    return <LinearProgress />
  }

  return (
    <>
      <SnackbarAlert
        isOpen={isSnackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        variant={isError ? "error" : "success"}
        title={isError ? "Произошла ошибка" : "Успешно"}
        message={isError ? errorMessage ?? "" : successMessage ?? "Успешно"}
      />
      <Form<F>
        setFormContext={setFormContext}
        formContextParams={hFormContextParams}
        onSubmit={(body) =>
          submitHandler(
            getSubmitHandlerParams ? getSubmitHandlerParams(body) : { body },
          )
            .unwrap()
            .then(
              (res) =>
                afterSubmit &&
                typeof afterSubmit === "function" &&
                afterSubmit(res),
            )
            .then(() => formContext?.reset())
        }
        actions={actions.map(({ text, ...btnProps }) => (
          <Button disabled={isLoading} {...btnProps}>
            {text}&nbsp;{isLoading && <CircularProgress size={20} />}
          </Button>
        ))}
        {...props}
      />
    </>
  )
}
