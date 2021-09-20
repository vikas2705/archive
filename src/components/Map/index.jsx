import React, { useCallback, useRef } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import LocationMarker from "../../assets/Icons/LocationMarker/marker.png"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import actions from "../../actions";
import { selectors } from "../../reducers";
import { makeStyles } from "@material-ui/core";

const google = window.google;
const emptySet = [];
const emptyObj = {};
const useStyles = makeStyles({
  loading: {
    color: '#5e5e5e',
    fontSize: 16,
    marginTop: '5%',
    textAlign: 'center'
  }
})
const center = { lat: 9.248134, lng: 78.178407 }
function Map({ type, onSelect, coords = emptyObj }) {
  const classes = useStyles();
  const [map, setMap] = React.useState(null)

  const refMap = useRef(null);
  const { latitude: lat, longitude: lng } = coords;
  const dispatch = useDispatch();
  const { defaultCenterInformation = emptyObj,
    // defaultZoominformation = emptyObj, 
    markersInformation = emptySet, status } = useSelector(state => selectors.equipmentMapLocations(state));
  useEffect(() => {
    dispatch(actions.equipmentLocations.mapLocations.request(
      {
        lat: lat,
        lng: lng,
        eqpOrLoc: type === 'equipment' ? 'E' : 'L'
      }
    ))
  }, [dispatch, lat, lng, type])
  const handleMarkerClick = (EqpLocCode) => {
    onSelect({ EqpLocCode })
  };

  useEffect(() => {
    if (defaultCenterInformation.defaultLat && map) {
      setTimeout(() => {
        console.log("hey")
        map.setCenter(center);
      }, 500)
    }
  }, [map, defaultCenterInformation])
  const handleOnLoad = useCallback(_map => {
    const bounds = new google.maps.LatLngBounds();
    // markersInformation.forEach(({ eqpLat, eqpLong }) => 
    // {
    //     bounds.extend({ lat: eqpLat, lng: eqpLong })
    // });
    _map.fitBounds(bounds);
    setMap(_map);
  }, []);
  return (
    <>
      {   !defaultCenterInformation.defaultLat ? (
        <div className={classes.loading}>Loading...</div>
      ) :
        (
          <GoogleMap
            ref={refMap}
            onLoad={handleOnLoad}
            mapContainerStyle={{ height: "100%" }}
            center={center}
          // zoom={5}
          >
            {markersInformation.map(({ eqpLat, eqpLong, EqpOrLocationCode, EqpOrLocationDesc }) => (
              <Marker
                key={EqpOrLocationCode}
                position={{ lat: eqpLat, lng: eqpLong }}
                icon={LocationMarker}
                onClick={() => handleMarkerClick(EqpOrLocationCode)}
              >
                <InfoWindow position={{ lat: eqpLat, lng: eqpLong }} options={{ pixelOffset: new google.maps.Size(0, -1) }}
                >
                  <div onClick={() => handleMarkerClick(EqpOrLocationCode)}>
                    <div style={{ color: "#0073E6", fontWeight: 500 }}>
                      {EqpOrLocationDesc}
                    </div>
                    <div style={{ color: "#7D8597", fontWeight: 400, paddingTop: "5px" }}>
                      {EqpOrLocationCode}
                    </div>
                  </div>
                </InfoWindow>
              </Marker>
            ))}
          </GoogleMap>
        )}
    </>

  );
}

export default Map;
