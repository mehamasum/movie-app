import React from 'react'
import {
  render,
  cleanup,
  waitForElement,
} from '@testing-library/react'
import 'jest-dom/extend-expect'
import DetailsModal from './index'

afterEach(cleanup)


jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValueOnce({
    data: { id: 'native-id' },
  }).mockRejectedValueOnce(
    new Error('404')
  )
}))

test('displays delete button if movie is in collection', async () => {
  const { getByTestId } = render(<DetailsModal movie={{
    imdbID: 'imdbid1'
  }} />)
  const deleteBtn = await waitForElement(() =>
    getByTestId('delete-btn')
  )
  expect(deleteBtn).toBeInTheDocument();
})


test('displays add button if movie is not in collection', async () => {
  const { getByTestId } = render(<DetailsModal movie={{
    imdbID: 'imdbid1'
  }} />)
  const addBtn = await waitForElement(() =>
    getByTestId('add-btn')
  )
  expect(addBtn).toBeInTheDocument();
})