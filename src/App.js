
import './App.css';
import { useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';


function App(props) {
  console.log(props.state.currentUser.history)
  const [isAuth, setIsAuth] = useState(false)
  const logInfo = JSON.parse(localStorage.getItem("logInfo"))
    if(!logInfo)localStorage.setItem(
      "logInfo",
      JSON.stringify({
        users: [{ id: 1, login: "ad1lek", password: "123123", isAuth: false, data:[], history:[] }],
      })
    );
    useEffect(() => {
        logInfo.users.forEach((user) => {
            if (user.isAuth) {
                setIsAuth(true)
            }
        })
    }, [])


  
   
  const defaultData = [{
      title:"Income",
      icons:"credit-card.png",
      id:1,
      name: "Стипендия",
      amount : 0,
      count: 0,
      opt:"KZT"
    },
    {
      title:"Account",
      icons:"credit-card.png",
      id:2,
      name: "Kaspi",
      count: 0,
      amount : 0,
      opt:"KZT",
     
    },
    {
      title:"Expenses",
      icons:"books.png",
      id:3,
      name: "Food",
      count: 0,
      amount : 0,
      opt:"KZT",
      
    }
  ]


  
  
  
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main state = {props.state} isAuth = {isAuth} setIsAuth={setIsAuth} defaultData={defaultData} rerenderTree={props.rerenderTree}/>}/>
        <Route path='/' element={<SignIn setIsAuth={setIsAuth} state = {props.state}/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>

 
  );
}

export default App;
