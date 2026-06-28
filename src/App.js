import logo from "./logo.svg";
import "./App.css";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { changeresult } from "./weatherapislice";
import { fetchweather } from "./weatherapislice";
import CircularProgress from "@mui/material/CircularProgress";
moment.locale("ar");
const theme = createTheme({
  Typography: {
    fontFamily: ["IBM"],
  },
});
let cancelAxios = null;
function App() {
  const dispach = useDispatch();
  const temp= useSelector((state)=>{
    return state.weather.weather
  })
  const isloading = useSelector((state) => {
    return state.weather.isloading;
  });
  const [local, setlocal] = useState("ar");

  const { t, i18n } = useTranslation();
  // const [temp, setTemp] = useState({
  //   number: null,
  //   description: "",
  //   min: null,
  //   max: null,
  //   icon: null,
  // });
  function handlelanguageclick() {
    if (local == "en") {
      setlocal("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setlocal("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    const dateandtime = moment().format("MMMM Do YYYY, h:mm:ss a");
    setdateandtime(dateandtime);
  }
  const [dateandtime, setdateandtime] = useState("");
  useEffect(() => {
    i18n.changeLanguage("ar");
    const dateandtime = moment().format("MMMM Do YYYY, h:mm:ss a");
    setdateandtime(dateandtime);
  }, []);
  useEffect(() => {
    dispach(fetchweather());
    dispach(changeresult());
    // axios
    //   .get(
    //     "https://api.openweathermap.org/data/2.5/weather?lat=24.7&lon=46.73&appid=a1f588cbd46840517901aeef9f28fbfb",
    //     {
    //       cancelToken: new axios.CancelToken((c) => {
    //         cancelAxios = c;
    //       }),
    //     }
    //   )
    //   .then(function (response) {
    //     // handle success
    //     const responsetemp = Math.round(response.data.main.temp - 275.15);
    //     const min = Math.round(response.data.main.temp_min - 275.15);
    //     const max = Math.round(response.data.main.temp_max - 275.15);
    //     const description = response.data.weather[0].description;
    //     const icon = response.data.weather[0].icon;
    //     console.log(min, max, description);
    //     setTemp({
    //       number: responsetemp,
    //       min: min,
    //       max: max,
    //       description: description,
    //       icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
    //     });
    //     console.log(response);
    //     console.log(temp.number);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });
    // return () => {
    //   cancelAxios();
    // };
  }, []);
  useEffect(() => {
    console.log(temp.number);
  }, [temp]);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" style={{}}>
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* card */}
            <div
              dir={local == "ar" ? "rtl" : "ltr"}
              style={{
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0, 0, 0, 0.05)",
                width: "100%",
              }}
            >
              {/* content */}
              <div>
                {/* city and time */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir={local == "ar" ? "rtl" : "ltr"}
                >
                  <Typography
                    variant="h2"
                    style={{ marginRight: "20px", fontWeight: "600" }}
                  >
                    {t("Riyad")}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {dateandtime}
                  </Typography>
                </div>
                {/* city and time */}
                <hr />
                {/* gegree and desc */}

                <div
                  dir={local == "ar" ? "rtl" : "ltr"}
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div>
                    {/* temp */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      {isloading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        ""
                      )}
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>
                      <img src={temp.icon} />
                    </div>
                    {/* temp */}
                    <Typography variant="h6">{t(temp.description)}</Typography>
                    {/* min and max */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5>
                        {" "}
                        {t("min")}:{temp.min}
                      </h5>
                      <h5 style={{ margin: "0px 5px" }}>|</h5>
                      <h5>
                        {" "}
                        {t("max")}:{temp.max}
                      </h5>
                    </div>
                  </div>
                  <CloudIcon
                    style={{ color: "white", fontSize: "200" }}
                  ></CloudIcon>
                  {/* gegree and desc */}
                </div>
              </div>
              {/* content */}
            </div>
            {/* card */}
            <div
              dir={local == "ar" ? "rtl" : "ltr"}
              style={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Button
                onClick={handlelanguageclick}
                variant="text"
                style={{ color: "white " }}
              >
                {local == "en" ? "Arabic" : "انجليزي"}
              </Button>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
