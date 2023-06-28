import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// let renderCount = 0

type formValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string,
    instagram: string,
  }
};

const YoutubeForm = () => {
  // whenever we type in input type it will not re-render in every keystroke because of uncontrolled input behaviour but normal react form while typing every keystroke it will re-render
  const form = useForm<formValues>({
    // default values
    defaultValues: {
        username: "Raj",
        email: "",
        channel: "",
        social: {
            twitter: "",
            instagram: "",
        }
    }

    // to set the default values from an api endpoint
//    defaultValues: async() => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
//     const data = await response.json()
//     return {
//         username: "raj",
//         email: data.email,
//         channel: "",
//     }
//    }
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  // renderCount++;

  const onSubmit = (data: formValues) => {
    console.log("Form Submitted", data);
  };

  return (
    <div>
      {/* <h1>Youtube Form {renderCount/2}</h1> */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a different email address"
                );
              },
              notBlackListed: (fieldValue) => {
                return(
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                );
              },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>


        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter")}
          />
        </div>

        <div className="form-control">
          <label htmlFor="instagram">Instagram</label>
          <input
            type="text"
            id="instagram"
            {...register("social.instagram")}
          />
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
