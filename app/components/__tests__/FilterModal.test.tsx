import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterModal from '../FilterModal'

const mockModalOpen = true
const mockSetModalOpen = jest.fn()
const mockSetFilters = jest.fn()

describe('FilterModal', () => {
  describe('Behaviour', () => {
    it('should not call applyFilters when Button is disabled', async () => {
      render(<FilterModal setFilters={mockSetFilters} setModalOpen={mockSetModalOpen} modalOpen={mockModalOpen} />)
      const applyBtn = screen.getByTestId('apply-filter-btn')

      await userEvent.click(applyBtn)

      expect(mockSetFilters).toHaveBeenCalledTimes(0)
    })

    it('should closeModal when filter is cleared', async () => {
      render(<FilterModal setFilters={mockSetFilters} setModalOpen={mockSetModalOpen} modalOpen={mockModalOpen} />)
      const filterBtn = screen.getByTestId('clear-filter-btn')

      await userEvent.click(filterBtn)
      await new Promise((r) => setTimeout(r, 600));

      expect(mockSetModalOpen).toHaveBeenCalled()
    })
  })
})