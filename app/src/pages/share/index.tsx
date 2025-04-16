import { observer } from "mobx-react-lite";
import Hub from "../hub";
import { useEffect } from "react";

const Share = observer(() => {
  useEffect(() => {

  }, [])

  return <div className="flex flex-col h-[100vh] w-full bg-sencondbackground" >
    <Hub />
  </div>
});

export default Share