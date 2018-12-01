import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";
import API from "../../utils/API";
import $ from 'jquery'; 

class Map extends Component {
  state = {
    Trucks: [],
    UserLocation: {},
    Attempts: 0
  };
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }
  componentDidMount() {
    this.getUserLocation()
    this.getTrucks()
  }

  getTrucks(){
    API.getTrucks().then((res)=> this.setState({
      Trucks: res.data}));
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
    // let center = this.map.getCenter();
    // let zoom = this.map.getZoom();
    // this.setState({
    //   Zoom: zoom,
    //   Center: center,
    //   truckName: data.name,
    //   truckPhone: data.phone,
    //   truckUrl: data.url
    // })
    const slidepanel = document.getElementById('slidepanel');
    const map_canvas = document.getElementById('map_canvas');
    const toggleButton = document.getElementById('toggleButton');
    const slidePanelflag= slidepanel.getAttribute('data-flag');

    if (slidePanelflag==="open") {

      // hide panel
      $('slidepanel').animate({
          "marginBottom": "-=150px"
      }, 500);
      slidepanel.setAttribute('data-flag', 'close');
      toggleButton.setAttribute('value', 'Open');
      //map.panBy(-150, 0);
      // change width of map to fill empty space left from collapse of sldide panel
      $('#map_canvas').animate({
          "height": "+=150px"
      }, 500);
  }
  else {
      $('slidepanel').animate({
          "marginBottom": "+=150px"
      }, 500);
      slidepanel.setAttribute('data-flag', 'open');
      toggleButton.setAttribute('value', 'Close');
      // map.panBy(150, 0);
      $('#map_canvas').animate({
          "height": "-=150px"
      });

  };

    console.log(data)
    const testWindow = document.getElementById('panelContent');
    testWindow.innerHTML= `OnClick Ran
    here's some data
    Full OBJ: ${data.url}
    Truck Name: ${data.name}
    Truck Phone: ${data.phone}`
  };

  render() {
    const GoogleMapExample = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          ref={map => {
            this.map = map;          
          }}
          defaultZoom = {props.defaultZoom}
          defaultCenter = {props.defaultCenter}
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
          containerElement={<div id={`map_canvas`} style={{ height: `50vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
 <div id="slidepanel" data-flag="open"> 
    <input  id="toggleButton" type="button" value="Close" /> 
    <p id="panelContent"></p>
</div>
      </div>
    );
  }
}

export default Map;