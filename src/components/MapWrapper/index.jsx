import Map from "../Map/index.jsx";
import { geolocated } from "react-geolocated";

const emptyObj = {};
function MapWrapper(props) {
    // const {latitude} = props.coords || emptyObj;
    // console.log("props.coords",props.coords, latitude)
    
    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: AppSettings.GOOGLE_MAP_KEY,
    // });

    // if(!latitude){

    //     return null;
    // }

    return <Map {...props} coords={emptyObj} />;
}

export default geolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
  })(MapWrapper);