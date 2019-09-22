import React from "react";
import "./styles.css"; 

interface DashboardProps extends React.HTMLProps<HTMLDivElement> {
    location: any;
}

const Dashboard: React.FC<DashboardProps> = (props: {location: any}) => {
  return (
    <div className="">
        {"hert"}
        {props.location.state.oauth_token}
    </div>
  );
};

export default Dashboard;