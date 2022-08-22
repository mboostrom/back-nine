import React from "react"
import { GoogleMap, LoadScript, Marker, InfoWindow, GoogleApiWrapper } from "@react-google-maps/api"
import mapStyle from "../services/mapStyles"
import SearchMap from './SearchMap'
const libraries = ["places"];

const FindCourses = (props) => {
  const mapStyles = {
    height: "92vh",
    width: "99.9vw",
  }

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);

  const defaultCenter = {
    lat: 42.31329132865801,
    lng: -71.1541408350923,
  }

  const options = {
    styles: mapStyle,
    mapTypeId: "satellite",
    disableDefaultUI: true,
  }

  return (
    <div className="map">
      <LoadScript googleMapsApiKey="AIzaSyD3KGnboB284ixjS_WITauqlV7i_nqSNDc" libraries={libraries}>
        <div className="search">
          <SearchMap panTo={panTo}/>
        </div>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={16}
          center={defaultCenter}
          options={options}
          onLoad={onMapLoad}
        />
      </LoadScript>
    </div>
  )
}
export default FindCourses
