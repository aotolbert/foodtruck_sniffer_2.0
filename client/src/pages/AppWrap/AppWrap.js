import React, { Component } from "react";
import Header from "../../components/Header";
import Map from "../Map";
import DefaultPanel from "../../components/panels/defaultPanel";
import DetailPanel from "../../components/panels/detailPanel";
import PreviewPanel from "../../components/panels/previewPanel";
import SearchPanel from "../../components/panels/searchPanel";
import API from "../../utils/API";
import slidePanelFunctions from "../../utils/slidePanelFunctions"


class AppWrap extends Component {



    constructor(props) {
        super(props);

        this.state = { authUser: this.props.authUser, currentTruck: {}, panelStatus: "DefaultPanel", UserLocation: {lat: null, lng: null} };
    }

    getTrucks = () => {
        API.getTrucks().then((res) => this.setState({
            Trucks: res.data, 
            filterTrucks: res.data
        }));
    }

      getUserLocation = () => {
        if (navigator.geolocation && !(this.state.UserLocation === {})) {
          navigator.geolocation.getCurrentPosition(position => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
    
            this.setState({ UserLocation: pos })
          })
        }
      }

    componentDidMount() {
        this.getTrucks();
        this.getUserLocation();
    }

    // Search Functions
  searchTrucks(query){
      console.log(query);
    let trucks = this.state.Trucks.filter((truck) => {
        let name = truck.name.toLowerCase();
        let lQuery = query.toLowerCase();
      return name.includes(lQuery)
    });
    this.setState({filterTrucks: trucks})
  }
  handleSearch(event) {
    this.searchTrucks(event.target.value)
  }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    handleMarkerClick = (truck) => {
        let panelStatus = this.state.panelStatus
        if (panelStatus === "DefaultPanel") {
            slidePanelFunctions.expandFromBottomToHalf();
            this.setState({ panelStatus: "PreviewPanel", currentTruck: truck })
        } else if (panelStatus === "PreviewPanel") {
            this.setState({ currentTruck: truck })
        } else if (panelStatus === "SearchPanel") {
            slidePanelFunctions.collapseFromFullToHalf();
            this.setState({ panelStatus: "PreviewPanel", currentTruck: truck })
        } else if (panelStatus === "DetailPanel") {
            slidePanelFunctions.collapseFromFullToHalf();
            this.setState({ panelStatus: "PreviewPanel", currentTruck: truck })
        }
    }

    handleExpandToSearch = () => {
        slidePanelFunctions.expandFromBottomToFull();
        this.setState({ panelStatus: "SearchPanel" })
    }
    handleExpandToDetail = () => {
        slidePanelFunctions.expandFromHalfToFull();
        this.setState({ panelStatus: "DetailPanel" })
    }
    handleCollapseToDefault = () => {
        let panelStatus = this.state.panelStatus
        if (panelStatus === "PreviewPanel") {
            slidePanelFunctions.collapseFromHalfToBottom();
            this.setState({ panelStatus: "DefaultPanel" })
        } else if (panelStatus === "SearchPanel" || panelStatus === "DetailPanel") {
            slidePanelFunctions.collapseFromFullToBottom();
            this.setState({ panelStatus: "DefaultPanel" })

        }
    }


    render() {
        let panel;

        if (this.state.panelStatus === "DefaultPanel") {
            panel = <DefaultPanel
                onClickExpand={() => this.handleExpandToSearch}
                truckList={this.state.filterTrucks}
                searchTrucks={this.searchTrucks.bind(this)}
            />
        } else if (this.state.panelStatus === "SearchPanel") {
            panel = <SearchPanel
                truckList={this.state.filterTrucks}
                onClickCollapse={() => this.handleCollapseToDefault}
                searchTrucks={this.searchTrucks.bind(this)}
                handleSearch={this.handleSearch.bind(this)}
            />
        } else if (this.state.panelStatus === "PreviewPanel") {
            panel = <PreviewPanel
                currentTruck={this.state.currentTruck}
                onClickCollapse={() => this.handleCollapseToDefault}
                onClickExpand={() => this.handleExpandToDetail}

            />
        } else if (this.state.panelStatus === "DetailPanel") {
            panel = <DetailPanel
                currentTruck={this.state.currentTruck}
                onClickCollapse={this.handleCollapseToDefault}
            />
        }


        return (
            <div>

                <Header
                    authUser={this.props.authUser}
                />
                <Map
                    func={(truck) => this.handleMarkerClick(truck)}
                        UserLoc= {this.state.UserLocation}
                />
                {panel}

            </div>
        )


    }

}

export default AppWrap;

