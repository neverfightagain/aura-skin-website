import { Outlet } from "react-router-dom";
import Header from "../../shared/ui/Header.tsx";
import Footer from "../../shared/ui/Footer.tsx";

const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-[#fbf9f5] text-[#1a1816]'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout