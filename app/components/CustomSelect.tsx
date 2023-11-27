"use client"

import styles from '../styles/modal.module.css'
import InfoIcon from "./Icons/Info"
import { Tooltip } from '@chakra-ui/react'
import ReceiptIcon from './Icons/Receipt'

interface Props {
  default: string,
  options: Array<any>
}

export default function EmptyState({ default, options }: Props) {
  return (
    <div className={styles.custom_select__ctn}>
      <div className={styles.select__bar}>
        Store Transactions, Get Tipped
      </div>
    </div>
  )
}