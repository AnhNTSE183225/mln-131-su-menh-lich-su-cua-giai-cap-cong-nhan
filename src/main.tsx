import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Comments } from './pages/Comments'
import { Quiz } from './pages/Quiz'
import { Analytics } from './pages/Analytics'
import { Login } from './pages/Login'
import { QuanDiemCoBan } from './pages/QuanDiemCoBan'
import { GiaiCapCongNhanHienNay } from './pages/GiaiCapCongNhanHienNay'
import { GiaiCapCongNhanVietNam } from './pages/GiaiCapCongNhanVietNam'
import { CauHoiOnTap } from './pages/CauHoiOnTap'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AuthProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/comments' element={<Comments />} />
                    <Route path='/quiz' element={<Quiz />} />
                    <Route path='/analytics' element={<Analytics />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/quan-diem-co-ban' element={<QuanDiemCoBan />} />
                    <Route path='/giai-cap-cong-nhan-hien-nay' element={<GiaiCapCongNhanHienNay />} />
                    <Route path='/giai-cap-cong-nhan-viet-nam' element={<GiaiCapCongNhanVietNam />} />
                    <Route path='/cau-hoi-on-tap' element={<CauHoiOnTap />} />
                </Route>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
)
