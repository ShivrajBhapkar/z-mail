import { render } from "@react-email/render";
import Mail from "@/components/home/mail";

export default function MailBox() {
  return (
    <div className="overflow-auto flex justify-center pt-2">
      <iframe
        title="Mail Preview"
        className="h-full w-full"
        srcDoc={render(<Mail />)}
      />
    </div>
  );
}
