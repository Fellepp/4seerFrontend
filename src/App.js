import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import Visualizer from './components/Visualizer'
import GeoMapper from './components/GeoMapper'
import PredictMapper from './components/PredictMapper'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Visualizer} />
          <Route path='/geomap' component={GeoMapper} />
          <Route path='/predict' component={PredictMapper} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
