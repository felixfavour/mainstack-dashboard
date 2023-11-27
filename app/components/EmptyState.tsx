"use client"

import styles from '../styles/page.module.css'
import InfoIcon from "./Icons/Info"
import { Tooltip } from '@chakra-ui/react'
import ReceiptIcon from './Icons/Receipt'

interface Props {
  header?: string,
  sub?: string
}

export default function EmptyState({
  header = "No matching transaction found for the selected filter",
  sub = "Change your filters to see more results, or add a new product."
}: Props) {
  return (
    <div className={styles.empty__state}>
      <ReceiptIcon />
      <div>
        <h3>{header}</h3>
        <p>{sub}</p>
      </div>
      <button className="secondary-btn">
        Clear Filter
      </button>
    </div>
  )
}