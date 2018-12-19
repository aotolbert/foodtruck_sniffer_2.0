import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";
// import API from "../../utils/API";

class Map extends Component {

  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.state = {
      Trucks: props.Trucks,
      Attempts: 0,
      update: props.update,
      UserLocation: props.userLoc
    };
  }

  componentWillMount() {
  }
  componentDidMount() {

    this.setState({
      Center: this.props.Center,
      Zoom: this.props.Zoom
    })
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        Trucks: nextProps.Trucks,
        update: nextProps.update
      });
    }
  }

  shouldComponentUpdate() {
    if (this.state.update === "updated") {
      return false; // Will cause component to never re-render.
    }
    return true
  }

  


  render() {
    const defaultMapOptions = {
      disableDefaultUI: true,
      zoomControl: true,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b2d5b9"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b1b1ff"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
      
        }

    const GoogleMapExample = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          ref={map => {
            this.map = map;
          }}
          defaultOptions={defaultMapOptions}
          defaultZoom={this.state.Zoom}
          defaultCenter={this.state.Center}
          onIdle={props.onIdle}
          onZoomChange={props.onZoomChange}

        >
          {this.state.Trucks.map(truck => (
            <Marker

              key={truck.id}
              position={{ lat: truck.lat, lng: truck.long }}
              onClick={() => { props.func(truck) }}
              icon={
                {
                  url: 'mapIcon.png',
                  scaledSize: { width: 45, height: 64.5 },
                }
              }
            // icon="../../client/public.mapIcon copy.png"
            />
          ))}
          <Marker
            position={this.state.UserLocation}
            icon={
              {
                url: 'currentLocation.png',
                scaledSize: { width: 30, height: 30 },
                anchor: { x: 15, y: 15 },
              }
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
          Zoom={this.state.Zoom}
          Center={this.state.Center}
          onIdle={() => {
            let center = this.map.getCenter();
            let zoom = this.map.getZoom();
            this.props.onIdle(center,zoom);
          }}
          onZoomChange={() => {
            let center = this.map.getCenter();
            let zoom = this.map.getZoom();
            this.props.onIdle(center,zoom);
          }}
          
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
