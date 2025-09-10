import { Check, Star } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "5 generations per month",
        "Cover letter & cold email generation",
        // "Basic AI chat refinement",
        "Text editing & copy tools",
        "Resume upload & parsing",
      ],
      limitations: [
        "Limited to 5 generations",
        "No Gmail integration",
        "No PDF downloads",
        "Basic support",
      ],
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Pro",
      price: "99",
      period: "month",
      description: "Everything you need to land your dream job",
      features: [
        "Unlimited generations",
        "AI chat refinement",
        "Direct Gmail integration",
        "PDF download & export",
        "Premium templates",
        "Priority support",
        "Analytics & insights",
        "Custom branding",
      ],
      limitations: [],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const,
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include our core AI
            generation features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? "border-blue-500 dark:border-blue-400 shadow-lg" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Recommended
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold dark:text-white">
                    <span>&#8377;</span>
                    {plan.price}
                  </span>
                  {plan.period !== "contact us" && <span>/{plan.period}</span>}
                </div>
                <CardDescription className="text-center mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                {plan.popular ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className={`w-full mb-6 ${plan.popular ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" : ""}`}
                        variant={plan.buttonVariant}
                        size="lg"
                      >
                        {plan.buttonText}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogTitle>Congratulations!!</AlertDialogTitle>
                      <AlertDialogDescription>
                        You are a lucky winner. You got a chance to use
                        CoverCraft for free.
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogAction asChild>
                          <Link href="/auth/signin">Continue</Link>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Link href="/auth/signin">
                    <Button
                      className={`w-full mb-6 ${plan.popular ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" : ""}`}
                      variant={plan.buttonVariant}
                      size="lg"
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                )}

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      Limitations:
                    </p>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation) => (
                        <li
                          key={limitation}
                          className="text-sm text-gray-500 dark:text-gray-400"
                        >
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center">Feature Comparison</CardTitle>
            <CardDescription className="text-center">
              See what's included in each plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 font-medium text-gray-900 dark:text-white">
                      Features
                    </th>
                    <th className="text-center py-4 font-medium text-gray-900 dark:text-white">
                      Free
                    </th>
                    <th className="text-center py-4 font-medium text-gray-900 dark:text-white">
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 text-gray-700 dark:text-gray-300">
                      Monthly generations
                    </td>
                    <td className="text-center py-4">5</td>
                    <td className="text-center py-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 text-gray-700 dark:text-gray-300">
                      AI chat refinement
                    </td>
                    <td className="text-center py-4">-</td>
                    <td className="text-center py-4">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 text-gray-700 dark:text-gray-300">
                      Gmail integration
                    </td>
                    <td className="text-center py-4">-</td>
                    <td className="text-center py-4">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-gray-700 dark:text-gray-300">
                      PDF downloads
                    </td>
                    <td className="text-center py-4">-</td>
                    <td className="text-center py-4">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        {/* <Card> */}
        {/*   <CardHeader> */}
        {/*     <CardTitle className="text-center"> */}
        {/*       Frequently Asked Questions */}
        {/*     </CardTitle> */}
        {/*   </CardHeader> */}
        {/*   <CardContent> */}
        {/*     <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
        {/*       <div> */}
        {/*         <h3 className="font-semibold text-gray-900 dark:text-white mb-2"> */}
        {/*           What happens to my data? */}
        {/*         </h3> */}
        {/*         <p className="text-gray-600 dark:text-gray-300"> */}
        {/*           Your data is always yours. When you cancel, you can export all */}
        {/*           your documents and we'll delete your account data upon */}
        {/*           request. */}
        {/*         </p> */}
        {/*       </div> */}
        {/*       <div> */}
        {/*         <h3 className="font-semibold text-gray-900 dark:text-white mb-2"> */}
        {/*           How does Gmail integration work? */}
        {/*         </h3> */}
        {/*         <p className="text-gray-600 dark:text-gray-300"> */}
        {/*           We use OAuth to securely connect to your Gmail account. You */}
        {/*           can send emails directly from our platform without sharing */}
        {/*           your credentials. */}
        {/*         </p> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*   </CardContent> */}
        {/* </Card> */}
      </div>
    </div>
  );
}
