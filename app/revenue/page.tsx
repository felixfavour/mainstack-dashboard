"use client"
import { useState } from 'react'
import BalanceChart from '../components/BalanceChart'
import EmptyState from '../components/EmptyState'
import FilterModal from '../components/FilterModal'
import ChevronDownIcon from '../components/Icons/ChevronDown'
import ExportIcon from '../components/Icons/Export'
import MetricCard from '../components/MetricCard'
import TransactionTableRow from '../components/TransactionTableRow'
import styles from '../styles/page.module.css'

export default function RevenuePage() {
  const [modalOpen, setModalOpen] = useState(false)

  const transactions = [
    {
      id: 1,
      outgoing: false,
      description: 'Psychology of Money',
      status: 'Roy Cash',
      amount: 'USD 600',
      date: 'Apr 03, 2022'
    },
    {
      id: 2,
      outgoing: true,
      description: 'Cash withdrawal',
      status: 'successful',
      amount: 'USD 3,000.33',
      date: 'Apr 03, 2022'
    },
    {
      id: 3,
      outgoing: true,
      description: 'Cash withdrawal',
      status: 'pending',
      amount: 'USD 1,004.44',
      date: 'Apr 03, 2022'
    },
    {
      id: 4,
      outgoing: false,
      description: 'Psychology of Money',
      status: 'Roy Cash',
      amount: 'USD 600',
      date: 'Apr 03, 2022'
    },
  ]

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.row_one__revenue}>
          <div className={styles.lhs}>
            {/* AVAIL BALANCE HEADER */}
            <div className={styles.avail__bal}>
              <div>
                <p>Available Balance</p>
                <h2>USD 120,500.00</h2>
              </div>
              <div>
                <button className="primary-btn">
                  Withdraw
                </button>
              </div>
            </div>
            {/* AVAIL BALANCE CHART */}
            <BalanceChart />
          </div>
          <div className={styles.rhs}>
            <MetricCard label="Ledger Balance" value="USD 0.00" info="This is the available ledger balance" />
            <MetricCard label="Total Payout" value="USD 55,080.00" info="This is the total payout" />
            <MetricCard label="Total Revenue" value="USD 175,580.00" info="This is the total revenue" />
            <MetricCard label="Pending Payout" value="USD 0.00" info="This is the Pending Payout" />
          </div>
        </div>

        <div className={styles.row_two__revenue}>
          <div className={styles.header}>
            <div>
              <h3>24 Transactions</h3>
              <p>Your transactions for the last 7 days</p>
            </div>
            <div className={styles.actions}>
              <div>
                <button className="secondary-btn" onClick={() => setModalOpen(true)}>
                  Filter <span className={styles.count}>3</span> <ChevronDownIcon />
                </button>
              </div>
              <div>
                <button className="secondary-btn">
                  Export list <ExportIcon />
                </button>
              </div>
            </div>
          </div>
          {/* TRANSACTIONS TABLE */}
          <div className={styles.transaction__table}>
            {/* EMPTY STATE */}
            <EmptyState />

            {/* MAIN TABLE */}
            {transactions.map(transaction => <TransactionTableRow
              key={transaction.id}
              description={transaction.description}
              outgoing={transaction.outgoing}
              status={transaction.status}
              amount={transaction.amount}
              date={transaction.date} />)}
          </div>
        </div>
      </div>
      <FilterModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </section>
  )
}
