import React, { useState } from "react";

import Role from "./Role";
import Post from "./PostList";
import Search from "./Search";
// import { Episode } from './__generated__/types';
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "../style/main.scss";
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
}));

console.log("makeStyles", makeStyles);

export const App: React.SFC = () => {
  const classes = useStyles();
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="mainPage">
      {/* <Post />  */}
      {/* <Search /> */}
      <section className="header">
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="Search" value="1" />
            <Tab label="Post" value="2" />
          </Tabs>
        </AppBar>
        <Search />
      </section>
    </div>
  );
};

export default App;
