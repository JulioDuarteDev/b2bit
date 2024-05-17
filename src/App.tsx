import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "@/pages/Login.tsx";
import { Error404 } from "@/pages/Error404.tsx";
import { AuthenticatedRoute } from "@/components/AuthenticatedRoute.tsx";
import { Profile } from "@/pages/Profile.tsx";
import { AuthProvider } from "@/contexts/AuthContext.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <Error404 /> },
  { path: "/profile", element: <AuthenticatedRoute Component={Profile} /> },
]);

// return <AuthenticatedRoute Component={Profile} />;
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
