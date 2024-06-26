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
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

const TransalationForm = () => {
  const [englishWord, setEnglishWord] = useState("");
  const [germanWord, setGermanWord] = useState("");
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [arrayOfStrings, setArrayOfStrings] = useState<string[]>([]);
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const t = useTranslations("Index");
  const localActive = useLocale();

  const handleAddTranslation = () => {
    if (!englishWord || !germanWord) {
      // Show error message if either input is empty
      setErrorMessage("Both English and German words are required.");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    } else {
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
      setSuccessMessage("Translation added successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    }
  };

  const clickSubmit = () => {
    if (arrayOfStrings.length === 0) {
      setErrorMessage("Both English and German words are required.");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    } else {
      setWordAdded(true);
    }
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

        router.push(`/${localActive}/quizz/${quizzId}`);
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
          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div style={{ color: "green", marginTop: "10px" }}>
              {successMessage}
            </div>
          )}
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
