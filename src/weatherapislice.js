import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchweather=createAsyncThunk("weatherapi/fetchweather",async ()=>{
  const response = await axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=24.7&lon=46.73&appid=a1f588cbd46840517901aeef9f28fbfb"
        // {
        //   cancelToken: new axios.CancelToken((c) => {
        //     cancelAxios = c;
        //   }),
        // }
      )
        // handle success
        const responsetemp = Math.round(response.data.main.temp - 275.15);
        const min = Math.round(response.data.main.temp_min - 275.15);
        const max = Math.round(response.data.main.temp_max - 275.15);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        console.log(min, max, description);
        // setTemp({
        //   number: responsetemp,
        //   min: min,
        //   max: max,
        //   description: description,
        //   icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        // });
        return {number:responsetemp , min, max, description,icon: `https://openweathermap.org/img/wn/${icon}@2x.png`}
})
const weatherapislice=createSlice({
    name:"weatherapi",
    initialState:{
        result:"empty",
        weather:{},
        isloading:false

    },
    reducers:{
        changeresult:(state, action)=>{
            state.result="changed"
        }
    },
    extraReducers(builder){
        builder.addCase(fetchweather.pending, (state, action)=>{
state.isloading=true
        }).addCase(fetchweather.fulfilled, (state,action)=>{ 
             state.isloading=false
             state.weather= action.payload

        }).addCase(fetchweather.rejected, (state, action)=>{
 state.isloading=false
        })
    }
})
export const {changeresult}=weatherapislice.actions;
export default weatherapislice.reducer;