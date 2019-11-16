import React, { useState, useEffect } from "react";
import { getProfile } from "../../utils/apiCalls";
import "./styles.css";

interface DashboardProps extends React.HTMLProps<HTMLDivElement> {
  location: any;
}

const Dashboard: React.FC<DashboardProps> = (props: { location: any }) => {
  console.log(props.location.state);

  const req = getProfile(
    props.location.state.oauth_token,
    props.location.state.oauth_token_secret
  ).then(response => {
    return response.json();
  }).then((data:any) => {
     console.log(data);
}).catch(err => {
    console.log(err);
  });

  return (
    <div className="">
      {props.location.state.screen_name}
    </div>
  );
};

export default Dashboard;
