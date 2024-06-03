"use client";
import { Flame } from "lucide-react";
import { useRouter } from "next/navigation";

const colors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
];

const animalNames = ["A1", "A2", "B1", "B2", "C1"];

const Page = () => {
  const router = useRouter();

  const handleClick = (animal: string) => {
    console.log("animal");
    router.push(`/quizz/8`);
  };

  return (
    <div className="overflow-y-scroll h-screen p-0 space-y-8 sm:space-y-12">
      {animalNames.map((animal, index) => (
        <button
          key={animal}
          onClick={() => {
            handleClick(animal);
          }}
          className={`rounded-md ${colors[index]} hover:opacity-75 p-10 sm:h-80 sm:w-80 mx-auto sm:my-4`}
        >
          <div className="flex items-center flex-col cursor-pointer w-full h-full ">
            <div className="flex-1 flex items-center flex-col w-12 h-12">
              <h2 className="text-9xl font-bold mb-4">{animal}</h2>
            </div>
            <div className="flex w-full flex-row items-end justify-end">
              <div className="bg-white p-3 rounded-full text-black flex flex-row items-end justify-end gap-2">
                <Flame />
                <p>Go!</p>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Page;
