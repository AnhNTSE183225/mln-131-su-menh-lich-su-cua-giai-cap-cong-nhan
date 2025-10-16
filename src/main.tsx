import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Comments } from './pages/Comments'
import { Quiz } from './pages/Quiz'
import { Analytics } from './pages/Analytics'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<Home />} />
                <Route path='/comments' element={<Comments />} />
                <Route path='/quiz' element={<Quiz />} />
                <Route path='/analytics' element={<Analytics />} />
            </Route>
        </Routes>
    </BrowserRouter>
)
