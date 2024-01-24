// Used to fix hydration problems which can occur when the page is reloaded and clicked

// Importing necessary dependencies
"use Client";
import React, { useState, useEffect } from "react";

// Defining the properties for the Client component
interface ClientProps {
  children: React.ReactNode;
}

// Client component to handle hydration problems
const Client: React.FC<ClientProps> = (children) => {
  // State to track whether the component has mounted or not
  const [hasMounted, setHasMounted] = useState(false);

  // Effect to set the hasMounted state to true once the component has mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // If the component has not mounted yet, return null to prevent rendering
  if (!hasMounted) {
    return null;
  }

  // If the component has mounted, render the children
  return <>{children}</>;
};

// Exporting the Client component
export default Client;
