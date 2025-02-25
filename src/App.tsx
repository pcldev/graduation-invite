import React from "react";
import { useSearchParams } from "react-router-dom";
import Card from "./components/Card";

const App: React.FC = () => {
  // Read URL parameters; default to "boy" if not set or invalid.
  const [searchParams] = useSearchParams();
  const personParam = searchParams.get("person");
  const person = personParam === "conglong" ? "conglong" : "lananh";

  const className = `bg ${
    person === "conglong" ? "boy-background" : "girl-background"
  } invite-container`;

  return (
    <div className={className}>
      <Card person={person} />
    </div>
  );
};

export default App;
