import { ethers } from 'ethers'
import { User } from '@components/tools/User'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'

interface MemberProps {
  id: number
  account: string
  amount: string
}

export default function Member({ accounts, amounts }: { accounts: string[]; amounts: any }) {
  let rows: MemberProps[] = []
  for (let i = 0; i < accounts.length; i++) {
    rows.push({ id: i, account: accounts[i], amount: amounts[i] })
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">User</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} account={row.account} amount={row.amount} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const Row = ({ account, amount }: { account: string; amount: any }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <User address={account} />
      </TableCell>
      <TableCell className="text-right">{ethers.utils.formatEther(amount)}</TableCell>
    </TableRow>
  )
}
