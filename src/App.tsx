import "./App.css";
import b2bit from "./assets/img/b2bit.png";
import { useFormik } from "formik";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function App() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="h-screen bg-background-login flex flex-col items-center justify-center">
      <div className="bg-background flex-row">
        <img src={b2bit} alt="Logotipo B2BIT" />
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={"@gmail.com"}
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="text"
            placeholder={"****************"}
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </div>
  );
}

export default App;
