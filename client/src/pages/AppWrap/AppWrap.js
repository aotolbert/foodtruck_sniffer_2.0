import React, { Component } from "react";
import LoginControl from "../../components/LoginControl";
import Logo from "../../components/Logo";
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
import FavBtn from "../../components/FavBtn";



class AppWrap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mapCenter: "",
            mapZoom:15,
            FavoriteMode: false,
            authUser: props.authUser,
            updateMap: true,
            currentTruck: {},
            panelStatus: "DefaultPanel",
            loadStatus: "NOTREADY",
            trucksRetrieved: false,
            favoriteTrucks: []
        };
    }

    getUserData = () => {
        if (this.state.authUser) {
            API.getUserRole({ uid: this.state.authUser.uid })
                .then(result => {
                    const favorites = [];
                    for (let i = 0; i < result.data.Favorites.length; i++) {
                        favorites.push(result.data.Favorites[i].FoodTruckId)
                    }
                    this.setState({ favoriteTrucks: favorites })
                })
        }
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
            .then((res) => { this.setState({ Trucks: res, filterTrucks: res, trucksRetrieved: true, updateMap: "updated" }) });
    }
    isTruckFavorited = () => {
        return new Promise((resolve, reject) => {
            let Trucks = this.state.Trucks;
            var favTrucks = Trucks.filter(truck => this.state.favoriteTrucks.includes(truck.id))
            resolve(favTrucks);


        })


    }

    handleMapIdle = (center, zoom) => {
        this.setState({
            mapCenter: center,
            mapZoom: zoom
        })
        console.log("Map Idled")
    }


    handleFavoriteModeToggle = () => {
        if (this.state.FavoriteMode === false) {
            this.setState({ updateMap: "updating" })
            this.isTruckFavorited().then((res) => { this.setState({ Trucks: res, filterTrucks: res, FavoriteMode: true, updateMap: "updated" }) })
        } else if (this.state.FavoriteMode === true) {
            this.setState({ updateMap: "updating", FavoriteMode: false })
            this.getTrucks();
        }
    }


    getUserLocation = () => {
        if (navigator.geolocation) {
            var pos;
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("success", position.coords)
                    pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                },
                (positionError) => {
                    if (positionError.code === 1 || positionError.code === 2 || positionError.code === 3) {
                        pos = {
                            lat: 35.22,
                            lng: -80.84
                        };
                        this.setState({ UserLocation: pos, mapCenter: pos });
                    };

                    console.log("fail", positionError.code)
                }
            )
            console.log(navigator.geolocation);
        }
    }
    controlAuth = () => {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            return ((authUser)
                ? (this.setState({ authUser }),
                    this.setState({ uid: authUser.uid }),
                    //adds uid to state
                    API.findOrCreateUser({ uid: authUser.uid, fbId: authUser.fbId })
                        .then(this.getUserData())
                        .catch(err => console.log(err)))
                //Checks if user is in MYSQL DB.  Adds them if not.
                //Gets user role from db.

                : (this.setState({ authUser: null, uid: null, role: null }))
            )
        });

    }

    componentWillMount() {
        this.controlAuth();
        this.getUserLocation();

    }
    componentDidMount() {
        this.detectScreenSize();
        // window.addEventListener("resize", this.detectScreenSize.bind(this));

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
            this.setState({ deviceType: "tablet" })
        } else if (window.innerWidth <= breakpoints.mobile) {
            // do stuff for mobile
            this.setState({ deviceType: "mobile" })
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
        let isFavorite = false;
        if (this.state.favoriteTrucks.includes(truck.id)) {
            isFavorite = true;
            truck.isFavorite = isFavorite;
        } else {
            truck.isFavorite = isFavorite;
        }
        this.setState({ panelStatus: "DetailPanel", currentTruck: truck, filterTrucks: this.state.Trucks })
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
                this.setState({ panelStatus: "DefaultPanel", filterTrucks: this.state.Trucks })

            }
        }
    }
    // Panel Button Functions
    handleDirectionsClick = () => {
        let address = this.state.currentTruck.address
        let pre = 'http://maps.google.com/?q='
        let href = pre + address
        window.location.href = href;
    }
    handleWebsiteClick = () => {
        window.location.href = this.state.currentTruck.url;
    }
    handlePhoneClick = () => {
        let phone = this.state.currentTruck.phone
        window.open(`tel: ${phone}`)
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
        if (this.state.UserLocation && this.state.trucksRetrieved === false) {
            this.getTrucks();
        }
        if (this.state.Trucks && this.state.UserLocation && this.state.deviceType && this.state.loadStatus === "NOTREADY") {
            this.setState({ loadStatus: "ready" })

        } else {
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
                    onClickDirections={() => this.handleDirectionsClick}
                    onClickWebsite={() => this.handleWebsiteClick}
                    onClickPhone={() => this.handlePhoneClick}


                />
            }

        } else {
            if (this.state.panelStatus === "DefaultPanel" && this.state.loadStatus === "ready") {
                panel = <DefaultPanel
                    onClickExpand={() => this.handleExpandToSearch}
                    truckList={this.state.filterTrucks}
                    searchTrucks={this.searchTrucks.bind(this)}
                    deviceType={this.state.deviceType}
                />
            } else if (this.state.panelStatus === "SearchPanel" && this.state.loadStatus === "ready") {
                panel = <SearchPanel
                    truckList={this.state.filterTrucks}
                    onClickCollapse={() => this.handleCollapseToDefault}
                    searchTrucks={this.searchTrucks.bind(this)}
                    handleSearch={this.handleSearch.bind(this)}
                    onClickSearchTile={(truck) => this.handleSearchTileClick(truck)}
                    deviceType={this.state.deviceType}
                />
            } else if (this.state.panelStatus === "PreviewPanel" && this.state.loadStatus === "ready") {
                panel = <PreviewPanel
                    currentTruck={this.state.currentTruck}
                    isFavorite={this.state.currentTruck.isFavorite}
                    onClickCollapse={() => this.handleCollapseToDefault}
                    onClickExpand={() => this.handleExpandToDetail}
                    onClickFavorite={() => this.onClickFavorite}
                    onClickUnfavorite={() => this.onClickUnfavorite}
                    deviceType={this.state.deviceType}
                    onClickDirections={this.state.handleDirectionsClick}
                    onClickPhone={() => this.handlePhoneClick}
                    onClickWebsite={() => this.handleWebsiteClick}

                />
            } else if (this.state.panelStatus === "DetailPanel" && this.state.loadStatus === "ready") {
                panel = <DetailPanel
                    currentTruck={this.state.currentTruck}
                    onClickCollapse={() => this.handleCollapseToDefault}
                    onClickFavorite={() => this.onClickFavorite}
                    onClickUnfavorite={() => this.onClickUnfavorite}
                    deviceType={this.state.deviceType}
                    onClickDirections={() => this.handleDirectionsClick}
                    onClickPhone={() => this.handlePhoneClick}
                    onClickWebsite={() => this.handleWebsiteClick}

                />
            }
        }
        let page;
        if (this.state.loadStatus === "ready" && this.state.updateMap === "updated") {
            page = <div>
                <LoginControl
                    authUser={this.props.authUser}
                />
                <Logo />
                <FavBtn
                    onClick={this.handleFavoriteModeToggle}
                    id={"favToggle"}
                />
                <Map
                    func={(truck) => this.handleMarkerClick(truck)}
                    userLoc={this.state.UserLocation}
                    Trucks={this.state.Trucks}
                    update={this.state.updateMap}
                    Center={this.state.mapCenter}
                    Zoom={this.state.mapZoom}
                    onIdle={this.handleMapIdle}
                />
                {panel}
            </div>
        } else if (this.state.loadStatus === "ready" && this.state.updateMap === "updating") {
            page = <div>
                <LoginControl
                    authUser={this.props.authUser}
                />
                <Logo />
                <FavBtn
                    onClick={this.handleFavoriteModeToggle}
                    id={"favToggle"}
                />
                <Preloader />
                {panel}
            </div>
        } else {
            page = <Preloader />
        }


        return (
            <div>

                {page}

            </div>
        )


    }

}

export default withFirebase(AppWrap);

