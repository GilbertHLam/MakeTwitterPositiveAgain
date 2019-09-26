import React, { useState, useEffect } from "react";
import { getTweets, getAccessToken } from "../../utils/apiCalls";
import "./styles.css"; 

interface DashboardProps extends React.HTMLProps<HTMLDivElement> {
    location: any;
}

const Dashboard: React.FC<DashboardProps> = (props: {location: any}) => {
   console.log(props.location.state);
  return (
    <div className="">
        {props.location.state.screen_name}
    </div>
  );
};

export default Dashboard;