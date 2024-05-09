import { Link, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'
import Logo from "@/components/logo"
import NavMenu from "@/components/NavMenu"

export default function AppLayout() {

    return (
        <>
        
        <header className='py-5 bg-gray-800'>

            <div className=' max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                <div className='w-32'> 
                    
                    <Link to={'/'}>
                        <Logo/> 
                    </Link>
                    
                </div>

                <NavMenu/>
            </div>

        </header>
        <section className='max-w-screen-2xl mx-auto mt-10 p-5'>
            <Outlet/>
        </section>

        <footer className='py-5'>
            <p className='text-center'>
                Powered by Match On Technologies.  All rights reserved {new Date().getFullYear()}
            </p>
        </footer>

        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false}/>
            
        
        </>
        
        
    )
}

