"use client"

import { Dispatch, SetStateAction, useState } from 'react'
import styles from '../styles/modal.module.css'
import CustomDoubleDateRange from './CustomDoubleDateRange'
import CustomDateRange from './CustomDoubleDateRange'
import CustomSelect from './CustomSelect'
import CloseIcon from './Icons/Close'

interface Props {
  modalOpen: boolean,
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function FilterModal({ modalOpen, setModalOpen }: Props) {
  const [closingModal, setClosingModal] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState<Array<string>>([])
  const [transactionType, setTransactionType] = useState<Array<string>>([])
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const delayClose = (milli: number) => {
    setClosingModal(true)
    setTimeout(() => {
      setClosingModal(false)
      setModalOpen(false)
    }, milli)
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
            <button className="primary-btn chip">
              Today
            </button>
            <button className="primary-btn chip">
              Last 7 days
            </button>
            <button className="primary-btn chip">
              This month
            </button>
            <button className="primary-btn chip">
              Last 3 months
            </button>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.form__input}>
              <label>Date Range</label>
              <CustomDoubleDateRange
                fromValue={fromDate}
                toValue={toDate}
                onChange={(type, date) => { type === 'FROM' ? setFromDate(date) : setToDate(date) }} />
            </div>
            <div className={styles.form__input}>
              <label>Transaction Type</label>
              <CustomSelect
                label="Select Transaction Type"
                value={transactionType}
                options={['Store Transactions', 'Get Tipped', 'Withdrawals', 'Chargebacks', 'Cashbacks', 'Refer & Earn']}
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
            <button className='primary-btn outline'>
              Clear
            </button>
            <button className='primary-btn'>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}