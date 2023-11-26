import './App.css';
import EmployeeList from './components/EmployeeList';
import Header from './components/Header';
import Footer from './components/Footer';

import { BrowserRouter as Router ,Route, Routes, Switch} from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
// import {Switch} from 'react-router-dom';

function App() {
  return (
    <div>
      {/* //it is topmost hierarchhy in routing */}
      <Router>
      <Header/>
      <div className='container'>
        {/* Switch component means only one component render at a time */}
        <Routes>
        {/* <Switch> */}
          {/* it will perform as localhost:3000/ or localhost:3000/employees **/}
          <Route exact path='/' Component={EmployeeList}></Route>
          <Route path='/employees' Component={EmployeeList}></Route>
          <Route path='/addEmployee' Component={AddEmployee}></Route>  {/*used for adding the employee*/}
          {/* <Route path='/editEmployee/:id' Component={AddEmployee}></Route> */}

        {/* </Switch> */}
        </Routes>
      {/* <EmployeeList/>   no need now bcoz we added employee list in route component */}
      </div>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;


//it is a root component so here we perform routing
// install react-router-dom npm i react-router-dom for routing