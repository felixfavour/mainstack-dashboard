"use client"

import styles from '../styles/page.module.css'
import InfoIcon from "./Icons/Info"
import { Tooltip } from '@chakra-ui/react'

interface Props {
  label: string,
  value: string,
  info?: string
}

export default function MetricCard({ label, value, info }: Props) {
  return (
    <div className={styles.metric__card}>
      <div>
        <p>{label}</p>
        <h3>{value}</h3>
      </div>
      <div>
        {info && <Tooltip hasArrow label={info} borderRadius={8} background="#131316">
          <button>
            <InfoIcon />
          </button>
        </Tooltip>}
      </div>
    </div>
  )
}