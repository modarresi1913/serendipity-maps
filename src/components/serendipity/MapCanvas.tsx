'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapPoint {
  lat: number;
  lng: number;
  label: string;
  color: string;
  type?: 'pattern' | 'serendipity' | 'near-miss' | 'user';
  pulse?: boolean;
}

interface MapCanvasProps {
  center: [number, number];
  zoom?: number;
  points: MapPoint[];
  paths?: { coords: [number, number][]; color: string; dash?: boolean }[];
  showOverlap?: { lat: number; lng: number; radius: number; color: string }[];
  className?: string;
  interactive?: boolean;
}

const DefaultIcon = L.icon({
  iconUrl:
    'data:image/svg+xml;base64,' +
    btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7Z"/></svg>`),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  className: '',
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapCanvas({
  center,
  zoom = 14,
  points,
  paths = [],
  showOverlap = [],
  className = '',
  interactive = false,
}: MapCanvasProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: false,
      attributionControl: false,
      dragging: interactive,
      scrollWheelZoom: interactive,
      doubleClickZoom: interactive,
      touchZoom: interactive,
    });

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      { maxZoom: 19, subdomains: 'abcd' }
    ).addTo(map);

    const lg = L.layerGroup().addTo(map);
    layerGroupRef.current = lg;
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      layerGroupRef.current = null;
    };
  }, []);

  // Update layers when data changes
  useEffect(() => {
    const lg = layerGroupRef.current;
    if (!lg) return;
    lg.clearLayers();

    // Overlap zones
    showOverlap.forEach((zone) => {
      L.circle([zone.lat, zone.lng], {
        radius: zone.radius,
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.08,
        weight: 1,
        opacity: 0.3,
      }).addTo(lg);
    });

    // Paths
    paths.forEach((path) => {
      L.polyline(path.coords, {
        color: path.color,
        weight: 2,
        opacity: 0.5,
        dashArray: path.dash ? '6, 10' : undefined,
        lineCap: 'round',
      }).addTo(lg);
    });

    // Points
    points.forEach((point) => {
      if (point.pulse) {
        const pc = L.circleMarker([point.lat, point.lng], {
          radius: 18,
          color: point.color,
          fillColor: point.color,
          fillOpacity: 0.1,
          weight: 1,
          opacity: 0.3,
        }).addTo(lg);

        let size = 18;
        let growing = true;
        const iv = setInterval(() => {
          if (growing) {
            size += 0.3;
            if (size >= 30) growing = false;
          } else {
            size -= 0.3;
            if (size <= 18) growing = true;
          }
          pc.setRadius(size);
          pc.setStyle({ fillOpacity: 0.1 * (1 - (size - 18) / 12) });
        }, 50);
        setTimeout(() => clearInterval(iv), 30000);
      }

      const marker = L.circleMarker([point.lat, point.lng], {
        radius: point.type === 'user' ? 6 : 5,
        color: point.color,
        fillColor: point.color,
        fillOpacity: 0.9,
        weight: 2,
        opacity: 1,
      });

      marker.bindTooltip(point.label, {
        className: 'serendipity-tooltip',
        direction: 'top',
        offset: [0, -10],
      });

      marker.addTo(lg);
    });
  }, [points, paths, showOverlap]);

  return (
    <>
      <div ref={containerRef} className={className} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .serendipity-tooltip {
          background: rgba(18,18,26,0.9) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(42,42,58,0.5) !important;
          border-radius: 8px !important;
          padding: 4px 10px !important;
          color: #F0EDE6 !important;
          font-family: var(--font-geist-sans) !important;
          font-size: 11px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
        }
        .serendipity-tooltip::before {
          border-top-color: rgba(18,18,26,0.9) !important;
        }
        .leaflet-container {
          background: #0A0A0F !important;
        }
      `,
        }}
      />\n    </>
  );
}
