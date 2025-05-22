import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const CustomLoadingButton = ({
  text = "Loading...",
  bttnText = "Click to load",
}) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);
  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? text : bttnText}
    </Button>
  );
};

export default CustomLoadingButton;
