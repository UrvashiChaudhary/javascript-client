import { gql } from 'apollo-boost';

const UPDATED_TRAINEE_SUB = gql`
subscription {
  traineeUpdated{
    message
    data1{
    name,
    originalId,
    email
  }
  }
  }
`;

const DELETED_TRAINEE_SUB = gql`
subscription {
  traineeDeleted{
    message
    data{
      name
      originalId
      email
    }
    status
  }
}
`;
export { DELETED_TRAINEE_SUB, UPDATED_TRAINEE_SUB };
