import { toast } from "react-toastify";
import { useActions } from "../../hooks/useActions";
import { IAuthProvider } from "../../pages/auth/store/types";
import { useEffect, useRef } from "react";

const GooglePage: React.FC = () => {
  const { LoginWithProvider } = useActions();
  const divRef = useRef(null);

  const handleGoogleLoginSuccess = async (res: any) => {
    const { credential } = res;

    const googleProvider: IAuthProvider = {
      provider: "Google",
      token: credential,
    };
    console.log(credential);
    try {
      const message: any = await LoginWithProvider(googleProvider);
      toast.success(message);
      window.location.assign("http://localhost:3000/");
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (divRef.current) {
      const clientId =
        "100294006434-3puktj7tfklg3sst78mtgqmmi8868lg4.apps.googleusercontent.com";
      google.accounts!.id.initialize({
        client_id: clientId,
        callback: handleGoogleLoginSuccess,
      });
      google.accounts!.id.renderButton(divRef.current, {
        theme: "outline",
        size: "large",
        type: "standard",
        text: "signin",
      });
    }
  }, []);

  return <div ref={divRef}></div>;
};

export default GooglePage;
