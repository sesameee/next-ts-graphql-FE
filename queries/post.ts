import gql from "graphql-tag";
export const addPost = gql`
  mutation addPost($attack: String!, $defense: String!) {
    addPost(attack: $attack, defense: $defense) {
      id
      good
      bad
      attack
    }
  }
`;

export const getPost = gql`
  query GetPost {
    getPost {
      id
      attack
      defense
      good
      bad
      comment
    }
  }
`;

export const searchPost = gql`
  query Search($fields: String!, $rolesId: [String]!) {
    search(fields: $fields, rolesId: $rolesId) {
      id
      attack
      defense
      good
      bad
      comment
    }
  }
`;
