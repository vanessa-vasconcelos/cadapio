import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FoodData } from './interface/FoodData';
import { Card } from './components/card/card';
import { useFoodData } from './components/hooks/useFoodData';
import { CreateModal } from './components/creat-modal/create-modal';

function App() {
  const { data } =  useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
    <div className='container'>
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map(foodData => 
          <Card 
          price={foodData.price} 
          title={foodData.title} 
          image={foodData.image}
          />)}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
      <button onClick={handleOpenModal}>Novo</button>
    </div>  
  )
}

export default App
