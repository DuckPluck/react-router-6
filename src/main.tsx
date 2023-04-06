import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root, {action as rootAction, loader as rootLoader} from "./routes/root";
import ErrorPage from "./Error-page";
import Contact, {loader as contactLoader} from "./routes/contact";

// React router позволяет менять и отрисовывать эл-ты интерфейса на одной странице,
// без запросов на сервер и обновлений страницы; и с возможностью вкладывать одни эл-ты в другие

const router = createBrowserRouter([
    {
        path: '/react-router-6/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [                                         // Дочерние эл-ты рендерятся в теге <Outlet>
            {
                path: '/react-router-6/contacts/:contactId',
                element: <Contact />,
                loader: contactLoader,
            }
        ]
    },

])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)
