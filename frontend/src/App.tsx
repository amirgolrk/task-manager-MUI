
//import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Card from "./pages/Card.tsx";
import SignUpForm from "./pages/SignUpForm.tsx";
import LoginForm from "./pages/LoginForm.tsx";
import Layout from "./pages/Layout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import RouteGuard from "./components/RouteGuard.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//I could simply jjust not write React.fc
const App:React.FC = () => {
    return (
        <BrowserRouter>
        <ToastContainer/>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<RouteGuard><Card/></RouteGuard>}/>
                    <Route path="login" element={<LoginForm />}/>
                    <Route path="signUp" element={<SignUpForm />}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App
