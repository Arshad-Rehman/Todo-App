import React, { useEffect, useState } from 'react';
import './statewise.css';


const getLocalItems=()=>{
  let list = localStorage.getItem('lists');
  console.log(list);

  if(list){
    return JSON.parse(localStorage.getItem('lists'));
  }else{
    return [];
  }
}



const Statewises = () => {
const [inputdata,setInputdata] =useState('');
const[items,setItems]=useState(getLocalItems());
const[toggleButton,setToggleButton] =useState(true);
const[iseditItem,setEditItems]=useState(null);
const addItems =()=>{
 
    if(!inputdata){
      alert('plzz fill data');
    }else if(inputdata && !toggleButton){
      setItems(
        items.map((elem)=>{
          if(elem.id === iseditItem){
            return{...elem, name:inputdata}
          }
          return elem;
        })
      )
      setToggleButton(true);
      setInputdata(' ');
      setEditItems(null);
    }
    else{
      const allInputData = {id: new Date().getTime().toString(), name:inputdata}
        setItems([...items,allInputData]);
        setInputdata('');
    }


}
const deleteItem=(index)=>{
const updatedItems = items.filter((elem)=>{
return index !== elem.id;

});

setItems(updatedItems);

}

const editItem =(id)=>{
let newEditItems = items.find((elem)=>{
return elem.id === id
});
console.log(newEditItems);

setToggleButton(false);
setInputdata(newEditItems.name);
setEditItems(id);
}


const removeall =()=>{
  setItems([]);
}

useEffect(()=>{
  localStorage.setItem('lists',JSON.stringify(items))
},[items]);


    return (
    <>
<div className='container'>
<div className='row'>
  <div className='col-lg-12'>
<h1 className='text-center pt-5'>Todo App</h1>
  </div>
</div>

    <div className='row justify-content-center mt-5'>
        <div className='col-lg-8'>
        <div className="mb-3">
<h1>Add Items</h1>
  <input type="text" 
  className="form-control" 
  id="exampleFormControlInput1" 
  placeholder="add items..."
  value={inputdata}
  onChange={(event)=>{
    setInputdata(event.target.value);
  }}

  
  />
{ toggleButton ? <button type="button" className="btn btn-info mt-2 mb-5" onClick={addItems}><i class="fa fa-plus" aria-hidden="true"></i>Add</button>:
<button type="button" className="btn btn-info mt-2 mb-5" onClick={addItems}><i class="far fa-edit" aria-hidden="true"></i> Edit</button>
}
 

{
    items.map((elem)=>{
return(

    <div className="alert alert-info " role="alert" key={elem.id}>
    <h3>{elem.name}</h3>
    <i className='far fa-edit add-btn some-padd' title='Edit item' onClick={()=>editItem(elem.id)}> Edit</i>
    <i className='far fa-trash-alt some-padd' title='Delte item' onClick={()=>deleteItem(elem.id)}> Delete</i>
  </div>
)
    })
}

<button type="button" className="btn btn-info mt-2 mb-5 text-center" onClick={removeall}><i class="fa fa-trash" aria-hidden="true"></i> Remove All</button>


</div>

        </div>
    </div>

</div>
    </>
  )
}

export default Statewises;
