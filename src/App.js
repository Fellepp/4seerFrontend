import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import Visualizer from './components/Visualizer'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path='/' component={Visualizer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
