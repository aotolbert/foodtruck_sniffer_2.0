import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";
import API from "../../utils/API";

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
    this.setState({
      truckName: data.name,
      truckPhone: data.phone,
      truckUrl: data.url
    })
    console.log(data)
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
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;