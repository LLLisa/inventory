import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root, MenuPage, Form, TenthStepBT, TenthStepGG, AboutPage, ErrorPage, InstallPWA } from "./components";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <MenuPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/:pageNum",
                element: <Form />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/bt",
                element: <TenthStepBT />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/gg",
                element: <TenthStepGG />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/install",
                element: <InstallPWA />,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

const root = document.querySelector("#root");

createRoot(root).render(<RouterProvider router={router} />);
