import { IconButton } from "@mui/material";
import { FC } from "react";
import { useAppDispatch, useAppSelector, useDefaultAppThemeName } from "@app/hooks";
import { getAppThemeName, setThemeName } from "@app/store";
import { Themes } from "@app/themes/interface";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface IThemeToggleProps {}

export const ThemeToggle: FC<IThemeToggleProps> = (props: IThemeToggleProps) => {
  const dispatch = useAppDispatch();
  const appThemeName = useAppSelector(getAppThemeName);
  const defaultThemeName = useDefaultAppThemeName();
  const themeName = appThemeName ?? defaultThemeName;
  
  function toggleTheme() {
    const newTheme = themeName === Themes.DARK ? Themes.LIGHT : Themes.DARK;
    dispatch(setThemeName(newTheme));
  }

  return (<>
    <IconButton sx={{ ml: 1 }} onClick={(e) => toggleTheme()} color="inherit">
        {themeName === Themes.DARK ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  </>)
}
