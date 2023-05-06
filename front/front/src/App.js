import "./App.css";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Navigation } from "./Components/Navigation";
import { Route, Routes } from "react-router-dom";
import { Main } from "./Pages/Main";
import { AboutUs } from "./Pages/AboutUs";
import { Movies } from "./Pages/Movies";
import { Premieres } from "./Pages/Premieres";
import { Browse } from "./Pages/Browse";
import MovieDetailPage from "./Pages/MovieDetailPage";
import NotFound from "./Pages/NotFound";
import { BaseApiValueContext } from "./Context/BaseApiValueContext";
import { useState, useEffect } from "react";
import { LoginPage } from "./Pages/LoginPage";
import { RegisterPage } from "./Pages/RegisterPage";
import { Profile } from "./Pages/Profile";
import axios from "axios";


function App() {

  // const [currentUser, setCurrentUser] = useState();
  // const [registrationToggle, setRegistrationToggle] = useState(false);
  // const [email, setEmail] = useState('');
  // const [username, setUserName] = useState('');
  // const [password, setPassword] = useState('');

  const [baseAPI] = useState("http://127.0.0.1:8000/");
  const [refresh_token, setRefresh_token] = useState(localStorage.getItem('refresh_token'));



  const verifyToken = async () => {
    const response = await axios.post(`${baseAPI}dj-rest-auth/token/refresh/`, {
      refresh: refresh_token,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.access);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    // Устанавливаем интервал вызова функции для отправки токена на верификацию
      const intervalId = setInterval(() => {
        setRefresh_token(localStorage.getItem('refresh_token'));
        verifyToken();
      }, 60000); // 1 минутa в миллисекундах
  
    // Очищаем интервал после завершения работы компонента
    return () => clearInterval(intervalId);
  }, [refresh_token]);


  return (
    <>
      <div className="App">
        <BaseApiValueContext.Provider
          value={{
            baseAPI,
          }}
        >
          <Header />
          <Navigation />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/about" element={<AboutUs />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/movies/:id" element={<MovieDetailPage />}></Route>
            <Route path="/premieres" element={<Premieres />}></Route>
            <Route path="/browse" element={<Browse />}></Route>
            <Route path="*" element={<NotFound />}></Route>
            
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Routes>

          <Footer />
        </BaseApiValueContext.Provider>
      </div>
    </>
  );
}

export default App;
