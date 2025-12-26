import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from './Context/AuthContext.jsx'
import CartContext from './Context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
<AuthContext>
    <CartContext>
    <App/>
    </CartContext>
</AuthContext>
)
