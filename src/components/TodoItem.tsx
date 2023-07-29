import { FC } from 'react'

interface ITodoItem {
  id: string
  title: string
  completed: boolean
  onToggle: any
  onRemove: any
}

export const TodoItem: FC<ITodoItem> = ({
  id,
  title,
  completed,
  onToggle,
  onRemove,
}) => {
  return (
    <div className='flex items-center gap-2 border border-solid border-teal-500'>
      <input
        className='w-10'
        type='checkbox'
        checked={completed}
        onChange={() => {
          onToggle({
            variables: {
              id,
              completed: !completed,
            },
          })
        }}
      />
      <p className='flex-1'>{title}</p>
      <button
        className='h-full px-5 py-3'
        onClick={() => {
          onRemove({
            variables: { id },
          })
        }}>
        X
      </button>
    </div>
  )
}
