import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { Ilogin } from "../../../../lib/validation/useLoginValidate";
import { useAppDispatch } from "../../../../store/store";
import { loginAsync } from "../../../../store/Asyncthunks/authAsync";
import { toast } from "react-toastify";

interface IProps {
  reset: () => void;
}

export const useLoginFunction = ({ reset }: IProps) => {
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Ilogin> = (data) => {
    try {
      console.log(data);
      dispatch(loginAsync(data));
      reset();
    } catch (error) {}
  };

  const onErrorSubmit: SubmitErrorHandler<Ilogin> = (data) => {
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
