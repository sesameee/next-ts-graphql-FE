import gql from "graphql-tag";

export const GetRoles = gql`
  query GetRoles{
    roles {
      name,
      id,
      position
    }
  }
`;
