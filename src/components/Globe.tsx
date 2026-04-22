import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

export function Globe({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    useEffect(() => {
        // Fetch user location based on IP
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                if (data.latitude && data.longitude) {
                    setUserLocation([data.latitude, data.longitude]);
                }
            })
            .catch(err => console.error("Error fetching location:", err));
    }, []);

    useEffect(() => {
        let phi = 0;
        let isVisible = true;

        if (!canvasRef.current) return;

        // Visibility observer to save performance when globe is not in view
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        observer.observe(canvasRef.current);

        // Default markers (offices)
        const markers = [
            { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
            { location: [48.8566, 2.3522], size: 0.03 }, // Paris
            { location: [51.5074, -0.1278], size: 0.03 }, // London
        ];

        // Add user location if available
        if (userLocation) {
            markers.push({ location: userLocation, size: 0.08 });
        }

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0,
            dark: 0.2,
            diffuse: 1.0,
            mapSamples: 16000,
            mapBrightness: 12,
            baseColor: [1, 1, 1],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1.2, 1.2, 1.2],
            markers: markers.map(m => ({ ...m, location: m.location as [number, number] })),
            onRender: (state) => {
                if (!isVisible) return; // Skip rendering if not visible

                state.phi = phi;
                phi += 0.003;

                // Pulsing user marker
                if (userLocation) {
                    const t = performance.now() / 1000;
                    const dotCount = 8;
                    const ringRadius = 2 + (t % 1) * 4; 
                    const ringOpacity = 1 - (t % 1); 

                    const ringMarkers = [];
                    for (let i = 0; i < dotCount; i++) {
                        const angle = (i / dotCount) * Math.PI * 2;
                        const lat = userLocation[0] + ringRadius * Math.cos(angle);
                        const lon = userLocation[1] + (ringRadius * Math.sin(angle)) / Math.cos(userLocation[0] * Math.PI / 180);

                        ringMarkers.push({
                            location: [lat, lon],
                            size: 0.03 * ringOpacity
                        });
                    }

                    state.markers = [
                        ...markers.slice(0, 3), 
                        { location: userLocation, size: 0.08 + Math.sin(t * 5) * 0.02 }, 
                        ...ringMarkers
                    ];
                }
            },
        });

        return () => {
            globe.destroy();
            observer.disconnect();
        };
    }, [userLocation]);

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <canvas
                ref={canvasRef}
                style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: "1" }}
            />
        </div>
    );
}
