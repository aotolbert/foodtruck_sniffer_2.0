import React, { Component } from "react";
import Header from "../../components/Header";
import Map from "../Map";
// import  { DefaultPanel, SearchPanel, PreviewPanel, DetailsPanel } from "../../components/SlidePanel";
import API from "../../utils/API"

class AppWrap extends Component {



    constructor(props) {
        super(props);

            this.state = { authUser: this.props.authUser, currentTruck: {}, panelStatus: "DefaultPanel" };
  
    }

    getTrucks = () => {
        API.getTrucks().then((res) => this.setState({
          Trucks: res.data
        }));
      }

    componentDidMount() {
        this.getTrucks();
    }
    
    handleMarkerClick = (truck) => {
            this.setState({ currentTruck: truck })
            this.setState({ panelStatus: "TruckPreview"})
           }

    render() {
        // let panel;

        // if (this.state.panelStatus === "DefaultPanel") {
        //     panel = <DefaultPanel/>
        // } else if (this.state.panelStatus === "SearchPanel") {
        //     panel = <SearchPanel truckList={this.state.Trucks}/>
        // } else if (this.state.panelStatus === "PreviewPanel") {
        //     panel = <PreviewPanel currentTruck={this.state.currentTruck}/>
        // } else if (this.state.panelStatus === "DetailsPanel") {
        //     panel = <DetailsPanel currentTruck={this.state.currentTruck}/>
        // } 


        return (
            <div>

            <Header
                authUser={this.props.authUser}
            />
            <Map
                func={(truck) => this.handleMarkerClick(truck)}
            />






        </div>
        )


    }

}

export default AppWrap;

