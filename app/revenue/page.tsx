"use client"
import { Skeleton, Stack, Tooltip } from '@chakra-ui/react'
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
  const [wallet, setWallet] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState<Array<any>>([])
  const [activeFilters, setActiveFilters] = useState(0)
  const [filteredTransactions, setFilteredTransactions] = useState<Array<any>>([])
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
    const activeFilters = Object.values(filters)?.filter(val => val?.toString()).length
    setActiveFilters(activeFilters)
    if (transactions?.length > 0) {
      if (activeFilters > 0) {
        setIsLoading(true)
        let tempFilteredTransactions = [...transactions]
        // FILTER TRANSACTIONS
        if (
          filters?.transactionType?.length > 0 ||
          filters?.transactionStatus?.length > 0 ||
          filters?.fromDate ||
          filters?.toDate
        ) {
          tempFilteredTransactions = transactions?.filter(trx => {
            const datetime = new Date(trx.date).getTime()

            return (filters?.transactionType?.length > 0 ? filters?.transactionType.includes(trx.type) : true) &&
              (filters?.transactionStatus?.length > 0 ? filters?.transactionStatus.includes(trx.status) : true) &&
              (filters?.toDate ? new Date(filters?.toDate)?.getTime() >= datetime : true) &&
              (filters?.fromDate ? new Date(filters?.fromDate)?.getTime() <= datetime : true)
          })
        }

        // Mock Network Call
        setTimeout(() => {
          setFilteredTransactions(tempFilteredTransactions)
          setIsLoading(false)
        }, 1000)
      } else {
        setIsLoading(true)
        setTimeout(() => {
          setFilteredTransactions(transactions)
          setIsLoading(false)
        }, 1000)
      }
    }
  }, [filters])

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.row_one__revenue}>
          <div className={styles.lhs}>
            {/* AVAIL BALANCE HEADER */}
            <div className={`come-up ${styles.avail__bal}`}>
              <div>
                <p>Available Balance</p>
                {isLoading ? <Skeleton height='50px' marginTop={4} borderRadius={8} /> :
                  <h2 className={isLoading ? 'invisible' : 'come-up'}>{formatAmount(wallet?.balance)}</h2>}
              </div>
              <div>
                <Tooltip label="Feature awaiting hire ;)" top={-1} hasArrow placement="top" borderRadius={8} background="#131316">
                  <button className="primary-btn">
                    Withdraw
                  </button>
                </Tooltip>
              </div>
            </div>
            {/* AVAIL BALANCE CHART */}
            <BalanceChart />
          </div>
          <div className={styles.rhs}>
            <MetricCard label="Ledger Balance" value={formatAmount(wallet?.ledger_balance)} info="This is the available ledger balance" isLoading={isLoading} />
            <MetricCard label="Total Payout" value={formatAmount(wallet?.total_payout)} info="This is the total payout" isLoading={isLoading} />
            <MetricCard label="Total Revenue" value={formatAmount(wallet?.total_revenue)} info="This is the total revenue" isLoading={isLoading} />
            <MetricCard label="Pending Payout" value={formatAmount(wallet?.pending_payout)} info="This is the Pending Payout" isLoading={isLoading} />
          </div>
        </div>

        <div className={styles.row_two__revenue}>
          <div className={`${styles.header} come-up`}>
            <div>
              <h3>{filteredTransactions?.length} Transactions</h3>
              <p>Your transactions for all time</p>
            </div>
            <div className={styles.actions}>
              <div>
                <button className="secondary-btn" onClick={() => setModalOpen(true)}>
                  Filter {activeFilters > 0 && <span className={styles.count}>{activeFilters}</span>} <ChevronDownIcon />
                </button>
              </div>
              <div>
                <Tooltip label="Feature awaiting hire ;)" top={-1} hasArrow placement="top" borderRadius={8} background="#131316">
                  <button className="secondary-btn">
                    Export list <ExportIcon />
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
          {/* TRANSACTIONS TABLE */}
          <div className={`${styles.transaction__table} come-up`}>
            {/* EMPTY STATE */}
            {filteredTransactions?.length === 0 && !isLoading && <EmptyState />}

            {isLoading ? (
              <Stack>
                {[1, 2, 3, 4, 5, 6]?.map(index => <Skeleton key={index} height='60px' borderRadius={8} />)}
              </Stack>
            ) : filteredTransactions?.map(transaction => <TransactionTableRow
              key={transaction?.payment_reference || transaction?.amount}
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
