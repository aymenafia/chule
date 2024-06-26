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

const SubjectForm = () => {
  const [englishWord, setEnglishWord] = useState("");
  const [germanWord, setGermanWord] = useState("");
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [arrayOfStrings, setArrayOfStrings] = useState<string[]>([]);
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // const handleAddTranslation = () => {
  //   if (!englishWord || !germanWord) {
  //     // Show error message if either input is empty
  //     setErrorMessage("Both English and German words are required.");
  //     setTimeout(() => {
  //       setErrorMessage("");
  //     }, 4000);
  //     return;
  //   } else {
  //     setTranslations([
  //       ...translations,
  //       { english: englishWord, german: germanWord },
  //     ]);
  //     setEnglishWord("");
  //     setGermanWord("");
  //     setArrayOfStrings((prevArray) => [
  //       ...prevArray,
  //       `${englishWord} the translation in German is ${germanWord}`,
  //     ]);
  //     setSuccessMessage("Translation added successfully!");
  //     setTimeout(() => {
  //       setSuccessMessage("");
  //     }, 2000);
  //   }
  // };

  const clickSubmit = () => {
    if (!germanWord) {
      setErrorMessage("Both English and German words are required.");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    } else {
      setArrayOfStrings((prevArray) => [
        ...prevArray,
        `$learn words in german about this thema ${germanWord}`,
      ]);
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

                // handleAddTranslation();
              }}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="German Translation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter the subject of the Quiz</FormLabel>
                    <FormControl>
                      <Input
                        style={{ marginLeft: "20px" }}
                        placeholder="Subject"
                        value={germanWord}
                        onChange={(e) => setGermanWord(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      This subject you will be asked about.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4 items-center justify-center">
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

export default SubjectForm;
