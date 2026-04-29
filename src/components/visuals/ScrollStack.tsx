import { useLayoutEffect, useRef, useCallback, ReactNode } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

interface ScrollStackItemProps {
    children: ReactNode;
    itemClassName?: string;
}

export const ScrollStackItem = ({ children, itemClassName = '' }: ScrollStackItemProps) => (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
    children: ReactNode;
    className?: string;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string | number;
    scaleEndPosition?: string | number;
    baseScale?: number;
    scaleDuration?: number;
    rotationAmount?: number;
    blurAmount?: number;
    useWindowScroll?: boolean;
    onStackComplete?: () => void;
}

const ScrollStack = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    scaleDuration = 0.5,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = false,
    onStackComplete
}: ScrollStackProps) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef<number | null>(null);
    const lenisRef = useRef<Lenis | null>(null);
    const cardsRef = useRef<(HTMLElement | null)[]>([]);
    const cardPositionsRef = useRef<number[]>([]); // Cache for card positions
    const lastTransformsRef = useRef(new Map());
    const isUpdatingRef = useRef(false);

    const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return typeof value === 'string' ? parseFloat(value) : value;
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight,
                scrollContainer: document.documentElement
            };
        } else {
            const scroller = scrollerRef.current;
            if (!scroller) return { scrollTop: 0, containerHeight: 0, scrollContainer: null };
            return {
                scrollTop: scroller.scrollTop,
                containerHeight: scroller.clientHeight,
                scrollContainer: scroller
            };
        }
    }, [useWindowScroll]);

    // Simplified to just get offset relative to document/container, but we'll use cached values mostly
    const getElementOffset = useCallback(
        (element: HTMLElement) => {
            if (useWindowScroll) {
                // IMPORTANT: We must remove the transform to get the "layout" position
                // But simplified: we just cache it once before transforming.
                const rect = element.getBoundingClientRect();
                return rect.top + window.scrollY;
            } else {
                return element.offsetTop;
            }
        },
        [useWindowScroll]
    );

    const updateCardPositions = useCallback(() => {
        if (!cardsRef.current.length) return;

        // Temporarily reset transforms to get clean positions? 
        // Or assume this is called when transforms are not distorting layout flow (cards are relative/block).
        // Since we use translate3d, the layout spacing (margins) remains. 
        // getBoundingClientRect includes transform. this is the issue.
        // We can use offsetTop for position relative to offsetParent.

        cardPositionsRef.current = cardsRef.current.map(card => {
            if (!card) return 0;
            // For window scroll, we need absolute document position.
            // Loop up offsetParents to get pure top position without transform interference if possible,
            // OR reset transform, measure, restore.
            // Resetting is safest.
            const prevTransform = card.style.transform;
            card.style.transform = '';

            let top = 0;
            if (useWindowScroll) {
                const rect = card.getBoundingClientRect();
                top = rect.top + window.scrollY;
            } else {
                top = card.offsetTop;
            }

            card.style.transform = prevTransform;
            return top;
        });
    }, [useWindowScroll]);

    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length || isUpdatingRef.current) return;

        isUpdatingRef.current = true;

        const { scrollTop, containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

        const endElement = useWindowScroll
            ? document.querySelector('.scroll-stack-end')
            : scrollerRef.current?.querySelector('.scroll-stack-end');

        // Note: endElement might also be transformed if we are not careful? 
        // No, endElement is a spacer div. But let's cache it too or measure securely.
        let endElementTop = 0;
        if (endElement) {
            // Safe measure
            const el = endElement as HTMLElement;
            const prev = el.style.transform;
            el.style.transform = '';
            if (useWindowScroll) {
                endElementTop = el.getBoundingClientRect().top + window.scrollY;
            } else {
                endElementTop = el.offsetTop;
            }
            el.style.transform = prev;
        }

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            // USE CACHED POSITION
            const cardTop = cardPositionsRef.current[i] || 0;

            const triggerEnd = cardTop - scaleEndPositionPx;
            const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
            const pinEnd = endElementTop - containerHeight / 2;

            const scaleProgress = calculateProgress(scrollTop, pinStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            // Ensure scale doesn't go below baseScale or weird values if scrolled back
            const scale = Math.max(0, 1 - scaleProgress * (1 - targetScale));

            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount) {
                let topCardIndex = 0;
                for (let j = 0; j < cardsRef.current.length; j++) {
                    // Use cached here too
                    const jCardTop = cardPositionsRef.current[j] || 0;
                    const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * blurAmount);
                }
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
            }

            const newTransform = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100
            };

            const lastTransform = lastTransformsRef.current.get(i);
            const hasChanged =
                !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

            if (hasChanged) {
                const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

                card.style.transform = transform;
                card.style.filter = filter;

                lastTransformsRef.current.set(i, newTransform);
            }

            if (i === cardsRef.current.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackComplete?.();
                } else if (!isInView && stackCompletedRef.current) {
                    stackCompletedRef.current = false;
                }
            }
        });

        isUpdatingRef.current = false;
    }, [
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        calculateProgress,
        parsePercentage,
        getScrollData,
        getElementOffset
    ]);

    const handleScroll = useCallback(() => {
        updateCardTransforms();
    }, [updateCardTransforms]);

    const setupLenis = useCallback(() => {
        if (useWindowScroll) {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                // smoothWheel: true, // properties might differ in newer lenis versions, check if needed
                // touchMultiplier: 2,
                infinite: false,
                // wheelMultiplier: 1,
                lerp: 0.1,
                // syncTouch: true,
                // syncTouchLerp: 0.075
            });

            lenis.on('scroll', handleScroll);

            const raf = (time: number) => {
                lenis.raf(time);
                animationFrameRef.current = requestAnimationFrame(raf);
            };
            animationFrameRef.current = requestAnimationFrame(raf);

            lenisRef.current = lenis;
            return lenis;
        } else {
            const scroller = scrollerRef.current;
            if (!scroller) return;

            const lenis = new Lenis({
                wrapper: scroller,
                content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                // smoothWheel: true,
                // touchMultiplier: 2,
                infinite: false,
                // gestureOrientationHandler: true, // might not exist on type
                // normalizeWheel: true,
                // wheelMultiplier: 1,
                // touchInertiaMultiplier: 35,
                lerp: 0.1,
                // syncTouch: true,
                // syncTouchLerp: 0.075,
                // touchInertia: 0.6
            });

            lenis.on('scroll', handleScroll);

            const raf = (time: number) => {
                lenis.raf(time);
                animationFrameRef.current = requestAnimationFrame(raf);
            };
            animationFrameRef.current = requestAnimationFrame(raf);

            lenisRef.current = lenis;
            return lenis;
        }
    }, [handleScroll, useWindowScroll]);

    useLayoutEffect(() => {
        const scroller = scrollerRef.current;

        // If not using window scroll and no scroller ref, we can't do anything
        if (!useWindowScroll && !scroller) return;

        const cards = Array.from(
            useWindowScroll
                ? document.querySelectorAll('.scroll-stack-card')
                : (scroller?.querySelectorAll('.scroll-stack-card') || [])
        ) as HTMLElement[];

        cardsRef.current = cards;
        const transformsCache = lastTransformsRef.current;

        // Initial position calculation
        updateCardPositions();

        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
            card.style.transform = 'translateZ(0)';
            card.style.perspective = '1000px';
        });

        // Resize handler
        const handleResize = () => {
            updateCardPositions();
            updateCardTransforms();
        };
        window.addEventListener('resize', handleResize);

        setupLenis();

        // Initial update
        const timeoutId = setTimeout(() => {
            updateCardPositions(); // Ensure positions are correct after layout settles
            updateCardTransforms();
        }, 100);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
            stackCompletedRef.current = false;
            cardsRef.current = [];
            transformsCache.clear();
            isUpdatingRef.current = false;
        };
    }, [
        itemDistance,
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        scaleDuration,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        setupLenis,
        updateCardTransforms
    ]);

    return (
        <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
            <div className="scroll-stack-inner">
                {children}
                {/* Spacer so the last pin can release cleanly */}
                <div className="scroll-stack-end" />
            </div>
        </div>
    );
};

export default ScrollStack;
