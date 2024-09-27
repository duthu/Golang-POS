
import Base from "../../../base";


import dynamic from "next/dynamic";
// import GetDetails from "./get_details"
import api_axios from "../../../api_axios"
import GetDetails from "./get_details"
const Dashboard = dynamic(() => import("./dashboard"), {
  ssr: false,
});






export default async function Home() {
    var props2 =  await GetDetails()
    
    console.log("prop2: " + props2)
  //check if signed in
  //validateCreds();
  return <Base pageTitle={"Dashboard"} children={Dashboard(props2)}></Base>;
}
