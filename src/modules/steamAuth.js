import React from "react";
import { LogoutButton } from "../components/LogoutButton";
import { LoginButton } from "../components/LoginButton";

//sibling1
const Steam = ({...props}) => {
  return props.userSteam ? (
    <LogoutButton {...props} user={props.userSteam} />
  ) : (
    <LoginButton />
  );
}

export default Steam
