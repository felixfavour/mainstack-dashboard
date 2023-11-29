import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

describe('Navbar', () => {
  // RENDER
  describe('Render', () => {
    it('should render only 5 links', () => {
      render(<Navbar />)
      const links = screen.getAllByTestId('link-list')
      expect(links.length).toBe(5)
    })
  })
})