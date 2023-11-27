"use client"

import styles from '../styles/modal.module.css'
import InfoIcon from "./Icons/Info"
import { Flex, Tooltip } from '@chakra-ui/react'
import ReceiptIcon from './Icons/Receipt'
import ChevronDownIcon from './Icons/ChevronDown'
import CheckIcon from './Icons/Check'
import DatePicker from 'react-datepicker'

interface Props {
  label: string,
  value: string;
  onChange: (option: string) => void;
}

function CustomInput({ value, label }: Props) {
  return <button className={styles.select__bar}>
    <span>{value?.toString()?.replaceAll(',', ', ') || label}</span>
    <div className={styles.icon}>
      <ChevronDownIcon />
    </div>
  </button>
}

export default function CustomDateRange({ label, value, onChange }: Props) {
  const monthsInYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className={`${styles.custom_select__ctn} ${styles.custom__date_picker}`} onSubmit={(e) => e.preventDefault()}>

      <DatePicker
        peekNextMonth={false}
        onChange={(date) => onChange(date ? date.toDateString() : '')}
        renderCustomHeader={({ date, increaseMonth, decreaseMonth }) => (
          <Flex marginBottom={4} justifyContent="space-between">
            <button className={styles.prev} onClick={() => decreaseMonth()}>
              <ChevronDownIcon />
            </button>
            <span>
              {monthsInYear[date.getMonth()]}, {date.getFullYear()}
            </span>
            <button className={styles.next} onClick={() => increaseMonth()}>
              <ChevronDownIcon />
            </button>
          </Flex>
        )}
        customInput={(
          <button className={styles.select__bar}>
            <span>{value || label}</span>
            <div className={styles.icon}>
              <ChevronDownIcon />
            </div>
          </button>
        )} />
    </div>
  )
}