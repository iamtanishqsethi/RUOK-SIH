import { BookingDashboard, sampleBookings } from "./BookingDashboard";
import { CrisisAlerts, sampleCrisisAlerts } from "./CrisisAlerts";
import {ForumAnalytics, sampleForumData} from "./ForumAnalytics";
import {MentalHealthMetrics, sampleEmotionData} from "./MentalHealthMetrics";
import { ResourceUsage, sampleResourceData } from "./ResourceUsage";
import {AdminSettings} from "@/components/Admin/AdminSettings.tsx";
import {DashboardHeader} from "@/components/Admin/DashboardHeader.tsx";


export default function AdminDashboard() {
    return (
        <div className="p-6">
            <DashboardHeader />
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <MentalHealthMetrics data={sampleEmotionData} />
                <CrisisAlerts alerts={sampleCrisisAlerts} />
                <ForumAnalytics data={sampleForumData} />
                <BookingDashboard bookings={sampleBookings} />
                <ResourceUsage data={sampleResourceData} />
                <AdminSettings />
            </div>
        </div>
    )
}