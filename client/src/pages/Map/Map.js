import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";
import API from "../../utils/API";

class Map extends Component {

  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.state = {
      Trucks: [],
      Attempts: 0,
      updated:false,
    };
  }

  handleMapMarker = () => {
  }
  componentWillMount() {
    this.getUserLocation()
  }
  componentDidMount() {
    this.getTrucks()
  }

  shouldComponentUpdate() {
    if (this.state.updated === true) {
      return false; // Will cause component to never re-render.
    }
    return true
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
        this.setState({ UserLocation: pos, updated:true })
      })
    }
  }


  render() {
    const defaultMapOptions = {
      disableDefaultUI: true,
      defaultCenter: this.state.UserLocation
    }
    const GoogleMapExample = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          ref={map => {
            this.map = map;
          }}
          defaultOptions={defaultMapOptions}
          defaultZoom={props.Zoom}
          defaultCenter={this.state.UserLocation}
        >
          {this.state.Trucks.map(truck => (
            <Marker
            
              key={truck.id}
              position={{ lat: truck.lat, lng: truck.long }}
              onClick={() => { props.func(truck) }}
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
          Zoom={20}
          Center={this.state.UserLocation}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXPLNC4fiegkxVGxN1O2L6SRfqhGwBYgA"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div id={`map_canvas`} />}
          mapElement={<div style={{ height: `100%` }} />}
        />

      </div>
    );
  }
}

export default Map;
