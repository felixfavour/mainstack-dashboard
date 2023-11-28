"use client"

import styles from '../styles/page.module.css'
import InfoIcon from "./Icons/Info"
import { Tooltip } from '@chakra-ui/react'
import ReceiptIcon from './Icons/Receipt'

interface Props {
  header?: string,
  sub?: string,
  clearFilters: () => void
}

export default function EmptyState({
  header = "No matching transaction found for the selected filter",
  sub = "Change your filters to see more results, or add a new product.",
  clearFilters
}: Props) {
  return (
    <div className={`${styles.empty__state} come-up`}>
      <ReceiptIcon />
      <div>
        <h3>{header}</h3>
        <p>{sub}</p>
      </div>
      <button className="secondary-btn" onClick={() => clearFilters()}>
        Clear Filter
      </button>
    </div>
  )
}