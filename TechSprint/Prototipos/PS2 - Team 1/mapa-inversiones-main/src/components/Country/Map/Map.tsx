"use client";

import React, { useState, useRef } from "react";
import Map, { Source, Layer, Popup, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";
import { Card, CardContent, Typography, Box, Link } from "@mui/material";
import NextLink from "next/link";
import { IProject } from "@/types/Project";

interface MapComponentProps {
  projects: IProject[];
}

export default function MapComponent({ projects }: MapComponentProps) {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 18.7357,
    longitude: -70.1627,
    zoom: 7,
  });
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const mapRef = useRef<MapRef | null>(null);

  const handleViewportChange = (newViewport: any) => {
    setViewport(newViewport);
  };

  const onClick = (event: any) => {
    const feature = event.features[0];
    if (!feature) return;

    if (feature.properties.cluster_id) {
      const clusterId = feature.properties.cluster_id;
      const mapboxSource = mapRef.current?.getSource(
        "locations"
      ) as mapboxgl.GeoJSONSource;
      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;
        if (mapRef.current) {
          mapRef.current.easeTo({
            center: feature.geometry.coordinates,
            zoom: zoom || 0,
            duration: 1200,
          });
        }
      });
    } else {
      setSelectedLocation(feature);
    }
  };

  // Convert projects to GeoJSON
  const geojsonData = {
    type: "FeatureCollection",
    features: projects.map((project) => ({
      type: "Feature",
      properties: {
        id: project.IdProyecto,
        programmedValue: project.valorprogramado,
        executedValue: project.valorejecutado,
        projectName: project.NombreProyecto,
        state: project.EtapaActual,
      },
      geometry: {
        type: "Point",
        coordinates: [project.coordinates[0], project.coordinates[1]],
      },
    })),
  };

  return (
    <Box height="90vh" width="100%">
      <Map
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onMove={(evt) => handleViewportChange(evt.viewState)}
        interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="locations"
          type="geojson"
          data={geojsonData}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
        {selectedLocation && (
          <Popup
            longitude={selectedLocation.geometry.coordinates[0]}
            latitude={selectedLocation.geometry.coordinates[1]}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedLocation(null)}
          >
            <Card>
              <CardContent>
                <Typography variant="h6">Detalles del Proyecto</Typography>
                <Typography>
                  Proyecto: {selectedLocation.properties.projectName}
                </Typography>
                <Typography>
                  Estado: {selectedLocation.properties.state}
                </Typography>
                <Typography>
                  Valor Programado:{" "}
                  {selectedLocation.properties.programmedValue}
                </Typography>
                <Typography>
                  Valor Ejecutado: {selectedLocation.properties.executedValue}
                </Typography>
                <Link
                  href={`/country/works-and-projects/${selectedLocation.properties.id}`}
                  component={NextLink}
                >
                  <Typography fontSize={14} fontWeight={500}>
                    Ir al proyecto
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Popup>
        )}
      </Map>
    </Box>
  );
}
