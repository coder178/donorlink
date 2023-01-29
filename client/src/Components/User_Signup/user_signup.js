import { React, useState, useEffect } from "react";
import {
    Grid,
    Paper,
    useTheme,
    useMediaQuery,
    Stepper,
    Step,
    StepLabel,
} from "@mui/material";
import First from "./first";
import Second from "./second";
import { Box } from "@mui/system";
import axios from "axios";
import base_url from "../../api/bootapi";

const steps = ['Account Information', 'Review Information'];

const UserSignup = () => {
    let [inputs, setInputs] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        country: "",
        contactno: "",
        adharno: "",    
        profession: "",
        type: "",
    });

    let [profile, setProfile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [activestep, SetActivestep] = useState(0);
    //   const getAllNgos = () => {
    //     axios.get(`${base_url}/ngos`).then(
    //       (response) => {
    //         console.log(response);

    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     )
    //   }
    //   useEffect(() => {
    //     getAllNgos();
    //   }, []);



    //   let onProfileChange = (event) => {

    //       setProfile(event.target.files[0]);
    //   }
    //   let onCertiChange = (event) => {

    //     setCertificate(event.target.files[0]);
    // }
    useEffect(() => {
        if (profile) {
            // console.log(profile);
            setImageUrl(URL.createObjectURL(profile));
        }
    }, [profile]);

    let onProfileUpload = (event) => {
        setProfile(event.target.files[0]);
    }

    let onChangeData = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        console.log(name,value);
        setInputs((values) => ({ ...values, [name]: value }));
    }

    let [pageno, SetPageno] = useState(1);
    let next = () => {

        SetPageno(pageno + 1);
        SetActivestep(activestep + 1);
    }
    let prev = () => {
        SetPageno(pageno - 1)
        SetActivestep(activestep - 1);
    }
    let submit = (e) => {
        e.preventDefault();
        console.log(inputs);
        console.log(profile);
        postData(inputs);
        
    }

    const postData = (data) => {
        axios.post(`${base_url}/addNgo`, data).then(
          (response) => {
            console.log(response);
            console.log("success");
          },
          (error) => {
            console.log(error);
            console.log("Failure");
          }
    
        )
      }

    const postData = (data) => {
        axios.post(`${base_url}/addNgo`, data).then(
            (response) => {
                console.log(response);
                console.log("success");
            },
            (error) => {
                console.log(error);
                console.log("Failure");
            }

        )
    }

    const paperStyle = {
        
        padding: 20,
        width: 400,
        margin:"16vh auto",
        maxHeight: 400,
        overflow: "auto",
    };

    const smallDev = {
        padding: 20,
        width: 500,
    };

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <>
            <Grid align="center" >
                <Paper elevation = {5} style={!isMatch ? paperStyle : smallDev}>
                    <Box>
                        <Stepper activeStep={activestep}  >
                            {steps.map((label, index) => {

                                return (
                                    <Step key={label} sx={{ color: "#9C7875" }}>
                                        <StepLabel>{label}</StepLabel >
                                    </Step>

                                );

                            })}


                        </Stepper>
                    </Box>
                    {(pageno === 1) ? <First nextfun={next} changefun={onChangeData} inputs={inputs} onFileUpload={onProfileUpload} profile={profile} imageUrl={imageUrl} /> : <Second nextfun={next} prevfun={prev} submitfun={submit} changefun={onChangeData} inputs={inputs} />}
                </Paper>
            </Grid>
        </>


    );
};
export default UserSignup;