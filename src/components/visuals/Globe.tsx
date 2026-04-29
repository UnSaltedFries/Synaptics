import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

export function Globe({ className, size = 450 }: { className?: string, size?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const phi = useRef(4.0); // Calage optimal sur l'Europe

    useEffect(() => {
        // Fetch user location based on IP
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                if (data.latitude && data.longitude) {
                    setUserLocation([data.latitude, data.longitude]);
                }
            })
            .catch(err => {
                console.warn("Could not fetch user location, falling back to Paris pulse.");
            });
    }, []);

    useEffect(() => {
        let isVisible = true;
        if (!canvasRef.current) return;

        // Visibility observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        observer.observe(canvasRef.current);

        // Default markers
        const staticMarkers = [
            { location: [37.7595, -122.4367] as [number, number], size: 0.03 }, 
            { location: [48.8566, 2.3522] as [number, number], size: 0.03 },    
            { location: [51.5074, -0.1278] as [number, number], size: 0.03 },   
        ];

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: size * 2,
            height: size * 2,
            phi: phi.current,
            theta: 0,
            dark: 0.2,
            diffuse: 1.0,
            mapSamples: 16000,
            mapBrightness: 12,
            baseColor: [1, 1, 1],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1.2, 1.2, 1.2],
            markers: staticMarkers,
            onRender: (state) => {
                if (!isVisible) return; 

                state.phi = phi.current;
                phi.current += 0.003;

                const t = performance.now() / 1000;
                const pulseLocation = userLocation || staticMarkers[1].location;
                
                const dotCount = 12;
                const ringRadius = 1.5 + (t % 1) * 5; 
                const ringOpacity = 1 - (t % 1); 

                const ringMarkers = [];
                for (let i = 0; i < dotCount; i++) {
                    const angle = (i / dotCount) * Math.PI * 2;
                    const lat = pulseLocation[0] + ringRadius * Math.cos(angle);
                    const lon = pulseLocation[1] + (ringRadius * Math.sin(angle)) / Math.cos(pulseLocation[0] * Math.PI / 180);

                    ringMarkers.push({
                        location: [lat, lon] as [number, number],
                        size: 0.04 * ringOpacity
                    });
                }

                state.markers = [
                    ...staticMarkers,
                    { location: pulseLocation, size: 0.1 + Math.sin(t * 8) * 0.04 }, 
                    ...ringMarkers
                ];
            },
        });

        return () => {
            globe.destroy();
            observer.disconnect();
        };
    }, [userLocation, size]);

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <canvas
                ref={canvasRef}
                style={{ 
                    width: size, 
                    height: size, 
                    maxWidth: "100%", 
                    aspectRatio: "1",
                    // Ajout d'un masque pour éviter la coupure nette
                    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
                }}
            />
        </div>
    );
}
