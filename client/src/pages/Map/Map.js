import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";
import API from "../../utils/API";
import $ from 'jquery';

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

  componentDidMount() {
    this.getUserLocation()
    this.getTrucks()
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

  handleMarkerClick = (data) => {
    const slidepanel = document.getElementById('slidepanel');
    const toggleButton = document.getElementById('toggleButton');
    const slidePanelflag = slidepanel.getAttribute('data-flag');
    const testWindow = document.getElementById('panelContent');


    if (slidePanelflag === "SearchOpen" || slidePanelflag === "TruckDetails" ) {
      // hide panel
      $('slidepanel').animate({
        "height": "-=40vh"
      }, 500);
      slidepanel.setAttribute('data-flag', 'TruckPreview');
      toggleButton.setAttribute('value', 'Open');
      // change width of map to fill empty space left from collapse of sldide panel
      $('#map_canvas').animate({
        "height": "+=40vh"
      }, 500);
      testWindow.innerHTML = `OnClick Ran
                              here's some data
                              Truck ID: ${data.id}
                              Full OBJ: ${data.url}
                              Truck Name: ${data.name}
                              Truck Phone: ${data.phone}
                              <input id="moreButton" type="button" value="More" />`

    }
    else if (slidePanelflag === "SearchClosed") {
      $('slidepanel').animate({
        "height": "+=20vh"
      }, 500);
      slidepanel.setAttribute('data-flag', 'TruckPreview');
      toggleButton.setAttribute('value', 'Close');
      $('#map_canvas').animate({
        "height": "-=20vh"
      });
      testWindow.innerHTML = `OnClick Ran
                              here's some data
                              Truck ID: ${data.id}
                              Full OBJ: ${data.url}
                              Truck Name: ${data.name}
                              Truck Phone: ${data.phone}
                              <input id="moreButton" type="button" value="More" />`
    }
    else if (slidePanelflag === "TruckPreview") {
      testWindow.innerHTML = `OnClick Ran
                              here's some data
                              Truck ID: ${data.id}
                              Full OBJ: ${data.url}
                              Truck Name: ${data.name}
                              Truck Phone: ${data.phone}
                              <input id="moreButton" type="button" value="More" />`
    }


    console.log(data)

  };
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
              onClick={() => this.handleMarkerClick(truck)}
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
        <div id="slidepanel" data-flag="SearchClosed">
          <input id="toggleButton" type="button" value="Close" />
          <p id="panelContent">
          "This is the default Bar View"
          </p>
        </div>
      </div>
    );
  }
}

export default Map;
