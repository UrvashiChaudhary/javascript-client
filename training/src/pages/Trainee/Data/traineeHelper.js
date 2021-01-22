import { getDateFormatted } from './trainee';

const columns = [
  {
    field: 'name',
    label: 'Name',
  },
  {
    field: 'email',
    label: 'Email Address',
    format: (value) => value && value.toUpperCase(),
  },
  {
    field: 'createdAt',
    label: 'Date',
    align: 'right',
    format: getDateFormatted,
  },
];

export default columns;
