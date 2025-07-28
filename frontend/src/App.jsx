
import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { AuthProvider } from './context/Authcontext'
function App() {
 

  return (
    
    <>
    <AuthProvider>
    <Navbar/>
    <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
    <Outlet/>
    </main>
    <Footer/>
    </AuthProvider>
    
    </>
  )
}

export default App
