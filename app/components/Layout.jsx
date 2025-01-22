//create a layout component that will be used to wrap the app
//this layout component will be used to wrap the app and provide a consistent layout for the app
//the layout component will have a header, footer, and a sidebar
//the layout component will have a prop for the children
//the layout component will return the children wrapped in a div


import React from 'react';

const Layout = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;  