"use client"
import { useQuery } from "convex/react";
import { Sidebar, SidebarContent, SidebarMenu, SidebarProvider, SidebarGroup, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent, SidebarFooter } from "@/components/ui/sidebar";
import { RedirectToSignIn, SignOutButton } from "@clerk/nextjs"
import { SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react"
import { AlignVerticalSpaceAround, PlusIcon, User2Icon } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>

            <Authenticated><SidebarProvider><DashboardSidebar />{children}</SidebarProvider></Authenticated>
            <Unauthenticated>
                <RedirectToSignIn />
            </Unauthenticated>

        </div>
    )
}

function DashboardSidebar() {
    const user = useQuery(api.functions.user.get)
    if (!user) {
        return null;
    }
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/friends">
                                    <User2Icon />
                                    Friends
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Direct Messages</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <PlusIcon>
                            <span className="sr-only">New Direct Message</span>
                        </PlusIcon>
                    </SidebarGroupAction>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton className="flex items-center">
                                            <Avatar className="size-6">
                                                <AvatarImage src={user.image} />
                                                <AvatarFallback>{user.username[0]}</AvatarFallback>
                                                <p className="font-medium">{user.username}</p>
                                            </Avatar>
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem asChild>
                                            <SignOutButton />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>


                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>

                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    )
}