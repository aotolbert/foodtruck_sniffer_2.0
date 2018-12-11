import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";
import API from "../../utils/API";

class Map extends Component {
  state = {
    Trucks: [],
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.setState({ UserLocation: pos})
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
          defaultZoom={15}
          defaultCenter={this.state.UserLocation}
        >
          {this.state.Trucks.map(truck => (
            <Marker
            
              key={truck.id}
              position={{ lat: truck.lat, lng: truck.long }}
              onClick={() => {props.func(truck)}}
              icon="https://i.ibb.co/Mn0Tsjq/map-Icon-copy.png"
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
          defaultCenter={this.state.UserLocation}
          defaultZoom={15}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXPLNC4fiegkxVGxN1O2L6SRfqhGwBYgA"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div id={`map_canvas`} style={{ height: `90vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />

      </div>
    );
  }
}

export default Map;
