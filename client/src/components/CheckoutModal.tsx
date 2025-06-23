import { ReactNode, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useCartStore } from "@/lib/cartStore";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, MapPin } from "lucide-react";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CheckoutFormData {
  addressId: string;
  paymentMethod: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

export type Address = {
  isDefault: boolean;
  firstName: ReactNode;
  lastName: ReactNode;
  address1: ReactNode;
  address2: string;
  zipCode: ReactNode;
  id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export default function CheckoutModal({ open, onOpenChange }: CheckoutModalProps) {
  const { cartItems, clearCart, getCartTotal } = useCartStore();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<CheckoutFormData>({
    defaultValues: {
      addressId: "",
      paymentMethod: "card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const { data: addresses = [] } = useQuery<Address[]>({
    queryKey: ["/api/addresses"],
    enabled: open,
    retry: false,
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const orderItems = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price.toString(),
      }));

      const response = await apiRequest("POST", "/api/orders", {
        addressId: parseInt(data.addressId),
        items: orderItems,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      clearCart();
      onOpenChange(false);
      form.reset();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const subtotal = getCartTotal();
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const onSubmit = async (data: CheckoutFormData) => {
    if (!data.addressId) {
      toast({
        title: "Error",
        description: "Please select a shipping address",
        variant: "destructive",
      });
      return;
    }

    if (data.paymentMethod === "card" && (!data.cardNumber || !data.expiryDate || !data.cvv)) {
      toast({
        title: "Error",
        description: "Please fill in all card details",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      await createOrderMutation.mutateAsync(data);
    } finally {
      setIsProcessing(false);
    }
  };

  const defaultAddress = addresses.find(addr => addr.isDefault);
  if (defaultAddress && !form.watch("addressId")) {
    form.setValue("addressId", defaultAddress.id.toString());
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Checkout
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </h3>
                  {addresses.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      <p>No addresses found. Please add an address to continue.</p>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2"
                        onClick={() => {
                          onOpenChange(false);
                          window.location.href = "/profile";
                        }}
                      >
                        Add Address
                      </Button>
                    </div>
                  ) : (
                    <FormField
                      control={form.control}
                      name="addressId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              {addresses.map((address) => (
                                <div key={address.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                                  <RadioGroupItem value={address.id.toString()} id={`address-${address.id}`} />
                                  <Label htmlFor={`address-${address.id}`} className="flex-1 cursor-pointer">
                                    <div className="font-medium text-gray-900">
                                      {address.firstName} {address.lastName}
                                      {address.isDefault && (
                                        <span className="ml-2 text-xs bg-warm-amber text-white px-2 py-1 rounded">
                                          Default
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-gray-600 text-sm mt-1">
                                      {address.address1}
                                      {address.address2 && `, ${address.address2}`}
                                      <br />
                                      {address.city}, {address.state} {address.zipCode}
                                      <br />
                                      {address.country}
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <div className="space-y-4">
                              <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-4">
                                  <RadioGroupItem value="card" id="card" />
                                  <Label htmlFor="card" className="font-medium">Credit Card</Label>
                                </div>
                                {form.watch("paymentMethod") === "card" && (
                                  <div className="space-y-4">
                                    <FormField
                                      control={form.control}
                                      name="cardNumber"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Input
                                              placeholder="1234 5678 9012 3456"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                      <FormField
                                        control={form.control}
                                        name="expiryDate"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormControl>
                                              <Input
                                                placeholder="MM/YY"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="cvv"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormControl>
                                              <Input
                                                placeholder="CVV"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg">
                                <RadioGroupItem value="paypal" id="paypal" />
                                <Label htmlFor="paypal" className="flex items-center gap-2">
                                  <span className="text-blue-600 font-semibold">PayPal</span>
                                </Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span className="text-warm-amber">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={isProcessing || addresses.length === 0}
              className="w-full bg-warm-amber text-white hover:bg-deep-amber mt-6"
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
