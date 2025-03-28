import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { API } from "../../../api";

interface EnrollmentData {
    year: number;
    month: number;
    enrollCount: number;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AdminChart() {
    const [data, setData] = useState<EnrollmentData[]>([
        { year: 2025, month: 1, enrollCount: 50 },
        { year: 2025, month: 2, enrollCount: 80 },
        { year: 2025, month: 3, enrollCount: 100 },
        { year: 2025, month: 4, enrollCount: 75 }
    ]);

    useEffect(() => {
        API.get("/enrollments/stats")
            .then((resp) => {
                setData(resp.data);
            })
            .catch((err) => console.error("Error fetching statistics: ", err));
    }, []);
    return (
        <Line
            width="100%"
            height={300}
            data={{
                labels: data.map(
                    (d) => `${d.year}-${new Date(d.year, d.month - 1).toLocaleString("en-US", { month: "short" })}`
                ),
                datasets: [
                    {
                        label: "Enrollments per Month",
                        data: data.map((d) => d.enrollCount),
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        pointBackgroundColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 2,
                        tension: 0.3
                    }
                ]
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: "top" }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true }
                }
            }}
        />
    );
}
