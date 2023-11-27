"use client"

import { Dispatch, SetStateAction, useState } from 'react'
import styles from '../styles/modal.module.css'
import CloseIcon from './Icons/Close'

interface Props {
  modalOpen: boolean,
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function FilterModal({ modalOpen, setModalOpen }: Props) {
  const [closingModal, setClosingModal] = useState(false)

  const delayClose = (milli: number) => {
    setClosingModal(true)
    setTimeout(() => {
      setClosingModal(false)
      setModalOpen(false)
    }, milli)
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
          <form>
            <div className={styles.form__input}>
              <label>Date Range</label>
            </div>
            <div className={styles.form__input}>
              <label>Transaction Type</label>
            </div>
            <div className={styles.form__input}>
              <label>Transaction Status</label>
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