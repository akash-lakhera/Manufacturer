import { useEffect, useState } from "react";
import Manudash from "./components/Manudash";
import Transportdash from "./components/Transportdash";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [user, setUser] = useState("");

  let comp = "";
  if (user) {
    if (user.type == "Manufacturer") {
      comp = <Manudash user={user} />;
    } else comp = <Transportdash user={user} />;
  }
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/api/user")
      .then((response) => {
        if (response.status === 200) return response.json();
        else navigate("/login");
      })
      .then((json) => {
        setUser(json);
      });

    return () => {};
  }, []);

  return <>{comp}</>;
}
export default Dashboard;
