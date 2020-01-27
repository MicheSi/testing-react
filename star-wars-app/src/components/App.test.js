import React from 'react';
import {render} from '@testing-library/react';

import App from '../App';

test('logo is rendering', () => {
    const {getByAltText} = render(<App />);

    getByAltText(/logo/i);
})