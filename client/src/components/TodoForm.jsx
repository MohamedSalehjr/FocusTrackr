import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useState } from 'react'

function TodoForm({ addTodo }) {

  const [value, setValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    addTodo(value)
    setValue("")
  }

  return (
    <form className="flex w-[400px] items-center space-x-2" onSubmit={handleSubmit}>
      <Input type="text" placeholder="Todays Tasks" value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  )
}

export default TodoForm
