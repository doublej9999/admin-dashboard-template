export type Trend = 'up' | 'down';

export const stats: Array<{
  label: string;
  value: string;
  delta: string;
  trend: Trend;
}> = [
  {
    label: 'Total Sales',
    value: '$128,430',
    delta: '+12.4%',
    trend: 'up',
  },
  {
    label: 'Orders',
    value: '2,845',
    delta: '+5.2%',
    trend: 'up',
  },
  {
    label: 'Users',
    value: '9,321',
    delta: '+3.1%',
    trend: 'up',
  },
  {
    label: 'Conversion',
    value: '4.8%',
    delta: '-0.6%',
    trend: 'down',
  },
];

export const salesTrend = [
  { month: 'Jan', value: 9200 },
  { month: 'Feb', value: 10120 },
  { month: 'Mar', value: 9800 },
  { month: 'Apr', value: 11240 },
  { month: 'May', value: 12150 },
  { month: 'Jun', value: 13420 },
  { month: 'Jul', value: 14210 },
  { month: 'Aug', value: 13980 },
  { month: 'Sep', value: 15100 },
  { month: 'Oct', value: 16040 },
  { month: 'Nov', value: 17230 },
  { month: 'Dec', value: 18890 },
];

export const orders = [
  {
    id: 'ORD-10245',
    customer: 'Ava Thompson',
    amount: 842.5,
    status: 'Paid',
    date: '2025-02-02',
  },
  {
    id: 'ORD-10246',
    customer: 'Liam Rodriguez',
    amount: 1290.75,
    status: 'Pending',
    date: '2025-02-04',
  },
  {
    id: 'ORD-10247',
    customer: 'Isabella Chen',
    amount: 356.0,
    status: 'Refunded',
    date: '2025-02-05',
  },
  {
    id: 'ORD-10248',
    customer: 'Noah Patel',
    amount: 2240.2,
    status: 'Paid',
    date: '2025-02-06',
  },
  {
    id: 'ORD-10249',
    customer: 'Mia Garcia',
    amount: 742.8,
    status: 'Paid',
    date: '2025-02-07',
  },
  {
    id: 'ORD-10250',
    customer: 'Oliver Smith',
    amount: 980.4,
    status: 'Pending',
    date: '2025-02-08',
  },
  {
    id: 'ORD-10251',
    customer: 'Sophia Johnson',
    amount: 1560.0,
    status: 'Paid',
    date: '2025-02-09',
  },
  {
    id: 'ORD-10252',
    customer: 'William Brown',
    amount: 420.7,
    status: 'Paid',
    date: '2025-02-10',
  },
  {
    id: 'ORD-10253',
    customer: 'Emily Davis',
    amount: 2850.3,
    status: 'Paid',
    date: '2025-02-11',
  },
  {
    id: 'ORD-10254',
    customer: 'James Wilson',
    amount: 610.9,
    status: 'Refunded',
    date: '2025-02-12',
  },
  {
    id: 'ORD-10255',
    customer: 'Charlotte Lee',
    amount: 1250.0,
    status: 'Pending',
    date: '2025-02-13',
  },
  {
    id: 'ORD-10256',
    customer: 'Benjamin Miller',
    amount: 330.4,
    status: 'Paid',
    date: '2025-02-14',
  },
];

export const notifications = [
  {
    id: 1,
    title: 'New order received',
    time: '2 min ago',
  },
  {
    id: 2,
    title: 'Refund processed',
    time: '1 hour ago',
  },
  {
    id: 3,
    title: 'New user signed up',
    time: '3 hours ago',
  },
];
