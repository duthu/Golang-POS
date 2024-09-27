
import { useRouter } from "next/navigation";
import api_axios from "../../api_axios";
function validateCreds() {
  const router = useRouter();
  api_axios
    .get("/validateCreds", {
      withCredentials: true,
    })
    .then((res) => {
      
      return true;
    })
    .catch((err) => {
      console.log("not logged in");      
      router.push("/login");
      return false;
    });
}
export default validateCreds;
