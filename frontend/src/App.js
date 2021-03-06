import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

const App = () => {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
         <Route path='/' component={HomeScreen} exact/>
         <Route path='/product/:id' component={ProductScreen} />
         <Route path='/cart/:id?' component ={CartScreen}/>
         <Route path='/login' component ={LoginScreen}/>
         <Route path='/register' component ={RegisterScreen}/>
         <Route path='/profile' component ={ProfileScreen}/>
         <Route path='/admin/userList' component ={UserListScreen}/>
         <Route path='/admin/productList' component ={ProductListScreen}/>
         <Route path='/admin/user/:id/edit' component ={UserEditScreen}/>
         <Route path='/admin/product/:id/edit' component ={ProductEditScreen}/>
        </Container>
      </main>
      <Footer/>
    </Router>
  )
}

export default App
