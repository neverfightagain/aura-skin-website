import {createBrowserRouter} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import MainStore from "../features/products/ui/MainStore.tsx";
import Cart from "../features/cart/ui/Cart.tsx";
import CheckOut from "../features/checkout/ui/CheckOut.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainStore />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'checkout',
        element: <CheckOut />
      }
    ]
  }
])