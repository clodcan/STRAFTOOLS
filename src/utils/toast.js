import toast from "react-hot-toast";

const toastStyle = {
  borderRadius: "10px",
  background: "#09090b",
  color: "#fff",
};

export const successToast = (msg, icon) =>
  toast(msg, { icon, style: { ...toastStyle, border: "1px solid #059669" } });

export const errorToast = (msg) =>
  toast(msg, {
    icon: "❌",
    style: { ...toastStyle, border: "1px solid #b91c1c" },
  });
