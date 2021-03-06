import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Menu from "./components/Menu";
import Page from "./pages/Page";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

//components
import SignIn from "./pages/SignIn";
import Forgot from "./pages/Forgot";
import Mapboard from "./pages/Mapboard";

import FinishedMapboard from "./pages/FinishedBoard";
import Verify from "./pages/Verify";
import Home from "./pages/Home";
import CreateRole from "./pages/CreateRole";
import AdminSupervisor from "./pages/AdminSupervisor";
import AdminMapper from "./pages/AdminMapper";
import CreateTask from "./pages/CreateTask";
import SupervisorViewTasks from "./pages/SupervisorViewTasks";
import AssignTask from "./pages/AssignTask";
import PendingTasks from "./pages/PendingTasks";
import InspectionTasks from "./pages/InspectionTasks";
import { useDispatch } from "react-redux";
import MapperUpload from "./pages/MapperUpload";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState<any>([]);
  const [lat, setlat] = useState(3);
  const [long, setlong] = useState(5);
  const getLocation = (): void => {
    console.log("location getter ran");
    navigator.geolocation.getCurrentPosition(
      (position: any) => {
        setLocation([
          ...location,
          [position.coords.longitude, position.coords.latitude],
        ]);

        dispatch({
          type: "NEW_LOCATION",
          location: [position.coords.longitude, position.coords.latitude],
        });
        setlat(position.coords.latitude);
        setlong(position.coords.longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  const data = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [location],
    },
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonRouterOutlet animated id="main">
            <Route path="/" exact={true}>
              <Redirect to="/login" />
            </Route>

            <Route path="/login" exact={true}>
              <SignIn />
            </Route>

            <Route path="/upload" exact={true}>
              <MapperUpload />
            </Route>

            <Route path="/assign-task" exact={true}>
              <AssignTask />
            </Route>

            <Route path="/pending-task" exact={true}>
              <PendingTasks />
            </Route>

            <Route path="/inspection-task" exact={true}>
              <InspectionTasks />
            </Route>

            <Route path="/create-role" exact={true}>
              <CreateRole />
            </Route>

            <Route path="/create-task" exact={true}>
              <CreateTask />
            </Route>

            <Route path="/manage-supervisor" exact={true}>
              <AdminSupervisor />
            </Route>

            <Route path="/view-task" exact={true}>
              <SupervisorViewTasks />
            </Route>

            <Route path="/manage-mapper" exact={true}>
              <AdminMapper />
            </Route>

            <Route path="/forgot" exact={true}>
              <Forgot />
            </Route>
            <Route path="/initialmapboard" exact={true}>
              <Mapboard getLocation={getLocation} location={location} />
            </Route>
            <Route path="/finishedMapboard" exact={true}>
              <FinishedMapboard data={data} />
            </Route>
            <Route path="/verify" exact={true}>
              <Verify />
            </Route>
            <Route path="/home" exact={true}>
              <Home />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
