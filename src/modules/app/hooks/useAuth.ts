import { getAuth } from "../store"
import { useAppSelector } from "."

export const useAuth = () => {
  const auth = useAppSelector(getAuth)

  return auth
}
