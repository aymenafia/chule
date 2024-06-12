import UploadDoc from "../UploadDoc";
import { auth, signIn } from "@/auth";
import { getUserSubscription } from "@/actions/userSubscriptions";
import { Lock, Flame } from "lucide-react";
import { getStripe } from "@/lib/stripe-client";
import { useRouter } from "next/navigation";
import { PRICE_ID } from "@/lib/utils";
import UpgradePlan from "../UpgradePlan";
import TransalationForm from "../TranslationForm";
import SubjectForm from "../SubjectForm";
import Link from "next/link";

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = async () => {
  const session = await auth();
  // const router = useRouter();
  const userId = session?.user?.id;
  if (!userId) {
    // signIn();
    redirect("/api/auth/signin");
    return;
  }
  const subscribed: boolean | null | undefined = await getUserSubscription({
    userId,
  });

  return (
    <div className="flex flex-col flex-1">
      <main className="py-11 flex flex-col text-center gap-4 items-center flex-1 mt-24">
        {subscribed ? (
          <>
            <h2 className="text-3xl font-bold mb-4">
              What do you want to be quizzed about today?
            </h2>
            <Link href={`/en/bookMenu`}>
              <p className="text-blue-600 underline">Go to Books</p>
            </Link>
            <Tabs
              defaultValue="account"
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Your Quiz</TabsTrigger>
                <TabsTrigger value="password">Document</TabsTrigger>
                <TabsTrigger value="subject"> Subject</TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <TransalationForm />
                  </CardHeader>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <UploadDoc />
                  </CardHeader>
                </Card>
              </TabsContent>

              <TabsContent value="subject">
                <Card>
                  <CardHeader>
                    <SubjectForm />
                  </CardHeader>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <UpgradePlan />
        )}
      </main>
    </div>
  );
};

export default page;
