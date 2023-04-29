import React, { useEffect } from 'react';
import PaystackPop from "@paystack/inline-js"
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// return import * as React from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
// import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded"
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { baseUrl, origin } from '../../urls';
import store from '../../redux/store';
import { loadUser } from '../../redux/actions/userActions';
import { removeItemFromcart } from '../../redux/actions/cartAction';


function AddressForm({ setAddress, address }) {

    function handleAddress(key, value) {
        setAddress(oldState => ({...oldState, [key]: value}))
    }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="address1"
            name="address1"
            label="Address line 1"
            value={address.address_1 || ""}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onInput={e => handleAddress("address_1", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2 (optional)"
            fullWidth
            value={address.address_2 || ""}
            autoComplete="shipping address-line2"
            variant="standard"
            onInput={e => handleAddress("address_2", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="city"
            name="city"
            label="City"
            value={address.city || ""}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onInput={e => handleAddress("city", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            value={address.state || ""}
            fullWidth
            variant="standard"
            onInput={e => handleAddress("state", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="zip"
            name="zip"
            label="Mobile Phone Number"
            value={address.phone || ""}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onInput={e => handleAddress("phone", e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function PaymentForm({ payment, setPayment }) {

    function handlePayment(key, data) {
        return setPayment(oldPayment => ({...oldPayment, cardOptions:{...oldPayment.cardOptions, [key]:data}}))
    }

  return <React.Fragment>
    <Typography variant="h6" gutterBottom>
      Payment method
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox 
                color="primary" 
                name="saveCard" 
                value="yes"
                checked={ payment.option === 0 && payment.selected }
                onChange={e => setPayment({
                  selected: e.target.checked,
                  option: 0
                })} />
            }
          label="Pay With Debit Card"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox 
                color="primary" 
                name="saveCard" 
                value="yes"
                checked={ payment.option === 1 && payment.selected }
                onChange={e => setPayment({
                  selected: e.target.checked,
                  option: 1
                })} />
            }
          label="Pay On Delivery"
        />
      </Grid>
    </Grid>
  </React.Fragment>
}

function Review({ products, address }) {

    const { user, loading } = useSelector((state) => state.auth);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    let charges = 0
    products.forEach(product => {

      if ( product.price >= 500 && product.price <= 2000 ) {
        charges += 50
      } else if ( product.price > 2000 && product.price <= 4000 ) {
        charges += 75
      } else if ( product.price > 4000 && product.price <= 7000 ) {
        charges += 95
      } else if ( product.price > 7000 && product.price <= 12000 ) {
        charges += 120
      } else if ( product.price > 12000 && product.price <= 17000 ) {
        charges += 180
      } else if ( product.price > 17000 && product.price <= 20000 ) {
        charges += 200
      } else if ( product.price > 20000 && product.price <= 25000 ) {
        charges += 250
      } else {
        charges += 300
      }
    })


    let total = (products.reduce((sum, item) => sum + (item.price * item.quantity), 0)) + charges
    total = numberWithCommas(total)

  const addresses = [address.address_1, address.city, address.state];
//   const payments = [
//     { name: 'Card type', detail: 'Visa' },
//     { name: 'Card holder', detail: 'Mr John Smith' },
//     { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//     { name: 'Expiry date', detail: '04/2024' },
//   ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.product} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={`Purchased ${product.quantity} of this`} />
            <Typography variant="body2">&#8358;{`${product.price * product.quantity}`}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"Charges"} />
            <Typography variant="body2">&#8358; {charges}</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            &#8358;{total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{`${user.first_name} ${user.last_name}`}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Phone Number
          </Typography>
          <Typography gutterBottom>{`${address.phone}`}</Typography>
        </Grid>

        {/* <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}


const steps = ['Shipping address', 'Payment details', 'Review order'];

const theme = createTheme();

// #####################################################################

export default function Checkout({ products ,setShipping }) {


  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [activeStep, setActiveStep] = React.useState(0);
  const [userAddress, setUserAddress] = React.useState({})
  const [creatingOrder, setCreatingOrder] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [payment, setPayment] = React.useState({
    selected: false,
    option: null
  })
  const [btnDisabled, setBtnDisabled] = React.useState(false)


    useEffect(() => {
        // set button back to default
        if(activeStep === 0 || activeStep === 1) setBtnDisabled(true)
    }, [activeStep])
  
    useEffect(() => {
        const replaceWhitespace = (data) => data.replace(/ /g, "")
        //   check btn to see when to make it active
        if(activeStep === 0) {
            // handle address section
            const address_1 = userAddress.address_1 || ""
            const phone = userAddress.phone || ""
            const state = userAddress.state || ""
            const city = userAddress.city || ""
        
            const validate = replaceWhitespace(address_1) && replaceWhitespace(phone) && replaceWhitespace(state) && replaceWhitespace(city)
        

            if (validate) setBtnDisabled(false)
            else setBtnDisabled(true)

        } else if(activeStep === 1) {
            // Handle payment options
            let validate = false

            if(payment.selected) {
                validate = true
            }

            if (validate) setBtnDisabled(false)
            else setBtnDisabled(true)
        }

    }, [userAddress, activeStep, payment])

    
    function getStepContent(step) {

        switch (step) {
        case 0:
            return <AddressForm setAddress={setUserAddress} address={userAddress} />;
        case 1:
            return <PaymentForm setPayment={setPayment} payment={payment} />;
        case 2:
            return <Review products={products} address={userAddress} />;
        default:
            throw new Error('Unknown step');
        }
    }


    function makeOrders(payment_status=false) {
        // handle order submission
        // console.log(products, userAddress) 
        
        userAddress["primary_loc"] = userAddress["address_1"]
        // delete userAddress["address_1"]
        if (userAddress["address_2"]) {
          userAddress["secondary_loc"] = userAddress["address_2"]
          // delete userAddress["address_2"]
        }

        let orderPromise = []

        products.forEach((item, index) => {

          if ( index === (products.length - 1) ) {
            setCount(++index)
          }

          let { quantity, product, price, seller: order_to, name: product_name } = item
          price = quantity * price

          const body = {
            quantity,
            product,
            price,
            order_to,
            product_name,
            ...userAddress,
            "user_name": `${user.first_name} ${user.last_name}`,
            "user": user.id,
            payment_status
          }

          // create a promise
          orderPromise.push(
            new Promise((resolve, reject) => {
              fetch(`${origin}/${baseUrl}/orders/`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {"Content-Type": "application/json"}
              }).then(response => {
                if(response.status === 201 || response.status === 400) return response.json()
                else reject("Something went wrong")
              })
              .then(data => {
                if(data.success) {
                  resolve()
                } else {
                  reject(data)
                }
              })
            })
          )
          
        })

        Promise.all(orderPromise).then(() => {
          // delete items from local host
          products.forEach(product => dispatch(removeItemFromcart(product.product)))
          setCreatingOrder(false)
          setBtnDisabled(false)
          setActiveStep(activeStep + 1);
        })
        .catch((err) => {
          setCreatingOrder(false)
          setBtnDisabled(false)
        })

    }

    
    const handleNext = () => {
      
      if(activeStep === steps.length - 1) {

        setCreatingOrder(true)
        setBtnDisabled(true)

        // if payment with card is selcted make payment before orders are created

        if (payment.option === 0) {
          const paystack = new PaystackPop()
          paystack.newTransaction({
            key: "pk_test_ee3c1c30b8fb1122e83dcc9495adcc145703efca",
            email: "example@gmail.com",
            amount: 10000,
            reference: "" + Math.floor(Math.random() * 100 * Date.now()),
            onSuccess: transaction => {
              fetch(`${origin}/${baseUrl}/orders/verifypayment`, {
                method: "POST",
                body: JSON.stringify({ reference: transaction.reference }),
                headers: { "Content-Type": "application/json" }
              }).then(response => {
                if (response.status === 200) {
                  // create order
                  makeOrders(true)
                }
              })
            },
            onCancel: () => {
              setCreatingOrder(false)
              setBtnDisabled(false)
            }
          })
        } else if (payment.option === 1) {
          // create orders with payment status of on_delivery
          makeOrders()
        }
      
      }

      else setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Paper elevation={0} sx={{p: { xs: 2, md: 3 }, paddingTop: 0 }}>
            <div onClick={() => setShipping(false)} style={{display: "flex", gap: "10px", marginBottom: "20px", cursor: "pointer"}}>
                <ArrowBackRounded />
                <Typography component="p" variant="p" align="center">
                    Return to cart
                </Typography>

            </div>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{fontSize: "15px"}} >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                {count > 1 ? `You've placed ${count} orders.` : "We have recieved your order."}
                <p>click on the <a href="/orders/me">Go order link</a> to view your order status</p> 
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && <>
                  { !creatingOrder ? <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button> : <></> }
                </>}

                <Button
                  variant="contained"
                  disabled={btnDisabled}
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                    { creatingOrder ? <CircularProgress size={15} sx={{margin: "3px 0"}} /> : <></>}
                    { !creatingOrder ? <>
                            {activeStep === steps.length - 1 ? `${payment.option === 0 ? "Pay And" : ""} Place Order`
                            : 'Next'}
                        </> : <></>
                    }
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
    </ThemeProvider>
  );
}