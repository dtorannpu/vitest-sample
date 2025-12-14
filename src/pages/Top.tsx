import { sample } from "@/myFunc";
import { useNavigate } from "react-router";

const Top = () => {
  const navigate = useNavigate();

  const handlePage1Click = async () => {
    const result = await sample();
    console.log(result);
    navigate("/page1");
  };

  const handlePage2Click = async () => {
    const result = await sample();
    console.log(result);
    navigate("/page2");
  };

  return (
    <div>
      <h1>Top</h1>
      <button onClick={handlePage1Click}>Page1</button>
      <button onClick={handlePage2Click}>Page2</button>
    </div>
  );
};

export default Top;
