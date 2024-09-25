import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, {FC} from 'react';

interface IErrorPageProps {
    code: number;
    text: string;
}

export const ErrorPage: FC<IErrorPageProps> = ({code, text}) => {

    return (
        <Container maxWidth={'md'}>
            <Typography variant='h1' align='center'>
                {code}
            </Typography>
            <Typography variant='body2' align='center'>
                {text}
            </Typography>
        </Container>
    );
};
