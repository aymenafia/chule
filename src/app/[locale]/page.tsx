import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { redirect } from "next/dist/server/api-utils";
import { useLocale } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  console.log(t);
  console.log(t("title"));
  const localActive = useLocale();

  console.log(localActive);
  const quizLink = `/${localActive}/quizz/new`; // Construct the link based on the locale

  return (
    <div className="flex flex-col flex-1">
      <main className="flex justify-center flex-1">
        <div className="items-center flex flex-col sm:flex-row gap-20 justify-end mx-auto p-10 w-full sm:py-20 sm:w-[1000px]">
          <div>
            <Image
              src="/images/chule.png"
              width="400"
              height="400"
              alt="owl"
            />
          </div>
          <div className="text-center flex gap-6 flex-col">
            <h1 className="text-3xl font-bold">{t("title")}</h1>
            <h3 className="text-sm">
              Upload documents, and easily generate your quizzes with AI.
            </h3>
            <Button
              variant="neo"
              className="mt-4 h-14 text-white"
              asChild
            >
              <Link href={quizLink}>Get Started</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
