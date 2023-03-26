import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import './App.css';
import MainPage from './pages/MainPage';
import StartPage from './pages/StartPage';

function App() {
  return (
    <div className="App">
      <Container>
        <Title>TIC-TAC-TOE</Title>
        <Router>
          <Routes>
            <Route path='/' element={<StartPage/>}/>
            <Route path='/main' element={<MainPage/>}/>
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;


const Container = styled.div`
  border: 1px solid black;
  padding: 20px;
  width: fit-content;
  margin: auto;
  background-color: white;
  background: fix;
`


const Title = styled.div`
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
`
