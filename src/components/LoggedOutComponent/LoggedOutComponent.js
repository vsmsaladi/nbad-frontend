import * as React from "react";
import { useEffect } from "react";
import AppBarComponent from "../AppBarComponent/AppBarComponent";


export default function LoggedOutComponent() {


    useEffect(()=>{
        localStorage.removeItem('token')
        window.location.href="/";
    })

  return (
    <div>
        <AppBarComponent/>
        <h2>Logged out</h2>
    </div>
  );
}