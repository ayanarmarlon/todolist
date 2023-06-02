

const TodoList = ({handleDelete,handleEdits, itemList,  }) => {



  
  return (
    <div className='todolist'>
      <ul>
        {itemList.map((item) =>{
          return <div className='list' > <li key={item.id}><div>
          <p className='text'>{item.item}</p></div>
          
          <div className='buttons'><button style={{backgroundColor:'red'}} className='delete' onClick={()=>{handleDelete(item.id)}}>Delete</button>
          <button style={{backgroundColor:'gray'}}className='edit' onClick={()=>{handleEdits(item.id)}}>Edit</button></div>
          </li></div>
          
        })}
      
       </ul>
        
    </div>
  )
}

export default TodoList