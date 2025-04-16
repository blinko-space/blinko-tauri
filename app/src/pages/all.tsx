import { CommonLayout } from "@/components/Layout";
import { observer } from "mobx-react-lite";
import Home from ".";

const Page = observer(() => {
  return <Home />
});

export default Page