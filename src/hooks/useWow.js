import React from 'react';
import { WOW } from 'wowjs';

const useWow = () => {
    React.useEffect(() => {
        new WOW({ live: false }).init();
    }, [])
}

export default useWow;