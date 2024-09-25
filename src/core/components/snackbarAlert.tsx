import { Close as CloseIcon } from "@mui/icons-material";
import { Alert, AlertColor, AlertProps, AlertTitle, AlertTitleProps, IconButton, Snackbar, SnackbarCloseReason, SnackbarOrigin, SnackbarProps } from "@mui/material";
import { FC } from "react";

export interface ISnackbarAlertProps {
    message: string;
    isOpen: boolean;
    autoHideDuration?: number;
    hideCloseButton?: boolean;
    variant?: AlertColor;
    onClose?: (event: Event | React.SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => void;
    position?: SnackbarOrigin;
    title?: string | boolean;
    alertProps?: AlertProps;
    alertTitleProps?: AlertTitleProps;
    snackbarProps?: SnackbarProps;
}

const defaultProps: Partial<ISnackbarAlertProps> = {
    autoHideDuration: 5000,
    position: {vertical: 'top', horizontal: 'center'},
}

export const SnackbarAlert: FC<ISnackbarAlertProps> = (props) => {
    const isOpen = props.isOpen ?? props.snackbarProps?.open ?? false;

    const closeBtn = <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={(e) => !!props.onClose && props.onClose(e)}
    >
        <CloseIcon fontSize="small" />
    </IconButton>

    return <Snackbar 
        open={isOpen}
        autoHideDuration={props.autoHideDuration ?? defaultProps.autoHideDuration}
        anchorOrigin={props.position ?? defaultProps.position}
        onClose={props.onClose}
        {...props.snackbarProps}
    >
        <Alert 
            severity={props.variant}
            action={!props.hideCloseButton && closeBtn}
            {...props.alertProps}
        >
            {!!props.title && <AlertTitle {...props.alertTitleProps}>{props.title}</AlertTitle>}
            {props.message}
        </Alert>
    </Snackbar>
}