import React from 'react';
import {render, fireEvent, wait} from '@testing-library/react';

import StarWarsCharacters from './StarWarsCharacters';
import {getData as mockGetData} from '../api';

jest.mock('../api');

test('App is rendering both previous and next buttons', async () => {
    mockGetData.mockResolvedValueOnce({
        next: "url",
        prev: "url",
        results: [
          { test: "test 1", url: 1 },
          { test: "test 2", url: 2 }
        ]
      });

    const {getByText} = render(<StarWarsCharacters />);

    const prevButton = getByText(/previous/i);
    const nextButton = getByText(/next/i);

    fireEvent.click(prevButton);
    fireEvent.click(nextButton);

    await wait(() => expect(getByText(/previous/i)));
    await wait(() => expect(getByText(/next/i)));
})

test('Api is working and fetching data', async () => {
    mockGetData.mockResolvedValueOnce({id: 1});

    expect(mockGetData).toHaveBeenCalledTimes(1);
})

// test('character list is rendering', async () => {
//     mockGetData.mockResolvedValueOnce({
//         results: [
//           { test: "test 1", name: "test name" },
//           { test: "test 2", name: "test name" }
//         ]
//       });
//     const getByTestId = render(<StarWarsCharacters />);

//     // getByTestId(/characterlist/i);

//    await wait(() => expect(getByTestId(/characterlist/i)));
// })
