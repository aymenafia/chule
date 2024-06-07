"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ToastAction, ToastProvider } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface Translation {
  english: string;
  german: string;
}

const TransalationForm = () => {
  const [englishWord, setEnglishWord] = useState("");
  const [germanWord, setGermanWord] = useState("");
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [arrayOfStrings, setArrayOfStrings] = useState<string[]>([]);
  const { toast } = useToast();

  const handleAddTranslation = () => {
    setTranslations([
      ...translations,
      { english: englishWord, german: germanWord },
    ]);
    setEnglishWord("");
    setGermanWord("");
    setArrayOfStrings((prevArray) => [
      ...prevArray,
      `${englishWord} the translation in German is ${germanWord}`,
    ]);

    console.log(englishWord);
    console.log(germanWord);

    console.log(arrayOfStrings);
  };

  const clickSubmit = () => {
    const clickSubmit = () => {
      if (arrayOfStrings.length === 0) {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });
      } else {
        setWordAdded(true);
      }
    };
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWordAdded, setWordAdded] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const router = useRouter();
  const form = useForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/quizForm/generate", {
        method: "POST",
        body: JSON.stringify(arrayOfStrings),
      });
      if (res.status === 200) {
        const data = await res.json();
        const quizzId = data.quizzId;

        router.push(`/quizz/${quizzId}`);
      }
    } catch (e) {
      console.log("error while generating", e);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <ToastProvider />

      <h1></h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : !isWordAdded ? (
        <div style={{ marginBottom: "20px" }}>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                handleAddTranslation();
              }}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="English Word"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your word</FormLabel>
                    <FormControl>
                      <Input
                        style={{ marginLeft: "20px" }}
                        placeholder="Your Word"
                        value={englishWord}
                        onChange={(e) => setEnglishWord(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      This word you will be asked about.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="German Translation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>German Translation</FormLabel>
                    <FormControl>
                      <Input
                        style={{ marginLeft: "20px" }}
                        placeholder="German Word"
                        value={germanWord}
                        onChange={(e) => setGermanWord(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      This word you will be asked about.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4 items-center justify-center">
                <Button
                  variant="outline"
                  className="px-4 py-2 rounded"
                  type="submit"
                >
                  Add
                </Button>
                <Button
                  onClick={clickSubmit}
                  className="px-4 py-2 rounded"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <></>
      )}
      {isLoading ? (
        <h1></h1>
      ) : isWordAdded ? (
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <Table>
              <TableCaption>A list of your recent words.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Your Word</TableHead>
                  <TableHead className="text-right">
                    German Translation
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {translations.map((translation, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {translation.english}
                    </TableCell>
                    <TableCell className="text-right">
                      {translation.german}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              size="lg"
              className="mt-2"
              type="submit"
            >
              Generate Quiz 🪄
            </Button>
          </form>
        </Form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TransalationForm;
