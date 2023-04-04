import React, {FC} from 'react';
import {useRouteError} from "react-router-dom";

interface ErrorResponse extends Error {
    statusText: string;
}

const ErrorPage: FC = () => {
    const error = useRouteError() as ErrorResponse;
    console.error(error)

    return (
        <div id={'error-page'}>
            <h1>Whoops!</h1>
            <p>Sorry, an unexpected error was occurred</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
};

export default ErrorPage;