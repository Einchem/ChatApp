import Navigation from './components/Navigation';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {AppContext,socket} from './context/appContext'



function App() {
  const [rooms, setRooms] = useState([])
  const [currentRooms, setcurrentRooms] = useState([])
  const [members, setMembers] = useState([])
  const [messages, setMessages] = useState([])
  const [privateMemberMsg,setPrivateMemberMsg] = useState({})
  const [newMessages,setnewMessages] = useState({})


  const user = useSelector(state => state.user)
  return (
    <AppContext.Provider value={{
      socket,rooms, setRooms,currentRooms, setcurrentRooms,members, setMembers,messages, setMessages,
      privateMemberMsg,setPrivateMemberMsg,newMessages,setnewMessages
    }}>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        {!user && (
          <>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
          </>
        )}
        <Route path='/chat' element={<Chat />}></Route>


      </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
