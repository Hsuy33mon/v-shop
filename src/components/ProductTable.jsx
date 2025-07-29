import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material"
import { useRef } from "react"

const ProductTable =({products, onSearch, onSortAsc, onSortDesc, onDelete}) => {
    const sRef = useRef() 
    const handleSearch = () => { 
        const keyword = sRef.current.value
        onSearch(keyword) 

    }

    const totalPrice = products.reduce((acc,item) => {
        const itemTotal = item.price * item.quantity
        return acc+ (isNaN(itemTotal) ? 0 : itemTotal)
    },0);

    return(
        <Container>
            <input type="text" placeholder="Search..." ref={sRef} />{' '} 
                <Button  size="small" sx={{ padding: "4px 10px", fontSize: "12px" }} color="white" onClick={handleSearch}>Search</Button>
                <Button  size="small" sx={{ padding: "4px 10px", fontSize: "12px" }} color="white" onClick={onSortAsc}> Sort ↑</Button>
                <Button  size="small" sx={{ padding: "4px 10px", fontSize: "12px" }} color="white" onClick={onSortDesc}> Sort ↓</Button>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price Per Unit</TableCell>
                        <TableCell>Overall Price</TableCell>
                        <TableCell>#</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((item,index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{index+1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align="center">{item.quantity}</TableCell>
                            <TableCell align="center">{item.price}</TableCell>
                            <TableCell align="center"> {isNaN(item.price * item.quantity) ? 0 : item.price * item.quantity}</TableCell>
                            <TableCell> <DeleteIcon onClick={()=> onDelete(index)}/> </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}/>
                        <TableCell align='right'><strong>Total Price : </strong> </TableCell>
                        <TableCell align='center'><strong>{totalPrice}</strong></TableCell>
                        <TableCell/>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
        </Container>
        
    )

}

export default ProductTable