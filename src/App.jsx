import { Box, Button, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import accessoryData from './accessory.json'
import ProductTable from './components/ProductTable.jsx'
function App() {

  const { handleSubmit } = useForm()
  const quantityRef = useRef()
  const productRef = useRef()
  const [price, setPrice] = useState(0)
  const [selectedItems, setSelectedItems] = useState(() => {
    const saved = localStorage.getItem("selectedItems")
    return saved ? JSON.parse(saved) : []
  })
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([]) 
  const [searchKeyword, setSearchKeyword] = useState("")


  const search = (keyword) => {
  setSearchKeyword(keyword)
  if (keyword.trim() === "") {
    setFilteredSelectedItems(selectedItems)
  } else {
    const filtered = selectedItems.filter(item =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    )
    setFilteredSelectedItems(filtered)
  }
  }


  const sortAsc = () => {
    const baseList = searchKeyword.trim() === "" ? [...selectedItems] : [...filteredSelectedItems]
    const sorted = baseList.sort((a, b) => a.name.localeCompare(b.name))
    setFilteredSelectedItems(sorted)
  }

  const sortDesc = () => {
    const baseList = searchKeyword.trim() === "" ? [...selectedItems] : [...filteredSelectedItems]
    const sorted = baseList.sort((a, b) => b.name.localeCompare(a.name))
    setFilteredSelectedItems(sorted)
  }


  const deleteItemByIndex = (index) => { 
    selectedItems.splice(index, 1) 
    setSelectedItems([...selectedItems]) 
  } 

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems))
    setFilteredSelectedItems(selectedItems)
  }, [selectedItems])

  const onSubmit = (e) => {
    const productId = parseInt(productRef.current.value)
    const product = accessoryData.find(accessory => accessory.id === productId)
    const order = {
      ...product,
      quantity: parseInt(quantityRef.current.value)
    }
    console.table(order)
    setSelectedItems([...selectedItems, order])
    setFilteredSelectedItems([...selectedItems, order])
  }
  const updatePrice = (e) => {
    const productId = parseInt(e.target.value)
    const product = accessoryData.find(accessory => accessory.id === productId)
    setPrice(product.price)
    console.log(product.price)
  }
  
  return (
    <Box display="flex" sx={{ mt: 4 }} gap={10} padding={8}>
      <Box display="flex" gap={5} padding={4} sx={{ bgcolor: 'grey', borderRadius: 2, boxShadow: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
            Products: <select ref={productRef} onChange={updatePrice}>
                  {accessoryData.map((accessory, index) => {
                    return (
                      <option key={index} value={accessory.id}>{accessory.name}</option>
                    )
                  })}
            </select><br />
            <br/>
            Quantity: <input type='number' ref={quantityRef} placeholder='Enter Quantity...' defaultValue={1} /><br /><br/>
            <Typography>Price Per Unit: {price} $</Typography>
            <Box display="flex" justifyContent="center" mt={4}>
                  <Button variant="contained" color="primary" type='submit'>Add</Button>
            </Box>
            
        </form>
      </Box>
      <Box>
        <ProductTable
          products={filteredSelectedItems}
          onSearch={search}
          onSortAsc={sortAsc}
          onSortDesc={sortDesc}
          onDelete={deleteItemByIndex}
        />
      </Box>
    </Box>
  )
}

export default App