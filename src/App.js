import logo from './logo.svg';
import './App.css';
import Layout from './hoc/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import LoginRestaurant from './containers/restaurant/Login/Login';
import LoginCustomer from './containers/customer/Login/Login';
import SignupRestaurant from './containers/restaurant/Signup/Signup';
import SignupCustomer from './containers/customer/Signup/Signup';
import AddItem from './containers/restaurant/AddItem/AddItem';
import AddMenu from './containers/restaurant/AddMenu/AddMenu';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Layout>
      <Routes>
        {/* <Route path="/" component={}/> */}
        <Route path="/restaurant/login"  element={<LoginRestaurant/>}/>
        <Route path="/customer/login"  element={<LoginCustomer/>}/>
        <Route path="/restaurant/signup"  element={<SignupRestaurant/>}/>
        <Route path="/customer/signup"  element={<SignupCustomer/>}/>
        <Route path="/restaurant/createItem"  element={<AddItem/>}/>
        <Route path="/restaurant/createMenu"  element={<AddMenu/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
