import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

interface Booking {
    id: string
    student: string
    counsellor: string
    status: "pending" | "confirmed" | "completed"
    time: string
}

export const sampleBookings: Booking[] = [
    { id: "b1", student: "Student A", counsellor: "Dr. Sharma", status: "pending", time: "10:00 AM" },
    { id: "b2", student: "Student B", counsellor: "Dr. Gupta", status: "confirmed", time: "2:00 PM" },
    { id: "b3", student: "Student C", counsellor: "Dr. Iyer", status: "completed", time: "Yesterday" },
]

export function BookingDashboard({ bookings }: { bookings: Booking[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Counsellor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.map(b => (
                            <TableRow key={b.id}>
                                <TableCell>{b.student}</TableCell>
                                <TableCell>{b.counsellor}</TableCell>
                                <TableCell>{b.status}</TableCell>
                                <TableCell>{b.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
