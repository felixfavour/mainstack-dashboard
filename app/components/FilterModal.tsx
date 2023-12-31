"use client"

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from '../styles/modal.module.css'
import CustomDoubleDateRange from './CustomDoubleDateRange'
import CustomDateRange from './CustomDoubleDateRange'
import CustomSelect from './CustomSelect'
import CloseIcon from './Icons/Close'

interface Props {
  modalOpen: boolean,
  setFilters: Dispatch<SetStateAction<any>>,
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function FilterModal({ modalOpen, setModalOpen, setFilters }: Props) {
  const [closingModal, setClosingModal] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState<Array<string>>([])
  const [transactionType, setTransactionType] = useState<Array<string>>([])
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [dateRange, setDateRange] = useState(-1)

  const delayClose = (milli: number) => {
    setClosingModal(true)
    setTimeout(() => {
      setClosingModal(false)
      setModalOpen(false)
    }, milli)
  }

  const applyFilters = () => {
    setFilters({
      fromDate,
      toDate,
      transactionStatus,
      transactionType
    })
    delayClose(600)
  }

  const selectDateRange = (daysDifference: number) => {
    const todayDate = new Date()
    const previousDate = new Date()
    previousDate.setDate(todayDate.getDate() - daysDifference)

    setToDate(todayDate.toDateString())
    setFromDate(previousDate.toDateString())
    setDateRange(daysDifference)
  }

  const clearFilters = () => {
    setToDate('')
    setFromDate('')
    setTransactionStatus([])
    setTransactionType([])
    setFilters({})
    delayClose(600)
  }

  const modifyArray = (arrayName: string, item: string) => {
    if (arrayName === 'transactionStatus') {
      let temp = [...transactionStatus]
      if (temp.includes(item)) {
        temp = temp.filter(tempItem => tempItem !== item)
      } else {
        temp.push(item)
      }
      setTransactionStatus(temp)
    } else {
      let temp = [...transactionType]
      if (temp.includes(item)) {
        temp = temp.filter(tempItem => tempItem !== item)
      } else {
        temp.push(item)
      }
      setTransactionType(temp)
    }
  }

  return (

    <div className={`${styles.modal__bg} ${modalOpen ? styles.visible : ''}`} onClick={() => delayClose(600)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.modal__inner} ${closingModal ? styles.invisible : ''}`}>
          <div className={styles.header}>
            <h2>Filter</h2>
            <button onClick={() => delayClose(600)}>
              <CloseIcon />
            </button>
          </div>
          <div className={styles.chips}>
            <button className={`primary-btn chip ${dateRange === 0 ? 'active' : ''}`} onClick={() => selectDateRange(0)}>
              Today
            </button>
            <button className={`primary-btn chip ${dateRange === 7 ? 'active' : ''}`} onClick={() => selectDateRange(7)}>
              Last 7 days
            </button>
            <button className={`primary-btn chip ${dateRange === 30 ? 'active' : ''}`} onClick={() => selectDateRange(30)}>
              This month
            </button>
            <button className={`primary-btn chip ${dateRange === 90 ? 'active' : ''}`} onClick={() => selectDateRange(90)}>
              Last 3 months
            </button>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.form__input}>
              <label>Date Range</label>
              <CustomDoubleDateRange
                fromValue={fromDate}
                toValue={toDate}
                onChange={(type, date) => {
                  type === 'FROM' ? setFromDate(date) : setToDate(date)
                  setDateRange(-1)
                }} />
            </div>
            <div className={styles.form__input}>
              <label>Transaction Type</label>
              <CustomSelect
                label="Select Transaction Type"
                value={transactionType}
                options={['withdrawal', 'deposit']}
                onChange={(option) => modifyArray('transactionType', option)} />
            </div>
            <div className={styles.form__input}>
              <label>Transaction Status</label>
              <CustomSelect
                label="Select Transaction Status"
                value={transactionStatus}
                options={['successful', 'pending', 'failed']}
                onChange={(option) => modifyArray('transactionStatus', option)} />
            </div>
          </form>
          <div className={styles.bottom__actions}>
            <button
              data-testid="clear-filter-btn"
              className='primary-btn outline'
              onClick={() => clearFilters()}>
              Clear
            </button>
            <button
              data-testid="apply-filter-btn"
              className='primary-btn'
              disabled={!(transactionType.toString() || transactionStatus.toString() || toDate || fromDate)}
              onClick={() => applyFilters()}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}