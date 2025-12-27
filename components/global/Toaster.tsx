import { Toaster } from "@/components/ui/sonner";

const Toaster2 = () => {
  return (
    <Toaster
      position="top-center"
      richColors
      toastOptions={{
        duration: 5000,
      }}
    />
  );
};

export default Toaster2;
