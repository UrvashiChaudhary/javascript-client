import { gql } from 'apollo-boost';

const CREATE_TRAINEE = gql`
mutation CreateTrainee($name: String!, $email: String!, $password: String!) {
  createTrainee(payLoad: { name: $name, email: $email,password: $password})
}
`;

const UPDATE_TRAINEE = gql`
mutation UpdateTrainee($id: ID! $name: String, $email: String) {
  updateTrainee(payLoad: { id: $id,name: $name, email: $email})
}
`;

export { UPDATE_TRAINEE, CREATE_TRAINEE };
