import React from 'react'


const TodoForm = ({item,setItem, addItem,handleSave,show}) => {

 

  return (
    <div className='input'>
      <input
       type="text" 
       placeholder='Add items...'
       value={item}
      onChange={(e)=> setItem(e.target.value)}
       />

       
{!show?

<button onClick={()=>addItem()}>Add</button>:
<button onClick={()=>handleSave()}>Update</button>

}
    </div>
  )
}

export default TodoForm