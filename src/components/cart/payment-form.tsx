"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import type React from "react"

import MyButton from "../custom/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

import { ExpressCheckoutElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"

export function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      })

      if (error) {
       
      }
    } catch (err) {
     
    } finally {
      setIsLoading(false)
    }
  }

  const handleExpressCheckout = async () => {
    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      })

      if (error) {
       
      }
    } catch (err) {
     
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Payment</CardTitle>
        <CardDescription>Choose your preferred payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="standard" className="w-full pb-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard">Standard Checkout</TabsTrigger>
            <TabsTrigger value="express">Express Checkout</TabsTrigger>
          </TabsList>
          <TabsContent value="standard">
            
              <PaymentElement
                options={{
                  layout: "tabs",
                  paymentMethodOrder: ["card", "apple_pay", "google_pay"],
                }}
              />
          </TabsContent>
          <TabsContent value="express">
            <div className="space-y-4">
              <ExpressCheckoutElement
                onConfirm={handleExpressCheckout}
              />
            </div>
          </TabsContent>
        </Tabs>
          <MyButton type="submit" className="w-full" disabled={isLoading || !stripe || !elements}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Pay Now
        </MyButton>
      </CardContent>
      
    </Card>
    </form>

  )
}
