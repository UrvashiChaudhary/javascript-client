import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query GetTrainee($skip: Int, $limit: Int){
  getAllTrainees(payLoad: {skip: $skip, limit: $limit}){
    totalCount
    record{
      name
      email
      createdAt
    }
  }
}`;

export { GET_TRAINEE };
