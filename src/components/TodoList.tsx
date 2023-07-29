import { useMutation, useQuery } from '@apollo/client'
import { FC } from 'react'
import { TodoItem } from '.'
import { ALL_TODO, REMOVE_TODO, UPDATE_TODO } from '../apollo/todos'

export const TodoList: FC = () => {
  const { loading, error, data } = useQuery(ALL_TODO)
  const [toggleTodo, { error: updateError }] = useMutation(UPDATE_TODO)
  const [removeTodo, { error: removeError }] = useMutation(REMOVE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter(
              todo => todo.__ref !== `Todo:${removeTodo.id}`,
            )
          },
        },
      })
    },
  })

  if (loading)
    return <div className='text-center font-bold text-red-500'>Loading</div>

  if (error || updateError || removeError)
    return <div className='text-center font-bold text-red-500'>Error</div>

  return (
    <div className='flex w-full flex-col gap-2'>
      {data.todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          onToggle={toggleTodo}
          onRemove={removeTodo}
        />
      ))}
    </div>
  )
}
