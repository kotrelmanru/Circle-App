import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { Iregister } from "../../../../lib/validation/useRegisterValidate";
import { useNavigate } from "react-router-dom";
import { API } from "../../../../lib/api";
import { toast } from "react-toastify";

interface IProps {
  reset: () => void;
}

export const useRegisterFunction = ({ reset }: IProps) => {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Iregister> = async (data) => {
    try {
      console.log(data);
      const res = await API.post("/auth/register", data);
      reset();
      console.log(res);
      toast.success("🎉 Registration successful!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        onClose: () => navigate("/auth/login"),
      });
    } catch (error) {
      toast.error(
        "Registration failed.Please check your inputs and try again.",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      console.log(error);
    }
  };

  const onErrorSubmit: SubmitErrorHandler<Iregister> = (data) => {
    console.log(data);
    toast.warning("Please check your inputs and try again.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return {
    onSubmit,
    onErrorSubmit,
  };
};
