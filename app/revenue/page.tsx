"use client"
import { useEffect, useState } from 'react'
import BalanceChart from '../components/BalanceChart'
import EmptyState from '../components/EmptyState'
import FilterModal from '../components/FilterModal'
import ChevronDownIcon from '../components/Icons/ChevronDown'
import ExportIcon from '../components/Icons/Export'
import MetricCard from '../components/MetricCard'
import TransactionTableRow from '../components/TransactionTableRow'
import styles from '../styles/page.module.css'
import { formatAmount, formatDate } from '../utils/functions'

export default function RevenuePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [wallet, setWallet] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [activeFilters, setActiveFilters] = useState(0)
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [filters, setFilters] = useState<any>({})
  const baseURL = 'https://fe-task-api.mainstack.io'

  const getWallet = async () => {
    try {
      const response = await fetch(`${baseURL}/wallet`)
      const wallet = await response.json()
      setWallet(wallet)
    } catch (err) {
      console.log('err', err)
    }
  }

  const getTransactions = async () => {
    try {
      const response = await fetch(`${baseURL}/transactions`)
      const transactions = await response.json()
      setTransactions(transactions)
      setFilteredTransactions(transactions)
    } catch (err) {
      console.log('err', err)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    Promise.all([getWallet(), getTransactions()]).then((value) => {
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    setActiveFilters(Object.values(filters)?.filter(val => val?.toString()).length)
  }, [filters])

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.row_one__revenue}>
          <div className={styles.lhs}>
            {/* AVAIL BALANCE HEADER */}
            <div className={styles.avail__bal}>
              <div>
                <p>Available Balance</p>
                <h2>{formatAmount(wallet?.balance)}</h2>
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
            <MetricCard label="Ledger Balance" value={formatAmount(wallet?.ledger_balance)} info="This is the available ledger balance" />
            <MetricCard label="Total Payout" value={formatAmount(wallet?.total_payout)} info="This is the total payout" />
            <MetricCard label="Total Revenue" value={formatAmount(wallet?.total_revenue)} info="This is the total revenue" />
            <MetricCard label="Pending Payout" value={formatAmount(wallet?.pending_payout)} info="This is the Pending Payout" />
          </div>
        </div>

        <div className={styles.row_two__revenue}>
          <div className={styles.header}>
            <div>
              <h3>{filteredTransactions?.length} Transactions</h3>
              <p>Your transactions for the last 7 days</p>
            </div>
            <div className={styles.actions}>
              <div>
                <button className="secondary-btn" onClick={() => setModalOpen(true)}>
                  Filter {activeFilters > 0 && <span className={styles.count}>{activeFilters}</span>} <ChevronDownIcon />
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
            {filteredTransactions?.length === 0 && !isLoading && <EmptyState />}

            {/* MAIN TABLE */}
            {filteredTransactions?.map(transaction => <TransactionTableRow
              key={transaction.payment_reference}
              description={transaction.metadata?.product_name || transaction.metadata?.type || 'Cash Withdrawal'}
              outgoing={transaction.type?.toLowerCase() !== 'deposit'}
              status={transaction.metadata?.product_name ? transaction.metadata?.name : transaction.status}
              amount={formatAmount(transaction.amount)}
              date={formatDate(transaction.date)} />)}
          </div>
        </div>
      </div>
      <FilterModal modalOpen={modalOpen} setModalOpen={setModalOpen} setFilters={setFilters} />
    </section>
  )
}
