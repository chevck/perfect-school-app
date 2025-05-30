import { createRoot } from "react-dom/client";
import { AppRouter } from "./app.router.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster
      visibleToasts={1}
      position="top-center"
      toastOptions={{
        style: {
          background: "#1d1d1d",
          color: "white",
          fontWeight: 500,
          height: "max-content",
          borderRadius: 1000,
          fontSize: 14,
          paddingLeft: 24,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // minWidth: "max-content",
          // maxWidth: "max-content",
          width: "max-content",
          margin: "auto",
        },
      }}
    />
    <AppRouter />
  </>
);
