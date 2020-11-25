import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Team from "./components/Team"
import Prediction from "./components/Prediction";
import { Router, Route, Switch } from "react-router-dom";
import Statistics from "./components/Statistics";
import TeamScripts from "./components/TeamScripts";
import CreateAS from "./components/CreateAnalysis";
import history from "./history";
import CleanUpHelper from "./components/CleanUpHelper";
import WallOfFame from "./components/WallOfFame";
import WallOfFameIMS from "./components/WallOfFameIMS";
import CreateEpicsHA22 from "./components/CreateEpicsHA22";
import CreateSS from "./components/CreateStoriesWithSubtasks";
import FolderStructure from "./components/FolderStructure";
import NamingConventions from "./components/NamingConventions";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Instructions from "./components/Instructions";
import PrmNavBar from "./components/PrmNavBar";
import ErrorPage from "./components/ErrorPage";
import ConfluenceImporter from "./components/ConfluenceImporter"

class App extends React.Component {

  render()
  {  
      return (
        <div className='page-wrapper'>
            <PrmNavBar/>
          <div className='page-content'>
            <React.Fragment>
              <Router history={history}>
                <Switch>
                  <Route exact path="/" render={() => <Home cisco={false} {...this.errorChange}  />} />
                  <Route exact path="/prediction" render={() => <Prediction />}/>
                  <Route exact path="/statistics" component={Statistics} />
                  <Route exact path="/scripts" component={TeamScripts} />
                  <Route exact path="/jirascripts/create-analysis" component={CreateAS} />
                  <Route exact path="/jirascripts/create-stories-and-subtasks" component={CreateSS} />
                  <Route exact path="/jirascripts/clean-up" component={CleanUpHelper} />
                  <Route exact path="/jirascripts/walloffame" component={WallOfFame} />
                  <Route exact path="/imsscripts/walloffameims" component={WallOfFameIMS} />
                  <Route exact path="/jirascripts/script2" component={CreateEpicsHA22} />
                  <Route exact path="/imsscripts/naming-conventions" component={NamingConventions} />
                  <Route exact path="/imsscripts/folder-structure" component={FolderStructure} />
                  <Route exact path="/team" component={Team} />
                  <Route exact path="/contact" component={Contact} />
                  <Route exact path="/instructions" component={Instructions} />
                  <Route exact path="/confluence" component={ConfluenceImporter} />
                  <Route render={() => <ErrorPage errorText='Could not find the page'/>} />
                </Switch>
              </Router>
            </React.Fragment>
          </div>
          <div className='page-footer'>
            <Footer />
          </div>
        </div>
      );
  }
}

export default App;
