  import {
    Receipt,
    CheckCircle2,
    Truck,
    MapPin,
    Home,
    PackageSearch 
  } from "lucide-react";
  
  
  
  const statusColors = {
    pending: "bg-amber-100 text-amber-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const steps = [
    { key: "pending", label: "Placed", icon: Receipt },
    { key: "processing", label: "Processing", icon: CheckCircle2 },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "out_for_delivery", label: "Out for Delivery", icon: MapPin },
    { key: "delivered", label: "Delivered", icon: Home },
  ] ;

  export  { steps, statusColors };