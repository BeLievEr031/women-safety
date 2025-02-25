import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// Custom icon
const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
});

// Component to update map dynamically (if needed)
const MapViewUpdater = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    map.setView(position, 25); // Adjust zoom to fit all markers initially
    return null;
};

const GeoFencingMap: React.FC = () => {
    const locations = [
        { name: "Taj Mahal", lat: 27.175144, lng: 78.042142 },
        { name: "Central Park", lat: 40.785091, lng: -73.968285 },
        { name: "Eiffel Tower", lat: 48.858844, lng: 2.294351 },
        { name: "Sydney Opera House", lat: -33.856784, lng: 151.215297 },
        { name: "Great Wall of China", lat: 40.431908, lng: 116.570374 },
    ];

    const initialPosition: [number, number] = [locations[0].lat, locations[0].lng];

    return (
        <div className="relative">
            <MapContainer center={initialPosition} zoom={2} className="h-96 w-full rounded-lg">
                <MapViewUpdater position={initialPosition} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Render markers and circles */}
                {locations.map((location, index) => (
                    <React.Fragment key={index}>
                        <MarkerWithZoom location={location} />
                        {/* Blue Circle with 50m Radius */}
                        <Circle
                            center={[location.lat, location.lng]}
                            radius={50} // 50 meters
                            pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.3 }}
                        />
                    </React.Fragment>
                ))}
            </MapContainer>
        </div>
    );
};

// 🔍 Component for Marker with Click-to-Zoom Feature
const MarkerWithZoom = ({ location }: { location: { name: string; lat: number; lng: number } }) => {
    const map = useMap();

    const handleMarkerClick = () => {
        map.setView([location.lat, location.lng], 50, { animate: true }); // Zoom to 15 on click
    };

    return (
        <Marker position={[location.lat, location.lng]} icon={customIcon} eventHandlers={{ click: handleMarkerClick }}>
            <Popup>📍 {location.name}</Popup>
        </Marker>
    );
};

export default GeoFencingMap;
