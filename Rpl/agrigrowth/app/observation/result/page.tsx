"use client";

import GrowthMonitoringDashboard from "@/components/GrowthMonitoringDashboard";

export default function ObservationResultPage() {
  // Default sample data - in production, this would come from Supabase
  const measurements = [
    { day: 1, height: "1 cm", leaves: 2, branches: 1 },
    { day: 2, height: "1 cm", leaves: 2, branches: 1 },
    { day: 3, height: "2 cm", leaves: 2, branches: 2 },
    { day: 4, height: "2 cm", leaves: 3, branches: 2 },
    { day: 5, height: "2 cm", leaves: 4, branches: 2 },
  ];

  return (
    <GrowthMonitoringDashboard 
      fieldName="'Sawah belakang kampus'"
      measurements={measurements}
    />
  );
}
