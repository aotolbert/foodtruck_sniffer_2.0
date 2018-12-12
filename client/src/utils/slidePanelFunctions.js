import $ from "jquery";


export default {
// Expand from bottom to half
expandFromBottomToHalf:() => {
    $('#slidepanel').animate({
        "height": "+=20vh"
    }, 500);
    $('#map_canvas').animate({
        "height": "-=20vh"
    }, 500);
},
// Expand from bottom to full
expandFromBottomToFull:() => {
    $('#slidepanel').animate({
        "height": "+=70vh"
    }, 500);
    $('#map_canvas').animate({
        "height": "-=70vh"
    }, 500);
},

// Expand from half to full
expandFromHalfToFull:() => {
    $('#slidepanel').animate({
        "height": "+=30vh"
    }, 500);
    $('#map_canvas').animate({
        "height": "-=30vh"
    }, 500);
},

// Collapse from full to bottom
collapseFromFullToBottom:() => {
    $('#slidepanel').animate({
        "height": "-=50vh"
    }, 500);
    $('#map_canvas').animate({
        "height": "+=50vh"
    }, 500);
},
// Collapse from full to half
collapseFromFullToHalf:() => {
    $('#slidepanel').animate({
        "height": "-=50vh"
    }, 500);
    $('#map_canvas').animate({
        "height": "+=50vh"
    }, 500);
},

// Collapse from half to bottom
collapseFromHalfToBottom:() => {
    $('#slidepanel').animate({
        "height": "-=20vh"
    }, 500);
    $('#map_canvas').animate({
        "height": "+=20vh"
    }, 500);
}
}