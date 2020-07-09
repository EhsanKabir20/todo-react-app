import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProjectContainer from './container/ProjectsContainer'
import store from './redux/store'
import {Provider} from 'react-redux'
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProjectContainer></ProjectContainer>
      </div>
    </Provider>
  );
}

export default App;
