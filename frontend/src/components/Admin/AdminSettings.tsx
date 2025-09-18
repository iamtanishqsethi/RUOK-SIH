import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Cpu, Shield, Database } from "lucide-react"

export function AdminSettings() {
    return (
        <Card className="shadow-md rounded-2xl">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">System Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Users size={18} />
                        Manage Users
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Cpu size={18} />
                        Configure AI
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Shield size={18} />
                        Privacy Settings
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Database size={18} />
                        Backup System
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
