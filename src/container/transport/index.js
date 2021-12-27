import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Select, Space, Card } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerCheck } from '@fortawesome/pro-duotone-svg-icons';
import { Main } from '../styled';
import Swal from 'sweetalert2';
import { getBusLoc } from '../../api/api';
import CustomTable from '../fee/dashboard/Components/Table';
import { faPencil, faTrash ,faTruck} from '@fortawesome/pro-duotone-svg-icons';
import { useSelector } from 'react-redux';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
// import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import L from 'leaflet';
import { Map, Marker, TileLayer, Popup,Polyline   } from 'react-leaflet';
// import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';
import 'leaflet/dist/leaflet.css';
import {
  LeafletMapBasic,
  LeafletMapMultipleIcon,
  LeafletMapCustomIcon,
  LeafletMarkerCluster,
} from '../../components/maps/leaflet';
import TransportModal from './transportModal';
const { Option } = Select;


const fontAwesomeIcon = L.divIcon({
  html: '<i style="color: #2A81CB" class="fa fa-bus fa-2x"></i>',
  iconSize: [20, 20],
  className: 'myDivIcon',
});
const containerStyle = {
  width: '500px',
  height: '500px'
};

const center = {
  lat: 13.0827,
  lng: 80.2707
};
const Transport = () => {
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: "AIzaSyBOQIH7bQ9Spfba1kF1ssa6xKv6WlljjX0"
  // })
  // const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const [location, setLocation] = useState([]);
  const lat = location.map(item => item.latitude);
  const lng = location.map(item => item.longitude);

  // var position = [];
  // // var markers = { position };
  // for (var i = 0; i < 2; i++) {
  //   var latitude = lat[i];
  //   var longitude = lng[i];
  //   position.push({ latitude, longitude });
  // }
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  useEffect(() => {
    getBusLoc()
      .then(res => {
        setLocation(res.data.vehicles);
      })
      .catch(e => {
        console.log(e);
      });
    // getBusLoc()
    //   .then(res => {
    //     setDetails(res.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  }, []);
  useEffect(()=>{
    setTimeout(()=>{
      console.log('loading data');
      getBusLoc()
      .then(res => {
        setLocation(res.data.vehicles);
      })
      .catch(e => {
        console.log(e);
      });
    },60000)
    console.log('time executed')
  },[location])

  const polyline = [[57, -19], [60, -12]];

  const pos = [
    [13.0592866, 80.17227],
    [13.05945, 80.1724866], //to jpn
  ];
  return (
    <div>
      <PageHeader
        ghost
        buttons={
          [
              <Button size="small" type="primary" onClick={toggleCreate}>
                <FeatherIcon icon="plus" size={15} />
                Add Vehicle
              </Button>,
          ]
        }
        title="Transport"
      />
      <Main>
      <TransportModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />
        <Row gutter={15}>
          <Col xxl={12} md={12} sm={24} xs={24}>
            <Row gutter={10}>
              <Col xxl={15} lg={15} md={15} sm={24} xs={24} style={{ marginBottom: '10px' }}>
                <Select showSearch style={{ width: '100%' }} placeholder="Search Vehicles" size="middle">
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
              </Col>
              <Col xxl={4} lg={4} md={4} xs={24} sm={24}>
                <Button type="success" style={{ width: '100%' }}>
                  Vehicles
                </Button>
              </Col>
              <Col xxl={4} lg={4} md={4} xs={24} sm={24}>
                <Button type="primary" style={{ width: '100%' }}>
                  Location
                </Button>
              </Col>
            </Row>

            {location.map(e => {
              return (
                <Card
                  actions={[
                    <Button type="default" size="small" style={{ width: '100%' }}>
                      History
                    </Button>,
                    <Button type="default" size="small" style={{ width: '100%' }}>
                      Details
                    </Button>,
                    <Button type="default" size="small" style={{ width: '100%' }}>
                      Add Tag
                    </Button>,
                    <Button type="default" size="small" style={{ width: '100%' }}>
                      Historical Location
                    </Button>,
                  ]}
                  style={{ marginBottom: '20px' }}
                >
                  <h3><strong>vehicle No:</strong>{e.vehicleNumber} &nbsp; &nbsp; <strong>vehicleName:</strong>{e.vehicleName}</h3>
                  <h3> Driver: Not Assigned</h3>
                  <h3>
                    <FontAwesomeIcon icon={faClock} style={{ fontSize: 15, color: 'gray ' }} /> &nbsp; An Hour |{' '}
                    {e.currentStatus}
                  </h3>
                  <h3>
                    <FontAwesomeIcon icon={faMapMarkerCheck} style={{ fontSize: 15, color: 'gray ' }} />{' '}
                    <span style={{ color: 'lightgreen', fontWeight: 'bold' }}> &nbsp; Everwin Public School</span>
                  </h3>
                </Card>
              );
            })}
          </Col>
          <Col md={12} sm={24} xs={24}>
          <Map style={{ height: '800px', width: '40vw' }} center={[13.0827,80.2707]} zoom={10} scroolwheelZoom={false}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {location.map(item => {
                return (
                  <Marker key={item.vehicleId} position={[item.latitude,item.longitude]} icon={fontAwesomeIcon}>
                     {/* <Polyline positions={[13.0592866,80.17227],[item.latitude,item.longitude]} color="red" /> */}
                    <Popup>
                      A pretty CSS3 popup.
                      <br />
                      Easily customizable.
                    </Popup>
                  </Marker>
                );
              })}
            </Map>

          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default Transport;
