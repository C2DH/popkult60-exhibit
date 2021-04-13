import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const MapboxWrapper = ({
  height = 100, width = 100,
  fixed=false,
  initialLng=-70.9,
  initialLat=42.35,
  initialZoom=11,
  zIndex=-1,
  top = 0,
  left = 0,
  // map.fitBounds([
  //   [32.958984, -5.353521],
  //   [43.50585, 5.615985]
  // ]);
  bbox=[],
}) => {
  const mapContainer = useRef();
  const map = useRef(null);


  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: process.env.REACT_APP_MAPBOX_STYLE_URL || 'mapbox://styles/mapbox/streets-v11',
        center: [initialLng, initialLat],
        zoom: initialZoom
      });
      console.info('MapboxWrapper just created a Map() instance.')
    }
    return () => map.current.remove();
  }, [initialLng, initialLat, initialZoom]);

  useEffect(() => {
    if (map.current) {
      map.current.scrollZoom.disable();
    }
  }, [])

  useEffect(() => {
    if (bbox.length && map.current) {
      map.current.fitBounds(bbox, {
        padding: 10,
      });
    }
  }, [bbox])

  return (
    <div className="MapboxWrapper" ref={mapContainer} style={{
      position: fixed ? 'fixed' : 'absolute',
      top,
      left,
      zIndex,
      width,
      height,
    }}/>
  );
}

export default MapboxWrapper
