const { useState, useEffect } = require("react");



function useMediaQuery(query) {
    const [matches, setMatches] = useState(false); // Default to false

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        setMatches(mediaQueryList.matches);

        const handleChange = (e) => {
            setMatches(e.matches);
        };

        mediaQueryList.addListener(handleChange);

        // Cleanup the listener when the component unmounts
        return () => {
            mediaQueryList.removeListener(handleChange);
        };
    }, [query]);

    return matches;
}


export default useMediaQuery;