import { useMutation } from '@apollo/client'
import { FC, useState } from 'react'
import { ADD_TODO, ALL_TODO } from '../apollo/todos'

interface IAddTodo {}

export const AddTodo: FC<IAddTodo> = ({}) => {
  const [text, setText] = useState('')
  const [addTodo, { error }] = useMutation(ADD_TODO, {
    // refetchQueries: [ALL_TODO],
    update(cache, { data: { newTodo } }) {
      const { todos } = cache.readQuery({ query: ALL_TODO })

      cache.writeQuery({
        query: ALL_TODO,
        data: { todos: [newTodo, ...todos] },
      })
    },
  })

  const handleAddTodo = () => {
    if (text.trim().length) {
      addTodo({
        variables: {
          title: text,
          userId: 123,
          completed: false,
        },
      })
      setText('')
    }
  }

  const handlePressKey = e => {
    if (e.key === 'Enter') handleAddTodo()
  }

  if (error)
    return <div className='text-center font-bold text-red-500'>Error</div>

  return (
    <input
      className='mb-5 w-full border border-solid border-teal-500 px-4 py-2 focus:border-teal-900'
      placeholder='Enter text...'
      onChange={e => setText(e.target.value)}
      value={text}
      onKeyDown={handlePressKey}
    />
  )
}
