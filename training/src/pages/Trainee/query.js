import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query GetTrainee($skip: Int, $limit: Int){
  getAllTrainees(payLoad: {skip: $skip, limit: $limit}){
    message
    totalCount
    traineeCount
    record{
      name
      _id
      role
      email
      password
      createdAt
      originalId
    }
  }
}`;

export { GET_TRAINEE };
