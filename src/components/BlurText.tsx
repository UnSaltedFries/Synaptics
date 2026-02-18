import { useRef, useEffect, useState } from 'react';

export const BlurText = ({
    text,
    delay = 500,
    animateBy = 'words', // 'words' or 'letters'
    direction = 'top', // 'top' or 'bottom'
    threshold = 0.1,
    rootMargin = '0px',
    animationFrom,
    animationTo,
    className = '',
    childClassName,
    duration = 800,
    startDelay = 0,
}: {
    text: string;
    delay?: number;
    animateBy?: 'words' | 'letters';
    direction?: 'top' | 'bottom';
    threshold?: number;
    rootMargin?: string;
    animationFrom?: Record<string, string | number>;
    animationTo?: Record<string, string | number>;
    className?: string;
    childClassName?: string;
    duration?: number;
    startDelay?: number;
}) => {
    // If words, split by space. If letters, split by space then by char inside render.
    const words = text.split(' ');

    // We need to keep a running index for delays across words
    let globalIndex = -1;

    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const defaultFrom =
        direction === 'top'
            ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' }
            : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,50px,0)' };

    const defaultTo = {
        filter: 'blur(0px)',
        opacity: 1,
        transform: 'translate3d(0,0,0)',
    };

    return (
        <span ref={ref} className={`blur-text ${className} inline-block`}>
            {words.map((word, wordIndex) => {
                const isLastWord = wordIndex === words.length - 1;

                // Render the word
                const wordElement = animateBy === 'words' ? (
                    <span
                        key={`word-${wordIndex}`}
                        className={childClassName}
                        style={{
                            display: 'inline-block',
                            willChange: 'opacity, filter, transform',
                            transition: `opacity ${duration}ms, filter ${duration}ms, transform ${duration}ms cubic-bezier(0.2, 0.65, 0.3, 0.9)`, // Specific properties
                            transitionDelay: `${startDelay + wordIndex * delay}ms`,
                            filter: inView ? (animationTo?.filter as string || defaultTo.filter) : (animationFrom?.filter as string || defaultFrom.filter),
                            opacity: inView ? (animationTo?.opacity as number || defaultTo.opacity) : (animationFrom?.opacity as number || defaultFrom.opacity),
                            transform: inView ? (animationTo?.transform as string || defaultTo.transform) : (animationFrom?.transform as string || defaultFrom.transform),
                            marginRight: !isLastWord ? '0.25em' : '0',
                        }}
                    >
                        {word}
                    </span>
                ) : (
                    <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap" style={{ verticalAlign: 'top' }}>
                        {word.split('').map((char, charIndex) => {
                            globalIndex++;
                            const index = globalIndex;
                            return (
                                <span
                                    key={`char-${index}`}
                                    className={childClassName}
                                    style={{
                                        display: 'inline-block',
                                        willChange: 'opacity, filter, transform',
                                        transition: `opacity ${duration}ms, filter ${duration}ms, transform ${duration}ms cubic-bezier(0.2, 0.65, 0.3, 0.9)`,
                                        transitionDelay: `${startDelay + index * delay}ms`,
                                        filter: inView ? (animationTo?.filter as string || defaultTo.filter) : (animationFrom?.filter as string || defaultFrom.filter),
                                        opacity: inView ? (animationTo?.opacity as number || defaultTo.opacity) : (animationFrom?.opacity as number || defaultFrom.opacity),
                                        transform: inView ? (animationTo?.transform as string || defaultTo.transform) : (animationFrom?.transform as string || defaultFrom.transform),
                                    }}
                                >
                                    {char}
                                </span>
                            );
                        })}
                    </span>
                );

                // If not last word, append space
                if (!isLastWord && animateBy === 'letters') {
                    globalIndex++;
                    const spaceIndex = globalIndex;
                    return (
                        <span key={`group-${wordIndex}`} style={{ display: 'inline' }}>
                            {wordElement}
                            <span
                                key={`space-${spaceIndex}`}
                                className={childClassName}
                                style={{
                                    display: 'inline-block',
                                    willChange: 'opacity, filter, transform',
                                    transition: `opacity ${duration}ms, filter ${duration}ms, transform ${duration}ms cubic-bezier(0.2, 0.65, 0.3, 0.9)`,
                                    transitionDelay: `${startDelay + spaceIndex * delay}ms`,
                                    filter: inView ? (animationTo?.filter as string || defaultTo.filter) : (animationFrom?.filter as string || defaultFrom.filter),
                                    opacity: inView ? (animationTo?.opacity as number || defaultTo.opacity) : (animationFrom?.opacity as number || defaultFrom.opacity),
                                    transform: inView ? (animationTo?.transform as string || defaultTo.transform) : (animationFrom?.transform as string || defaultFrom.transform),
                                }}
                            >
                                &nbsp;
                            </span>
                        </span>
                    );
                }

                // For 'words' mode, we handled space via margin, or we could do the same
                // But the user issue was about letters mode.
                // If words mode, just return the wordElement (margin handles spacing).
                return wordElement;
            })}
        </span>
    );
};

export default BlurText;
