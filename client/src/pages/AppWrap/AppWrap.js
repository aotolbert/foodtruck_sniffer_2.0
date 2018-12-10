import React, { Component } from "react";
import Header from "../../components/Header";
import Map from "../Map";
import FavBtn from "../../components/FavBtn";
import DefaultPanel from "../../components/panels/defaultPanel";
import DetailPanel from "../../components/panels/detailPanel";
import PreviewPanel from "../../components/panels/previewPanel";
import SearchPanel from "../../components/panels/searchPanel";
import API from "../../utils/API";
import Functions from "../../utils/functions"
import slidePanelFunctions from "../../utils/slidePanelFunctions"


class AppWrap extends Component {

    constructor(props) {
        super(props);
        this.state = { authUser: this.props.authUser, currentTruck: {}, panelStatus: "DefaultPanel" };
    }

    getTrucks = () => {
        API.getTrucks()
            .then((res) => {
                let trucks = res.data;
                let lat1 = this.state.UserLocation.lat;
                let lon1 = this.state.UserLocation.lng;
                let dTrucks = [];
                trucks.map((truck) => {
                    let lat2 = truck.lat;
                    let lon2 = truck.long;
                    let distance = Math.round(Functions.distanceFrom(lat1, lon1, lat2, lon2) * 10) / 10;
                    truck.distance = distance;
                    dTrucks.push(truck);
                    return "finished"
                })
                let Trucks = dTrucks.sort((a, b) => a.distance - b.distance);

                return Trucks

            })
            .then((res) => { this.setState({ Trucks: res, filterTrucks: res }) });
    }

    getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                this.setState({ UserLocation: pos });
                this.getTrucks();

            })
        } else {
            this.getTrucks();
        }
    }

    componentDidMount() {
        this.getUserLocation()
    }

    // Search Functions
    searchTrucks(query) {
        console.log(query);
        let trucks = this.state.Trucks.filter((truck) => {
            let name = truck.name.toLowerCase();
            let lQuery = query.toLowerCase();
            return name.includes(lQuery)
        });
        this.setState({ filterTrucks: trucks })
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
    // Favorite Button Click Functions
    onClickFavorite = () => {
        console.log("Favorite Button Clicked")
    }
    onClickUnfavorite = () => {

    }
    // Getting the User's Favorite trucks
    //  INSERT CODE HERE
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Do something with User's Favortie Trucks
    // INSERT CODE HERE
    // 

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
                onClickFavorite={() => this.onClickFavorite}
                onClickUnfavorite={() => this.onClickUnfavorite}

            />
        } else if (this.state.panelStatus === "DetailPanel") {
            panel = <DetailPanel
                currentTruck={this.state.currentTruck}
                onClickCollapse={this.handleCollapseToDefault}
                onClickFavorite={() => this.onClickFavorite}
                onClickUnfavorite={() => this.onClickUnfavorite}
            />
        }


        return (
            <div>

                <Header
                    authUser={this.props.authUser}
                />
                <Map
                    func={(truck) => this.handleMarkerClick(truck)}
                    userLoc={this.state.UserLocation}
                />
                {panel}

            </div>
        )


    }

}

export default AppWrap;

