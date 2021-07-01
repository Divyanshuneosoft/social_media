import './App.css';
import Login from './containers/Login';
import Register from './containers/Register';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { AuthProvider } from './hooks/AuthContextProvider';
import Dashboard from './containers/Dashboard';
import AddPost from './containers/AddPost';
import {PrivateRoute} from './containers/PrivateRoute'
import DetailPost from './containers/DetailPost';

function App() {
  return (
    <>
    <Router>
      <Switch>
      <AuthProvider>
        <Route exact path='/' component={Dashboard} />
        <PrivateRoute  path='/post/:id' component={DetailPost} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRoute path='/create' component={AddPost} />
        <PrivateRoute path='/edit/:id' component={AddPost} />

    </AuthProvider>
      </Switch>
    </Router>
   
      
    </>
  );
}

export default App;
