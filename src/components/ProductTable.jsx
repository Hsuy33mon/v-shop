import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useRef } from "react"

const ProductTable =({products, onSearch, onSortAsc, onSortDesc, onDelete}) => {
    const sRef = useRef() 
    const handleSearch = () => { 
        const keyword = sRef.current.value
        onSearch(keyword) 

    }

    return(
        <Container>
            <input type="text" placeholder="Search..." ref={sRef} />{' '} 
                <Button  size="small" sx={{ padding: "4px 10px", fontSize: "12px" }} color="white" onClick={handleSearch}>Search</Button>
                Sort :
                <Button  size="small" sx={{ padding: "4px 10px", fontSize: "12px" }} color="white" onClick={onSortAsc}>↑</Button>
                <Button  size="small" sx={{ padding: "4px 10px", fontSize: "12px" }} color="white" onClick={onSortDesc}>↓</Button>
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
            </Table>
        </TableContainer>
        </Container>
        
    )

}

export default ProductTable