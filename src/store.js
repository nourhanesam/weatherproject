import { configureStore } from "@reduxjs/toolkit";
import weatherapislicereducer from "./weatherapislice"
export default configureStore({
    reducer:{ weather : weatherapislicereducer}
})