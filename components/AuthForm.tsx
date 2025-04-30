"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, } from "@/components/ui/form"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"


const AuthFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-in' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)

  })
}
const AuthForm = ({ type }: { type: FormType }) => {

  const router = useRouter();

  const signUpSchema = z.object({
    name: z.string().min(3, "Name must contain at least 3 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(3, "Password must be at least 6 characters long"),
  });
  
  const signInSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(3, "Password must be at least 6 characters long"),
  });
  
  // Then use the appropriate schema based on the form type
  const formSchema = type === 'sign-up' ? signUpSchema : signInSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: type === 'sign-up' 
      ? {
          name: "",
          email: "",
          password: "",
        } as z.infer<typeof signUpSchema>
      : {
          email: "",
          password: "",
        } as z.infer<typeof signInSchema>,
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('clicked',values);
    console.log('Type:', type);
    try {
      if (type === 'sign-up') {
        toast.success('Account created successfully Please sign in.');
        router.push('/sign-in');
      } else {
        toast.success('Sign in successfull');
        router.push('/');
      }
    } catch (e) {
      // console.log(e);
      console.log('Error during submission:', e);
      toast.error(`There was an error: ${e}`)
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[556px] ">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center ">
          <Image src="/logo.svg" alt="logo" width={32} height={38} />
          <h2> Lakshya</h2>
        </div>
        <h3 className="text-center">Interview prep made easy</h3>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit, (errors)=>{
            console.log('Form validation errors:', errors);
            toast.error('Form validation failed. Please check your inputs.');
          })} className="space-y-6 w-full mt-4 form">
            {!isSignIn &&
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your name"
              />
            }
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter password (min of 3 char)"
              type="password"
            />            
            <Button className="btn animate-glow" type="submit">{
              isSignIn ? "Sign In" : "Sign Up"
            }</Button>
          </form>
        </Form>
        <p className="text-center ">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="text-blue-500 font-bold text-user-primary">
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm


