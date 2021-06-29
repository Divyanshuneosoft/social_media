import './App.css';
import Login from './containers/Login';
import Register from './containers/Register';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { AuthProvider } from './hooks/AuthContextProvider';
import Dashboard from './containers/Dashboard';
import AddPost from './containers/AddPost';

function App() {
  return (
    <>
    <Router>
      <Switch>
      <AuthProvider>
        <Route exact path='/' component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/post/add' component={AddPost} />

    </AuthProvider>
      </Switch>
    </Router>
   
      
    </>
  );
}

export default App;
