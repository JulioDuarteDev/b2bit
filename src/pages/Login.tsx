import { useFormik } from "formik";
import * as Yup from "yup";
import b2bit from "@/assets/img/b2bit.png";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.tsx";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

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
      await login(values);
      navigate("/profile");
    },
  });

  return (
    <div className="h-screen bg-background-login flex flex-col items-center justify-center">
      <div className="bg-background flex flex-col drop-shadow-login rounded-3xl px-7 pt-14 pb-10">
        <img
          className={"self-center mb-9"}
          width={295}
          src={b2bit}
          alt="Logotipo b2bit"
        />
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center justify-center gap-6"
        >
          <div className={"flex flex-col gap-2 w-96"}>
            <Label
              className={
                formik.errors.email ? "text-red-600 leading-5" : "leading-5"
              }
              htmlFor="email"
            >
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className={"text-base h-14 border-0"}
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
              className={
                formik.errors.password ? "text-red-600 leading-5" : "leading-5"
              }
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              className={"text-base h-14 border-0"}
              placeholder={"****************"}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <div className={"text-red-600"}>{formik.errors.password}</div>
            )}
          </div>
          <Button
            className={"w-full text-lg font-bold mt-2.5 h-14"}
            type="submit"
          >
            {loading && <ReloadIcon className="mr-3 size-6 animate-spin" />}
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
