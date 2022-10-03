import React, {  } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Todos from './components/Todos/MainComponent/Todos';
import { ROUTES } from './routes/routes';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/MainComponent/Home';

const withNavBar = (element: JSX.Element) => <><NavBar />{element}</>
const App: React.FC = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.any} element={<NotFound />}/>
          <Route path={ROUTES.default} element={<NavBar />}>
            <Route index                element={<Home />} />
            <Route path={ROUTES.todos}  element={<Todos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
