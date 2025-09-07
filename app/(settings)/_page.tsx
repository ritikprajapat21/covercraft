// "use client";
// // No need for now. I think!!
//
// import {
//   CreditCard,
//   Crown,
//   Download,
//   Monitor,
//   Moon,
//   Save,
//   Sun,
//   Trash2,
//   User,
// } from "lucide-react";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { useTheme } from "next-themes";
// import { useState } from "react";
// import { toast } from "sonner";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useAppStore } from "@/lib/store";
//
// // FIX: Add change name feature
// export default function SettingsPage() {
//   const { data: session } = useSession();
//   const user = useAppStore((state) => state.user);
//   const setUser = useAppStore((s) => s.setUser);
//   const { theme, setTheme } = useTheme();
//   const [isLoading, setIsLoading] = useState(false);
//
//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setIsLoading(true);
//     setUser({ name: e.target.value });
//   };
//
//   const handleDeleteAccount = async () => {
//     if (
//       confirm(
//         "Are you sure you want to delete your account? This action cannot be undone.",
//       )
//     ) {
//       try {
//         // This would delete the account
//         toast.success("Account deletion initiated");
//       } catch (_error) {
//         toast.error("Failed to delete account");
//       }
//     }
//   };
//
//   if (!session) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//             Please sign in
//           </h1>
//           <Link href="/auth/signin">
//             <Button>Sign In</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }
//
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Settings
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">
//             Manage your account preferences and settings
//           </p>
//         </div>
//
//         <div className="space-y-6">
//           {/* Profile Settings */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <User className="w-5 h-5" />
//                 Profile
//               </CardTitle>
//               <CardDescription>
//                 Manage your profile information and account details
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="flex items-center gap-6">
//                 <Avatar className="w-20 h-20">
//                   <AvatarImage
//                     src={session.user?.image || ""}
//                     alt={session.user?.name || ""}
//                   />
//                   <AvatarFallback className="text-lg">
//                     {user?.name?.charAt(0) || "U"}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-2">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       {user?.name}
//                     </h3>
//                     <Badge
//                       variant="secondary"
//                       className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
//                     >
//                       Free Plan
//                     </Badge>
//                   </div>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {user?.email}
//                   </p>
//                 </div>
//               </div>
//
//               <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="name">Full Name</Label>
//                   <Input
//                     id="name"
//                     defaultValue={user?.name || ""}
//                     onChange={handleNameChange}
//                     className="mt-1"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="email">Email Address</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     defaultValue={session.user?.email || ""}
//                     className="mt-1"
//                     disabled
//                   />
//                 </div>
//                 <div className="flex justify-end md:col-span-2">
//                   <Button
//                     onClick={handleNameChange}
//                     disabled={isLoading}
//                     size="lg"
//                   >
//                     {isLoading ? (
//                       <>
//                         <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <Save className="w-4 h-4 mr-2" />
//                         Save Settings
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//
//           {/* Appearance Settings */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Monitor className="w-5 h-5" />
//                 Appearance
//               </CardTitle>
//               <CardDescription>
//                 Customize how the application looks and feels
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <Label className="text-base font-medium">Theme</Label>
//                   <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
//                     Choose your preferred theme or sync with your system
//                   </p>
//                   <div className="grid grid-cols-3 gap-3">
//                     <Button
//                       variant={theme === "light" ? "default" : "outline"}
//                       onClick={() => setTheme("light")}
//                       className="flex items-center gap-2"
//                     >
//                       <Sun className="w-4 h-4" />
//                       Light
//                     </Button>
//                     <Button
//                       variant={theme === "dark" ? "default" : "outline"}
//                       onClick={() => setTheme("dark")}
//                       className="flex items-center gap-2"
//                     >
//                       <Moon className="w-4 h-4" />
//                       Dark
//                     </Button>
//                     <Button
//                       variant={theme === "system" ? "default" : "outline"}
//                       onClick={() => setTheme("system")}
//                       className="flex items-center gap-2"
//                     >
//                       <Monitor className="w-4 h-4" />
//                       System
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//
//           {/* Notifications */}
//           {/* <Card> */}
//           {/*   <CardHeader> */}
//           {/*     <CardTitle className="flex items-center gap-2"> */}
//           {/*       <Bell className="w-5 h-5" /> */}
//           {/*       Notifications */}
//           {/*     </CardTitle> */}
//           {/*     <CardDescription> */}
//           {/*       Configure how you want to be notified */}
//           {/*     </CardDescription> */}
//           {/*   </CardHeader> */}
//           {/*   <CardContent className="space-y-6"> */}
//           {/*     <div className="flex items-center justify-between"> */}
//           {/*       <div className="space-y-0.5"> */}
//           {/*         <Label className="text-base">Email Notifications</Label> */}
//           {/*         <p className="text-sm text-gray-600 dark:text-gray-300"> */}
//           {/*           Receive notifications about your account activity */}
//           {/*         </p> */}
//           {/*       </div> */}
//           {/*       <Switch */}
//           {/*         checked={settings.emailNotifications} */}
//           {/*         onCheckedChange={(checked) => */}
//           {/*           setSettings((prev) => ({ */}
//           {/*             ...prev, */}
//           {/*             emailNotifications: checked, */}
//           {/*           })) */}
//           {/*         } */}
//           {/*       /> */}
//           {/*     </div> */}
//           {/**/}
//           {/*     <div className="flex items-center justify-between"> */}
//           {/*       <div className="space-y-0.5"> */}
//           {/*         <Label className="text-base">Marketing Emails</Label> */}
//           {/*         <p className="text-sm text-gray-600 dark:text-gray-300"> */}
//           {/*           Receive updates about new features and tips */}
//           {/*         </p> */}
//           {/*       </div> */}
//           {/*       <Switch */}
//           {/*         checked={settings.marketingEmails} */}
//           {/*         onCheckedChange={(checked) => */}
//           {/*           setSettings((prev) => ({ */}
//           {/*             ...prev, */}
//           {/*             marketingEmails: checked, */}
//           {/*           })) */}
//           {/*         } */}
//           {/*       /> */}
//           {/*     </div> */}
//           {/**/}
//           {/*     <div className="flex items-center justify-between"> */}
//           {/*       <div className="space-y-0.5"> */}
//           {/*         <Label className="text-base">Auto-save Documents</Label> */}
//           {/*         <p className="text-sm text-gray-600 dark:text-gray-300"> */}
//           {/*           Automatically save your work as you type */}
//           {/*         </p> */}
//           {/*       </div> */}
//           {/*       <Switch */}
//           {/*         checked={settings.autoSave} */}
//           {/*         onCheckedChange={(checked) => */}
//           {/*           setSettings((prev) => ({ ...prev, autoSave: checked })) */}
//           {/*         } */}
//           {/*       /> */}
//           {/*     </div> */}
//           {/*   </CardContent> */}
//           {/* </Card> */}
//
//           {/* FEAT: Integrations */}
//           {/* <Card> */}
//           {/*   <CardHeader> */}
//           {/*     <CardTitle className="flex items-center gap-2"> */}
//           {/*       <Mail className="w-5 h-5" /> */}
//           {/*       Integrations */}
//           {/*     </CardTitle> */}
//           {/*     <CardDescription> */}
//           {/*       Connect external services to enhance your workflow */}
//           {/*     </CardDescription> */}
//           {/*   </CardHeader> */}
//           {/*   <CardContent className="space-y-6"> */}
//           {/*     <div className="flex items-center justify-between p-4 border rounded-lg"> */}
//           {/*       <div className="flex items-center gap-3"> */}
//           {/*         <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center"> */}
//           {/*           <Mail className="w-5 h-5 text-red-600 dark:text-red-400" /> */}
//           {/*         </div> */}
//           {/*         <div> */}
//           {/*           <h3 className="font-medium text-gray-900 dark:text-white"> */}
//           {/*             Gmail */}
//           {/*           </h3> */}
//           {/*           <p className="text-sm text-gray-600 dark:text-gray-300"> */}
//           {/*             Send emails directly from the app */}
//           {/*           </p> */}
//           {/*         </div> */}
//           {/*       </div> */}
//           {/*       <div className="flex items-center gap-2"> */}
//           {/*         {settings.gmailConnected ? ( */}
//           {/*           <> */}
//           {/*             <Badge */}
//           {/*               variant="secondary" */}
//           {/*               className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" */}
//           {/*             > */}
//           {/*               Connected */}
//           {/*             </Badge> */}
//           {/*             <Button */}
//           {/*               variant="outline" */}
//           {/*               size="sm" */}
//           {/*               onClick={handleDisconnectGmail} */}
//           {/*             > */}
//           {/*               Disconnect */}
//           {/*             </Button> */}
//           {/*           </> */}
//           {/*         ) : ( */}
//           {/*           <> */}
//           {/*             <Badge variant="outline">Not Connected</Badge> */}
//           {/*             <Button size="sm" onClick={handleConnectGmail}> */}
//           {/*               <Crown className="w-4 h-4 mr-1" /> */}
//           {/*               Connect (Pro) */}
//           {/*             </Button> */}
//           {/*           </> */}
//           {/*         )} */}
//           {/*       </div> */}
//           {/*     </div> */}
//           {/*   </CardContent> */}
//           {/* </Card> */}
//
//           {/* Subscription */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <CreditCard className="w-5 h-5" />
//                 Subscription
//               </CardTitle>
//               <CardDescription>
//                 Manage your subscription and billing information
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="flex items-center justify-between p-4 border rounded-lg">
//                 <div>
//                   <h3 className="font-medium text-gray-900 dark:text-white">
//                     Current Plan
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">
//                     Free Plan
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Badge variant="outline">5 credits remaining</Badge>
//                   <Link href="/pricing">
//                     <Button size="sm">
//                       <Crown className="w-4 h-4 mr-1" />
//                       Upgrade
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
//                   <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
//                     Usage This Month
//                   </h4>
//                   <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//                     2 / 5
//                   </p>
//                   <p className="text-sm text-blue-700 dark:text-blue-300">
//                     Generations used
//                   </p>
//                 </div>
//                 <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
//                   <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
//                     Documents Created
//                   </h4>
//                   <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
//                     8
//                   </p>
//                   <p className="text-sm text-purple-700 dark:text-purple-300">
//                     Total documents
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//
//           {/* Data & Privacy */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Download className="w-5 h-5" />
//                 Data & Privacy
//               </CardTitle>
//               <CardDescription>
//                 Control your data and privacy preferences
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="font-medium text-red-600 dark:text-red-400">
//                     Delete Account
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">
//                     Permanently delete your account and all data
//                   </p>
//                 </div>
//                 <Button variant="destructive" onClick={handleDeleteAccount}>
//                   <Trash2 className="w-4 h-4 mr-2" />
//                   Delete Account
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//
//           {/* Save Button */}
//           {/* <div className="flex justify-end"> */}
//           {/*   <Button onClick={handleSaveSettings} disabled={isLoading} size="lg"> */}
//           {/*     {isLoading ? ( */}
//           {/*       <> */}
//           {/*         <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" /> */}
//           {/*         Saving... */}
//           {/*       </> */}
//           {/*     ) : ( */}
//           {/*       <> */}
//           {/*         <Save className="w-4 h-4 mr-2" /> */}
//           {/*         Save Settings */}
//           {/*       </> */}
//           {/*     )} */}
//           {/*   </Button> */}
//           {/* </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }
