import { useFormik } from "formik";
import * as Yup from "yup";
import b2bit from "@/assets/img/b2bit.png";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.tsx";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Insert a valid e-mail")
    .required("A valid e-mail is required"),
  password: Yup.string().required("A password is required"),
});

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        await login(values);
        navigate("/profile");
      } catch (error) {
        console.log("Error");
        console.log(error);
      }
    },
  });

  return (
    <div className="h-screen bg-background-login flex flex-col items-center justify-center">
      <div className="bg-background flex-row drop-shadow-2xl rounded-2xl p-4">
        <img width={295} src={b2bit} alt="Logotipo b2bit" />
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center justify-center gap-4"
        >
          <div className={"flex flex-col gap-2 w-96"}>
            <Label
              className={formik.errors.email ? "text-red-600" : ""}
              htmlFor="email"
            >
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={"@gmail.com"}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <div className={"text-red-600"}>{formik.errors.email}</div>
            )}
          </div>
          <div className={"flex flex-col gap-2 w-96"}>
            <Label
              className={formik.errors.password ? "text-red-600" : ""}
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={"****************"}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <div className={"text-red-600"}>{formik.errors.password}</div>
            )}
          </div>
          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </div>
  );
}
