import React from "react";
import "./HanddiForm.css";
import { Form, Button } from "react-bootstrap";
import GoogleMapReact from "google-map-react";
import PlacesAutocomplete from "react-places-autocomplete";
import Marker from "./Marker";
import {geocodeByAddress,getLatLng} from "react-places-autocomplete";

class HanddiForm extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      address: "",
      distance:'',
      melbourneLat:-37.8136276,
      melbourneLng: 144.9630576,
      center: {
        lat: -37.8136276,
        lng: 144.9630576,
      },
      zoom: 11,
      addressList : []
    };
    this.getdata = this.getdata.bind(this);
  }

  handleChange = (address: any) => {
    this.setState({ address });
  };

  handleSelect = (address: any) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({
          center: {
            lat: latLng.lat,
            lng: latLng.lng,
          },
          zoom: 13,
          distance : this.getDistanceFromLatLonInKm(this.state.melbourneLat , this.state.melbourneLng,latLng.lat,latLng.lng).toFixed(2)+ " KM"
        });
      const distance=this.getDistanceFromLatLonInKm(this.state.melbourneLat , this.state.melbourneLng,latLng.lat,latLng.lng)
        console.log("Success", latLng);
        console.log("distance",distance.toFixed(2))
      })
      .catch((error) => console.error("Error", error));
  };
  getdata(data: any) {
    this.setState({address : data.description})
  }
  addAddress() {
      const addrData = {
        address : this.state.address,
        distance : this.state.distance,
        lat : this.state.center.lat,
        lng : this.state.center.lng,
      }
      this.setState({addressList:[...this.state.addressList , addrData] ,address: ''})
  }
  deg2rad(deg:any) {
    return deg * (Math.PI/180)
  }
  getDistanceFromLatLonInKm(lat1:any, lon1:any, lat2:any, lon2:any) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  render() {
    return (
      <div className="root-container">
        <div className="mainBox">
          <div className="row headerTab">
            <div className={"col-12 tabNew active"}>Address Form</div>
          </div>
          <div className="boxContainer">
            <div className="map-container">
              <Form>
                <PlacesAutocomplete
                  value={this.state.address}
                  onChange={this.handleChange}
                  onSelect={this.handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <div className="input-box">
                        <div className="text-box">
                          <Form.Group controlId="formBasicEmail">
                            <Form.Control
                              {...getInputProps({
                                placeholder: "Search Places ...",
                                className: "location-search-input",
                              })}
                            />
                          </Form.Group>
                        </div>

                        <div className="btn-container">
                          <Button className="loginBtn" onClick={()=> this.addAddress()}>Add Address</Button>
                        </div>
                      </div>
                      <div className="suggestion-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion, keyValue) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span
                                onClick={() => this.getdata(suggestion)}
                                key={keyValue}
                              >
                                {suggestion.description}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                <div className="map-container">
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyBi0osoOgcSYwrar7kzbBE0Alw8MHQ_LV0",
                    }}
                    center={this.state.center}
                    zoom={this.state.zoom}
                  >{ this.state.addressList && this.state.addressList.map((val:any,key:any)=>
                    <Marker
                      lat={val.lat}
                      lng={val.lng}
                      name="My Marker"
                      color="blue"
                      markerInfo={val}
                    />
                  )}
                  </GoogleMapReact>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="listBox">
          <div className="row headerTab">
            <div className={"col-12 tabNew active"}>Address List</div>
            <div className="itemContainer">
              { this.state.addressList && this.state.addressList.map((val:any,key:any)=>
                   <div className="row listItem" key={key}>
                      <div className="col-1">{key + 1}</div>
                      <div className="col-10">
                        <ul>
                          <li><b>Address: </b> {val.address}</li>
                          <li><b>Distance:</b> {val.distance}</li>
                          <li><b>Latitude:</b> {val.lat}</li>
                          <li><b>Longitude:</b> {val.lng}</li>
                        </ul>
                        </div>
                      <div className="col-1"></div>
                   </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HanddiForm;