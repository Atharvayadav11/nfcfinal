import React, { useEffect, useRef } from 'react';
import { useComplaints } from './ComplaintContext';

const Map = ({ centerCoordinates }) => {
  const mapRef = useRef(null);
  const { coordinates } = useComplaints(); // Destructure coordinates directly

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });
    };

    const initializeMap = async () => {
      try {
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-core.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-service.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-ui.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-clustering.js');

        if (!window.H) {
          console.error('HERE Maps API is not loaded.');
          return;
        }

        const platform = new window.H.service.Platform({
          apikey: "EUo1MGjBVYpoSBntj6xc",
        });

        const defaultLayers = platform.createDefaultLayers();

        const map = new window.H.Map(mapRef.current, defaultLayers.vector.normal.map, {
          center: centerCoordinates || { lat: 20.5937, lng: 78.9629 },
          zoom: 5,
          pixelRatio: window.devicePixelRatio || 1,
        });

        const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
        const ui = window.H.ui.UI.createDefault(map, defaultLayers);

        console.log('Coordinates:', coordinates);

        // Add markers using coordinates
        coordinates.forEach(([lat, lng]) => {
          if (lat && lng) {
            const marker = new window.H.map.Marker({ lat, lng });
            marker.setData('Location');
            marker.addEventListener('tap', (evt) => {
              const bubble = new window.H.ui.InfoBubble(evt.target.getGeometry(), {
                content: evt.target.getData()
              });
              ui.addBubble(bubble);
            });
            map.addObject(marker);
          }
        });

        const addCircleToMap = (map, center) => {
          const circle = new window.H.map.Circle(
            center,
            1000,
            {
              style: {
                strokeColor: 'rgba(55, 85, 170, 0.6)',
                lineWidth: 2,
                fillColor: 'rgba(0, 128, 0, 0.7)'
              }
            }
          );
          map.addObject(circle);
        };

        if (centerCoordinates) {
          map.setCenter(centerCoordinates);
          map.setZoom(14);
          addCircleToMap(map, centerCoordinates);
        }

        return () => {
          map.dispose();
        };
      } catch (error) {
        console.error('Map initialization error:', error);
      }
    };

    initializeMap();
  }, [centerCoordinates, coordinates]); // Update dependencies

  return (
    <div>
      <h1>Map with Dynamic Location</h1>
      <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
    </div>
  );
};

export default Map;
