import {createBrowserRouter} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import MainStore from "../features/products/ui/MainStore.tsx";
import Cart from "../features/cart/ui/Cart.tsx";
import CheckOut from "../features/checkout/ui/CheckOut.tsx";
import ProductPage from "../features/productPage/ui/ProductPage.tsx";

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
      },
      {
        path:'product/:id',
        element: <ProductPage />
      }
    ]
  }
], {
  basename: import.meta.env.BASE_URL,
})