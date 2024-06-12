"use client";
import { Flame } from "lucide-react";
import { useRouter } from "next/navigation";
import BooksHeader from "@/components/BooksHeader";
import BookCard from "@/components/BookCard";
import SideBar from "@/components/SideBar";
import { books } from "@/constants/mockData";
import { motion } from "framer-motion";
import styles from "@/app/page.module.css";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { auth, signIn } from "@/auth";

const Page = () => {
  const router = useRouter();
  const t = useTranslations("Index");
  const localActive = useLocale();

  return (
    <main className={styles.main}>
      <div>
        {/* <BookCard /> */}
        <div className={styles.containerStyle}>
          <div className={styles.grouper}>
            <h1 className={styles.title}></h1>
            <ul className={styles.ulGroupStyle}>
              {books.map((book, i) => (
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", damping: 50, mass: 0.75 }}
                  initial={{ opacity: 0, x: 200 * (i + 1) }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                >
                  <a
                    href={`/${localActive}/bookMenu//book/${book.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <BookCard
                      title={book.title}
                      coverImage={book.image}
                      description={book.description}
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Page;
