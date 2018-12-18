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
      Trucks: res.data, updated:true
    }));
  }

  getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({ UserLocation: pos })
      })
    }
  }


  render() {
    const defaultMapOptions = {
      disableDefaultUI: true,
      zoomControl: true,
      defaultCenter: this.state.UserLocation,
      styles: [
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#57B279"
                }
            ]
        }
    ],
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
              icon={
                { url: 'mapIcon.png',
                 scaledSize: { width: 45, height: 64.5},}
               }
              // icon="../../client/public.mapIcon copy.png"
            />
          ))}
          <Marker
            position={this.state.UserLocation}
           icon= {
             { url: 'currentLocation.png',
              scaledSize: { width: 30, height: 30},
              anchor: { x: 15, y: 15 },}
            }
            // icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
             />
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
