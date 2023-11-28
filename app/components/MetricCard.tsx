"use client"

import styles from '../styles/page.module.css'
import InfoIcon from "./Icons/Info"
import { Skeleton, Tooltip } from '@chakra-ui/react'

interface Props {
  label: string,
  value: string,
  info?: string,
  isLoading: boolean
}

export default function MetricCard({ label, value, info, isLoading }: Props) {
  return (
    <div className={styles.metric__card}>
      <div>
        <p className='come-up'>{label}</p>
        {isLoading ? <Skeleton height='40px' width='200px' marginTop={4} borderRadius={8} /> : <h3 className={isLoading ? 'invisible' : 'come-up'}>{value}</h3>}
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