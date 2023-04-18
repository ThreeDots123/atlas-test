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

function createData(OrderID, NumOfItems, Amount, Status, Actions) {
  return { OrderID, NumOfItems, Amount, Status, Actions };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ListOrders() {
  const [open, setOpen] = useState(false);
  // const [errorMessage, setErrorMessage] = useState();
  const diapatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const [navbar, setNavbar] = useState(true);

  useEffect(() => {
    diapatch(myOrders());
    if (error) {
      setOpen(true);
      diapatch(clearErrors());
    }
  }, [diapatch, error, open]);
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align="right">Num Of Items</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((order) => (
                  <TableRow
                    key={order._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order._id}
                    </TableCell>
                    <TableCell align="right">
                      {order.orderItems.length}
                    </TableCell>
                    <TableCell align="right">
                      {
                        <span style={{ color: "green" }}>
                          &#8358;{order.itemsPrice}
                        </span>
                      }
                    </TableCell>
                    <TableCell align="right">
                      {order.orderStatus &&
                      String(order.orderStatus).includes("Delivered") ? (
                        <p style={{ color: "green" }}>{order.orderStatus}</p>
                      ) : (
                        <p style={{ color: "red" }}>{order.orderStatus}</p>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {
                        <Link to={`/order/${order._id}`}>
                          <IconButton sx={{ "&:focus": { outline: "none" } }}>
                            <AcUnitIcon color="primary" />
                          </IconButton>
                        </Link>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              {loading && (
                <Container
                  fixed
                  sx={{
                    height: "60vh",
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
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}
