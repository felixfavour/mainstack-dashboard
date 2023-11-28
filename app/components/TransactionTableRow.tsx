"use client"

import { Text } from '@chakra-ui/react'
import styles from '../styles/page.module.css'
import SideArrowIcon from './Icons/SideArrow'

interface Props {
  description: string,
  status: string,
  outgoing: boolean,
  amount: string,
  date: string
}

export default function TransactionTableRow({ description, status, outgoing, amount, date }: Props) {
  return (
    <div className={`${styles.table_row__transaction} come-up`}>
      <div className={styles.lhs}>
        <div>
          <SideArrowIcon outgoing={outgoing} />
        </div>
        <div>
          <p>{description}</p>
          <Text fontSize={14} lineHeight={6} color={status === 'successful' ? '#0EA163' : status === 'pending' ? '#A77A07' : '#56616B'} textTransform="capitalize">
            {status}
          </Text>
        </div>
      </div>
      <div className={styles.rhs}>
        <h5>{amount}</h5>
        <p>{date}</p>
      </div>
    </div>
  )
}