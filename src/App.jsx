import "./App.css";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// REACT
import { useState } from "react";
import { useEffect } from "react";
// MATERIAL UI COMPONENT
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// EXTERNAL LIBRARIES
import axios from "axios";
import moment from "moment";

import { useTranslation } from "react-i18next";
import "./i18n";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

function App() {
  const { t, i18n } = useTranslation();

  const [dateandtime, setdateAndtime] = useState("");
  const [local, setLocal] = useState("ar");

  const [temp, setTemp] = useState({
    number: null,
    description: "null",
    min: null,
    max: null,
    icon: null,
  });
  function hundleLanguageClick() {
    if(local == "ar"){
      setLocal("en");
      i18n.changeLanguage("en");
    }else{
 setLocal("ar");
      i18n.changeLanguage("ar");
      }
    }
  

  useEffect(() => {
    i18n.changeLanguage(local);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setdateAndtime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=28,03&lon=1.66&appid=7a9edc64a66b6d0a85ab4860ba42979f",
      )
      .then(function (response) {
        const number = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const iconResponse = response.data.weather[0].icon;
        setTemp({
          number: number,
          min: min,
          max: max,
          description: description,
          icon: `https://openweathermap.org/payload/api/media/file/${iconResponse}.png`,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        

        <div
          style={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* card  */}
          <div
            dir="rtl"
            style={{
              width: "100%",
              background: "rgb(28, 52, 91)",
              color: "white",
              borderRadius: "15px",
              boxShadow: "0px 0px 1px rgba(0,0,0,0.5)",
            }}
          >
            {/* content  */}
            <div>
              {/* city and time  */}
              <div
                style={{
                  display: " flex",
                  alignItems: "end",
                  justifyContent: "space-between",
                }}
                dir="rtl"
              >
                <Typography
                  variant="h3"
                  style={{ marginRight: "20px", fontWeight: "500" ,  }}
                >
                 { t("Algeria")}
                </Typography>
                <Typography variant="h5" style={{ marginLeft: "10px" }}>
                  {dateandtime}
                  {/* الاحد 10/10 /2026 */}
                </Typography>
              </div>
              {/* end city and time  */}
              <hr />

              {/* degree and description  */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: "20px",
                }}
              >
                <div>
                  {/* temp  */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h1" style={{ textAlign: "right" }}>
                      {temp.number}
                    </Typography>

                    <img src={temp.icon} alt="" />
                  </div>
                  <Typography variant="h6" style={{ textAlign: "right" }}>
                    {t(temp.description)}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5>{t("min")} :{temp.min}</h5>
                    <h5 style={{ margin: "0px 5px" }}>|</h5>
                    <h5>{t("max")} :{temp.max}</h5>
                  </div>
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <i
                    class="fa-solid fa-cloud"
                    style={{ fontSize: "200px", textAlign: "right" }}
                  ></i>
                </div>
              </div>
              {/*  end degree and description  */}
            </div>
            {/* end content  */}
          </div>
          {/* end card  */}
          {/* translation  */}
          <div
            dir="rtl"
            style={{
              marginTop: "20px",
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              style={{ color: "white" }}
              variant="text"
              onClick={hundleLanguageClick}
            >
              {local == "en" ? "ARABIC" : "انجليزي"}
            </Button>
          </div>
          {/*  end translation  */}
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
