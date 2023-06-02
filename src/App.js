
import {  useEffect, useState } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Header from './Header';


function App() {
  const API_URL = "http://localhost:35000/items"
  const [item, setItem] = useState('')
  const [itemList, setItemList] = useState([])
  const [editItemId, setEditItemId] = useState(0)
  const [show, setShow] = useState(false)

 
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await fetch(API_URL)
      .then((data) =>data.json())
      setItemList(data.reverse())
    }
    fetchData();
  }, [itemList])

  

const addItem = () => {
  if(item === ''){
    alert('Insert Item')
    return
  }
  if(item !== ''){
   
    const id = 0
    setItemList([...itemList , { id , item
      }])
      
      
      
  } 


  setItem("")

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      item
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  
  .then((response) => response.json())
   .then((data) => {
      console.log(data);
      // Handle data
   })
   .catch((err) => {
      console.log(err.message);
   });

  
}

const handleSave = () =>{
  if(item===''){
    alert('Insert Item')
    return
  }
  if(editItemId){
    const editId = itemList.find((i)=> i.id === editItemId)
    const updatedId = itemList.map((itm)=>
    itm.id===editId.id?
    itm={item, id:itm.id}  : { item:itm.item, id:itm.id}
    
    )
    
    console.log(updatedId)
    setItemList(updatedId)
    setShow(false)
    setEditItemId(0)
    setItem('')
    
    const updatedItem = updatedId.filter((item)=>item.id === editItemId)
    fetch(`${API_URL}/${editItemId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        item:updatedItem[0].item
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    
    .then((response) => response.json())
     .then((data) => {
        console.log(data);
        // Handle data
     })
     .catch((err) => {
        console.log(err.message);
     });
  
    
   }


  
   
 }

const handleDelete = (id)=>{
const newArr = itemList.filter(item => item.id !== id)
setItemList(newArr)
setItem('')
fetch(`${API_URL}/${id}`, {
  method: 'DELETE'})

.then((response) => response.json())
 .then((data) => {
    console.log(data);
    // Handle data
 })
 .catch((err) => {
    console.log(err.message);
 });

}

const handleEdits = (id) =>{
  console.log(id)
  const udpateId = itemList.find((item) =>
    item.id === id)
    setItem(udpateId.item)
    setEditItemId(id)
    setShow(true)
   
}



  return (
    <div className="App">

   
        <Header title='To Do List'/>
      
     
      <TodoForm
        show={show}
        addItem={addItem}
        handleSave={handleSave}
        setItem={setItem}
        item={item}/>

      <main>
        <TodoList
          item={item}
          setItem={setItem}
          itemList={itemList}
          setItemList={setItemList}
          handleDelete={handleDelete}
          handleEdits={handleEdits}
        />
      </main>
       

      
      </div>

      
  );
}


export default App;
