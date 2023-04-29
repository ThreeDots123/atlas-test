import React, { useEffect, useState } from "react";
import { CircularProgress, IconButton, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../redux/actions/orderAction";
import { Container } from "@mui/system";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { baseUrl, origin } from "../../urls";

function createData(OrderID, NumOfItems, Amount, Status, Actions) {
  return { OrderID, NumOfItems, Amount, Status, Actions };
}

// const orders = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];


const days = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat"
]

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

export default function ListOrders() {

  const [open, setOpen] = useState(false);
  // const [errorMessage, setErrorMessage] = useState();
  const diapatch = useDispatch();
  // const { loading, error, orders } = useSelector((state) => state.myOrders);
  const [navbar, setNavbar] = useState(true);
  const [orders, setOrders] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useSelector(state => state.auth)

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    // Load users orders
    if(user.id) {
      fetch(`${origin}/${baseUrl}/orders?user=${user.id}`)
      .then(response => {
        if (response.status === 400 || response.status === 200) return response.json()
      }).then(data => {
        if (data.success) {
          setOrders(data.detail)
          setLoading(false)
        }
      })
    }
  }, [])

  
  // useEffect(() => {
  //   diapatch(myOrders());
  //   if (error) {
  //     setOpen(true);
  //     diapatch(clearErrors());
  //   }
  // }, [diapatch, error, open]);
  return (
    <>
      <Navbar navbar={navbar} setNavbar={setNavbar} active="active2" />

      <Box
        sx={{
          height: "auto",
          paddingTop: { md: "100px", xs: "65px" },
          paddingBottom: "20px",
        }}
      >
        <TableContainer component={Box}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Num Of Items</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading || <>
                {orders &&
                  orders.map((order) => {
                    let date = new Date(order.date_created)
                    date = `${days[date.getDay()]} ${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
                    return <TableRow
                      key={order.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {order.id}
                      </TableCell>
                      <TableCell>
                        {order.product_name}
                      </TableCell>
                      <TableCell>
                        {order.quantity}
                      </TableCell>
                      <TableCell>
                        {
                          <span style={{ color: "green" }}>
                            &#8358;{numberWithCommas(parseFloat(order.price))}
                          </span>
                        }
                      </TableCell>
                      <TableCell>
                        {
                          order.active ? (order.success ? <p style={{ color: "green" }}>Delivered</p> : <p style={{ color: "red" }}>Processing</p>) :
                          <p style={{ color: "gray" }} >Cancelled</p>
                        }
                      </TableCell>
                      <TableCell>{date}</TableCell>
                      <TableCell>
                        { order.payment_status ? <p style={{ color: "green" }}>Paid</p> : <p style={{ color: "gray" }} >On Delivery</p> }
                      </TableCell>
                      <TableCell>
                        {
                          <Link to={`/order/${order.id}`}>
                            <IconButton sx={{ "&:focus": { outline: "none" } }}>
                              <AcUnitIcon color="primary" />
                            </IconButton>
                          </Link>
                        }
                      </TableCell>
                    </TableRow>
                  })} 
                </>}
              {loading && (
                <Container
                  fixed
                  sx={{
                    height: "60vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                  <Typography>ORDERS....</Typography>
                </Container>
              )}
            </TableBody>
          </Table>
          {orders && orders.length < 1 && (
            <Typography
              sx={{
                width: "955",
                marginTop: "15vh",
                marginButtom: "15vh",
                textAlign: "center",
                fontSize: "2em",
                fontWeight: "800",
              }}
            >
              You have no orders yet
            </Typography>
          )}
        </TableContainer>
      </Box>
    </>
  );
}
