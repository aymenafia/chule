import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  BarChartBig,
  Book,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export function NavMenu() {
  const t = useTranslations("Index");
  const localActive = useLocale();
  const localLink = `/${localActive}/quizz/new`; // Construct the link based on the locale

  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Link
            href={`/${localActive}/dashboard`}
            className="flex flexr-row"
          >
            <BarChartBig className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem> */}
        <DropdownMenuItem>
          <Link
            href={`/${localActive}/quizz/new`}
            className="flex flexr-row"
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>New Quizz</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/${localActive}/billing`}
            className="flex flexr-row"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>
          <Link
            href={`/${localActive}/bookMenu`}
            className="flex flexr-row"
          >
            <Book className="mr-2 h-4 w-4" />
            <span>Books</span>
          </Link>
        </DropdownMenuItem> */}
      </DropdownMenuGroup>

      {/* <DropdownMenuSeparator /> */}
      {/* <DropdownMenuGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup> */}
      {/* <DropdownMenuSeparator /> */}
      {/* <DropdownMenuItem>
        <Github className="mr-2 h-4 w-4" />
        <span>GitHub</span>
      </DropdownMenuItem> */}
      {/* <DropdownMenuItem>
        <LifeBuoy className="mr-2 h-4 w-4" />
        <span>Support</span>
      </DropdownMenuItem> */}
    </DropdownMenuContent>
  );
}
