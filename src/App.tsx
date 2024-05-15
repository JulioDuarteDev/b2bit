import { useFormik } from "formik";
import * as Yup from "yup";

import b2bit from "./assets/img/b2bit.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Insert a valid e-mail")
    .required("A valid e-mail is required"),
  password: Yup.string().required("A password is required"),
});

function App() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
          <div className={"w-full"}>
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
            {formik.errors.email && formik.touched.email && (
              <div className={"text-red-600"}>{formik.errors.email}</div>
            )}
          </div>
          <div className={"w-full"}>
            <Label
              className={formik.errors.password ? "text-red-600" : ""}
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="text"
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

export default App;
