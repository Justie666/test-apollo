import { gql } from '@apollo/client'

export const ALL_TODO = gql`
  query AllTodos {
    todos: allTodos {
      id
      title
      completed
    }
  }
`
export const ADD_TODO = gql`
  mutation AddTodo($title: String!, $userId: ID!, $completed: Boolean!) {
    newTodo: createTodo(
      title: $title
      user_id: $userId
      completed: $completed
    ) {
      id
      user_id
      completed
      title
    }
  }
`
export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean) {
    updateTodo(id: $id, completed: $completed) {
      id
      title
      completed
    }
  }
`

export const REMOVE_TODO = gql`
  mutation RemoveTodo($id: ID!) {
    removeTodo(id: $id) {
      id
      title
    }
  }
`
