import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";
import API from "../../utils/API";

class Map extends Component {
  state = {
    Trucks: [],
    UserLocation: {},
    Attempts: 0,
  };

  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  handleMapMarker = () => {
    
  }

  componentDidMount() {
    this.getUserLocation()
    this.getTrucks()
  }

  shouldComponentUpdate() {
    return false; // Will cause component to never re-render.
}

  getTrucks() {
    API.getTrucks().then((res) => this.setState({
      Trucks: res.data
    }));
  }

  getUserLocation = () => {
    if (navigator.geolocation && !(this.state.UserLocation === {})) {
      navigator.geolocation.getCurrentPosition(position => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.setState({ UserLocation: pos, Center: pos })
      })
    }
  }

  
  render() {
    const defaultMapOptions = {
      disableDefaultUI: true,
    }
    const GoogleMapExample = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          ref={map => {
            this.map = map;
          }}
          defaultOptions={defaultMapOptions}
          defaultZoom={props.defaultZoom}
          defaultCenter={props.defaultCenter}
        >
          {this.state.Trucks.map(truck => (
            <Marker
              key={truck.id}
              position={{ lat: truck.lat, lng: truck.long }}
              onClick={() => {props.func(truck)}}
            />
          ))}
          <Marker
            position={this.state.UserLocation}
            icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" />
        </GoogleMap>
      )));

    return (
      <div>
        <GoogleMapExample
          func={this.props.func}
          Trucks={this.state.Trucks}
          defaultCenter={{ lat: 35.22, lng: -80.84 }}
          defaultZoom={10}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6pItobxq0v_r7pWG5w_R36jtaVw8h520"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div id={`map_canvas`} style={{ height: `90vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        {/* \V/ Below could be made into it's own component \V/ */}
        {/* The data flag attribute could be:
         "SearchClosed"(Default),
         "SearchOpen"(search panel open),
         "TruckPreview"(quick view on marker click),
         "TruckDetails"(Full truck page) */}
        {/* <div id="slidepanel" data-flag="SearchClosed">
          <input id="toggleButton" type="button" value="Close" />
          <p id="panelContent">
          "This is the default Bar View"
          </p>
        </div> */}
      </div>
    );
  }
}

export default Map;
