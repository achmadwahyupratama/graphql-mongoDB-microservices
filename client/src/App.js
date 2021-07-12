import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './views/Home'
import AddMovies from './views/AddMovies';
import Favourites from './views/Favourites';
import EditMovie from './views/EditMovie';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <div>
          <Switch>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <Route exact path='/add-movie'>
              <AddMovies></AddMovies>
            </Route>
            <Route exact path='/favourites'>
              <Favourites></Favourites>
            </Route>
            <Route exact path='/edit-movie/:movieId'>
              <EditMovie></EditMovie>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
