import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

const page = () => {
  const t = useTranslations("Index");
  const localActive = useLocale();
  return (
    <Alert variant="default">
      <AlertTitle className="mb-3 text-xl text-green-400">Success</AlertTitle>
      <AlertDescription>
        Your account has been updated.
        <br />
        <Link
          href={`/${localActive}/dashboard`}
          className="underline"
        >
          Go to the dashboard
        </Link>{" "}
        to generate more quizzes.
      </AlertDescription>
    </Alert>
  );
};

export default page;
