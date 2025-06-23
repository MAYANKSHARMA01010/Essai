import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import AddressModal from "@/components/AddressModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Package, Settings, Plus, Edit, Trash2, User } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export type Address = {
  id: string;
  isDefault: boolean;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  zipCode: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type Order = {
  createdAt: string | number | Date;
  id: string;
  date: string;
  total: number;
  status: string;
  // Add other fields as needed
};

type User = {
  profileImageUrl?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  // Add other fields as needed
};

export default function Profile() {
  const { user, isLoading: authLoading } = useAuth() as { user: User | null, isLoading: boolean };
  const { toast } = useToast();
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();

  const { data: addresses = [], refetch: refetchAddresses } = useQuery<Address[]>({
    queryKey: ["/api/addresses"],
    retry: false,
  });

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
    retry: false,
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
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
  }, [user, authLoading, toast]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-warm-amber"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleAddressCreated = () => {
    refetchAddresses();
    setAddressModalOpen(false);
    setEditingAddress(undefined);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and view your order history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-warm-amber rounded-full flex items-center justify-center mx-auto mb-4">
                    {user.profileImageUrl ? (
                      <img 
                        src={user.profileImageUrl} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {user.firstName && user.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user.email
                    }
                  </h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {addresses.length} Address{addresses.length !== 1 ? 'es' : ''}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Package className="h-4 w-4 mr-2" />
                    {orders.length} Order{orders.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="addresses" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="addresses" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Addresses
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="addresses" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Shipping Addresses</CardTitle>
                    <Button 
                      onClick={() => setAddressModalOpen(true)}
                      className="bg-warm-amber hover:bg-deep-amber"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Address
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {addresses.length === 0 ? (
                      <div className="text-center py-8">
                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No addresses found</p>
                        <Button 
                          onClick={() => setAddressModalOpen(true)}
                          className="bg-warm-amber hover:bg-deep-amber"
                        >
                          Add Your First Address
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {addresses.map((address) => (
                          <div key={address.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  {address.isDefault && (
                                    <Badge className="bg-warm-amber text-white">Default</Badge>
                                  )}
                                </div>
                                <div className="text-gray-900">
                                  <p className="font-medium">
                                    {address.firstName} {address.lastName}
                                  </p>
                                  <p>{address.address1}</p>
                                  {address.address2 && <p>{address.address2}</p>}
                                  <p>
                                    {address.city}, {address.state} {address.zipCode}
                                  </p>
                                  <p>{address.country}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditAddress(address)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No orders found</p>
                        <Button 
                          onClick={() => window.location.href = "/"}
                          className="bg-warm-amber hover:bg-deep-amber"
                        >
                          Start Shopping
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-medium text-gray-900">
                                  Order #{order.id}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {new Date(order.createdAt!).toLocaleDateString()}
                                </p>
                              </div>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <div className="text-gray-600 text-sm">
                              <p>Total: ${order.total}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Account settings are managed through your authentication provider.
                      </p>
                      <Button 
                        onClick={() => window.location.href = "/api/logout"}
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <AddressModal
        open={addressModalOpen}
        onOpenChange={setAddressModalOpen}
        address={editingAddress}
        onSuccess={handleAddressCreated}
      />
    </div>
  );
}
