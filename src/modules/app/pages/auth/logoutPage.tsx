import React, { FC, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAppDispatch, useAuth } from "@app/hooks"
import { resetAuth } from "../../store"

interface ILogoutProps {}

export const LogoutPage: FC<ILogoutProps> = (props) => {
  const dispatch = useAppDispatch()
  const isAuth = useAuth()?.token
  useEffect(() => {
    dispatch(resetAuth())
  }, [])

  if (isAuth) {
    return <>Выходим...</>
  }
  return <Navigate to="/" replace />
}
