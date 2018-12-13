import React, { Component } from "react";
import Header from "../../components/Header";
import Map from "../Map";
import { withFirebase } from '../../components/Firebase';
import DefaultPanel from "../../components/panels/defaultPanel";
import DetailPanel from "../../components/panels/detailPanel";
import PreviewPanel from "../../components/panels/previewPanel";
import SearchPanel from "../../components/panels/searchPanel";
import API from "../../utils/API";
import Functions from "../../utils/functions";
import Preloader from "../../components/preloader";
import slidePanelFunctions from "../../utils/slidePanelFunctions";


class AppWrap extends Component {

    constructor(props) {
        super(props);

        this.state = { authUser: props.authUser, currentTruck: {}, panelStatus: "DefaultPanel",loadStatus:"NOTREADY",trucksRetrieved:false, favoriteTrucks:[] };
    }

    getUserData = () => {
            API.getUserRole({ uid: this.state.authUser.uid })
                .then(result => {
                    console.log("result from getUserData call: ", result)
                    const favorites = [];
                    for (let i = 0; i < result.data.Favorites.length; i++) {
                        favorites.push(result.data.Favorites[i].FoodTruckId)
                        console.log(result.data.Favorites[i].FoodTruckId)
                    }
                    this.setState({ favoriteTrucks: favorites })
                })
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
            .then((res) => { this.setState({ Trucks: res, filterTrucks: res, trucksRetrieved:true}) });
    }

    getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                this.setState({ UserLocation: pos });

            })
        }
    }
    controlAuth = () => {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            (authUser)
                ? (this.setState({ authUser }),
                    this.setState({ uid: authUser.uid }),
                    //adds uid to state
                    API.findOrCreateUser({ uid: authUser.uid, fbId: authUser.fbId })
                        .catch(err => console.log(err)))
                //Checks if user is in MYSQL DB.  Adds them if not.
                //Gets user role from db.

                : (this.setState({ authUser: null, uid: null, role: null }))
        });

    }

    componentWillMount() {
        this.controlAuth();
        this.getUserLocation();

    }
    componentDidMount() {
        this.detectScreenSize();
        window.addEventListener("resize", this.detectScreenSize.bind(this));

    }
    detectScreenSize = () => {
        const breakpoints = {
            desktop: 1040,
            tablet: 840,
            mobile: 540
        };

        if (window.innerWidth > breakpoints.tablet) {
            // do stuff for desktop
            this.setState({ deviceType: "desktop" })
            setTimeout(() => { this.setState({ panelStatus: "SearchPanel" }) }, 1000);
        } else if (window.innerWidth > breakpoints.mobile) {
            // do stuff for tablet
            this.setState({ deviceType: "tablet", panelStatus: "DefaultPanel" })
        } else if (window.innerWidth <= breakpoints.mobile) {
            // do stuff for mobile
            this.setState({ deviceType: "mobile", panelStatus: "DefaultPanel" })
        }
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
    handleSearchTileClick(truck) {
        this.setState({ panelStatus: "DetailPanel", currentTruck: truck })
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    handleMarkerClick = (truck) => {
        let panelStatus = this.state.panelStatus
        let isFavorite = false;
        if (this.state.favoriteTrucks.includes(truck.id)) {
            isFavorite = true;
            truck.isFavorite = isFavorite;
        } else {
            truck.isFavorite = isFavorite;
        }
        if (this.state.deviceType === "mobile" || this.state.deviceType === "tablet") {
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
        } else if (this.state.deviceType === "desktop") {
            if (panelStatus === "SearchPanel") {
                this.setState({ panelStatus: "DetailPanel", currentTruck: truck })
            } else if (panelStatus === "DetailPanel") {
                this.setState({ currentTruck: truck })
            }
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
        if (this.state.deviceType === "desktop" && this.state.panelStatus === "DetailPanel") {
            this.setState({ panelStatus: "SearchPanel" })
        } else {
            let panelStatus = this.state.panelStatus
            if (panelStatus === "PreviewPanel") {
                slidePanelFunctions.collapseFromHalfToBottom();
                this.setState({ panelStatus: "DefaultPanel" })
            } else if (panelStatus === "SearchPanel" || panelStatus === "DetailPanel") {
                slidePanelFunctions.collapseFromFullToBottom();
                this.setState({ panelStatus: "DefaultPanel" })

            }
        }
    }
    // Favorite Button Click Functions
    onClickFavorite = () => {
        let ID = this.state.currentTruck.id;
        if (this.state.authUser) {
            API.saveFavorite(this.state.authUser.uid, ID).then(() => {
                let currentTruck = this.state.currentTruck;
                currentTruck.isFavorite = true;
                this.state.favoriteTrucks.push(ID);
                this.setState({ currentTruck: currentTruck })
            })
            console.log("Favorite Button Clicked")
        }
    }
    onClickUnfavorite = () => {
        let ID = this.state.currentTruck.id;
        if (this.state.authUser) {
            API.deleteFavorite(this.state.authUser.uid, ID).then(() => {
                let currentTruck = this.state.currentTruck;
                currentTruck.isFavorite = false;
                var index = this.state.favoriteTrucks.indexOf(ID);
                if (index > -1) {
                    this.state.favoriteTrucks.splice(index, 1);
                }
                this.setState({ currentTruck: currentTruck })
            })
            console.log("Unfavorite Button Clicked")
        }

    }
    // Getting the User's Favorite trucks
    //  INSERT CODE HERE
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Do something with User's Favortie Trucks
    // INSERT CODE HERE
    // 

    render() {
        if(this.state.UserLocation && this.state.trucksRetrieved===false){
        this.getTrucks();
        }
        if(!this.state.authUser===null){
        this.getUserData();
        }
        if(this.state.Trucks  && this.state.UserLocation && this.state.deviceType && this.state.loadStatus==="NOTREADY"){
                        this.setState({loadStatus:"ready"})

            
        }else{
            console.log("ready function ran but failed")
        }
        let panel;
        if (this.state.deviceType === "desktop" && this.state.loadStatus === "ready") {
            if (this.state.panelStatus === "SearchPanel") {
                panel = <SearchPanel
                    truckList={this.state.filterTrucks}
                    onClickCollapse={() => this.handleCollapseToDefault}
                    searchTrucks={this.searchTrucks.bind(this)}
                    handleSearch={this.handleSearch.bind(this)}
                    onClickSearchTile={(truck) => this.handleSearchTileClick(truck)}
                    deviceType={this.state.deviceType}
                />
            } else if (this.state.panelStatus === "DetailPanel") {
                panel = <DetailPanel
                    currentTruck={this.state.currentTruck}
                    onClickCollapse={() => this.handleCollapseToDefault}
                    onClickFavorite={() => this.onClickFavorite}
                    onClickUnfavorite={() => this.onClickUnfavorite}
                    deviceType={this.state.deviceType}

                />
            }

        } else {
            if (this.state.panelStatus === "DefaultPanel"&& this.state.loadStatus === "ready") {
                panel = <DefaultPanel
                    onClickExpand={() => this.handleExpandToSearch}
                    truckList={this.state.filterTrucks}
                    searchTrucks={this.searchTrucks.bind(this)}
                    deviceType={this.state.deviceType}
                />
            } else if (this.state.panelStatus === "SearchPanel"&& this.state.loadStatus === "ready") {
                panel = <SearchPanel
                    truckList={this.state.filterTrucks}
                    onClickCollapse={() => this.handleCollapseToDefault}
                    searchTrucks={this.searchTrucks.bind(this)}
                    handleSearch={this.handleSearch.bind(this)}
                    onClickSearchTile={(truck) => this.handleSearchTileClick(truck)}
                    deviceType={this.state.deviceType}
                />
            } else if (this.state.panelStatus === "PreviewPanel"&& this.state.loadStatus === "ready") {
                panel = <PreviewPanel
                    currentTruck={this.state.currentTruck}
                    isFavorite={this.state.currentTruck.isFavorite}
                    onClickCollapse={() => this.handleCollapseToDefault}
                    onClickExpand={() => this.handleExpandToDetail}
                    onClickFavorite={() => this.onClickFavorite}
                    onClickUnfavorite={() => this.onClickUnfavorite}
                    deviceType={this.state.deviceType}

                />
            } else if (this.state.panelStatus === "DetailPanel"&& this.state.loadStatus === "ready") {
                panel = <DetailPanel
                    currentTruck={this.state.currentTruck}
                    onClickCollapse={() => this.handleCollapseToDefault}
                    onClickFavorite={() => this.onClickFavorite}
                    onClickUnfavorite={() => this.onClickUnfavorite}
                    deviceType={this.state.deviceType}
                />
            }}
        let page;
            if(this.state.loadStatus === "ready"){
               page = <div><Header
                    authUser={this.props.authUser}
                />
                <Map
                    func={(truck) => this.handleMarkerClick(truck)}
                    userLoc={this.state.UserLocation}
                />
                {panel}
                </div>
            }else{
               page = <Preloader/>
            }
        

        return (
            <div>

                {page}

            </div>
        )


    }

}

export default withFirebase(AppWrap);

