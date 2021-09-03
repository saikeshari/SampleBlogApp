// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Homepage from './Pages/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Homepage} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
